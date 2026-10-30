/* SPEAK IN 2 MINUTES (#/fast) – a fast track for absolute beginners who want to speak everyday German.
   Every sprint takes about 2 minutes and runs the same five steps:
   👂 Hear the 5 key phrases → 🧩 Build: one pattern + many words → 🗣️ Say it into the microphone
   → 🎧 Understand real answers → 💬 Talk in a mini role-play.  Data: js/data/fast.js */
(function () {
  'use strict';
  const { $, $$, esc, attr, Store, Speech, Rec } = GL;
  const STEPS = [['👂', 'Hear'], ['🧩', 'Build'], ['🗣️', 'Say'], ['🎧', 'Understand'], ['💬', 'Talk']];
  const GOAL = 120; // seconds – the "2 minutes"
  const prog = () => (Store.state.fast = Store.state.fast || { done: {} });
  const sprints = () => GL.fast || [];
  const nextSprint = () => sprints().find((s) => !prog().done[s.id]) || sprints()[0];
  const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const fill = (frame, w) => frame.replace('{x}', w);

  /* speak with the character's mouth moving */
  function talk(svg, text, opts = {}) {
    const on = () => svg && svg.classList.add('talking');
    const off = () => svg && svg.classList.remove('talking');
    return Speech.speak(text, Object.assign({}, opts, { onstart: on })).then(off, off);
  }

  /* One "say it" round: listen, speak into the mic, see every word you got right. Calls done(score). */
  function sayBox(box, de, en, sounds, done, opts = {}) {
    const hide = !!opts.prompt; // role-play: show only the English until the learner asks for help
    box.innerHTML = `<div class="fx-say">
        ${hide ? `<p class="fx-prompt">Say in German: <b>${esc(en)}</b></p><button class="btn ghost fx-hint" type="button">💡 Show me</button>` : ''}
        <div class="fx-target ${hide ? 'hidden' : ''}"><p class="fx-de" lang="de">${esc(de)}</p>${sounds ? `<p class="fx-snd">🔉 ${esc(sounds)}</p>` : ''}${hide ? '' : `<p class="fx-en">${esc(en)}</p>`}</div>
        <div class="row fx-ctl"><button class="btn ghost fx-hear" type="button">🔊 Listen</button><button class="btn ghost fx-slow" type="button">🐢 Slow</button>
          ${Rec.supported ? '<button class="btn red big fx-mic" type="button">🎤 Speak</button>' : '<button class="btn green big fx-self" type="button">✅ I said it out loud</button>'}</div>
        <div class="fx-res" aria-live="polite">${Rec.supported ? '' : '<small class="muted">Your browser can’t check speech (try Chrome or Edge) – say it out loud anyway, that’s what counts!</small>'}</div>
        <button class="fx-skip" type="button">Skip this one</button>
        <div class="row fx-after hidden"><button class="btn ghost fx-again" type="button">🔁 Try again</button><span class="spacer"></span><button class="btn green fx-ok" type="button">Weiter →</button></div>
      </div>`;
    const res = $('.fx-res', box), after = $('.fx-after', box);
    let best = 0;
    const show = () => { $('.fx-target', box).classList.remove('hidden'); const h = $('.fx-hint', box); h && h.remove(); };
    $('.fx-hear', box).onclick = () => Speech.speak(de);
    $('.fx-slow', box).onclick = () => Speech.speak(de, { slow: true });
    const h = $('.fx-hint', box); if (h) h.onclick = () => { show(); Speech.speak(de, { slow: true }); };
    $('.fx-ok', box).onclick = () => done(best);
    $('.fx-skip', box).onclick = () => { Rec.stop(); done(best); };
    $('.fx-again', box).onclick = () => { after.classList.add('hidden'); res.innerHTML = ''; mic && mic.click(); };
    const self = $('.fx-self', box);
    if (self) self.onclick = () => { best = 100; show(); Store.addXP(2); GL.sfx && GL.sfx('ok'); done(best); };
    const mic = $('.fx-mic', box);
    if (mic) mic.onclick = async () => {
      Speech.stop(); mic.disabled = true; mic.classList.add('fx-live'); mic.textContent = '🎙️ Listening…';
      res.innerHTML = '<span class="fx-wave"><i></i><i></i><i></i><i></i><i></i></span>';
      try {
        const alts = await Rec.listen();
        const r = alts.map((a) => GL.speechScore(de, a)).sort((a, b) => b.score - a.score)[0];
        best = Math.max(best, r.score);
        show();
        const msg = r.score >= 85 ? ['🎉', 'Super! Like a native.'] : r.score >= 60 ? ['👍', 'Gut! Germans understand you.'] : ['💪', 'Almost – listen once more and try again.'];
        res.innerHTML = `<p class="fx-words">${r.words.map((w) => `<span class="${w.hit ? 'hit' : 'miss'}">${esc(w.w)}</span>`).join(' ')}</p><p class="fx-score s${r.score >= 60 ? 'ok' : 'low'}">${msg[0]} <b>${r.score}%</b> · ${msg[1]}</p><small class="muted">I heard: „${esc(alts[0])}“</small>`;
        if (r.score >= 60) { Store.addXP(r.score >= 85 ? 3 : 2); GL.sfx && GL.sfx('ok'); } else GL.sfx && GL.sfx('bad');
      } catch (e) {
        res.innerHTML = e.message === 'not-allowed' ? '<small class="muted">🎤 Microphone blocked – allow it in the address bar, or just say it out loud and tap Weiter.</small>' : '<small class="muted">I didn’t hear anything – tap 🎤 and speak right away.</small>';
      }
      mic.disabled = false; mic.classList.remove('fx-live'); mic.textContent = '🎤 Speak';
      after.classList.remove('hidden');
      const sk = $('.fx-skip', box); sk && sk.remove();
      $('.fx-ok', box).focus();
    };
    if (opts.autoplay !== false) Speech.later(250, de);
  }

  /* ---------- hub ---------- */
  function viewHub() {
    const p = prog(), list = sprints(), nDone = list.filter((s) => p.done[s.id]).length, nx = nextSprint();
    return {
      html: `<section class="fx-hero"><div><span class="xm-pill">⚡ SPEAK IN 2 MINUTES</span>
          <h1>Speak everyday German – 2 minutes at a time.</h1>
          <p>No grammar books. Each sprint gives you <b>one sentence pattern</b> and the <b>5 phrases Germans really use</b> in that situation. You hear them, build them, say them, understand the answers – and use them in a real mini-conversation.</p>
          <div class="row"><a class="btn gold big" href="#/fast/${nx.id}">${nDone ? '▶ Next sprint' : '🚀 Start sprint 1'}: ${esc(nx.title)}</a>${nDone ? '<a class="btn ghost fx-hbtn" href="#/fast/review">🔁 2-minute review</a>' : ''}</div>
          <div class="fx-hstats"><span>✅ ${nDone}/${list.length} sprints</span><span>💬 ${list.reduce((n, s) => n + (p.done[s.id] ? s.lines.length + s.pattern.fill.length : 0), 0)} sentences you can say</span></div></div>
          <div class="fx-art" aria-hidden="true">${GL.charSVG('bruno', 'idle waving')}<span class="fx-clock">2:00</span></div></section>
        <div class="fx-how">${STEPS.map(([i, t], k) => `<div style="animation-delay:${k * 0.08}s"><span>${i}</span><b>${t}</b><small>${['5 key phrases', '1 pattern, many sentences', 'your mic checks you', 'real answers', 'a mini role-play'][k]}</small></div>`).join('<i aria-hidden="true">→</i>')}</div>
        <h2 class="fx-h">Your path – in the order you need it in real life</h2>
        <ol class="fx-path">${list.map((s, i) => { const d = p.done[s.id]; const cur = s === nx && !d; return `<li class="${d ? 'done' : ''} ${cur ? 'cur' : ''}" style="--c:${s.color};animation-delay:${i * 0.04}s"><a href="#/fast/${s.id}"><span class="fx-node">${d ? '✓' : s.ico}</span><span class="fx-pt"><b>${i + 1}. ${esc(s.title)}</b><small>${esc(s.en)} · ${esc(s.where)}</small></span>${d ? `<span class="fx-best">${d.score}%</span>` : cur ? '<span class="fx-go">Start →</span>' : ''}</a></li>`; }).join('')}</ol>
        <div class="card fx-after-tip"><h3>🏁 After the 12 sprints</h3><p>You can greet, introduce yourself, order, shop, ask the way, handle numbers and times, ask for help, see a doctor, make small talk, tell what you did and make plans. Next steps: <a href="#/scenes">🎬 real-life scenes</a> to practise longer conversations, <a href="#/talk">🎤 Speak</a> for daily shadowing, and the <a href="#/plan">🗺️ 30-day course</a> to understand the grammar behind it.</p></div>`,
    };
  }

  /* ---------- one sprint ---------- */
  function viewSprint(s) {
    const idx = sprints().indexOf(s);
    return {
      html: `<div class="fx-top"><a class="fx-back" href="#/fast" aria-label="Back to all sprints">←</a><div class="fx-steps">${STEPS.map(([ic, t], i) => `<div class="fx-step" data-i="${i}"><span>${ic}</span><small>${t}</small></div>`).join('')}<span class="fx-track"><i id="fxBar"></i></span></div>
          <div class="fx-timer" title="Time in this sprint"><svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15.9" class="bg"/><circle cx="18" cy="18" r="15.9" class="fg" id="fxRing"/></svg><b id="fxTime">0:00</b></div></div>
        <section class="fx-stage card" style="--c:${s.color}">
          <div class="fx-head"><div class="fx-who">${GL.charSVG(s.char, 'idle')}</div><div><small class="muted">Sprint ${idx + 1} of ${sprints().length} · ${esc(s.where)}</small><h1>${s.ico} ${esc(s.title)}</h1><p class="muted">${esc(s.en)}</p></div></div>
          <div id="fxCard" class="fx-card"></div>
        </section>`,
      mount() {
        const card = $('#fxCard'), who = $('.fx-who svg');
        const t0 = Date.now(); let step = -1, scores = [], stopped = false;
        const tick = () => {
          if (stopped || !document.body.contains(card)) return;
          const sec = Math.round((Date.now() - t0) / 1000);
          $('#fxTime').textContent = mmss(sec);
          const ring = $('#fxRing'); ring.style.strokeDashoffset = String(100 - Math.min(100, (sec / GOAL) * 100)); ring.classList.toggle('over', sec > GOAL);
          setTimeout(tick, 1000);
        };
        tick();
        const mark = () => { $$('.fx-step').forEach((el, i) => { el.classList.toggle('on', i === step); el.classList.toggle('done', i < step); }); $('#fxBar').style.width = Math.round((Math.max(0, step) / STEPS.length) * 100) + '%'; };
        const next = () => { step++; mark(); card.classList.remove('fx-in'); void card.offsetWidth; card.classList.add('fx-in'); if (step && card.getBoundingClientRect().top < 70) $('.fx-top').scrollIntoView({ behavior: 'smooth' }); [hear, build, say, understand, roleplay, finish][step](); };

        /* 👂 HEAR – the 5 phrases, one after another, with a "sounds like" guide */
        function hear() {
          let i = 0;
          const show = () => {
            const [de, en, snd] = s.lines[i];
            card.innerHTML = `<h2>👂 Hear <small class="muted">${i + 1}/${s.lines.length}</small></h2>
              <div class="fx-phrase" lang="de"><button class="say-btn big" type="button" data-say="${attr(de)}" aria-label="Listen">🔊</button><div><b>${esc(de)}</b><span class="fx-snd">🔉 sounds like: <i>${esc(snd)}</i></span><span class="fx-en">${esc(en)}</span></div></div>
              <div class="fx-dots">${s.lines.map((_, k) => `<i class="${k < i ? 'done' : k === i ? 'on' : ''}"></i>`).join('')}</div>
              <p class="muted fx-tip">Say it quietly along with the voice. Tap 🔊 as often as you like, 🐢 for slow.</p>
              <div class="row fx-nav"><button class="btn ghost" id="fxSlow" type="button">🐢 Slow</button><span class="spacer"></span><button class="btn green" id="fxNext" type="button">${i < s.lines.length - 1 ? 'Next phrase →' : 'Got it →'}</button></div>`;
            talk(who, de);
            $('#fxSlow').onclick = () => talk(who, de, { slow: true });
            $('#fxNext').onclick = () => { i++; i < s.lines.length ? show() : next(); };
            $('#fxNext').focus({ preventScroll: true });
          };
          show();
        }

        /* 🧩 BUILD – one frame, many words: tap a word and the sentence changes */
        function build() {
          const P = s.pattern, seen = new Set();
          const [pre, post] = P.frame.split('{x}');
          card.innerHTML = `<h2>🧩 Build <small class="muted">1 pattern = many sentences</small></h2>
            <div class="fx-frame" lang="de"><span>${esc(pre)}</span><span class="fx-slot" id="fxSlot">…</span><span>${esc(post)}</span></div>
            <p class="fx-en fx-fen" id="fxFen">${esc(P.en.replace('{x}', '…'))}</p>
            <div class="fx-chips">${P.fill.map((f, k) => `<button class="fx-chip" data-k="${k}" type="button">${esc(f[0])}<small>${esc(f[1])}</small></button>`).join('')}</div>
            <p class="fx-note">💡 ${esc(P.note)}</p>
            <p class="muted fx-tip" id="fxLeft">Tap at least 3 words.</p>
            <div class="row fx-nav"><span class="spacer"></span><button class="btn green" id="fxNext" type="button" disabled>Weiter →</button></div>`;
          $$('.fx-chip', card).forEach((b) => (b.onclick = () => {
            const f = P.fill[+b.dataset.k]; seen.add(b.dataset.k);
            $$('.fx-chip', card).forEach((x) => x.classList.toggle('on', x === b)); b.classList.add('used');
            const slot = $('#fxSlot'); slot.classList.remove('pop'); void slot.offsetWidth; slot.textContent = f[0]; slot.classList.add('pop');
            $('#fxFen').textContent = P.en.replace('{x}', f[1]);
            talk(who, fill(P.frame, f[0]));
            const left = Math.max(0, 3 - seen.size);
            $('#fxLeft').textContent = left ? `${left} more…` : '✨ You just made ' + seen.size + ' German sentences from one pattern!';
            $('#fxNext').disabled = !!left;
          }));
          $('#fxNext').onclick = next;
        }

        /* 🗣️ SAY – 3 phrases into the microphone */
        function say() {
          const pf = s.pattern.fill[Math.floor(Math.random() * s.pattern.fill.length)];
          const items = GL.shuffle(s.lines.slice()).slice(0, 2).concat([[fill(s.pattern.frame, pf[0]), s.pattern.en.replace('{x}', pf[1]), '']]);
          let i = 0;
          const show = () => {
            if (i >= items.length) { next(); return; }
            card.innerHTML = `<h2>🗣️ Say it <small class="muted">${i + 1}/${items.length}</small></h2><div id="fxSay"></div>`;
            sayBox($('#fxSay'), items[i][0], items[i][1], items[i][2], (sc) => { scores.push(sc); i++; show(); });
          };
          show();
        }

        /* 🎧 UNDERSTAND – hear a native line, pick the meaning (no text until you answer) */
        function understand() {
          let i = 0, right = 0;
          const show = () => {
            if (i >= s.listen.length) { scores.push(Math.round((right / s.listen.length) * 100)); next(); return; }
            const [de, opts, a] = s.listen[i];
            card.innerHTML = `<h2>🎧 Understand <small class="muted">${i + 1}/${s.listen.length}</small></h2>
              <p class="muted">Listen first – what does it mean?</p>
              <div class="row fx-lplay"><button class="btn big fx-play" type="button">🔊 Listen</button><button class="btn ghost fx-lslow" type="button">🐢 Slow</button></div>
              <div class="fx-opts">${opts.map((o, k) => `<button class="fx-opt" data-k="${k}" type="button">${esc(o)}</button>`).join('')}</div>
              <div class="fx-reveal hidden" lang="de"></div>
              <div class="row fx-nav hidden" id="fxNav"><span class="spacer"></span><button class="btn green" id="fxNext" type="button">Weiter →</button></div>`;
            $('.fx-play', card).onclick = () => Speech.speak(de);
            $('.fx-lslow', card).onclick = () => Speech.speak(de, { slow: true });
            Speech.later(300, de);
            $$('.fx-opt', card).forEach((b) => (b.onclick = () => {
              const ok = +b.dataset.k === a;
              $$('.fx-opt', card).forEach((x) => { x.disabled = true; x.classList.toggle('ok', +x.dataset.k === a); });
              if (!ok) b.classList.add('bad');
              if (ok) { right++; Store.addXP(2); }
              GL.sfx && GL.sfx(ok ? 'ok' : 'bad');
              const rv = $('.fx-reveal', card); rv.innerHTML = `${ok ? '✅' : '👀'} <b>${esc(de)}</b> <button class="say-btn sm" type="button" data-say="${attr(de)}" aria-label="Listen">🔊</button>`; rv.classList.remove('hidden');
              $('#fxNav').classList.remove('hidden'); $('#fxNext').onclick = () => { i++; show(); }; $('#fxNext').focus();
            }));
          };
          show();
        }

        /* 💬 TALK – the character speaks, you answer (English prompt; German only if you ask) */
        function roleplay() {
          card.innerHTML = `<h2>💬 Talk <small class="muted">a real mini-conversation</small></h2><div class="fx-chat" id="fxChat"></div><div id="fxTurn"></div>`;
          const chat = $('#fxChat'), turn = $('#fxTurn'), name = (GL.chars[s.char] || {}).name || '';
          let i = 0;
          const bubble = (who2, de, en) => { chat.insertAdjacentHTML('beforeend', `<div class="fx-msg ${who2}"><small>${who2 === 'you' ? 'You' : esc(name)}</small><p lang="de">${esc(de)} <button class="say-btn sm" type="button" data-say="${attr(de)}" aria-label="Listen">🔊</button></p><span>${esc(en)}</span></div>`); chat.lastElementChild.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); };
          const step2 = () => {
            if (i >= s.talk.length) {
              turn.innerHTML = '<div class="row fx-nav"><button class="btn ghost" id="fxReplay" type="button">🔁 Hear the whole conversation</button><span class="spacer"></span><button class="btn gold" id="fxNext" type="button">Finish 🏁</button></div>';
              $('#fxReplay').onclick = async () => { const pg = Speech._page; for (const [w, de] of s.talk) { if (pg !== Speech._page) return; await talk(w === 'you' ? null : who, de, w === 'you' ? {} : { char: s.char }); } };
              $('#fxNext').onclick = next; $('#fxNext').focus();
              return;
            }
            const [w, de, en] = s.talk[i];
            if (w !== 'you') {
              bubble('them', de, en); turn.innerHTML = '';
              talk(who, de, { char: s.char }).then(() => { if (document.body.contains(turn)) { i++; step2(); } });
            } else {
              sayBox(turn, de, en, '', (sc) => { scores.push(sc); bubble('you', de, en); i++; step2(); }, { prompt: true, autoplay: false });
            }
          };
          step2();
        }

        function finish() {
          stopped = true;
          const sec = Math.round((Date.now() - t0) / 1000);
          const score = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
          const p = prog(), first = !p.done[s.id];
          p.done[s.id] = { score: Math.max(score, (p.done[s.id] || {}).score || 0), sec, at: GL.todayStr() };
          Store.addXP(first ? 25 : 10);
          GL.confetti && GL.confetti(first ? 160 : 80);
          GL.sfx && GL.sfx('done');
          who && who.classList.add('happy', 'smile');
          const nx = sprints()[sprints().indexOf(s) + 1];
          card.innerHTML = `<div class="fx-win"><span class="fx-trophy">🏆</span><h2>Geschafft! You can now ${esc(s.en.toLowerCase())}.</h2>
            <div class="fx-wstats"><div><b>${mmss(sec)}</b><small>your time</small></div><div><b>${score}%</b><small>speaking & listening</small></div><div><b>+${first ? 25 : 10}</b><small>XP</small></div></div>
            <p class="muted">Your new sentences – read them out loud once more:</p>
            <ul class="fx-sum">${s.lines.map(([de, en]) => `<li><button class="say-btn sm" type="button" data-say="${attr(de)}" aria-label="Listen">🔊</button> <div><b lang="de">${esc(de)}</b><span>${esc(en)}</span></div></li>`).join('')}</ul>
            <div class="row fx-nav"><a class="btn ghost" href="#/fast">🗺️ All sprints</a><a class="btn ghost" href="#/fast/${s.id}" onclick="setTimeout(()=>GL.render(),0)">🔁 Again</a><span class="spacer"></span>${nx ? `<a class="btn gold big" href="#/fast/${nx.id}">Next: ${nx.ico} ${esc(nx.title)} →</a>` : '<a class="btn gold big" href="#/scenes">🎬 Try real-life scenes →</a>'}</div></div>`;
          Speech.later(400, 'Super! Das hast du toll gemacht!', { char: 'bruno' });
          if (GL.Game && GL.Game.count) GL.Game.count('lesson', 1);
        }

        next();
      },
    };
  }

  /* ---------- 2-minute review: English prompt → you say it in German, mixed from finished sprints ---------- */
  function viewReview() {
    const done = sprints().filter((s) => prog().done[s.id]);
    const pool = [];
    (done.length ? done : sprints().slice(0, 1)).forEach((s) => { s.lines.forEach((l) => pool.push(l)); s.pattern.fill.forEach((f) => pool.push([fill(s.pattern.frame, f[0]), s.pattern.en.replace('{x}', f[1]), ''])); });
    const items = GL.shuffle(pool).slice(0, 6);
    return {
      html: `<div class="fx-top"><a class="fx-back" href="#/fast" aria-label="Back">←</a><h1 class="fx-rh">🔁 2-minute review</h1></div>
        <section class="card fx-stage"><p class="muted">You see English – say it in German. Stuck? Tap 💡 and copy the voice.</p><div class="fx-dots" id="fxRd"></div><div id="fxR" class="fx-card"></div></section>`,
      mount() {
        let i = 0, sum = 0;
        const show = () => {
          $('#fxRd').innerHTML = items.map((_, k) => `<i class="${k < i ? 'done' : k === i ? 'on' : ''}"></i>`).join('');
          const box = $('#fxR');
          if (i >= items.length) {
            const sc = Math.round(sum / items.length); Store.addXP(10); GL.confetti && GL.confetti(90);
            box.innerHTML = `<div class="fx-win"><span class="fx-trophy">⭐</span><h2>Review done – ${sc}%</h2><div class="row fx-nav"><a class="btn ghost" href="#/fast">🗺️ All sprints</a><span class="spacer"></span><button class="btn gold" type="button" onclick="GL.render()">🔁 New round</button></div></div>`;
            return;
          }
          sayBox(box, items[i][0], items[i][1], items[i][2], (s) => { sum += s; i++; show(); }, { prompt: true, autoplay: false });
        };
        show();
      },
    };
  }

  GL.Fast = { nextSprint, doneCount: () => sprints().filter((s) => prog().done[s.id]).length };
  GL.viewFast = function (a) {
    if (a === 'review') return viewReview();
    const s = sprints().find((x) => x.id === a);
    return s ? viewSprint(s) : viewHub();
  };
})();
