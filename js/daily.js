/* DAILY MIX (#/daily) – one guided 15-minute session that trains everything a little, every day:
   words → listening → speaking → grammar → mistake hunt → a short text checked by the writing coach.
   Content comes from the course data up to the learner's current day, so it grows with them. */
(function () {
  'use strict';
  const { $, $$, esc, attr, Store, Speech } = GL;
  const STEPS = [['🔤', 'Words'], ['🎧', 'Listen'], ['🗣️', 'Speak'], ['🧩', 'Grammar'], ['🕵️', 'Mistake hunt'], ['✍️', 'Write']];
  const maxDay = () => (Store.state.settings.unlockAll ? Math.max(3, Math.min(30, Store.nextDay() + 2)) : Store.nextDay());
  const pick = (a, n) => GL.shuffle(a.slice()).slice(0, n);

  function words() {
    const md = maxDay(), srs = Store.state.srs || {}, now = Date.now();
    const all = []; (GL.days || []).filter((d) => d.day <= md).forEach((d) => (d.vocab || []).forEach((v) => all.push({ de: v[0], en: v[2] })));
    const due = all.filter((w) => srs[w.de] && srs[w.de].due <= now);
    return pick(due.length >= 5 ? due : all, 5);
  }
  function grammarQs() {
    const md = maxDay(), out = [];
    (GL.days || []).filter((d) => d.day <= md).forEach((d) => (d.exercises || []).forEach((e) => { if (e.t === 'mc' && e.o && e.o.length >= 2 && typeof e.a === 'number' && !/<img|___\s*$/.test(e.q || '')) out.push(e); }));
    return pick(out, 3);
  }
  function question() {
    const lv = Store.doneCount() >= 20 ? ['A2', 'B1'] : Store.doneCount() >= 8 ? ['A1', 'A2'] : ['A1'];
    const qs = (GL.talkQuestions || []).filter((q) => lv.includes(q[0]));
    return qs.length ? qs[Math.floor(Math.random() * qs.length)] : ['A1', 'Was machst du gern in deiner Freizeit?', 'What do you like doing in your free time?', 'Ich lese gern und ich koche gern.'];
  }

  GL.viewDaily = function () {
    const g = (Store.state.game = Store.state.game || {});
    return {
      html: `<section class="dm-hero"><div><span class="xm-pill">⚡ DAILY MIX</span><h1>15 minutes. Everything a little.</h1><p>Words, listening, speaking, grammar, a mistake hunt and a short text – a new mix every day from your course material.</p></div><div class="dm-art" aria-hidden="true">${GL.charSVG('bruno', 'idle waving')}<span class="dm-bolt">⚡</span></div></section>
        <div class="dm-steps" id="dmSteps">${STEPS.map(([ic, t], i) => `<div class="dm-step" data-i="${i}"><span>${ic}</span><small>${t}</small></div>`).join('')}<span class="dm-track"><i id="dmBar"></i></span></div>
        <div class="card dm-card" id="dmCard"><div class="dm-start">${g.mix === GL.todayStr() ? '<p class="dm-doneb">✅ You already did today’s mix – another round still gives XP!</p>' : ''}<button class="btn gold big" id="dmGo" type="button">▶ Start today’s mix</button><p class="muted">≈ 15 minutes · 🔊 sound on · 🎤 microphone helps</p></div></div>`,
      mount() {
        const card = $('#dmCard');
        let step = -1, score = 0, max = 0;
        const mark = () => { $$('.dm-step').forEach((el, i) => { el.classList.toggle('on', i === step); el.classList.toggle('done', i < step); }); $('#dmBar').style.width = Math.round((Math.max(0, step) / STEPS.length) * 100) + '%'; };
        const next = () => { step++; mark(); card.classList.remove('dm-in'); void card.offsetWidth; card.classList.add('dm-in'); [stepWords, stepListen, stepSpeak, stepGrammar, stepHunt, stepWrite, finish][step](); };
        const nextBtn = (label = 'Weiter →') => `<div class="row dm-nav"><span class="spacer"></span><button class="btn green" id="dmNext" type="button">${label}</button></div>`;
        const wireNext = () => { const b = $('#dmNext'); if (b) { b.onclick = next; b.focus(); } };

        function stepWords() {
          const ws = words(); let i = 0;
          const show = () => {
            if (i >= ws.length) { next(); return; }
            const w = ws[i];
            card.innerHTML = `<h2>🔤 Words <small class="muted">${i + 1}/${ws.length}</small></h2><div class="dm-flip" id="dmFlip"><div class="dm-face f"><b>${esc(w.de)}</b><small>Do you know it? Tap to check.</small></div><div class="dm-face b"><b>${esc(w.en)}</b><small>${esc(w.de)}</small></div></div>
              <div class="row dm-nav hidden" id="dmRate"><button class="btn ghost" data-k="0" type="button">😕 Not yet</button><button class="btn green" data-k="1" type="button">😀 I knew it</button></div>`;
            Speech.speak(w.de);
            $('#dmFlip').onclick = () => { $('#dmFlip').classList.add('flip'); $('#dmRate').classList.remove('hidden'); };
            $$('#dmRate button').forEach((b) => (b.onclick = () => { max++; if (b.dataset.k === '1') { score++; Store.addXP(1); } if (GL.Game) GL.Game.count('cards', 1); i++; show(); }));
          };
          show();
        }
        function stepListen() {
          const modes = pick(['num', 'price', 'time', 'date', 'spell', 'phone'], 3); let i = 0;
          const show = () => {
            if (i >= modes.length) { next(); return; }
            const M = GL.Listen.MODES[modes[i]], q = M.gen();
            card.innerHTML = `<h2>🎧 Listen <small class="muted">${i + 1}/3 · ${M.ico} ${M.title}</small></h2><div class="ls-player"><button class="btn big ls-play" type="button">🔊 Listen</button><button class="btn ghost ls-slow" type="button">🐢 Slowly</button></div>
              <div class="ls-in"><input class="txt-in" id="dmIn" placeholder="${attr(M.ph)}" autocomplete="off"><button class="btn green" id="dmChk" type="button">Check</button></div><div id="dmFb"></div>`;
            const say = (slow) => Speech.speak(q.say, { slow }); setTimeout(() => say(false), 300);
            $('.ls-play', card).onclick = () => say(false); $('.ls-slow', card).onclick = () => say(true);
            const chk = () => {
              const v = $('#dmIn').value.trim(); if (!v) return; const ok = GL.Listen.okAns(q, v); max++; if (ok) { score++; Store.addXP(2); GL.Game && GL.Game.burst($('#dmIn')); }
              if (GL.Game) GL.Game.count('listen', 1); GL.sfx(ok ? 'ok' : 'bad');
              $('#dmFb').innerHTML = `<div class="ls-res ${ok ? 'ok' : 'bad'}">${ok ? '✅ Richtig!' : `❌ <b>${esc(q.show)}</b>`} <span class="muted">„${esc(q.say)}“</span></div>${nextBtn()}`;
              $('#dmIn').disabled = true; $('#dmChk').disabled = true; $('#dmNext').onclick = () => { i++; show(); }; $('#dmNext').focus();
            };
            $('#dmChk').onclick = chk; $('#dmIn').onkeydown = (e) => { if (e.key === 'Enter') chk(); }; $('#dmIn').focus();
          };
          show();
        }
        function stepSpeak() {
          const pool = pick(GL.Speak.translatePool('mine'), 3); let i = 0;
          const show = () => {
            if (i >= pool.length) { next(); return; }
            const it = pool[i];
            card.innerHTML = `<h2>🗣️ Speak <small class="muted">${i + 1}/${pool.length}</small></h2><p class="dm-prompt">🇬🇧 ${esc(it.en)}</p><div id="dmSp"></div>${nextBtn(i + 1 < pool.length ? 'Next sentence →' : 'Weiter →')}`;
            GL.Speak.attempt($('#dmSp'), { targets: it.a, wrong: it.wrong, hideTarget: true, label: 'Say it in German:', pass: 70, onResult: (r) => { max++; if (r.ok) score++; } });
            $('#dmNext').onclick = () => { i++; show(); };
          };
          show();
        }
        function stepGrammar() {
          const qs = grammarQs(); let i = 0;
          const show = () => {
            if (i >= qs.length) { next(); return; }
            const e = qs[i], order = GL.shuffle(e.o.map((_, j) => j));
            card.innerHTML = `<h2>🧩 Grammar <small class="muted">${i + 1}/${qs.length}</small></h2><p class="dm-q">${e.q}</p><div class="xm-opts">${order.map((j, pos) => `<label class="xm-opt"><input type="radio" name="dmq" value="${j}"><span class="xm-ol">${String.fromCharCode(97 + pos)}</span><span>${e.o[j]}</span></label>`).join('')}</div><div id="dmFb"></div>`;
            $$('input[name="dmq"]', card).forEach((inp) => (inp.onchange = () => {
              const ok = +inp.value === e.a; max++; if (ok) { score++; Store.addXP(2); } GL.sfx(ok ? 'ok' : 'bad');
              $$('.xm-opt', card).forEach((l) => { const j = +$('input', l).value; l.classList.toggle('right', j === e.a); l.classList.toggle('wrong', j === +inp.value && !ok); $('input', l).disabled = true; });
              $('#dmFb').innerHTML = `${e.ex ? `<p class="muted">💡 ${e.ex}</p>` : ''}${nextBtn()}`; $('#dmNext').onclick = () => { i++; show(); }; $('#dmNext').focus();
            }));
          };
          show();
        }
        function stepHunt() {
          const h = GL.Checker && GL.Checker.hunt(maxDay());
          if (!h) { next(); return; }
          card.innerHTML = `<h2>🕵️ Mistake hunt</h2><p class="muted">One typical mistake is hidden in this sentence. Fix it!</p><p class="ck-wrong">${esc(h.wrong)}</p><textarea class="txt-in ck-fix" id="dmFix" rows="2" spellcheck="false">${esc(h.wrong)}</textarea><div class="row"><button class="btn green" id="dmChk" type="button">Check</button><button class="btn ghost" id="dmHint" type="button">💡 Hint</button></div><div id="dmFb"></div>`;
          const norm = (s) => s.replace(/\s+/g, ' ').replace(/\s+([,.!?])/g, '$1').trim();
          $('#dmHint').onclick = () => { $('#dmFb').innerHTML = `<p class="ck-hint">💡 ${esc(h.rule)}</p>`; };
          $('#dmChk').onclick = () => {
            const ok = norm($('#dmFix').value) === norm(h.right); max++; if (ok) { score++; Store.addXP(3); GL.Game && GL.Game.burst($('#dmChk')); } GL.sfx(ok ? 'ok' : 'bad');
            $('#dmFb').innerHTML = `<div class="ck-res ${ok ? 'ok' : 'bad'}"><b>${ok ? '✅ Gut gefunden!' : '❌ The correct sentence:'}</b><p class="ck-diff">${GL.Writing.diffHTML(h.wrong, h.right)}</p><small><b>${esc(h.rule)}:</b> ${esc(h.ex)}</small></div>${nextBtn()}`;
            $('#dmChk').disabled = true; wireNext();
          };
        }
        function stepWrite() {
          const q = question();
          card.innerHTML = `<h2>✍️ Write</h2><p class="dm-q"><button class="say-btn" type="button" data-say="${attr(q[1])}">🔊</button> <b>${esc(q[1])}</b><br><small class="muted">${esc(q[2])} – answer in 2–3 sentences.</small></p>
            <textarea class="txt-in" id="dmTxt" rows="4" spellcheck="false" placeholder="Schreib hier …"></textarea>
            <div class="umlauts" id="dmUml">${['ä', 'ö', 'ü', 'ß'].map((c) => `<button type="button" class="btn tiny ghost" data-c="${c}">${c}</button>`).join('')}</div>
            <div class="row"><button class="btn green" id="dmChk" type="button">✅ Check my text</button><button class="btn ghost" id="dmSkip" type="button">⏭ Skip</button></div><div id="dmFb"></div>`;
          const ta = $('#dmTxt'); ta.focus();
          $('#dmUml').onclick = (e) => { const b = e.target.closest('[data-c]'); if (!b) return; const s0 = ta.selectionStart; ta.value = ta.value.slice(0, s0) + b.dataset.c + ta.value.slice(ta.selectionEnd); ta.focus(); ta.selectionStart = ta.selectionEnd = s0 + 1; };
          $('#dmSkip').onclick = next;
          $('#dmChk').onclick = () => {
            const txt = ta.value.trim(); if (txt.split(/\s+/).length < 4) { $('#dmFb').innerHTML = '<p class="muted">Write at least one full sentence (4+ words).</p>'; return; }
            const r = GL.Checker.analyze(txt, { level: q[0], count: 15 });
            max++; if (!r.mistakes.length) score++;
            Store.addXP(r.mistakes.length ? 4 : 6); if (GL.Game) GL.Game.count('write', txt.split(/\s+/).length);
            $('#dmFb').innerHTML = `<div class="ck-res ${r.mistakes.length ? 'bad' : 'ok'}"><b>${r.mistakes.length ? `✏️ ${r.mistakes.length} thing${r.mistakes.length > 1 ? 's' : ''} to improve` : '✅ No typical mistakes – sehr gut!'}</b>
              ${r.mistakes.length ? `<div class="wr-pane">${GL.Writing.markedHTML(txt, r.mistakes)}</div><ol class="wr-mlist">${r.mistakes.map((m) => `<li><b>${esc(m.rule)}</b>: <span class="m-wrong">${esc(m.wrong)}</span>${m.right ? ` → <span class="m-right">${esc(m.right)}</span>` : ''}</li>`).join('')}</ol><p><b>Corrected:</b> ${esc(r.corrected)}</p>` : ''}
              <p class="muted">💬 Example answer: ${esc(q[3])}</p></div>${nextBtn('Finish ✓')}`;
            $('#dmChk').disabled = true; wireNext();
          };
        }
        function finish() {
          const pct = max ? Math.round((score / max) * 100) : 100;
          const g2 = (Store.state.game = Store.state.game || {}); const first = g2.mix !== GL.todayStr(); g2.mix = GL.todayStr(); g2.mixN = (g2.mixN || 0) + 1;
          Store.addXP(first ? 20 : 8);
          card.innerHTML = `<div class="dm-end"><div class="dm-trophy">🏆</div><h2>Daily mix complete!</h2><p><b>${score} / ${max}</b> right (${pct}%) · ${first ? '+20 XP bonus' : '+8 XP'}</p>
            <div class="row" style="justify-content:center"><a class="btn green" href="#/">🏠 Home</a><a class="btn ghost" href="#/rewards">🏆 Rewards</a><button class="btn ghost" id="dmAgain" type="button">🔁 Another mix</button></div></div>`;
          $('#dmAgain').onclick = () => GL.render();
          GL.confetti(140); GL.sfx('done');
          GL.track && GL.track('daily', `Daily mix: ${pct}%`);
        }
        $('#dmGo').onclick = next;
      },
    };
  };
})();
