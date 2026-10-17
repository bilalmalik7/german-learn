/* LEBEN IN DEUTSCHLAND (#/life) – survival guide for newcomers: practical facts in English, a checklist, the phrases
   and words you need, a dialogue to listen to, a real-life letter/form/notice to read with questions, and tips.
   Data: js/data/life.js + life2.js (GL.life). */
(function () {
  'use strict';
  const { $, $$, esc, attr, Store, Speech } = GL;
  const S = () => { const s = (Store.state.life = Store.state.life || {}); s.steps = s.steps || {}; s.read = s.read || {}; s.seen = s.seen || {}; return s; };
  const topics = () => (GL.life || []).slice().sort((a, b) => a.n - b.n);
  const prog = (t) => { const s = S(); const st = s.steps[t.id] || {}; const n = Object.values(st).filter(Boolean).length; const parts = [s.seen[t.id] ? 1 : 0, s.read[t.id] != null ? 1 : 0, t.steps.length ? n / t.steps.length : 0]; return Math.round((parts.reduce((a, b) => a + b, 0) / 3) * 100); };

  function grid() {
    const T = topics();
    const all = T.length ? Math.round(T.reduce((a, t) => a + prog(t), 0) / T.length) : 0;
    return {
      html: `<section class="lf-hero"><div><span class="xm-pill">🇩🇪 LEBEN IN DEUTSCHLAND</span><h1>Your survival guide for Germany</h1>
          <p>Registering your address, the doctor, your flat, work, letters from offices, money, trains, shopping, culture – what to do, what people say, and the German you need.</p>
          <div class="lf-hprog"><div class="xm-ring big" style="--p:${all}"><b>${all}%</b><small>done</small></div><span>${T.length} topics · facts, checklists, phrases, dialogues and real letters to read</span></div></div>
          <div class="lf-art" aria-hidden="true"><span class="lf-b b1">🏛️</span><span class="lf-b b2">🚆</span><span class="lf-b b3">🩺</span><span class="lf-b b4">🏠</span><span class="lf-b b5">✉️</span>${GL.charSVG('lena', 'idle waving')}</div></section>
        <div class="lf-grid">${T.map((t, i) => { const p = prog(t); return `<a class="card lf-card" href="#/life/${t.id}" style="--c:${t.color};animation-delay:${i * 0.04}s"><span class="lf-ico">${t.icon}</span><div><small>${t.n}. ${esc(t.de)}</small><b>${esc(t.title)}</b><span class="lf-bar"><i style="width:${p}%"></i></span></div>${p >= 100 ? '<span class="lf-ok">✓</span>' : ''}</a>`; }).join('')}</div>
        <div class="note">ℹ️ General information for newcomers (2025/26). Rules can differ by city and change – always check with the office responsible (Bürgeramt, Ausländerbehörde, Krankenkasse …). In an emergency call <b>112</b>, police <b>110</b>.</div>`,
    };
  }

  function topic(id) {
    const T = topics(), t = T.find((x) => x.id === id);
    if (!t) return grid();
    const i = T.indexOf(t), prev = T[i - 1], next = T[i + 1];
    const s = S(), st = s.steps[t.id] || {};
    const who = (sp) => (sp === 'alex' ? 'You' : (GL.chars[sp] || { name: sp }).name.replace(/ \(.*\)/, ''));
    return {
      html: `<p class="ex-crumbs"><a href="#/life">🇩🇪 Living in Germany</a> › ${esc(t.title)}</p>
        <section class="lf-thead" style="--c:${t.color}"><span class="lf-tico">${t.icon}</span><div><small>${t.n} / ${T.length} · ${esc(t.de)} · <span class="xm-lv" style="--lv:${t.color}">${t.level}</span></small><h1>${esc(t.title)}</h1><p>${esc(t.intro)}</p></div></section>
        <h2>📌 What you need to know</h2>
        <div class="lf-facts">${t.facts.map(([ic, ti, tx], k) => `<div class="card lf-fact" style="animation-delay:${k * 0.05}s"><span class="lf-fico">${ic}</span><div><b>${esc(ti)}</b><p>${esc(tx)}</p></div></div>`).join('')}</div>
        <div class="grid grid-2">
          <div class="card lf-steps"><h3 style="margin-top:0">✅ Your checklist</h3><ul>${t.steps.map((x, k) => `<li class="${st[k] ? 'on' : ''}"><label><input type="checkbox" data-k="${k}" ${st[k] ? 'checked' : ''}> <span>${esc(x)}</span></label></li>`).join('')}</ul></div>
          <div class="card"><h3 style="margin-top:0">💡 Tips</h3><ul class="lf-tips">${t.tips.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
            ${t.links && t.links.length ? `<div class="lf-links">${t.links.map(([h, l]) => `<a class="xm-g" href="${attr(h)}"><b>${esc(l)}</b></a>`).join('')}</div>` : ''}</div>
        </div>
        <h2>🗣️ Phrases you need</h2>
        <div class="card"><div class="jp-list">${t.phrases.map(([de, en], k) => `<div class="jp-row" style="animation-delay:${Math.min(k, 12) * 0.03}s"><button class="say-btn" type="button" data-say="${attr(de)}" aria-label="Listen">🔊</button><div class="jp-txt"><b>${esc(de)}</b><small>${esc(en)}</small></div><button class="btn tiny ghost jp-mic" type="button" data-t="${attr(de)}" title="Say it">🎤</button><div class="jp-att"></div></div>`).join('')}</div></div>
        <h3>🔤 Key words</h3><div class="xm-gloss lf-words">${t.words.map(([de, en]) => `<button class="xm-g" type="button" data-say="${attr(de)}"><b>${esc(de)}</b><small>${esc(en)}</small></button>`).join('')}</div>
        <h2>🎬 ${esc(t.dialogue.title)} <small class="muted">· ${esc(t.dialogue.place)}</small></h2>
        <div class="card lf-dia"><div class="row"><button class="btn green" id="lfPlay" type="button">▶ Play the dialogue</button><button class="btn ghost" id="lfEn" type="button">🇬🇧 English</button><span class="spacer"></span><small class="muted">You are Alex – say your lines with the voice!</small></div>
          <div class="lf-lines">${t.dialogue.lines.map(([sp, de, en], k) => `<div class="lf-line ${sp === 'alex' ? 'me' : ''}" data-k="${k}"><span class="lf-av">${GL.charSVG(sp, 'idle')}</span><div class="lf-bub"><small>${esc(who(sp))}</small><p>${esc(de)} <button class="say-btn sm" type="button" data-say="${attr(de)}" ${sp !== 'alex' ? `data-char="${attr(sp)}"` : ''}>🔊</button></p><p class="lf-en hidden">${esc(en)}</p></div></div>`).join('')}</div></div>
        <h2>📄 Read: ${esc(t.read.title)}</h2>
        <div class="grid grid-2 lf-read">
          <div class="lf-paper lf-${t.read.kind}"><div class="lf-pkind">${{ letter: '✉️ Brief', email: '📧 E-Mail', form: '📝 Formular', notice: '📌 Aushang', sms: '💬 SMS', contract: '📃 Vertrag' }[t.read.kind] || '📄'}</div>${esc(t.read.text).replace(/\n/g, '<br>')}</div>
          <div class="card"><h3 style="margin-top:0">❓ Did you understand?</h3>${t.read.q.map((q, k) => `<div class="xm-q" data-k="${k}"><div class="xm-qt"><span class="xm-no">${k + 1}</span><span>${esc(q.q)}</span></div><div class="xm-opts">${q.o.map((o, j) => `<label class="xm-opt"><input type="radio" name="rq${k}" value="${j}"><span class="xm-ol">${String.fromCharCode(97 + j)}</span><span>${esc(o)}</span></label>`).join('')}</div><div class="xm-ex hidden"></div></div>`).join('')}
            <button class="btn green" id="lfCheck" type="button">✅ Check</button> ${s.read[t.id] != null ? `<span class="muted">Last time: ${s.read[t.id]}%</span>` : ''}<div id="lfRes"></div></div>
        </div>
        <div class="row" style="justify-content:space-between;margin-top:16px">${prev ? `<a class="btn ghost" href="#/life/${prev.id}">← ${prev.icon} ${esc(prev.title)}</a>` : '<a class="btn ghost" href="#/life">← All topics</a>'}${next ? `<a class="btn ghost" href="#/life/${next.id}">${next.icon} ${esc(next.title)} →</a>` : '<a class="btn ghost" href="#/life">All topics</a>'}</div>`,
      mount() {
        const s2 = S(); s2.seen[t.id] = Date.now(); Store.save();
        $$('.lf-steps input').forEach((cb) => (cb.onchange = () => { const m = (s2.steps[t.id] = s2.steps[t.id] || {}); m[cb.dataset.k] = cb.checked; cb.closest('li').classList.toggle('on', cb.checked); Store.save(); if (cb.checked) { Store.addXP(2); GL.sfx('pop'); } }));
        $$('.jp-mic').forEach((b) => (b.onclick = () => { const box = b.parentElement.querySelector('.jp-att'); if (box.innerHTML) { box.innerHTML = ''; return; } $$('.jp-att').forEach((x) => { if (x !== box) x.innerHTML = ''; }); GL.Speak.attempt(box, { targets: [b.dataset.t], label: 'Say it in German:', pass: 70 }); }));
        $('#lfEn').onclick = () => $$('.lf-en').forEach((p) => p.classList.toggle('hidden'));
        let tok = 0;
        $('#lfPlay').onclick = async () => {
          const btn = $('#lfPlay');
          if (btn.classList.contains('on')) { tok++; Speech.stop(); btn.classList.remove('on'); btn.textContent = '▶ Play the dialogue'; $$('.lf-line').forEach((l) => l.classList.remove('now')); return; }
          const my = ++tok; btn.classList.add('on'); btn.textContent = '⏹ Stop';
          const lines = $$('.lf-line');
          for (let k = 0; k < t.dialogue.lines.length && my === tok; k++) {
            const [sp, de] = t.dialogue.lines[k];
            lines.forEach((l) => l.classList.remove('now')); lines[k].classList.add('now'); lines[k].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            const svg = lines[k].querySelector('svg.char');
            if (sp === 'alex') await GL.charSay(svg, de, undefined); else await GL.charSay(svg, de, sp);
          }
          if (my === tok) { lines.forEach((l) => l.classList.remove('now')); btn.classList.remove('on'); btn.textContent = '▶ Play again'; if (GL.Game) GL.Game.count('listen', 1); }
        };
        $('#lfCheck').onclick = () => {
          let ok = 0;
          t.read.q.forEach((q, k) => {
            const el = $(`.lf-read .xm-q[data-k="${k}"]`), ch = $(`input[name="rq${k}"]:checked`, el), good = ch && +ch.value === q.a; if (good) ok++;
            el.classList.add(good ? 'ok' : 'bad');
            $$('.xm-opt', el).forEach((l) => { const j = +$('input', l).value; l.classList.toggle('right', j === q.a); l.classList.toggle('wrong', !!ch && j === +ch.value && !good); $('input', l).disabled = true; });
            const ex = $('.xm-ex', el); ex.innerHTML = `${good ? '✅' : `❌ <b>${esc(q.o[q.a])}</b> –`} ${esc(q.ex)}`; ex.classList.remove('hidden');
          });
          const pct = Math.round((ok / t.read.q.length) * 100); s2.read[t.id] = pct; Store.save(); Store.addXP(ok * 3);
          $('#lfCheck').disabled = true; GL.sfx(pct === 100 ? 'done' : 'pop'); if (pct === 100 && GL.Game) GL.Game.burst($('#lfCheck'));
          $('#lfRes').innerHTML = `<p class="${pct === 100 ? 'lf-good' : ''}"><b>${ok}/${t.read.q.length}</b> ${pct === 100 ? '– you can handle this in real life! 🎉' : '– read the text once more.'}</p>`;
        };
        GL.track && GL.track('life', `Living in Germany: ${t.title}`);
      },
    };
  }
  GL.viewLife = (id) => (id ? topic(id) : grid());
})();
