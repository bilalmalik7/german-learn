/* HOME – EXPLORE LAYER (mobile first): a welcome screen on the very first visit, a "What's your goal?" picker,
   a 30-second der/die/das challenge, swipeable rails of popular pages and a word of the day.
   Goal: every new visitor finds a path into the course within seconds. */
(function () {
  'use strict';
  const { $, $$, esc, attr, Store, Speech } = GL;

  const GOALS = [
    ['🌱', 'Start from zero', 'Your first lesson – 10 min', '#/day/1', 'g1'],
    ['🎓', 'Pass my exam', 'Goethe & telc A1 → B1', '#/exam', 'g2'],
    ['🗣️', 'Speak German', 'Talk with characters', '#/talk', 'g3'],
    ['🇩🇪', 'Move to Germany', 'Anmeldung, doctor, flat', '#/life', 'g4'],
    ['💼', 'Work in Germany', 'German for your job', '#/job', 'g5'],
    ['🧭', 'Get my plan', 'Fitted to your exam date', '#/myplan', 'g6'],
  ];
  const RAIL = [
    ['🟩', 'Wortle', 'Guess today’s German word', '#/games/wortle', '#22b573', 'NEW'],
    ['🎬', 'Real-life scenes', 'Airport, doctor, Bürgeramt', '#/scenes', '#3a86ff', ''],
    ['🎯', 'Der·Die·Das Dash', '60-second article game', '#/games/dash', '#e5386d', 'HOT'],
    ['🎤', 'Speak with Bruno', 'Your microphone checks you', '#/talk', '#9b5de5', ''],
    ['📝', 'Mock exams', 'Timed A1 · A2 · B1 tests', '#/exam', '#ff8c42', ''],
    ['📖', 'Reading room', '38 texts, tap any word', '#/read', '#12a189', ''],
    ['🎧', 'Listening gym', 'Numbers, times, real audio', '#/listen', '#2f6fed', ''],
    ['⚡', 'Daily mix', '15 minutes, everything', '#/daily', '#f4a300', ''],
  ];

  const nouns = () => {
    const out = [];
    (GL.days || []).forEach((d) => (d.vocab || []).forEach((v) => { const m = /^(der|die|das) ([A-ZÄÖÜ][\wäöüß]+)$/.exec(v[0]); if (m && v[2] && v[2].length < 22) out.push({ art: m[1], w: m[2], en: v[2] }); }));
    return out;
  };
  const dayIndex = () => Math.floor(Date.now() / 864e5);

  function wordOfDay() {
    const all = []; (GL.days || []).forEach((d) => (d.vocab || []).forEach((v) => { if (v[3] && v[0].length < 24) all.push(v); }));
    return all.length ? all[(dayIndex() * 37) % all.length] : null;
  }

  function goalsHTML() {
    return `<section class="hx-sec hx-goals-sec"><h2 class="hx-h">What’s your goal?</h2>
      <div class="hx-goals">${GOALS.map(([i, t, s, h, c], k) => `<a class="hx-goal ${c}" href="${h}" style="animation-delay:${k * 0.05}s"><span class="hx-gi">${i}</span><b>${t}</b><small>${s}</small></a>`).join('')}</div></section>`;
  }
  function railHTML(title = '🔥 Popular right now') {
    return `<section class="hx-sec"><div class="hx-row"><h2 class="hx-h">${title}</h2><span class="hx-swipe" aria-hidden="true">swipe →</span></div>
      <div class="hx-rail" role="list">${RAIL.map(([i, t, s, h, c, tag]) => `<a class="hx-card" role="listitem" href="${h}" style="--c:${c}">${tag ? `<span class="hx-tag">${tag}</span>` : ''}<span class="hx-ci">${i}</span><b>${t}</b><small>${s}</small><span class="hx-go">Open →</span></a>`).join('')}</div></section>`;
  }
  function tryHTML() {
    return `<section class="hx-sec card hx-try" id="hxTry"><div class="hx-row"><h2 class="hx-h">⚡ 30-second challenge</h2><span class="hx-score" id="hxScore"></span></div>
      <p class="muted" style="margin:0 0 10px">Der, die or das? Tap the right article – no sign-up needed.</p><div id="hxQ"></div></section>`;
  }
  function wordHTML() {
    const v = wordOfDay(); if (!v) return '';
    const g = (/^(der|die|das)\s/.exec(v[0]) || [])[1];
    return `<section class="hx-sec card hx-word"><div class="hx-row"><span class="hx-wlbl">📅 Word of the day</span><a class="hx-more" href="#/trainer">More words →</a></div>
      <div class="hx-wmain"><button class="say-btn big" type="button" data-say="${attr(v[0])}" aria-label="Listen">🔊</button><div><b class="hx-w ${g ? 'g-' + g : ''}">${esc(v[0])}</b><span class="hx-wen">${esc(v[2])}</span></div></div>
      <p class="hx-ex"><button class="say-btn sm" type="button" data-say="${attr(v[3])}" aria-label="Listen">🔊</button> <span lang="de">${esc(v[3])}</span>${v[4] ? `<br><small>${esc(v[4])}</small>` : ''}</p></section>`;
  }
  function proofHTML() {
    return `<div class="hx-proof"><span><b>100%</b> free</span><span><b>A1 → B1</b> in 12 weeks</span><span><b>📲</b> works offline</span><span><b>🔊</b> audio for every word</span></div>`;
  }

  /* 30-second challenge: 5 nouns, instant feedback, then a path into the course */
  function mountTry(root) {
    const box = $('#hxQ', root); if (!box) return;
    const pool = GL.shuffle(nouns()).slice(0, 5); let i = 0, ok = 0;
    const end = () => {
      const msg = ok === 5 ? 'Perfekt! 🏆 You’re a natural.' : ok >= 3 ? 'Sehr gut! 👍 You’re getting it.' : 'Good start! 💪 The course makes it easy.';
      box.innerHTML = `<div class="hx-end"><div class="hx-big">${ok}/5</div><b>${msg}</b><div class="hx-endbtns"><a class="btn green" href="#/games/dash">🎯 Play the full game</a><a class="btn gold" href="#/day/1">🚀 Start lesson 1</a></div><button class="hx-again" type="button">↻ Try again</button></div>`;
      if (ok >= 4) GL.confetti && GL.confetti(80);
      if (GL.Game) { Store.addXP(ok * 2); GL.Game.count('game', 1); }
      $('.hx-again', box).onclick = () => mountTry(root);
    };
    const ask = () => {
      if (!document.body.contains(box)) return;
      if (i >= pool.length) return end();
      const n = pool[i];
      $('#hxScore', root).textContent = `${i + 1}/5 · ✅ ${ok}`;
      box.innerHTML = `<div class="hx-qw"><span class="hx-noun">${esc(n.w)}</span><small>${esc(n.en)}</small></div><div class="hx-arts">${['der', 'die', 'das'].map((a) => `<button class="hx-art ${a}" type="button" data-a="${a}">${a}</button>`).join('')}</div><div class="hx-bar"><i style="width:${(i / pool.length) * 100}%"></i></div>`;
      $$('.hx-art', box).forEach((b) => (b.onclick = () => {
        const good = b.dataset.a === n.art; if (good) ok++;
        $$('.hx-art', box).forEach((x) => { x.disabled = true; x.classList.toggle('right', x.dataset.a === n.art); });
        if (!good) b.classList.add('wrong');
        GL.sfx && GL.sfx(good ? 'ok' : 'bad'); if (good && GL.Game) GL.Game.burst(b);
        Speech.speak(`${n.art} ${n.w}`);
        i++; setTimeout(ask, good ? 650 : 1200);
      }));
    };
    ask();
  }

  /* sticky "start" pill on phones for first-time visitors, shown after the hero scrolls away */
  function mountSticky(app) {
    const hero = $('.hero', app); if (!hero || !('IntersectionObserver' in window)) return;
    const pill = document.createElement('a'); pill.className = 'hx-sticky'; pill.href = '#/day/1'; pill.innerHTML = '🚀 Start your first free lesson';
    $('.view', app).appendChild(pill);
    const seen = new Map();
    const upd = () => { const h = seen.get(hero), t = seen.get('try'); pill.classList.toggle('show', !!h && !h.isIntersecting && h.boundingClientRect.top < 0 && !(t && t.isIntersecting)); };
    const io = new IntersectionObserver((es) => { es.forEach((e) => seen.set(e.target === hero ? hero : 'try', e)); upd(); }, { threshold: 0 });
    io.observe(hero); const tr = $('#hxTry', app); if (tr) io.observe(tr);
    addEventListener('hashchange', () => io.disconnect(), { once: true });
  }

  /* welcome screen – only on the very first visit (or with ?welcome in the URL) */
  function welcome() {
    const st = Store.state, force = /[?&]welcome\b/.test(location.search);
    if (!force && (st.welcomed || navigator.webdriver || Object.keys(st.days || {}).length || (st.xp || 0) > 0)) return;
    st.welcomed = Date.now(); Store.save();
    const w = document.createElement('div'); w.className = 'hx-welcome'; w.setAttribute('role', 'dialog'); w.setAttribute('aria-label', 'Welcome');
    w.innerHTML = `<div class="hx-wbg" aria-hidden="true">${['Hallo', 'ä', 'Danke', 'ß', 'Tschüss', 'ü', 'Guten Tag', 'ö', 'Bitte'].map((t, k) => `<span style="--k:${k}">${t}</span>`).join('')}</div>
      <div class="hx-wbox"><div class="hx-wchar">${GL.charSVG('bruno', 'idle waving')}</div>
        <h2>Willkommen! 👋</h2><p>Learn German <b>free</b> – from your first “Hallo” to the <b>B1 exam</b>. Lessons, speaking, games and exam practice in one app.</p>
        <p class="hx-wq">What brings you here?</p>
        <div class="hx-wbtns">
          <a class="hx-wb" href="#/day/1"><span>🌱</span><b>I’m a total beginner</b><small>Start lesson 1 now</small></a>
          <a class="hx-wb" href="#/myplan"><span>🎓</span><b>I have an exam</b><small>Get a plan to your date</small></a>
          <a class="hx-wb" href="#/exam"><span>📝</span><b>I know some German</b><small>Try exam practice</small></a>
        </div>
        <button class="hx-skip" type="button">Just look around →</button></div>`;
    const close = () => { w.classList.add('out'); setTimeout(() => w.remove(), 280); };
    w.addEventListener('click', (e) => { if (e.target.closest('a, .hx-skip')) close(); });
    addEventListener('keydown', function k(e) { if (e.key === 'Escape') { close(); removeEventListener('keydown', k); } });
    document.body.appendChild(w);
    requestAnimationFrame(() => w.classList.add('in'));
  }

  function mount(app, first) {
    mountTry(app);
    if (first && matchMedia('(max-width: 640px)').matches) mountSticky(app);
    if (first) welcome();
  }
  GL.HomeX = { goalsHTML, railHTML, tryHTML, wordHTML, proofHTML, mount };
})();
