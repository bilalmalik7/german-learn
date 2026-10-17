/* READING ROOM (#/read) – graded texts A1 → B1 about everyday life in Germany: tap a highlighted word for its meaning,
   listen to the text sentence by sentence, answer the questions, then write/speak about yourself.
   Data: js/data/reading.js + reading2.js (GL.reading). */
(function () {
  'use strict';
  const { $, $$, esc, attr, Store, Speech } = GL;
  const S = () => { const s = (Store.state.read = Store.state.read || {}); s.done = s.done || {}; return s; };
  const LV = { A1: '#22b573', A2: '#3a86ff', B1: '#9b5de5' };
  const TYPE = { story: '📖 Story', email: '📧 E-Mail', chat: '💬 Chat', news: '📰 News', blog: '✍️ Blog', ad: '📌 Advert', letter: '✉️ Letter', info: 'ℹ️ Info', interview: '🎙️ Interview', recipe: '🍳 Recipe', opinion: '💭 Opinion' };
  const list = () => GL.reading || [];
  const fold = (s) => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');

  function index(lvF) {
    const R = list(), s = S(), f = lvF || 'all';
    const done = Object.keys(s.done).length;
    return {
      html: `<section class="rd-hero"><div><span class="xm-pill">📖 READING ROOM</span><h1>Read real German</h1><p>Stories, chats, e-mails, adverts, news and blogs about everyday life in Germany – from your first A1 text to B1 newspapers. Tap any <span class="rd-hl">yellow word</span> for its meaning.</p>
          <div class="ls-hstats"><span>📚 <b>${R.length}</b> texts</span><span>✅ <b>${done}</b> read</span></div></div><div class="rd-art" aria-hidden="true"><span class="rd-book">📖</span><span class="rd-l l1">A</span><span class="rd-l l2">ä</span><span class="rd-l l3">ß</span><span class="rd-l l4">Ü</span></div></section>
        <div class="chips" style="margin-bottom:12px">${['all', 'A1', 'A2', 'B1'].map((l) => `<a class="chip ${f === l ? 'on' : ''}" href="#/read${l === 'all' ? '' : '/level/' + l}">${l === 'all' ? 'All levels' : l}</a>`).join('')}</div>
        ${['A1', 'A2', 'B1'].filter((l) => f === 'all' || f === l).map((l) => { const rs = R.filter((r) => r.level === l); if (!rs.length) return ''; return `<h2><span class="xm-lv" style="--lv:${LV[l]}">${l}</span> ${l === 'A1' ? 'First texts' : l === 'A2' ? 'Everyday texts' : 'Real-life texts'}</h2><div class="rd-grid">${rs.map((r, i) => { const d = s.done[r.id]; return `<a class="card rd-card ${d != null ? 'done' : ''}" href="#/read/${r.id}" style="--lv:${LV[l]};animation-delay:${Math.min(i, 12) * 0.04}s"><span class="rd-ico">${r.icon}</span><div><small>${TYPE[r.type] || r.type} · ${r.minutes || 4} min</small><b>${esc(r.title)}</b><small>${esc(r.en)}</small></div>${d != null ? `<span class="xm-chip ${d >= 80 ? 'hi' : d >= 60 ? 'mid' : 'lo'}">${d}%</span>` : ''}</a>`; }).join('')}</div>`; }).join('')}`,
    };
  }

  function reader(id) {
    const R = list(), r = R.find((x) => x.id === id);
    if (!r) return index();
    const i = R.indexOf(r), next = R[i + 1];
    // highlight key words in the text
    const keys = (r.words || []).map(([de, en]) => { const core = de.replace(/^(der|die|das|sich)\s+/, '').split(/[\s/,(]/)[0]; return { core, de, en, stem: fold(core).slice(0, Math.max(4, Math.min(core.length - 1, 7))) }; }).filter((k) => k.core.length > 2);
    const mark = (txt) => esc(txt).replace(/[\p{L}ÄÖÜäöüß-]{3,}/gu, (w) => { const f = fold(w); const k = keys.find((x) => f.startsWith(x.stem)); return k ? `<button class="rd-w" type="button" data-de="${attr(k.de)}" data-en="${attr(k.en)}">${w}</button>` : w; });
    const paras = r.text.split(/\n\s*\n/).map((p) => (r.type === 'chat' ? p.split('\n').map((ln) => { const m = /^([^:]{1,20}):\s*(.*)$/.exec(ln); return m ? `<div class="rd-chat ${m[1].trim() === (r.text.split(':')[0] || '').trim() ? 'l' : 'r'}"><small>${esc(m[1])}</small><span>${mark(m[2])}</span></div>` : `<p>${mark(ln)}</p>`; }).join('') : `<p>${p.split(/(?<=[.!?])\s+/).map((sn) => `<span class="rd-s">${mark(sn)}</span>`).join(' ')}</p>`)).join('');
    return {
      html: `<p class="ex-crumbs"><a href="#/read">📖 Reading room</a> › ${esc(r.title)}</p>
        <div class="rd-head" style="--lv:${LV[r.level]}"><span class="rd-big">${r.icon}</span><div><span class="xm-lv" style="--lv:${LV[r.level]}">${r.level}</span> <span class="xm-tag">${TYPE[r.type] || r.type}</span> <span class="xm-tag">⏱️ ${r.minutes || 4} min</span><h1 style="margin:.2em 0">${esc(r.title)}</h1><small class="muted">${esc(r.en)}</small></div></div>
        <div class="rd-tools"><button class="btn green" id="rdPlay" type="button">▶ Read it to me</button><button class="btn ghost" id="rdSlow" type="button">🐢 Slowly</button><button class="btn ghost" id="rdHide" type="button">🙈 Hide highlights</button></div>
        <article class="card rd-text rd-${r.type}" id="rdText">${paras}<div class="rd-pop hidden" id="rdPop"></div></article>
        <details class="card rd-wordbox"><summary><b>🔤 Word list</b> <small class="muted">${r.words.length} words</small></summary><div class="xm-gloss">${r.words.map(([de, en]) => `<button class="xm-g" type="button" data-say="${attr(de)}"><b>${esc(de)}</b><small>${esc(en)}</small></button>`).join('')}</div></details>
        <div class="card"><h3 style="margin-top:0">❓ Did you understand?</h3>${r.q.map((q, k) => { const ord = GL.shuffle([0, 1, 2]); return `<div class="xm-q" data-k="${k}"><div class="xm-qt"><span class="xm-no">${k + 1}</span><span>${esc(q.q)}</span></div><div class="xm-opts">${ord.map((j, pos) => `<label class="xm-opt"><input type="radio" name="rq${k}" value="${j}"><span class="xm-ol">${String.fromCharCode(97 + pos)}</span><span>${esc(q.o[j])}</span></label>`).join('')}</div><div class="xm-ex hidden"></div></div>`; }).join('')}
          <button class="btn green big" id="rdCheck" type="button">✅ Check</button><div id="rdRes"></div></div>
        <div class="card rd-task"><h3 style="margin-top:0">🗣️✍️ Your turn</h3><p>${esc(r.task)}</p><div class="row"><a class="btn" href="#/writing/free">✍️ Write it (with the coach)</a><a class="btn ghost" href="#/talk">🎤 Say it out loud</a></div></div>
        <div class="row" style="justify-content:space-between">${i > 0 ? `<a class="btn ghost" href="#/read/${R[i - 1].id}">← ${esc(R[i - 1].title)}</a>` : '<span></span>'}${next ? `<a class="btn ghost" href="#/read/${next.id}">${esc(next.title)} →</a>` : '<a class="btn ghost" href="#/read">All texts</a>'}</div>`,
      mount() {
        const pop = $('#rdPop'), box = $('#rdText');
        box.addEventListener('click', (e) => {
          const w = e.target.closest('.rd-w');
          if (!w) { pop.classList.add('hidden'); return; }
          pop.innerHTML = `<b>${esc(w.dataset.de)}</b><span>${esc(w.dataset.en)}</span>`; pop.classList.remove('hidden');
          const br = box.getBoundingClientRect(), wr = w.getBoundingClientRect();
          pop.style.top = wr.bottom - br.top + 6 + 'px'; pop.style.left = Math.max(6, Math.min(br.width - 200, wr.left - br.left)) + 'px';
          Speech.speak(w.dataset.de); $$('.rd-w', box).forEach((x) => x.classList.toggle('on', x === w));
        });
        let tok = 0;
        const play = async (slow) => {
          const b = $('#rdPlay');
          if (b.classList.contains('on')) { tok++; Speech.stop(); b.classList.remove('on'); b.textContent = '▶ Read it to me'; $$('.rd-s, .rd-chat').forEach((s) => s.classList.remove('now')); return; }
          const my = ++tok; b.classList.add('on'); b.textContent = '⏹ Stop';
          const parts = $$('.rd-s, .rd-chat span', box);
          for (const s of parts) { if (my !== tok) break; parts.forEach((x) => x.classList.remove('now')); s.classList.add('now'); await Speech.speak(s.textContent, { slow }); }
          if (my === tok) { parts.forEach((x) => x.classList.remove('now')); b.classList.remove('on'); b.textContent = '▶ Read it to me'; if (GL.Game) GL.Game.count('listen', 1); }
        };
        $('#rdPlay').onclick = () => play(false); $('#rdSlow').onclick = () => play(true);
        $('#rdHide').onclick = () => box.classList.toggle('nohl');
        $('#rdCheck').onclick = () => {
          let ok = 0;
          r.q.forEach((q, k) => {
            const el = $(`.xm-q[data-k="${k}"]`), ch = $(`input[name="rq${k}"]:checked`, el), good = ch && +ch.value === q.a; if (good) ok++;
            el.classList.add(good ? 'ok' : 'bad');
            $$('.xm-opt', el).forEach((l) => { const j = +$('input', l).value; l.classList.toggle('right', j === q.a); l.classList.toggle('wrong', !!ch && j === +ch.value && !good); $('input', l).disabled = true; });
            const ex = $('.xm-ex', el); ex.innerHTML = `${good ? '✅' : `❌ <b>${esc(q.o[q.a])}</b> –`} ${esc(q.ex)}`; ex.classList.remove('hidden');
          });
          const pct = Math.round((ok / r.q.length) * 100); const s = S(); s.done[r.id] = Math.max(s.done[r.id] || 0, pct); Store.save();
          Store.addXP(ok * 3 + 5); if (GL.Game) GL.Game.count('read', 1);
          $('#rdCheck').disabled = true; GL.sfx(pct >= 80 ? 'done' : 'pop'); if (pct === 100) { GL.confetti(90); GL.Game && GL.Game.burst($('#rdCheck')); }
          $('#rdRes').innerHTML = `<div class="xm-score ${pct >= 80 ? 'hi' : pct >= 60 ? 'mid' : 'lo'}"><div class="xm-ring" style="--p:${pct}"><b>${ok}/${r.q.length}</b></div><div><h3 style="margin:0">${pct === 100 ? 'Alles verstanden! 📚' : pct >= 60 ? 'Gut gelesen! 👍' : 'Read it once more with the highlights.'}</h3>${next ? `<a class="btn small green" href="#/read/${next.id}" style="margin-top:8px">Next text →</a>` : ''}</div></div>`;
        };
        GL.track && GL.track('read', `Reading: ${r.title}`);
      },
    };
  }
  GL.viewRead = (a, b) => (a === 'level' ? index(b) : a ? reader(a) : index());
})();
