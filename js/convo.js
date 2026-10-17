/* OFFLINE CONVERSATIONS (#/talk/convo) – speak with animated characters without any AI:
   the partner speaks (text-to-speech with lip-sync), you answer by voice (speech recognition) or by typing, and the
   app checks the CONTENT of your answer with keyword groups (data: js/data/convos.js, convos-exam.js).
   Includes everyday situations in Germany and exam speaking simulations (Goethe/telc A1–B1) with a presentation mode. */
(function () {
  'use strict';
  const { $, $$, esc, attr, Store, Speech, Rec, toast } = GL;
  const S = () => (Store.state.convo = Store.state.convo || {});
  const LV = { A1: '#22b573', A2: '#3a86ff', B1: '#9b5de5' };

  /* ---------- keyword matching (same rules as the content validator) ---------- */
  const fold = (s) => String(s).toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9*]+/g, ' ').trim();
  function hasAlt(words, alt) {
    const star = /\*\s*$/.test(alt); const tk = fold(alt.replace(/\*/g, '')).split(' ').filter(Boolean); if (!tk.length) return false;
    for (let i = 0; i + tk.length <= words.length; i++) {
      let ok = true;
      for (let j = 0; j < tk.length; j++) { const w = words[i + j], t = tk[j]; if (!(w === t || (star && j === tk.length - 1 && w.startsWith(t)))) { ok = false; break; } }
      if (ok) return true;
    }
    return false;
  }
  function match(text, need, min) {
    const words = fold(text).replace(/\*/g, '').split(' ').filter(Boolean);
    const hit = (need || []).map((g) => g.some((a) => hasAlt(words, a)));
    const n = hit.filter(Boolean).length;
    return { ok: n >= (min || hit.length), hit, n };
  }
  const all = () => GL.convos || [];

  /* ---------- long speech (presentations): continuous recognition ---------- */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function listenLong(onText, maxMs) {
    let stopFn = () => {};
    const p = new Promise((resolve, reject) => {
      if (!SR) { reject(new Error('unsupported')); return; }
      const r = new SR(); let finals = '', stopped = false, last = '';
      r.lang = Store.state.settings.recLang || 'de-DE'; r.continuous = true; r.interimResults = true;
      r.onresult = (e) => {
        let interim = '';
        for (let i = e.resultIndex; i < e.results.length; i++) { const t = e.results[i][0].transcript; if (e.results[i].isFinal) finals += t + ' '; else interim += t; }
        last = (finals + interim).trim(); onText && onText(last);
      };
      r.onerror = (e) => { if (e.error === 'no-speech' && !stopped) return; if (!finals) reject(new Error(e.error || 'error')); };
      r.onend = () => { if (!stopped && Date.now() - t0 < maxMs) { try { r.start(); return; } catch (x) { /* restart failed */ } } resolve((finals || last).trim()); };
      const t0 = Date.now();
      const timer = setTimeout(() => { stopped = true; try { r.stop(); } catch (x) { /* already stopped */ } }, maxMs);
      stopFn = () => { stopped = true; clearTimeout(timer); try { r.stop(); } catch (x) { /* already stopped */ } };
      r.start();
    });
    p.stop = () => stopFn();
    return p;
  }

  /* ---------- list ---------- */
  function list() {
    const C = all(), st = S();
    const card = (c, i) => `<a class="card cv-card" href="#/talk/convo/${c.id}" style="--lv:${LV[c.level]};animation-delay:${Math.min(i, 12) * 0.04}s">
        <div class="cv-av">${GL.charSVG(c.char, 'idle')}</div>
        <div class="cv-info"><div class="row" style="gap:6px"><span class="xm-lv" style="--lv:${LV[c.level]}">${c.level}</span>${c.exam ? `<span class="xm-tag">${esc(c.exam)}</span>` : ''}</div>
          <b>${c.icon} ${esc(c.title)}</b><small>${esc(c.en)} · ${c.turns.length} turns · with ${esc((GL.chars[c.char] || {}).name || '')}</small></div>
        ${st[c.id] != null ? `<span class="xm-chip ${st[c.id] >= 80 ? 'hi' : st[c.id] >= 50 ? 'mid' : 'lo'}">${st[c.id]}%</span>` : '<span class="cv-go">▶</span>'}</a>`;
    const life = C.filter((c) => c.kind !== 'exam'), exam = C.filter((c) => c.kind === 'exam');
    return `<div class="card cv-intro"><div class="cv-intro-av">${GL.charSVG('lena', 'idle waving')}</div><div><h2 style="margin-top:0">🗨️ Speak with the characters</h2>
        <p class="muted" style="margin:0">They talk to you – you answer with your voice (🎤 Chrome/Edge/Safari) or by typing. The app checks the <b>content</b> of what you say, gives hints and shows a model answer. No AI and no internet service needed.</p></div></div>
      ${life.length ? `<h2>🇩🇪 Everyday life in Germany</h2><div class="cv-grid">${life.map(card).join('')}</div>` : ''}
      ${exam.length ? `<h2>🎓 Exam speaking simulator</h2><p class="muted" style="margin-top:-6px">Real exam situations with an examiner or exam partner – Goethe & telc, A1 to B1.</p><div class="cv-grid">${exam.map(card).join('')}</div>` : '<div class="note">🎓 The exam speaking simulator is being added.</div>'}`;
  }

  /* ---------- runner ---------- */
  function run(id) {
    const c = all().find((x) => x.id === id);
    if (!c) return `<div class="card"><h2>Conversation not found</h2><a class="btn" href="#/talk/convo">All conversations</a></div>`;
    return `<p class="ex-crumbs"><a href="#/talk/convo">← Conversations</a></p>
      <div class="cv-room" id="cvRoom" style="--lv:${LV[c.level]}">
        <div class="cv-top"><div><span class="xm-lv" style="--lv:${LV[c.level]}">${c.level}</span> ${c.exam ? `<span class="xm-tag">${esc(c.exam)}</span>` : ''}<h1 style="margin:.15em 0">${c.icon} ${esc(c.title)}</h1><small class="muted">📍 ${esc(c.place)}</small></div>
          <div class="cv-progress"><span class="cv-pbar"><i id="cvBar"></i></span><small id="cvStep">0 / ${c.turns.length}</small></div></div>
        <div class="cv-stage"><div class="cv-partner" id="cvPartner">${GL.charSVG(c.char, 'idle')}<span class="cv-name">${esc((GL.chars[c.char] || {}).name || '')}</span></div>
          <div class="cv-bubble" id="cvBubble"><p class="cv-de" id="cvDe">${esc(c.intro[0])}</p><p class="cv-en" id="cvEn">${esc(c.intro[1])}</p><div class="row"><button class="btn tiny ghost" id="cvReplay" type="button">🔊 Again</button><button class="btn tiny ghost" id="cvSlow" type="button">🐢 Slowly</button><button class="btn tiny ghost" id="cvEnT" type="button">🇬🇧 English</button></div></div></div>
        <div class="cv-me card" id="cvMe"><div class="cv-start"><p><b>🎬 Situation:</b> ${esc(c.intro[0])}</p><p class="muted">${esc(c.intro[1])}</p>
          <div class="row" style="justify-content:center"><button class="btn green big" id="cvGo" type="button">▶ Start the conversation</button></div>
          <p class="muted" style="text-align:center;margin:8px 0 0">${Rec.supported ? '🎤 Allow the microphone when your browser asks.' : '⌨️ This browser has no speech recognition – you can type your answers (or use Chrome/Edge to speak).'}</p></div></div>
      </div>`;
  }
  function wire(id) {
    const c = all().find((x) => x.id === id); if (!c) return;
    const svg = () => $('#cvPartner svg');
    const me = $('#cvMe');
    let k = -1, firstTry = 0, tries = 0, done = [];
    let showEn = !!Store.state.settings.showEn;
    const setEn = () => { $('#cvEn').classList.toggle('hidden', !showEn); };
    setEn();
    const partnerSay = async (line, slow) => {
      $('#cvDe').textContent = line[0]; $('#cvEn').textContent = line[1];
      const b = $('#cvBubble'); b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
      await GL.charSay(svg(), line[0], c.char, { slow });
    };
    let lastLine = c.intro;
    $('#cvReplay').onclick = () => partnerSay(lastLine);
    $('#cvSlow').onclick = () => partnerSay(lastLine, true);
    $('#cvEnT').onclick = () => { showEn = !showEn; setEn(); };
    const bar = () => { $('#cvBar').style.width = Math.round(((k) / c.turns.length) * 100) + '%'; $('#cvStep').textContent = `${Math.min(k + 1, c.turns.length)} / ${c.turns.length}`; };

    async function turn() {
      k++;
      bar();
      if (k >= c.turns.length) return finish();
      const t = c.turns[k]; tries = 0;
      lastLine = t.say;
      me.innerHTML = `<div class="cv-wait">${GL.charSVG(c.char, 'idle')}<span>…</span></div>`;
      await partnerSay(t.say);
      if (!document.body.contains(me)) return;
      me.innerHTML = `<div class="cv-task"><span class="cv-you">🫵 Your turn</span><p class="cv-tasktext">${esc(t.task)}</p></div>
        ${t.present ? `<div class="cv-present"><div class="cv-timer"><span id="cvT">${t.seconds}</span>s</div><div class="cv-live" id="cvLive">Press 🎤 and speak for about ${t.seconds} seconds …</div></div>` : ''}
        <div class="cv-actions">
          ${Rec.supported ? `<button class="btn big rec cv-mic" id="cvMic" type="button">🎤 ${t.present ? 'Start speaking' : 'Speak'}</button>` : ''}
          <button class="btn ghost" id="cvTypeB" type="button">⌨️ Type</button>
          <button class="btn ghost" id="cvHint" type="button">💡 Hint</button>
          <button class="btn ghost" id="cvModel" type="button">👀 Model answer</button>
        </div>
        <div class="cv-type hidden" id="cvTypeBox"><input class="txt-in" id="cvIn" placeholder="Schreib deine Antwort …" autocomplete="off"><button class="btn green" id="cvSend" type="button">Send</button></div>
        <div id="cvFb"></div>`;
      const fb = $('#cvFb');
      const evaluate = (said) => {
        tries++;
        const r = match(said, t.need, t.min);
        const words = said.trim().split(/\s+/).filter(Boolean).length;
        if (r.ok) {
          if (tries === 1) firstTry++;
          done.push({ t, said, ok: true, tries });
          Store.addXP(tries === 1 ? 4 : 2); GL.sfx('ok'); if (GL.Game) { GL.Game.count('speak', 1); GL.Game.burst($('#cvFb') || me); }
          fb.innerHTML = `<div class="cv-res ok"><b>✅ ${tries === 1 ? pick(['Super!', 'Sehr gut!', 'Prima!', 'Genau!', 'Perfekt!']) : 'Jetzt passt es!'}</b> <span class="muted">You said: „${esc(said)}“${t.present ? ` · ${words} words` : ''}</span>
            <p class="cv-alt">💬 Model: <b>${esc(t.model[0])}</b> <button class="say-btn sm" type="button" data-say="${attr(t.model[0])}">🔊</button><br><small class="muted">${esc(t.model[1])}</small></p>
            <div class="row"><button class="btn green" id="cvNext" type="button">${k + 1 >= c.turns.length ? 'Finish ✓' : 'Weiter →'}</button></div></div>`;
          $('#cvNext').onclick = async () => { if (t.ok) { lastLine = t.ok; me.innerHTML = `<div class="cv-wait">${GL.charSVG(c.char, 'idle')}<span>…</span></div>`; await partnerSay(t.ok); } turn(); };
          $('#cvNext').focus();
        } else {
          GL.sfx('bad');
          const miss = (t.need || []).map((g, i) => (r.hit[i] ? null : g.slice(0, 3).map((a) => a.replace(/\*/g, '…')).join(' / '))).filter(Boolean);
          fb.innerHTML = `<div class="cv-res bad"><b>🤔 ${tries === 1 ? 'Hmm, not quite.' : 'Still not complete.'}</b> <span class="muted">${said ? `You said: „${esc(said)}“` : ''}</span>
            <p>💡 ${esc(t.hint)}</p>${miss.length && tries >= 2 ? `<p class="muted">Try to use: <b>${esc(miss.join(' · '))}</b></p>` : ''}
            <div class="row"><button class="btn" id="cvRetry" type="button">🔁 Try again</button>${tries >= 2 ? '<button class="btn ghost" id="cvShow" type="button">👀 Show model & go on</button>' : ''}</div></div>`;
          $('#cvRetry').onclick = () => { fb.innerHTML = ''; const m = $('#cvMic'); if (m) m.focus(); };
          const sh = $('#cvShow'); if (sh) sh.onclick = () => showModel(true);
        }
      };
      const showModel = (andGo) => {
        fb.innerHTML = `<div class="cv-res"><p class="cv-alt">💬 <b>${esc(t.model[0])}</b> <button class="say-btn sm" type="button" data-say="${attr(t.model[0])}">🔊</button><br><small class="muted">${esc(t.model[1])}</small></p>
          ${Rec.supported ? '<p class="muted" style="margin:0">Now say it yourself – press 🎤.</p>' : ''}${andGo ? '<div class="row"><button class="btn ghost" id="cvSkip" type="button">⏭ Skip this turn</button></div>' : ''}</div>`;
        Speech.speak(t.model[0]);
        const sk = $('#cvSkip'); if (sk) sk.onclick = () => { done.push({ t, said: '', ok: false, tries }); turn(); };
      };
      const mic = $('#cvMic');
      if (mic) mic.onclick = async () => {
        if (mic._long) { mic._long.stop(); return; }
        if (mic.classList.contains('listening')) { Rec.stop(); return; }
        Speech.stop();
        if (t.present) {
          mic.classList.add('listening'); mic.textContent = '⏹ Stop';
          let left = t.seconds; const tm = $('#cvT'); const iv = setInterval(() => { left--; if (tm) tm.textContent = Math.max(0, left); if (left <= 10 && tm) tm.parentElement.classList.add('low'); if (left <= 0) clearInterval(iv); }, 1000);
          const p = listenLong((txt) => { const lv = $('#cvLive'); if (lv) lv.textContent = txt; }, (t.seconds + 15) * 1000);
          mic._long = p;
          try { const txt = await p; clearInterval(iv); mic._long = null; mic.classList.remove('listening'); mic.textContent = '🎤 Speak again'; evaluate(txt || ''); }
          catch (e) { clearInterval(iv); mic._long = null; mic.classList.remove('listening'); mic.textContent = '🎤 Start speaking'; fb.innerHTML = `<p class="muted">${GL.Dialogue ? GL.Dialogue.micError(e) : 'Microphone problem.'} You can type instead.</p>`; $('#cvTypeBox').classList.remove('hidden'); }
          return;
        }
        mic.classList.add('listening'); mic.textContent = '👂 Listening…';
        try { const alts = await Rec.listen(); const best = alts.map((a) => ({ a, r: match(a, t.need, t.min) })).sort((x, y) => y.r.n - x.r.n)[0]; evaluate(best ? best.a : alts[0]); }
        catch (e) { fb.innerHTML = `<p class="muted">${GL.Dialogue ? GL.Dialogue.micError(e) : 'Microphone problem.'} You can also type ⌨️.</p>`; if (/not-allowed|service-not-allowed|audio-capture/.test(e && e.message)) $('#cvTypeBox').classList.remove('hidden'); }
        mic.classList.remove('listening'); mic.textContent = '🎤 Speak';
      };
      $('#cvTypeB').onclick = () => { $('#cvTypeBox').classList.toggle('hidden'); $('#cvIn').focus(); };
      if (!Rec.supported) $('#cvTypeBox').classList.remove('hidden');
      const send = () => { const v = $('#cvIn').value.trim(); if (!v) return; evaluate(v); $('#cvIn').value = ''; };
      $('#cvSend').onclick = send;
      $('#cvIn').onkeydown = (e) => { if (e.key === 'Enter') send(); };
      $('#cvHint').onclick = () => { fb.innerHTML = `<div class="cv-res"><p style="margin:0">💡 ${esc(t.hint)}</p></div>`; };
      $('#cvModel').onclick = () => showModel(false);
    }
    async function finish() {
      const n = c.turns.length, ok = done.filter((d) => d.ok).length;
      const pct = Math.round(((firstTry + (ok - firstTry) * 0.6) / n) * 100);
      const st = S(); st[id] = Math.max(st[id] || 0, pct); Store.save();
      Store.addXP(10); GL.track && GL.track('speak', `Conversation „${c.title}“: ${pct}%`);
      lastLine = c.outro;
      $('#cvBar').style.width = '100%';
      await partnerSay(c.outro);
      if (!document.body.contains(me)) return;
      me.innerHTML = `<div class="cv-end"><div class="xm-ring big2" style="--p:${pct}"><b>${pct}%</b></div><h2>${pct >= 85 ? 'Fantastisch gesprochen! 🌟' : pct >= 60 ? 'Gut gemacht! 👏' : 'Weiter üben – du schaffst das! 💪'}</h2>
        <p class="muted">${ok} of ${n} answers understood · ${firstTry} on the first try</p>
        <details class="xm-more" ${pct < 85 ? 'open' : ''}><summary>📋 All model answers – read them aloud once</summary>${c.turns.map((t) => `<div class="jp-row"><button class="say-btn" type="button" data-say="${attr(t.model[0])}">🔊</button><div class="jp-txt"><b>${esc(t.model[0])}</b><small>${esc(t.model[1])}</small></div><span></span></div>`).join('')}</details>
        <div class="row" style="justify-content:center;margin-top:10px"><button class="btn green" id="cvAgain" type="button">🔁 Practise again</button><a class="btn ghost" href="#/talk/convo">Other conversations</a></div></div>`;
      $('#cvAgain').onclick = () => GL.render();
      GL.sfx('done'); if (pct >= 85) GL.confetti();
    }
    $('#cvGo').onclick = () => turn();
  }
  const pick = (a) => a[Math.floor(Math.random() * a.length)];

  GL.viewConvo = function (id) {
    return {
      html: (id ? '' : `<h1>🗨️ Conversations</h1>`) + (id ? run(id) : list()),
      mount() { if (id) wire(id); },
    };
  };
  GL.Convo = { match, fold, listenLong };
})();
