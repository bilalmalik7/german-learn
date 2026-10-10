/* Speaking practice: strict pronunciation & grammar scoring, record-and-compare fallback,
   daily workout, shadowing, "say it in German", question drill and AI conversations. */
(function () {
  'use strict';
  const { $, $$, esc, attr, shuffle, Store, Speech, Rec, AI, fold } = GL;

  const GOAL = 30; // sentences per day
  const st = () => {
    const s = (Store.state.speak = Store.state.speak || {});
    s.days = s.days || {}; s.n = s.n || 0; s.sum = s.sum || 0; s.weak = s.weak || {};
    return s;
  };

  /* ---------- scoring ---------- */
  const lev = (a, b) => {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  };
  const NUM = { null: '0', eins: '1', ein: '1', zwei: '2', drei: '3', vier: '4', fünf: '5', sechs: '6', sieben: '7', acht: '8', neun: '9', zehn: '10', elf: '11', zwölf: '12', zwanzig: '20', dreißig: '30', hundert: '100' };
  const numFold = (w) => { for (const [k, v] of Object.entries(NUM)) if (fold(k) === w) return v; return w; };
  /* Word alignment between the target sentence and what was heard. Strict: short words (articles,
     endings) must match exactly, so „einem“ instead of „einen“ counts as a mistake. */
  function score(target, heard) {
    const orig = String(target).split(/\s+/).filter(Boolean);
    const t = orig.map((w) => fold(w).replace(/\s/g, '')), h = fold(heard).split(' ').filter(Boolean);
    const m = t.length, n = h.length;
    const same = (a, b) => a === b || numFold(a) === numFold(b) || (a.length >= 8 && lev(a, b) <= 1) || (a.length >= 12 && lev(a, b) <= 2);
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) dp[i][j] = same(t[i], h[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    const words = orig.map((w) => ({ w, hit: false }));
    const subs = [], extra = [];
    let i = 0, j = 0, gapT = [], gapH = [];
    const flush = () => {
      for (let k = 0; k < Math.max(gapT.length, gapH.length); k++) {
        if (gapT[k] != null && gapH[k] != null) subs.push({ want: orig[gapT[k]], said: h[gapH[k]] });
        else if (gapH[k] != null) extra.push(h[gapH[k]]);
      }
      gapT = []; gapH = [];
    };
    while (i < m || j < n) {
      if (i < m && j < n && same(t[i], h[j])) { flush(); words[i].hit = true; i++; j++; }
      else if (j >= n || (i < m && dp[i + 1][j] >= dp[i][j + 1])) gapT.push(i++);
      else gapH.push(j++);
    }
    flush();
    const hits = words.filter((w) => w.hit).length;
    const pen = Math.min(extra.length, 3) * 4;
    return { score: m ? Math.max(0, Math.round((hits / m) * 100) - pen) : 0, words, subs, extra };
  }
  function best(targets, alts) {
    let b = null;
    targets.forEach((t) => alts.forEach((a) => { const s = score(t, a); if (!b || s.score > b.s.score) b = { s, target: t, heard: a }; }));
    return b;
  }

  /* ---------- pronunciation tips for missed words ---------- */
  const TIPS = [
    [/ü/i, 'ü – say “ee” and round your lips like for “oo”.'],
    [/ö/i, 'ö – say “e” (as in “bed”) with rounded lips.'],
    [/(a|o|u|au)ch/i, 'ch after a, o, u, au – a rough sound at the back of the throat (Bach, Buch).'],
    [/ch/i, 'ch after e, i, ä, ö, ü – a soft hiss like the “h” in “huge” (ich, nicht).'],
    [/ig\b/i, '-ig at the end sounds like -ich: richtig = „richtich“.'],
    [/z/i, 'z is always “ts”: Zeit = „tsait“.'],
    [/ei/i, 'ei sounds like English “eye”: mein, drei.'],
    [/ie/i, 'ie sounds like a long “ee”: Liebe, vier.'],
    [/eu|äu/i, 'eu / äu sound like “oy”: heute, Häuser.'],
    [/^w/i, 'w is pronounced like English “v”: Wasser = „vasser“.'],
    [/^v/i, 'v is usually like “f”: Vater, viel.'],
    [/^s[pt]/i, 'sp / st at the start of a word = „schp / scht“: Sport, Straße.'],
    [/^s[aeiouäöü]/i, 's before a vowel is voiced, like English “z”: Sonne, sieben.'],
    [/r/i, 'German r is a soft gargle at the back of the mouth; at the end of a word it is almost “a”: Lehrer.'],
    [/h[aeiouäöü]/i, 'h before a vowel is always pronounced: Hallo, haben.'],
  ];
  function tipsFor(words) {
    const out = [];
    words.forEach((w) => { const x = w.replace(/[^\p{L}]/gu, ''); const t = TIPS.find(([re]) => re.test(x)); if (t && !out.includes(t[1])) out.push(t[1]); });
    return out.slice(0, 2);
  }

  /* ---------- stats ---------- */
  function log(sc, sentence) {
    const s = st(), d = GL.todayStr();
    s.days[d] = (s.days[d] || 0) + 1; s.n++; s.sum += sc;
    const keys = Object.keys(s.days).sort();
    if (keys.length > 120) delete s.days[keys[0]];
    Store.save();
    if (s.days[d] === GOAL) { GL.toast(`🎉 Daily speaking goal reached: ${GOAL} sentences!`, 'ok'); GL.confetti(90); GL.sfx('done'); }
    return sentence;
  }
  function addWeak(words) {
    const s = st();
    words.forEach((w) => { const k = w.replace(/[^\p{L}-]/gu, ''); if (k.length > 2) s.weak[k] = (s.weak[k] || 0) + 1; });
    const ks = Object.keys(s.weak);
    if (ks.length > 80) ks.sort((a, b) => s.weak[a] - s.weak[b]).slice(0, ks.length - 80).forEach((k) => delete s.weak[k]);
  }
  function streak() {
    const s = st(); let n = 0;
    for (let i = 0; i < 400; i++) { const d = GL.todayStr(new Date(Date.now() - i * 864e5)); if (s.days[d]) n++; else if (i > 0) break; }
    return n;
  }
  const today = () => st().days[GL.todayStr()] || 0;
  const avg = () => (st().n ? Math.round(st().sum / st().n) : null);

  /* ---------- result rendering ---------- */
  function resultHTML(b, opts = {}) {
    const s = b.s, sc = s.score;
    const cls = sc >= 85 ? '' : sc >= 60 ? 'mid' : 'low';
    const msg = sc >= 95 ? 'Perfekt!' : sc >= 85 ? 'Sehr gut!' : sc >= 60 ? 'Fast! Try once more.' : 'Listen again and repeat slowly.';
    const missed = s.words.filter((w) => !w.hit).map((w) => w.w);
    // pronunciation tips only for words that were missed or said almost right (not for a different word)
    const far = new Set(s.subs.filter((x) => lev(fold(x.want), fold(x.said)) > 2).map((x) => x.want));
    const tips = tipsFor(missed.filter((w) => !far.has(w)));
    return `<div class="heard sp-heard"><div class="row"><span class="score-badge ${cls}">${sc}%</span><b>${msg}</b></div>
      <p class="sp-words">${s.words.map((w) => (w.hit ? `<span class="w-ok">${esc(w.w)}</span>` : `<button class="w-miss say-word" data-say="${attr(w.w.replace(/[.,!?;:„“"]/g, ''))}" data-slow title="Listen slowly">${esc(w.w)}</button>`)).join(' ')}</p>
      ${s.subs.length ? `<div class="sp-subs">${s.subs.slice(0, 4).map((x) => `<span>You said <span class="m-wrong">${esc(x.said)}</span> → <span class="m-right">${esc(x.want)}</span></span>`).join('')}</div>` : ''}
      <small class="muted">I heard: “${esc(b.heard)}”${opts.target && opts.showTarget ? ` · Correct: „${esc(b.target)}“` : ''}</small>
      ${tips.length && sc < 95 ? `<ul class="sp-tips">${tips.map((t) => `<li>💡 ${esc(t)}</li>`).join('')}</ul>` : ''}</div>`;
  }

  /* ---------- the attempt widget ---------- */
  const FATAL = /not-allowed|service-not-allowed|unsupported|audio-capture/;
  const Speak = { micBlocked: false, recBlocked: false };

  /* cfg: targets[], wrong[] (distractors), char, label, pass (default 85), hideTarget, onResult({ok, score, said, matchedWrong}) */
  function attempt(box, cfg) {
    const targets = cfg.targets.filter(Boolean);
    const pass = cfg.pass || 85;
    const canRec = Rec.supported && !Speak.micBlocked;
    const canRecord = !!(navigator.mediaDevices && window.MediaRecorder) && !Speak.recBlocked;
    box.innerHTML = `<div class="sp-att">
      ${cfg.label ? `<div class="sp-label">${esc(cfg.label)}</div>` : ''}
      <div class="row sp-btns">
        ${cfg.noListen ? '' : `<button class="btn small ghost sp-play" type="button">🔊 Listen</button><button class="btn small ghost sp-slow" type="button">🐢 Slow</button>`}
        ${canRec ? '<button class="btn small rec sp-mic" type="button">🎤 Speak</button>' : ''}
        ${!canRec && canRecord ? '<button class="btn small rec sp-recd" type="button">⏺ Record yourself</button>' : ''}
        ${!canRec ? '<button class="btn small ghost sp-self" type="button">✔ I said it</button>' : ''}
      </div>
      ${!canRec ? `<p class="muted sp-note">${Rec.supported ? 'The microphone is blocked here, so' : 'This browser has no speech recognition (use Chrome or Edge for automatic scoring), so'} say it out loud${canRecord ? ', record yourself and compare with the model' : ''}, then mark it.</p>` : ''}
      <div class="sp-res"></div></div>`;
    const res = $('.sp-res', box);
    const sayT = (slow) => Speech.speak(targets[0], { char: cfg.char, slow });
    const play = $('.sp-play', box), slowB = $('.sp-slow', box);
    if (play) play.onclick = () => sayT(false);
    if (slowB) slowB.onclick = () => sayT(true);
    let tries = 0;
    const finish = (r) => { cfg.onResult && cfg.onResult(r); };

    const mic = $('.sp-mic', box);
    if (mic) mic.onclick = async () => {
      if (mic.classList.contains('listening')) { Rec.stop(); return; }
      Speech.stop();
      mic.classList.add('listening'); mic.textContent = '👂 Listening…';
      try {
        const alts = await Rec.listen();
        tries++;
        const b = best(targets, alts);
        let wrongHit = null;
        if (cfg.wrong && cfg.wrong.length) {
          const w = best(cfg.wrong, alts);
          if (w && w.s.score > b.s.score && w.s.score >= 70) wrongHit = w;
        }
        const ok = !wrongHit && b.s.score >= pass;
        log(b.s.score, b.target);
        if (!ok) addWeak(b.s.words.filter((w) => !w.hit).map((w) => w.w));
        res.innerHTML = wrongHit
          ? `<div class="heard sp-heard"><div class="row"><span class="score-badge low">✘</span><b>That’s one of the wrong forms.</b></div><small class="muted">I heard: “${esc(wrongHit.heard)}”</small>${cfg.wrongHint ? `<p class="muted" style="margin:6px 0 0">💡 ${cfg.wrongHint}</p>` : ''}</div>`
          : resultHTML(b, { showTarget: cfg.hideTarget && tries >= 1, target: true });
        GL.sfx(ok ? 'ok' : 'bad');
        if (ok) Store.addXP(b.s.score >= 95 ? 3 : 2);
        finish({ ok, score: wrongHit ? 0 : b.s.score, said: b.heard, matchedWrong: wrongHit && wrongHit.target, tries });
      } catch (e) {
        const m = e && e.message;
        res.innerHTML = `<p class="muted">${GL.Dialogue.micError(e)}</p>`;
        if (FATAL.test(m)) { Speak.micBlocked = true; if (cfg.onBlocked) { cfg.onBlocked(e); return; } attempt(box, cfg); $('.sp-res', box).innerHTML = `<p class="muted">${GL.Dialogue.micError(e)}</p>`; return; }
      }
      mic.classList.remove('listening'); mic.textContent = '🎤 Try again';
    };

    const recd = $('.sp-recd', box);
    if (recd) recd.onclick = async () => {
      if (recd._rec) { recd._rec.stop(); return; }
      let stream;
      try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
      catch (e) { Speak.recBlocked = true; recd.remove(); res.innerHTML = '<p class="muted">The microphone is not available here. Say it out loud and press ✔ when you’re happy.</p>'; return; }
      const chunks = []; const rec = new MediaRecorder(stream);
      recd._rec = rec; recd.textContent = '⏹ Stop'; recd.classList.add('listening');
      const auto = setTimeout(() => rec.state === 'recording' && rec.stop(), 12000);
      rec.ondataavailable = (e) => chunks.push(e.data);
      rec.onstop = async () => {
        clearTimeout(auto); stream.getTracks().forEach((t) => t.stop());
        recd._rec = null; recd.textContent = '⏺ Record again'; recd.classList.remove('listening');
        const url = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/webm' }));
        res.innerHTML = `<div class="heard sp-heard"><b>Compare:</b> listen to the model, then to yourself.
          <div class="row" style="margin-top:6px"><button class="btn tiny ghost sp-cmp-m">🔊 Model</button><button class="btn tiny ghost sp-cmp-y">▶ You</button><button class="btn tiny ghost sp-cmp-b">🔁 Both</button></div>
          ${cfg.hideTarget ? `<p style="margin:6px 0 0">Correct: <b>„${esc(targets[0])}“</b></p>` : ''}
          <div class="row" style="margin-top:8px"><span class="muted">How was it?</span><button class="btn tiny green sp-rate" data-r="95">😀 Same</button><button class="btn tiny ghost sp-rate" data-r="75">🙂 Close</button><button class="btn tiny ghost sp-rate" data-r="45">😕 Not yet</button></div></div>`;
        const audio = new Audio(url);
        const you = () => new Promise((r) => { audio.currentTime = 0; audio.onended = r; audio.play().catch(r); });
        $('.sp-cmp-m', res).onclick = () => sayT(false);
        $('.sp-cmp-y', res).onclick = () => you();
        $('.sp-cmp-b', res).onclick = async () => { await sayT(false); await you(); };
        $$('.sp-rate', res).forEach((b) => (b.onclick = () => { const r = +b.dataset.r; log(r, targets[0]); $$('.sp-rate', res).forEach((x) => (x.disabled = true)); finish({ ok: r >= 75, score: r, self: true }); }));
        audio.play().catch(() => {});
      };
      rec.start();
    };

    const self = $('.sp-self', box);
    if (self) self.onclick = () => {
      if (cfg.hideTarget && !self.dataset.shown) {
        self.dataset.shown = '1';
        res.innerHTML = `<div class="heard sp-heard">Correct: <b>„${esc(targets[0])}“</b> <button class="btn tiny ghost" data-say="${attr(targets[0])}">🔊</button>
          <div class="row" style="margin-top:8px"><span class="muted">Did you say it like that?</span><button class="btn tiny green sp-rate" data-r="95">✔ Yes</button><button class="btn tiny ghost sp-rate" data-r="50">✘ Not quite</button></div></div>`;
        $$('.sp-rate', res).forEach((b) => (b.onclick = () => { const r = +b.dataset.r; log(r, targets[0]); $$('.sp-rate', res).forEach((x) => (x.disabled = true)); finish({ ok: r >= 75, score: r, self: true }); }));
        return;
      }
      log(90, targets[0]); self.disabled = true; self.textContent = '✔ Done';
      finish({ ok: true, score: 90, self: true });
    };
    return box;
  }

  /* ---------- content pools ---------- */
  const maxDay = () => (Store.state.settings.unlockAll ? 30 : Math.max(1, Math.min(30, Store.nextDay())));
  function translatePool(scope) {
    const out = [];
    if (scope !== 'scenes') {
      GL.days.forEach((d) => {
        const wk = d.day <= 7 ? 1 : d.day <= 14 ? 2 : d.day <= 21 ? 3 : 4;
        if (scope === 'mine' ? d.day > maxDay() : scope && scope.startsWith('w') ? wk !== +scope.slice(1) : false) return;
        (d.exercises || []).forEach((e) => {
          if (e.t === 'tr') out.push({ en: e.en.replace(/^\d+\/\d+ – /, ''), a: [].concat(e.a), day: d.day, src: 'Day ' + d.day });
          else if (e.t === 'order') out.push({ en: e.en, a: [e.a].concat(e.alt || []), day: d.day, src: 'Day ' + d.day });
        });
      });
    }
    if (!scope || scope === 'scenes' || scope === 'mine') {
      GL.scenarios.forEach((s) => s.scenes.forEach((sc) => sc.steps.forEach((x) => {
        if (!Array.isArray(x) && x.choose) out.push({ en: x.prompt, a: [x.o[x.a]], wrong: x.o.filter((_, i) => i !== x.a), ex: x.ex, src: s.icon + ' ' + s.title });
      })));
    }
    return out;
  }
  const SOUNDS = [
    ['Fünf Bücher liegen auf der Tür.', 'ü'], ['Schöne Grüße aus Köln!', 'ö · ü'], ['Ich spreche ein bisschen Deutsch.', 'ich-Laut · sp'],
    ['Acht Nächte auf dem Dach.', 'ach-Laut · ich-Laut'], ['Zehn Ziegen ziehen zum Zoo.', 'z = ts'], ['Wir wohnen in Wien.', 'w = v'],
    ['Vier Vögel fliegen nach Frankreich.', 'v = f'], ['Der rote Reis ist richtig lecker.', 'r · -ig'], ['Die Biene fliegt, das Ei ist klein.', 'ie · ei'],
    ['Heute treffe ich neue Freunde.', 'eu'], ['Fischers Fritz fischt frische Fische.', 'sch · f'], ['Sport und Spiele auf der Straße.', 'sp · st'],
    ['Sieben Sonnen scheinen im Süden.', 's · ü'], ['Hanna hat heute Hunger.', 'h'], ['Der Lehrer und der Bäcker wohnen hier.', '-er · ä'],
  ];
  function lessonSentences(day) {
    const d = GL.days[day - 1]; if (!d) return [];
    const out = (d.speaking || []).map((x) => ({ de: x[0], en: x[1], char: d.host || 'lena' }));
    (d.dialogues || (d.dialogue ? [d.dialogue] : [])).forEach((dl) => dl.lines.forEach((l) => out.push({ de: GL.stripTags(l[1]), en: l[2], char: l[0] })));
    return out.filter((x) => x.de && x.de.split(' ').length <= 16);
  }

  /* ---------- views ---------- */
  function statsHTML() {
    const t = today(), a = avg();
    return `<div class="stats sp-stats">
      <div class="stat"><span class="s-ico">🗣️</span><div><b>${t} / ${GOAL}</b><span>sentences today</span><div class="sp-goal"><i style="width:${Math.min(100, (t / GOAL) * 100)}%"></i></div></div></div>
      <div class="stat"><span class="s-ico">🎯</span><div><b>${a == null ? '–' : a + '%'}</b><span>average accuracy</span></div></div>
      <div class="stat"><span class="s-ico">🔥</span><div><b>${streak()}</b><span>speaking day streak</span></div></div>
      <div class="stat"><span class="s-ico">🎤</span><div><b>${st().n}</b><span>sentences spoken</span></div></div></div>`;
  }
  const TABS = [['', '🎯 Daily workout'], ['shadow', '🔁 Shadowing'], ['translate', '🔤 Say it in German'], ['questions', '❓ Answer questions'], ['ai', '🤖 Conversations']];
  function shell(active, body) {
    return `<h1>🎤 Sprechen – Speak</h1>
      <p class="muted">Speaking is a skill you train like a sport: short, daily, out loud. Every sentence is checked word by word – wrong endings too (einen ≠ einem).</p>
      ${statsHTML()}
      <div class="chips sp-tabs tabs-row">${TABS.map(([k, l]) => `<a class="chip ${active === k ? 'on' : ''}" href="#/talk${k ? '/' + k : ''}">${l}</a>`).join('')}</div>
      ${!Rec.supported ? '<div class="note">🎙️ Automatic speech scoring needs Chrome or Edge. Here you can record yourself and compare with the model, or say each sentence out loud and mark it.</div>' : ''}
      ${body}`;
  }

  /* Daily workout: 10 short steps, about 10 minutes. */
  function workout() {
    const day = maxDay();
    const lesson = shuffle(lessonSentences(day).concat(day > 1 ? lessonSentences(day - 1) : [])).slice(0, 2);
    const tr = shuffle(translatePool('mine').filter((x) => !x.day || x.day >= day - 6)).slice(0, 3);
    const scn = shuffle(translatePool('scenes')).slice(0, 2);
    const snd = shuffle(SOUNDS)[0];
    const qs = shuffle(GL.talkQuestions.filter((q) => q[0] === (day <= 14 ? 'A1' : day <= 21 ? 'A2' : 'B1'))).slice(0, 2);
    const steps = [
      { kind: 'Warm-up: sounds', icon: '👄', de: snd[0], hint: 'Focus: ' + snd[1], targets: [snd[0]] },
      ...lesson.map((x) => ({ kind: 'Shadowing – Day ' + day, icon: '🔁', de: x.de, en: x.en, char: x.char, targets: [x.de] })),
      ...tr.map((x) => ({ kind: 'Say it in German', icon: '🔤', en: x.en, targets: x.a, hide: true, src: x.src })),
      ...scn.map((x) => ({ kind: 'Real life', icon: '🎬', en: x.en, targets: x.a, wrong: x.wrong, hide: true, ex: x.ex, src: x.src })),
      ...qs.map((q) => ({ kind: 'Answer the question', icon: '❓', q: q[1], qen: q[2], model: q[3], targets: [q[3]] })),
    ];
    const results = [];
    let i = 0;
    return {
      html: shell('', `<div class="card sp-workout"><div class="row"><h2 style="margin:0">🎯 Today’s 10-minute workout</h2><span class="spacer"></span><span class="pill" id="wkPos"></span></div>
        <div class="sp-dots" id="wkDots">${steps.map(() => '<span></span>').join('')}</div><div id="wkStep"></div></div>`),
      mount() {
        const root = $('#wkStep');
        const draw = () => {
          $$('#wkDots span').forEach((d, k) => (d.className = k < i ? (results[k] && results[k].ok ? 'ok' : 'bad') : k === i ? 'now' : ''));
          if (i >= steps.length) return summary();
          $('#wkPos').textContent = `${i + 1} / ${steps.length}`;
          const s = steps[i];
          root.innerHTML = `<div class="sp-kind">${s.icon} ${esc(s.kind)}${s.src ? ` <small class="muted">· ${esc(s.src)}</small>` : ''}</div>
            ${s.q ? GL.charBubble(['lena', 'max', 'sofia'][i % 3], esc(s.q), esc(s.qen), {}) + '<p class="muted">Answer in a full sentence about yourself. Then say the model answer below.</p><div class="sp-free"></div>'
              : s.hide ? `<p class="sp-prompt">🇬🇧 ${esc(s.en)}</p><p class="muted">Say it in German – then check.</p>`
              : `<p class="sp-target">${esc(s.de)}</p>${s.en ? `<p class="muted" style="margin-top:-6px">${esc(s.en)}</p>` : ''}${s.hint ? `<p class="muted">${esc(s.hint)}</p>` : ''}`}
            <div class="sp-slot"></div>
            <div class="row" style="margin-top:12px"><button class="btn ghost small" id="wkSkip">Skip</button><span class="spacer"></span><button class="btn hidden" id="wkNext">Next ➜</button></div>`;
          if (s.q) setTimeout(() => { const svg = $('.char-bubble svg', root); svg && GL.charSay(svg, s.q, ['lena', 'max', 'sofia'][i % 3]); }, 200);
          if (s.q) {
            const free = $('.sp-free', root);
            if (Rec.supported && !Speak.micBlocked) {
              free.innerHTML = '<div class="row"><button class="btn small rec" id="wkFree">🎤 Answer</button><span class="muted" id="wkHeard"></span></div><div id="wkAi"></div>';
              $('#wkFree', root).onclick = async (ev) => {
                const b = ev.currentTarget; b.classList.add('listening'); b.textContent = '👂 Listening…';
                try {
                  const alts = await Rec.listen(); const said = alts[0];
                  $('#wkHeard', root).textContent = '„' + said + '“'; log(80, said);
                  AI.get().then((sample) => { if (!sample || !$('#wkAi', root)) return; GL.Tutor.mountCorrector($('#wkAi', root), () => said, { task: s.q, taskEn: s.qen, level: 'A2' }); });
                } catch (e) { $('#wkHeard', root).textContent = GL.Dialogue.micError(e); }
                b.classList.remove('listening'); b.textContent = '🎤 Answer again';
              };
            }
          }
          const next = $('#wkNext', root);
          attempt($('.sp-slot', root), {
            targets: s.targets, wrong: s.wrong, char: s.char, hideTarget: s.hide, noListen: s.hide,
            label: s.q ? 'Model answer: „' + s.model + '“' : '', wrongHint: s.ex,
            onResult: (r) => {
              results[i] = r; next.classList.remove('hidden');
              if (s.hide && !r.self) { const res = $('.sp-res', root); res.insertAdjacentHTML('beforeend', `<p class="sp-answer">✅ <b>${esc(s.targets[0])}</b> <button class="btn tiny ghost" data-say="${attr(s.targets[0])}">🔊</button>${s.ex && !r.ok ? `<br><small class="muted">${s.ex}</small>` : ''}</p>`); }
              if (r.ok && !r.self) setTimeout(() => { if (results[i] === r && root.isConnected && steps[i] === s) { i++; draw(); } }, 1800);
            },
          });
          if (s.hide) {
            const slot = $('.sp-slot', root);
            slot.insertAdjacentHTML('beforeend', '<button class="btn tiny ghost sp-reveal">👀 Show answer</button>');
            $('.sp-reveal', slot).onclick = (e) => { e.target.outerHTML = `<p class="sp-answer">„${esc(s.targets[0])}“ <button class="btn tiny ghost" data-say="${attr(s.targets[0])}">🔊</button></p>`; };
          } else if (!s.q) setTimeout(() => Speech.speak(s.de, { char: s.char }), 300);
          $('#wkSkip', root).onclick = () => { results[i] = results[i] || { ok: false, skipped: true }; i++; draw(); };
          next.onclick = () => { i++; draw(); };
        };
        const summary = () => {
          $('#wkPos').textContent = 'Fertig!';
          const done = results.filter((r) => r && !r.skipped);
          const sc = done.length ? Math.round(done.reduce((a, r) => a + (r.score || 0), 0) / done.length) : 0;
          const s = st(); s.workouts = s.workouts || {}; s.workouts[GL.todayStr()] = Math.max(s.workouts[GL.todayStr()] || 0, sc);
          GL.track && GL.track('speak', `Speaking workout: ${sc}% (${done.length} of ${steps.length} exercises)`);
          Store.addXP(20); Store.save(); GL.sfx('done'); if (sc >= 80) GL.confetti();
          const weak = Object.entries(st().weak).sort((a, b) => b[1] - a[1]).slice(0, 8);
          root.innerHTML = `<div class="center">${GL.charSVG('bruno', 'happy waving')}<h2>🎉 Workout done!</h2>
            <p><span class="score-badge ${sc >= 85 ? '' : sc >= 60 ? 'mid' : 'low'}">${sc}%</span> average · ${done.length} of ${steps.length} exercises · +20 XP</p></div>
            ${weak.length ? `<h3>🔁 Your tricky words</h3><p class="muted">Click to hear them slowly, then repeat three times.</p><div class="sp-weak">${weak.map(([w]) => `<button class="chip" data-say="${attr(w)}" data-slow>${esc(w)}</button>`).join('')}</div>` : ''}
            <div class="row" style="justify-content:center;margin-top:14px"><a class="btn ghost" href="#/talk/shadow">🔁 More shadowing</a><button class="btn" id="wkAgain">🎯 New workout</button></div>`;
          $('#wkAgain', root).onclick = () => GL.render();
        };
        draw();
      },
    };
  }

  /* Shadowing: listen, repeat, compare – sentence by sentence. */
  function shadow() {
    const s = st();
    const src = s.shSrc || 'lesson';
    return {
      html: shell('shadow', `<div class="card"><h2 style="margin-top:0">🔁 Shadowing</h2>
        <p class="muted">Listen to a native speaker, then repeat right away with the same melody and speed. Turn the text off for “blind” shadowing once it gets easy.</p>
        <div class="row sp-src">
          <select class="txt-in" id="shSrc"><option value="lesson" ${src === 'lesson' ? 'selected' : ''}>📅 Lesson phrases & dialogues</option><option value="scene" ${src === 'scene' ? 'selected' : ''}>🎬 Real-life scenes</option><option value="story" ${src === 'story' ? 'selected' : ''}>📖 Stories</option><option value="sounds" ${src === 'sounds' ? 'selected' : ''}>👄 Tricky sounds</option></select>
          <select class="txt-in" id="shPick"></select>
          <label class="sp-toggle"><input type="checkbox" id="shBlind" ${s.blind ? 'checked' : ''}> Hide the text</label>
        </div>
        <div id="shRoot"></div></div>`),
      mount() {
        const pick = $('#shPick'), srcSel = $('#shSrc');
        const fillPick = () => {
          const v = srcSel.value;
          let opts = [];
          if (v === 'lesson') opts = GL.days.filter((d) => d.day <= maxDay()).map((d) => [d.day, `Day ${d.day}: ${d.title}`]);
          else if (v === 'scene') opts = GL.scenarios.map((x) => [x.id, `${x.icon} ${x.title}`]);
          else if (v === 'story') opts = GL.stories.map((x) => [x.id, `📖 ${x.title} (${x.level})`]);
          else opts = [['all', 'All sounds']];
          const cur = s['sh_' + v];
          pick.innerHTML = opts.map(([k, l]) => `<option value="${attr(k)}" ${String(cur) === String(k) ? 'selected' : ''}>${esc(l)}</option>`).join('');
          if (v === 'lesson' && cur == null) pick.value = String(maxDay());
        };
        const list = () => {
          const v = srcSel.value, k = pick.value;
          if (v === 'lesson') return lessonSentences(+k);
          if (v === 'scene') { const sc = GL.scenarios.find((x) => x.id === k); const out = []; sc.scenes.forEach((c) => c.steps.forEach((x) => { if (Array.isArray(x) && x[0] !== '_' && x[1].split(' ').length <= 18) out.push({ de: x[1], en: x[2], char: x[0] === 'alex' ? 'alex' : x[0] }); else if (!Array.isArray(x)) out.push({ de: x.o[x.a], en: x.prompt, char: 'alex' }); })); return out; }
          if (v === 'story') { const so = GL.stories.find((x) => x.id === k); return so.sentences.map((x) => ({ de: x[0], en: x[1], char: so.char })); }
          return SOUNDS.map((x) => ({ de: x[0], en: 'Focus: ' + x[1], char: 'bruno' }));
        };
        let items = [], i = 0;
        const root = $('#shRoot');
        const draw = () => {
          const it = items[i]; if (!it) { root.innerHTML = '<p class="muted">Nothing here yet.</p>'; return; }
          const blind = $('#shBlind').checked;
          const c = GL.chars[it.char] ? it.char : 'lena';
          root.innerHTML = `<div class="sp-shadow">
            <div class="sp-sh-char">${GL.charSVG(c, 'idle')}<small>${esc(GL.chars[c].name)}</small></div>
            <div style="flex:1;min-width:0"><div class="row"><span class="pill">${i + 1} / ${items.length}</span><span class="spacer"></span><button class="btn tiny ghost" id="shPrev" ${i ? '' : 'disabled'}>◀</button><button class="btn tiny ghost" id="shNext">▶</button></div>
              <p class="sp-target ${blind ? 'blurred' : ''}" id="shText" title="${blind ? 'Click to show' : ''}">${esc(it.de)}</p><p class="muted ${blind ? 'blurred' : ''}" style="margin-top:-6px">${esc(it.en || '')}</p>
              <div class="sp-slot"></div></div></div>`;
          const svg = $('.sp-sh-char svg', root);
          const say = (slow) => GL.charSay(svg, it.de, c, { slow });
          attempt($('.sp-slot', root), { targets: [it.de], char: c, onResult: (r) => { if (r.ok && !r.self) setTimeout(() => { if (items[i] === it && root.isConnected) { i = Math.min(items.length - 1, i + 1); draw(); } }, 1700); } });
          // use the animated character for the listen buttons
          const pb = $('.sp-play', root), sb = $('.sp-slow', root);
          if (pb) pb.onclick = () => say(false);
          if (sb) sb.onclick = () => say(true);
          $('#shText', root).onclick = (e) => e.currentTarget.classList.remove('blurred');
          $('#shPrev', root).onclick = () => { i = Math.max(0, i - 1); draw(); };
          $('#shNext', root).onclick = () => { i = (i + 1) % items.length; draw(); };
          setTimeout(() => root.isConnected && items[i] === it && say(false), 300);
        };
        const load = () => { s.shSrc = srcSel.value; s['sh_' + srcSel.value] = pick.value; Store.save(); items = list(); i = 0; draw(); };
        srcSel.onchange = () => { fillPick(); load(); };
        pick.onchange = load;
        $('#shBlind').onchange = (e) => { s.blind = e.target.checked; Store.save(); draw(); };
        fillPick(); load();
      },
    };
  }

  /* Say it in German: English prompt → speak the sentence → strict check. */
  function translate() {
    const s = st();
    const scope = s.trScope || 'mine';
    return {
      html: shell('translate', `<div class="card"><h2 style="margin-top:0">🔤 Say it in German</h2>
        <p class="muted">The fastest way to grammar that works when you speak: read the English, <b>say</b> the German sentence, and get every wrong word and ending marked.</p>
        <div class="chips tabs-row" id="trScope">${[['mine', 'Up to my day'], ['w1', 'Week 1'], ['w2', 'Week 2'], ['w3', 'Week 3'], ['w4', 'Week 4'], ['scenes', 'Real-life scenes']].map(([k, l]) => `<button class="chip ${scope === k ? 'on' : ''}" data-k="${k}">${l}</button>`).join('')}</div>
        <div id="trRoot" style="margin-top:14px"></div></div>`),
      mount() {
        const root = $('#trRoot');
        let pool = [], i = 0, right = 0, done = 0;
        const load = () => { pool = shuffle(translatePool(s.trScope || 'mine')); i = 0; right = done = 0; draw(); };
        const draw = () => {
          const it = pool[i % pool.length]; if (!it) { root.innerHTML = '<p class="muted">No sentences here yet.</p>'; return; }
          root.innerHTML = `<div class="row"><span class="pill">✔ ${right} / ${done}</span><small class="muted">${esc(it.src || '')}</small></div>
            <p class="sp-prompt">🇬🇧 ${esc(it.en)}</p>
            <div class="sp-slot"></div>
            <div class="sp-type"><label class="muted" for="trIn">…or type it:</label><div class="row"><input class="txt-in" id="trIn" placeholder="Auf Deutsch …" style="flex:1;min-width:0"><button class="btn small ghost" id="trCheck">Check</button></div></div>
            <div id="trOut"></div>
            <div class="row" style="margin-top:12px"><button class="btn ghost small" id="trShow">👀 Show answer</button><span class="spacer"></span><button class="btn" id="trNext">Next ➜</button></div>`;
          let counted = false;
          const reveal = (ok) => {
            if (!counted) { counted = true; done++; if (ok) right++; else Store.addMistake({ t: 'tr', en: it.en, a: it.a }, it.day || null); }
            $('#trOut', root).innerHTML = `<div class="sp-answer">${ok ? '✅' : '📌'} <b>${esc(it.a[0])}</b> <button class="btn tiny ghost" data-say="${attr(it.a[0])}">🔊</button>${it.a.length > 1 ? `<br><small class="muted">Also correct: ${it.a.slice(1).map(esc).join(' · ')}</small>` : ''}${it.ex ? `<br><small class="muted">${it.ex}</small>` : ''}</div>`;
            $('.pill', root).textContent = `✔ ${right} / ${done}`;
          };
          attempt($('.sp-slot', root), { targets: it.a, wrong: it.wrong, hideTarget: true, noListen: true, wrongHint: it.ex, onResult: (r) => reveal(r.ok) });
          $('#trCheck', root).onclick = () => { const v = $('#trIn', root).value; if (!v.trim()) return; const c = GL.checkAnswer(v, it.a); GL.sfx(c.ok ? 'ok' : 'bad'); reveal(c.ok); };
          $('#trIn', root).onkeydown = (e) => { if (e.key === 'Enter') $('#trCheck', root).click(); };
          $('#trShow', root).onclick = () => reveal(false);
          $('#trNext', root).onclick = () => { i++; Store.addXP(1); draw(); };
        };
        $$('#trScope .chip').forEach((b) => (b.onclick = () => { s.trScope = b.dataset.k; Store.save(); $$('#trScope .chip').forEach((x) => x.classList.toggle('on', x === b)); load(); }));
        load();
      },
    };
  }

  function questions() {
    return {
      html: shell('questions', `<div class="card"><h2 style="margin-top:0">❓ Speaking drill: ${GL.talkQuestions.length} everyday questions</h2>
        <p class="muted">The character asks, you answer aloud in a full sentence about <b>your</b> life, then say the model answer to practise the structure. Do 10 a day.</p><div id="drillRoot"></div></div>`),
      mount() { GL.Tutor.drill($('#drillRoot')); },
    };
  }

  function ai(sub) {
    return {
      html: shell('ai', '<div id="aiSection"><div class="card"><p class="muted" style="margin:0">Loading…</p></div></div>'),
      mount() {
        const box = $('#aiSection');
        AI.get().then((sample) => {
          if (!box.isConnected) return;
          if (!sample) { box.innerHTML = '<div class="note">The AI conversation partner is available when you open this course on claude.ai. Everything else on this page works everywhere.</div>'; return; }
          const sc = sub && GL.talkScenarios.find((x) => x.id === sub);
          if (sc) {
            box.innerHTML = '<div class="card" id="chatRoot"></div>';
            const stop = GL.Tutor.chat($('#chatRoot'), sc);
            const my = location.hash;
            const iv = setInterval(() => { if (location.hash !== my) { stop(); clearInterval(iv); } }, 500);
            return;
          }
          box.innerHTML = `<div class="card"><h2 style="margin-top:0">🤖 Conversation with the characters <span class="ai-badge">AI</span></h2>
            <p class="muted">Pick a situation and talk – type, use 🎤, or turn on <b>📞 call mode</b> for a hands-free spoken conversation. Every sentence you say is corrected with a short explanation.</p>
            <div class="grid grid-3">${GL.talkScenarios.map((s) => `<a class="topic-card scen" href="#/talk/${s.id}"><div class="row" style="gap:10px;align-items:center">${GL.charSVG(s.char, 'idle')}<div style="min-width:0"><span class="level ${s.level}">${s.level}</span><b>${esc(s.de)}</b><small>${esc(s.title)} · with ${esc(GL.chars[s.char].name)}</small></div></div></a>`).join('')}</div></div>`;
        });
      },
    };
  }

  GL.viewTalk = function (sub) {
    if (sub === 'shadow') return shadow();
    if (sub === 'translate') return translate();
    if (sub === 'questions') return questions();
    if (sub === 'ai') return ai();
    if (sub && GL.talkScenarios.some((x) => x.id === sub)) return ai(sub);
    return workout();
  };

  Object.assign(Speak, { attempt, score, best, log, tipsFor, today, avg, streak, translatePool, GOAL,
    summary: () => { const s = st(); return s.n ? { n: s.n, avg: avg(), today: today(), streak: streak(), days: Object.fromEntries(Object.entries(s.days).slice(-14)), weak: Object.entries(s.weak).sort((a, b) => b[1] - a[1]).slice(0, 6).map((x) => x[0]) } : null; } });
  GL.Speak = Speak;
})();
