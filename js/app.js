/* Deutsch in 30 Tagen – views & router */
(function () {
  'use strict';
  const { $, $$, esc, attr, shuffle, sample, rich, Store, Speech, Rec, toast, confetti, speechScore } = GL;
  const app = $('#app');

  /* ---------- course structure ---------- */
  GL.weeks = [
    { n: 1, cls: 'wk1', de: 'Grundlagen', title: 'Foundations', range: [1, 7], desc: 'Sounds, greetings, sein & haben, present tense, articles, accusative, numbers & time.', level: 'A1.1' },
    { n: 2, cls: 'wk2', de: 'Alltag', title: 'Everyday life', range: [8, 14], desc: 'Separable & modal verbs, negation, imperative, dative, all prepositions, pronouns.', level: 'A1.2' },
    { n: 3, cls: 'wk3', de: 'Vergangenheit & Verbindungen', title: 'Past & connections', range: [15, 21], desc: 'Perfekt, Präteritum, conjunctions & word order, reflexive verbs, adjective endings.', level: 'A2' },
    { n: 4, cls: 'wk4', de: 'Flüssig sprechen', title: 'Speaking fluently', range: [22, 30], desc: 'Comparison, genitive, verbs + prepositions, future, Konjunktiv II, relative clauses, passive, zu-infinitives.', level: 'A2–B1' },
  ];
  GL.resources = {
    1: [['DW “Nicos Weg” A1 (free video course)', 'https://learngerman.dw.com/en/nicos-weg/c-36519789'], ['Easy German – “Super Easy German” (YouTube)', 'https://www.youtube.com/@EasyGerman']],
    2: [['Coffee Break German (podcast)', 'https://coffeebreaklanguages.com/coffeebreakgerman/'], ['DW Learn German – A1 exercises', 'https://learngerman.dw.com/en/overview']],
    3: [['DW “Nicos Weg” A2', 'https://learngerman.dw.com/en/nicos-weg/c-36519789'], ['Easy German street interviews (YouTube)', 'https://www.youtube.com/@EasyGerman']],
    4: [['Slow German podcast (Annik Rubens)', 'https://slowgerman.com/'], ['DW “Langsam gesprochene Nachrichten” (slow news)', 'https://www.dw.com/de/deutsch-lernen/nachrichten/s-8030']],
  };
  const weekOf = (n) => GL.weeks.find((w) => n >= w.range[0] && n <= w.range[1]) || GL.weeks[0];

  const STEPS = [
    ['intro', '🎯', 'Overview'],
    ['vocab', '📚', 'Vocabulary'],
    ['grammar', '📘', 'Grammar'],
    ['dialogue', '🎬', 'Dialogue'],
    ['practice', '🧩', 'Exercises'],
    ['speaking', '🎤', 'Speaking'],
    ['writing', '✍️', 'Writing'],
    ['done', '🏁', 'Finish'],
  ];

  const DEFAULT_SCHEDULE = [
    [15, '🔁 Warm-up review', 'Flashcards of earlier words (Review page). Day 1: pronunciation page.', 'review'],
    [25, '📚 Vocabulary', 'Listen to every word, repeat it aloud 3×, always learn the article.', 'vocab'],
    [40, '📘 Grammar', 'Read slowly, say every example aloud, copy the tables by hand.', 'grammar'],
    [20, '🎬 Dialogue & shadowing', 'Listen, shadow line by line, then role-play both characters.', 'dialogue'],
    [30, '🧩 Exercises', 'Aim for 80 %+. Redo the set until mistakes disappear.', 'practice'],
    [20, '🎤 Speaking', 'Speak every phrase with the microphone. Then answer the free question.', 'speaking'],
    [15, '✍️ Writing', 'Write the text, tick the grammar checklist, compare with the model.', 'writing'],
    [15, '🎧 Immersion (optional)', 'Watch/listen to this week’s recommended resource.', null],
  ];

  /* vocab entry: [german, forms, english, example, exampleEnglish] */
  GL.parseVocab = function (v) {
    const [de, forms = '', en = '', ex = '', exEn = ''] = v;
    let gender = GL.genderOf(de);
    const plOnly = /\(Pl\.\)/.test(de);
    return { de, forms, en, ex, exEn, gender: plOnly ? null : gender, cls: plOnly ? 'pl' : gender || 'other', plOnly };
  };
  const sayText = (de) => de.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\//g, ', ').trim();
  function vocabWord(v) {
    const m = /^(der|die|das)\s+(.*)$/i.exec(v.de);
    if (m) return `<span class="art g-${m[1].toLowerCase()}">${m[1]}</span> ${esc(m[2])}`;
    if (v.plOnly) return `<span class="g-pl">${esc(v.de)}</span>`;
    return esc(v.de);
  }

  let cancelToken = 0;
  const cancelAll = () => { cancelToken++; Speech.stop(); Rec.stop(); };

  /* ---------- top bar ---------- */
  GL.updateTopStats = function () {
    const s = $('#stat-streak b'), x = $('#stat-xp b');
    if (!s) return;
    const sv = String(Store.currentStreak()), xv = String(Store.state.xp);
    if (x.textContent !== xv) { x.textContent = xv; x.parentNode.classList.remove('bump'); void x.parentNode.offsetWidth; x.parentNode.classList.add('bump'); }
    s.textContent = sv;
  };
  /* ---------- mobile: bottom tab bar with a "More" sheet ---------- */
  const MORE_PAGES = ['grammar', 'trainer', 'writing', 'review', 'sounds', 'settings', 'profile', 'teacher', 'admin'];
  const TOP_LABELS = { admin: ['📊', 'Teacher portal'], teacher: ['📨', 'My teacher'], profile: ['👤', 'My account'], settings: ['⚙️', 'Settings'] };
  const moreBtn = $('#navMore'), sheet = $('#moreSheet'), backdrop = $('#moreBackdrop');
  function closeMore() {
    if (!sheet || sheet.hidden) return;
    sheet.classList.remove('open'); backdrop.classList.remove('open');
    moreBtn.setAttribute('aria-expanded', 'false');
    setTimeout(() => { if (!sheet.classList.contains('open')) { sheet.hidden = true; backdrop.hidden = true; } }, 220);
  }
  function openMore() {
    const items = [...$$('.nav .nav-sec'), ...$$('.top-stats [data-nav]')].filter((a) => !a.classList.contains('hidden'));
    const cur = (location.hash.replace(/^#\/?/, '').split(/[/#]/)[0]) || 'home';
    sheet.innerHTML = `<div class="sheet-handle" aria-hidden="true"></div><div class="more-grid">${items.map((a) => {
      const k = a.dataset.nav, top = TOP_LABELS[k];
      const ico = top ? top[0] : $('.ico', a).textContent, lbl = top ? top[1] : $('.lbl', a).textContent;
      const nb = $('.nb', a), badge = nb && !nb.classList.contains('hidden') && nb.textContent ? `<span class="nb">${esc(nb.textContent)}</span>` : '';
      return `<a href="${attr(a.getAttribute('href'))}" class="more-item ${k === cur ? 'active' : ''}"><span class="mi-ico">${ico}${badge}</span><span>${esc(lbl)}</span></a>`;
    }).join('')}</div>`;
    sheet.hidden = false; backdrop.hidden = false;
    requestAnimationFrame(() => { sheet.classList.add('open'); backdrop.classList.add('open'); });
    moreBtn.setAttribute('aria-expanded', 'true');
    const first = $('.more-item', sheet); first && first.focus({ preventScroll: true });
  }
  // hide the bottom tab bar while the on-screen keyboard is open (it would cover the text field)
  const isTyping = (el) => el && (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && !/^(checkbox|radio|range|button|submit)$/.test(el.type)) || el.isContentEditable);
  document.addEventListener('focusin', (e) => { if (isTyping(e.target)) document.body.classList.add('kb-open'); });
  document.addEventListener('focusout', () => setTimeout(() => { if (!isTyping(document.activeElement)) document.body.classList.remove('kb-open'); }, 50));
  if (moreBtn) {
    moreBtn.onclick = () => (sheet.hidden ? openMore() : closeMore());
    backdrop.onclick = closeMore;
    sheet.addEventListener('click', (e) => { if (e.target.closest('.more-item')) closeMore(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMore(); });
  }

  function applyTheme() {
    const t = Store.state.settings.theme;
    if (t === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
  }

  /* ---------- router ---------- */
  function route() {
    cancelAll();
    const [path, anchor] = (location.hash.replace(/^#\/?/, '') || '').split('#');
    GL._anchor = anchor || '';
    const parts = path.split('/');
    const [page, a, b] = parts;
    $$('[data-nav]').forEach((l) => l.classList.toggle('active', l.dataset.nav === (page || 'home') || (page === 'day' && l.dataset.nav === 'plan')));
    closeMore();
    if (moreBtn) moreBtn.classList.toggle('active', MORE_PAGES.includes(page));
    let html;
    try {
      if (GL.Accounts && GL.Accounts.needsRegistration() && page !== 'settings') html = GL.viewRegister();
      else switch (page) {
        case '': case undefined: case 'home': html = viewHome(); break;
        case 'plan': html = viewPlan(); break;
        case 'day': html = viewDay(+a || 1, b || 'intro'); break;
        case 'grammar': html = a ? viewTopic(decodeURIComponent(a)) : viewGrammar(); break;
        case 'review': html = viewReview(a || 'cards'); break;
        case 'trainer': html = GL.viewTrainer(a, b); break;
        case 'talk': html = GL.viewTalk(a); break;
        case 'scenes': html = GL.viewScenes(a); break;
        case 'writing': html = GL.viewWriting(a, b); break;
        case 'teacher': html = GL.viewTeacher(); break;
        case 'admin': html = GL.viewAdmin(); break;
        case 'register': html = GL.viewRegister(); break;
        case 'profile': html = GL.viewProfile(); break;
        case 'sounds': html = viewSounds(); break;
        case 'settings': html = viewSettings(); break;
        default: html = viewHome();
      }
    } catch (e) {
      console.error(e);
      html = { html: `<div class="card"><h2>Oops</h2><p>Something went wrong: ${esc(e.message)}</p><a class="btn" href="#/">Home</a></div>` };
    }
    app.innerHTML = `<div class="view">${html.html}</div>`;
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    html.mount && html.mount();
    const steps = $('.steps'), act = $('.step.active');
    if (steps && act) steps.scrollLeft = act.offsetLeft - steps.clientWidth / 2 + act.clientWidth / 2;
    app.focus({ preventScroll: true });
    GL.updateTopStats();
  }

  GL.render = route;

  /* ======================================================
     HOME
     ====================================================== */
  function viewHome() {
    const st = Store.state;
    const next = Store.nextDay();
    const day = GL.days[next - 1];
    const done = Store.doneCount();
    const words = GL.days.filter((d) => st.days[d.day] && st.days[d.day].done).reduce((n, d) => n + (d.vocab || []).length, 0);
    const h = new Date().getHours();
    const greet = h < 11 ? ['Guten Morgen!', 'Good morning!'] : h < 18 ? ['Guten Tag!', 'Good day!'] : ['Guten Abend!', 'Good evening!'];
    const first = done === 0 && !Object.keys(st.days).length;
    const bubbleDe = first
      ? `${greet[0]} Ich heiße Bruno. Ich bin dein Deutschlehrer. Los geht's!`
      : `${greet[0]} Schön, dass du wieder da bist! Heute ist Tag ${next}.`;
    const bubbleEn = first
      ? `${greet[1]} My name is Bruno. I'm your German teacher. Let's go!`
      : `${greet[1]} Nice to have you back! Today is day ${next}.`;

    const heat = [];
    for (let i = 29; i >= 0; i--) {
      const d = GL.todayStr(new Date(Date.now() - i * 864e5));
      const v = st.activity[d] || 0;
      heat.push(`<i class="${v >= 150 ? 'l3' : v >= 60 ? 'l2' : v > 0 ? 'l1' : ''}" title="${d}: ${v} XP"></i>`);
    }

    return {
      html: `
      <div id="homeAcct"></div>
      <section class="card hero">
        <div>${GL.charSVG('bruno', 'idle waving')}</div>
        <div>
          <div class="bubble"><p class="b-de">${bubbleDe} <button class="say-btn" data-say="${attr(bubbleDe)}" data-char="bruno" aria-label="Listen">🔊</button></p><p class="b-en">${bubbleEn}</p></div>
          <h1>Learn German in <span class="flag-word">30 days</span> – step by step.</h1>
          <p>Every day: new words with audio, a complete grammar lesson, an animated dialogue, exercises, speaking practice with your microphone and a writing task. Plan for 2–3 hours a day.</p>
          <div class="row">
            <a class="btn gold big" href="#/day/${next}">${first ? '🚀 Start Day 1' : `▶ Continue: Day ${next}`}</a>
            <a class="btn ghost" href="#/plan" style="background:transparent;color:#fff;border-color:rgba(255,255,255,.35);box-shadow:none">🗺️ See the 30-day plan</a>
          </div>
        </div>
      </section>

      <div class="stats">
        <div class="stat"><span class="s-ico">🔥</span><div><b>${Store.currentStreak()}</b><span>day streak</span></div></div>
        <div class="stat"><span class="s-ico">⭐</span><div><b>${st.xp}</b><span>XP earned</span></div></div>
        <div class="stat"><span class="s-ico">✅</span><div><b>${done}/${GL.days.length}</b><span>days completed</span></div></div>
        <div class="stat"><span class="s-ico">📚</span><div><b>${words}</b><span>words learned</span></div></div>
        <div class="stat"><span class="s-ico">⏱️</span><div><b>${GL.minutesOn(GL.todayStr())} min</b><span>studied today</span></div></div>
      </div>

      <div class="card">
        <h3>☀️ Your practice today</h3>
        <div class="today">
          <a href="#/day/${next}"><span class="t-ico">📅</span><div><b>Day ${next}</b><small>today’s lesson</small></div></a>
          <a href="#/review/cards"><span class="t-ico">🃏</span><div><b>${Store.dueCards()} due</b><small>flashcards to review</small></div></a>
          <a href="#/review/mistakes"><span class="t-ico">❗</span><div><b>${Object.keys(st.mistakes || {}).length}</b><small>mistakes to fix</small></div></a>
          <a href="#/trainer"><span class="t-ico">🏋️</span><div><b>Trainer</b><small>verbs · cases · endings</small></div></a>
          <a href="#/talk"><span class="t-ico">🎤</span><div><b>Speak · ${GL.Speak.today()}/${GL.Speak.GOAL}</b><small>10-minute speaking workout</small></div></a>
          <a href="#/scenes"><span class="t-ico">🎬</span><div><b>Real life</b><small>${GL.scenarios.length} scenes: airport, doctor, bank …</small></div></a>
          <a href="#/writing"><span class="t-ico">✍️</span><div><b>Writing</b><small>AI marks every mistake</small></div></a>
        </div>
      </div>

      ${day ? `<div class="card">
        <div class="row" style="gap:20px;align-items:center">
          <div class="ring" style="--p:${Math.round((done / GL.days.length) * 100)}"><span>${Math.round((done / GL.days.length) * 100)}%</span></div>
          <div style="flex:1;min-width:240px">
            <span class="path-tag">Today · Day ${day.day} · ${esc(day.level)}</span>
            <h2 style="margin:.3em 0">${esc(day.title)}</h2>
            <p class="muted" style="margin:0">${esc(day.subtitle || '')}</p>
            <ul class="goals" style="margin-top:12px">${(day.goals || []).slice(0, 3).map((g) => `<li>${g}</li>`).join('')}</ul>
          </div>
          <a class="btn green big" href="#/day/${day.day}">Let’s go ➜</a>
        </div>
      </div>` : ''}

      <div class="section-title"><span class="badge-ico">🗓️</span><h2 style="margin:0">Your 4 weeks</h2></div>
      <div class="week-strip">${GL.weeks.map((w) => {
        const ds = GL.days.filter((d) => d.day >= w.range[0] && d.day <= w.range[1]);
        const dn = ds.filter((d) => st.days[d.day] && st.days[d.day].done).length;
        return `<a class="week-card ${w.cls}" href="#/plan#w${w.n}"><small>Week ${w.n} · ${w.level}</small><h3>${w.de}</h3><p>${w.desc}</p><div class="wk-bar"><i style="width:${ds.length ? (dn / ds.length) * 100 : 0}%"></i></div><small>${dn}/${ds.length} days</small></a>`;
      }).join('')}</div>

      <div class="grid grid-2" style="margin-top:20px">
        <div class="card">
          <h3>📈 Last 30 days</h3>
          <div class="heat">${heat.join('')}</div>
          <p class="muted" style="margin-top:10px;font-size:.9rem">Every square is a day. Keep the chain green – consistency beats intensity.</p>
        </div>
        <div class="card">
          <h3>🧭 How each day works</h3>
          <ol style="padding-left:1.2em;margin:0">
            <li><b>Words</b> – listen, repeat, learn the article with the noun.</li>
            <li><b>Grammar</b> – clear rules, tables and audio examples.</li>
            <li><b>Dialogue</b> – watch the characters, then role-play.</li>
            <li><b>Exercises</b> – instant feedback and explanations.</li>
            <li><b>Speak & write</b> – your microphone checks your pronunciation.</li>
          </ol>
        </div>
      </div>

      <div class="section-title"><span class="badge-ico">👋</span><h2 style="margin:0">Meet the characters</h2></div>
      <div class="grid grid-4">${['bruno', 'lena', 'max', 'sofia', 'weber', 'yilmaz', 'braun'].map((id) => [id, GL.chars[id]]).map(([id, c]) => `
        <button class="card center meet" data-id="${id}" style="cursor:pointer;margin:0">
          ${GL.charSVG(id, 'idle')}
          <b style="display:block;margin-top:6px">${esc(c.name)}</b><small class="muted">${esc(c.role)}</small>
        </button>`).join('')}</div>
      <p class="foot">Tip: speech works best in Chrome or Edge. Click any 🔊 or dotted German word to hear it.</p>`,
      mount() {
        if (GL.Accounts && GL.Accounts.mountHome) GL.Accounts.mountHome($('#homeAcct'));
        $$('.meet').forEach((b) => (b.onclick = () => {
          const id = b.dataset.id, c = GL.chars[id];
          const lines = {
            bruno: 'Hallo! Ich bin Bruno, ein Bär aus Berlin. Ich helfe dir jeden Tag.',
            lena: 'Hi! Ich bin Lena. Ich komme aus Berlin und ich studiere Biologie.',
            max: 'Moin! Ich heiße Max. Ich komme aus Hamburg und ich spiele gern Fußball.',
            sofia: 'Hola und hallo! Ich bin Sofia aus Spanien. Ich lerne auch Deutsch.',
            weber: 'Guten Tag! Mein Name ist Weber. Ich wohne im ersten Stock.',
            yilmaz: 'Herzlich willkommen im Café Sonnenschein! Was darf es sein?',
            braun: 'Guten Tag, ich bin Doktor Braun. Wie geht es Ihnen heute?',
          };
          const svg = $('svg', b);
          svg.classList.add('waving');
          GL.charSay(svg, lines[id], id).then(() => svg.classList.remove('waving'));
          toast(`${c.name}: “${lines[id]}”`);
        }));
      },
    };
  }

  /* ======================================================
     PLAN
     ====================================================== */
  function viewPlan() {
    const st = Store.state;
    return {
      html: `
      <div class="row" style="align-items:flex-end;margin-bottom:10px">
        <div><h1>🗺️ Your 30-day plan</h1><p class="muted">From your first “Hallo” to relative clauses and the passive. Each day ≈ 2½–3 hours. Days unlock one after another${st.settings.unlockAll ? ' (all unlocked in Settings)' : ' – or unlock everything in Settings'}.</p></div>
      </div>
      ${GL.weeks.map((w) => `
        <section class="week-block" id="w${w.n}">
          <div class="week-head ${w.cls}"><div style="font-size:2rem">${['🌱', '🏙️', '⏳', '🚀'][w.n - 1]}</div><div><h2>Week ${w.n}: ${w.de} <small style="opacity:.8">(${w.title})</small></h2><p>${w.desc}</p></div></div>
          <div class="path">${GL.days.filter((d) => d.day >= w.range[0] && d.day <= w.range[1]).map((d, i) => {
            const ds = st.days[d.day];
            const done = ds && ds.done;
            const unlocked = Store.isUnlocked(d.day);
            const state = done ? 'done' : unlocked ? (d.review ? 'review' : 'available') : 'locked';
            const off = Math.round(Math.sin(i * 0.9) * 70);
            const href = unlocked ? `#/day/${d.day}` : '';
            return `<div class="node-wrap ${state}" style="transform:translateX(${off}px);animation-delay:${i * 0.05}s">
              <a class="node ${state}" ${href ? `href="${href}"` : 'aria-disabled="true"'} title="Day ${d.day}">${unlocked ? d.day : '🔒'}${done ? '<span class="chk">✔</span>' : ''}</a>
              <a class="node-info" ${href ? `href="${href}"` : ''}><span class="path-tag">Day ${d.day}</span><span class="path-tag">${esc(d.level)}</span><b>${esc(d.title)}</b><small>${esc(d.subtitle || '')}</small></a>
            </div>`;
          }).join('')}</div>
          ${GL.resources[w.n] ? `<p class="muted center" style="margin-top:14px">🎧 Immersion this week: ${GL.resources[w.n].map(([t, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(t)}</a>`).join(' · ')}</p>` : ''}
        </section>`).join('')}`,
      mount() {
        $$('.node.locked, .node-wrap.locked .node-info').forEach((n) => n.addEventListener('click', (e) => { e.preventDefault(); toast('🔒 Finish the previous day first (or unlock all days in Settings).'); }));
        const m = /^w(\d)$/.exec(GL._anchor);
        if (m) setTimeout(() => { const el = $('#w' + m[1]); el && el.scrollIntoView({ behavior: 'smooth' }); }, 100);
      },
    };
  }

  /* ======================================================
     DAY
     ====================================================== */
  function viewDay(n, step) {
    const day = GL.days[n - 1];
    if (!day) return { html: `<div class="card"><h2>Day ${n} not found</h2><a class="btn" href="#/plan">Back to plan</a></div>` };
    if (!Store.isUnlocked(n)) {
      return { html: `<div class="card center">${GL.charSVG('bruno', 'idle')}<h2>🔒 Day ${n} is still locked</h2><p>Finish Day ${n - 1} first – grammar builds on the previous day. You can unlock everything in Settings.</p><div class="row" style="justify-content:center"><a class="btn" href="#/day/${n - 1}">Go to Day ${n - 1}</a><a class="btn ghost" href="#/settings">Settings</a></div></div>` };
    }
    const si = Math.max(0, STEPS.findIndex((s) => s[0] === step));
    const cur = STEPS[si][0];
    Store.markStep(n, cur);
    const ds = Store.day(n);
    const visited = STEPS.filter((s) => ds.steps[s[0]]).length;
    const prev = si > 0 ? STEPS[si - 1] : null, nxt = si < STEPS.length - 1 ? STEPS[si + 1] : null;
    const head = `
      <div class="day-head">
        <div class="day-num"><div><small>Tag</small><b>${n}</b></div></div>
        <div style="flex:1"><div class="sub">Week ${weekOf(n).n} · ${esc(day.level)} ${ds.done ? '· ✅ completed' : ''}</div><h1>${esc(day.title)}</h1><div class="muted">${esc(day.subtitle || '')}</div></div>
      </div>
      <nav class="steps" aria-label="Lesson steps">${STEPS.map((s, i) => `<a class="step ${i === si ? 'active' : ''} ${ds.steps[s[0]] ? 'visited' : ''}" href="#/day/${n}/${s[0]}">${s[1]} ${s[2]}</a>`).join('')}</nav>
      <div class="progress" title="Lesson progress"><i style="width:${(visited / STEPS.length) * 100}%"></i></div>`;
    const navBtns = `<div class="step-nav">
      ${prev ? `<a class="btn ghost" href="#/day/${n}/${prev[0]}">← ${prev[2]}</a>` : `<a class="btn ghost" href="#/plan">← Plan</a>`}
      ${nxt ? `<a class="btn" href="#/day/${n}/${nxt[0]}">${nxt[2]} →</a>` : (GL.days[n] ? `<a class="btn green" href="#/day/${n + 1}">Day ${n + 1} →</a>` : '')}
    </div>`;
    const body = STEP_VIEWS[cur](day, n);
    return {
      html: `${head}<div class="card" style="margin-top:16px" id="stepBody">${body.html}</div>${cur === 'done' ? '' : navBtns}`,
      mount: body.mount,
    };
  }

  const STEP_VIEWS = {
    intro(day, n) {
      const sched = day.schedule || DEFAULT_SCHEDULE;
      const total = sched.reduce((a, s) => a + s[0], 0);
      const wk = weekOf(n);
      return {
        html: `
        ${GL.charBubble(day.host || 'bruno', day.intro[0], day.intro[1], { wave: true })}
        <div class="grid grid-2">
          <div>
            <h3>🎯 Today you will be able to…</h3>
            <ul class="goals">${day.goals.map((g, i) => `<li style="animation-delay:${i * 0.07}s">${g}</li>`).join('')}</ul>
            ${day.culture ? `<div class="note" style="margin-top:18px"><b>Kultur-Tipp:</b> ${day.culture}</div>` : ''}
          </div>
          <div>
            <h3>⏱️ Today’s study plan <small class="muted">(≈ ${Math.floor(total / 60)} h ${total % 60} min)</small></h3>
            <div class="schedule">${sched.map((s, i) => `
              <div class="sched-row">
                <span class="mins">${s[0]} min</span>
                <div><b>${s[1]}</b><small>${s[2]}</small></div>
                <div class="row" style="gap:6px">
                  <button class="btn tiny ghost" data-timer="${s[0]}" data-label="${attr(s[1])}" title="Start a ${s[0]}-minute timer">⏱️</button>
                  ${s[3] === 'review' ? `<a class="btn tiny ghost" href="#/${n === 1 ? 'sounds' : 'review'}">Go</a>` : s[3] ? `<a class="btn tiny ghost" href="#/day/${n}/${s[3]}">Go</a>` : ''}
                </div>
              </div>`).join('')}</div>
            ${GL.resources[wk.n] ? `<p class="muted" style="margin-top:10px;font-size:.9rem">🎧 This week: ${GL.resources[wk.n].map(([t, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(t)}</a>`).join(' · ')}</p>` : ''}
          </div>
        </div>`,
      };
    },

    vocab(day, n) {
      const vs = day.vocab.map(GL.parseVocab);
      return {
        html: `
        <div class="row" style="justify-content:space-between">
          <div><h2 style="margin:0">📚 Wortschatz – ${vs.length} words</h2><p class="muted" style="margin:0">Click 🔊 to listen. Say every word out loud three times.</p></div>
          <div class="row">
            <button class="btn green small" id="vPlay">▶ Play all</button>
            <button class="btn ghost small" id="vHide">🙈 Test me (hide English)</button>
          </div>
        </div>
        <div class="legend" style="margin:14px 0"><span class="bg-der">der = masculine</span><span class="bg-die">die = feminine</span><span class="bg-das">das = neuter</span><span class="bg-pl">plural only</span><span class="bg-other">verbs, adjectives & phrases</span></div>
        ${day.vocabNote ? `<div class="tip">${day.vocabNote}</div>` : ''}
        <div class="vocab-grid" id="vGrid">${vs.map((v, i) => `
          <div class="vcard ${v.cls}" style="animation-delay:${Math.min(i, 20) * 0.03}s" data-i="${i}">
            <button class="say-btn" data-say="${attr(sayText(v.de))}" aria-label="Listen">🔊</button>
            <div class="v-main">
              <div class="v-de">${vocabWord(v)}</div>
              ${v.forms ? `<div class="v-forms">${esc(v.forms)}</div>` : ''}
              <div class="v-en">${esc(v.en)}</div>
              ${v.ex ? `<div class="v-ex"><span class="say" data-say="${attr(v.ex)}">${esc(v.ex)}</span>${v.exEn ? `<br><span class="ln-en">${esc(v.exEn)}</span>` : ''}</div>` : ''}
            </div>
          </div>`).join('')}</div>
        <p class="muted" style="margin-top:14px">💡 Plural endings are shown under each noun (e.g. <b>die Tische</b>). Verbs show irregular forms when they matter.</p>`,
        mount() {
          const grid = $('#vGrid');
          $('#vHide').onclick = (e) => { grid.classList.toggle('hide-en'); e.target.textContent = grid.classList.contains('hide-en') ? '👀 Show English' : '🙈 Test me (hide English)'; };
          $('#vPlay').onclick = async () => {
            const my = ++cancelToken;
            const cards = $$('.vcard', grid);
            for (let i = 0; i < vs.length; i++) {
              if (my !== cancelToken) break;
              cards.forEach((c) => c.classList.remove('playing'));
              cards[i].classList.add('playing');
              cards[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
              await Speech.speak(sayText(vs[i].de));
              await GL.sleep(700);
            }
            cards.forEach((c) => c.classList.remove('playing'));
          };
        },
      };
    },

    grammar(day) {
      return {
        html: day.grammar.map((id) => {
          const t = GL.grammar[id];
          if (!t) return `<p>Missing topic ${esc(id)}</p>`;
          return `<section class="gram-topic gram"><h2>${esc(t.title)} <span class="level ${t.level}">${t.level}</span></h2>
            ${t.de ? `<p class="muted" style="margin-top:-6px">${esc(t.de)}</p>` : ''}
            ${rich(t.html)}
            <p style="margin-top:14px"><a href="#/grammar/${encodeURIComponent(id)}">📘 Open in Grammar A–Z</a></p><div class="ask-slot" data-topic="${attr(id)}"></div></section>`;
        }).join('') + `<div class="tip" style="margin-top:20px"><b>Study tip:</b> click every example to hear it, then say it aloud. Copy the tables into a notebook – writing by hand helps grammar stick. Then drill it in the <a href="#/trainer">Grammar Trainer</a>.</div>`,
        mount() { $$('.ask-slot').forEach((el) => GL.Tutor.mountAsk(el, GL.grammar[el.dataset.topic])); },
      };
    },

    dialogue(day) {
      const dl = day.dialogues || [day.dialogue];
      return {
        html: dl.map((d, i) => `<div id="dlg${i}" ${i ? 'style="margin-top:34px;border-top:3px dashed var(--line);padding-top:20px"' : ''}></div>`).join(''),
        mount() {
          const ctrls = dl.map((d, i) => GL.Dialogue.render($('#dlg' + i), d));
          const my = cancelToken;
          const iv = setInterval(() => { if (my !== cancelToken) { ctrls.forEach((c) => c.stop()); clearInterval(iv); } }, 300);
          if (!Store.state.settings.showEn) $$('#stepBody .lines').forEach((l) => l.classList.add('hide-en'));
        },
      };
    },

    practice(day, n) {
      const build = () => {
        const auto = GL.Exercises.autoFromVocab(day);
        const match = auto.filter((q) => q.t === 'match');
        const gender = auto.filter((q) => q.t === 'gender');
        const listen = auto.filter((q) => q.t === 'listen');
        return [...match, ...gender.slice(0, 2), ...day.exercises, ...gender.slice(2), ...listen];
      };
      const ds = Store.day(n);
      return {
        html: `<div id="exRoot"><div class="center">
          ${GL.charSVG('bruno', 'idle')}
          <h2>🧩 Practice time!</h2>
          <p>${day.exercises.length + 5} exercises: matching, articles, gap-fills, sentence building, translation and dictation.<br>Wrong answers come back once at the end.</p>
          ${ds.best ? `<p><span class="score-badge ${ds.best >= 80 ? '' : ds.best >= 50 ? 'mid' : 'low'}">Best: ${ds.best}%</span></p>` : ''}
          <button class="btn green big" id="exStart">Start ➜</button>
        </div></div>`,
        mount() {
          $('#exStart').onclick = () => GL.Exercises.run($('#exRoot'), build(), {
            reshuffle: build,
            nextLabel: 'Speaking practice ➜',
            onNext: () => (location.hash = `#/day/${n}/speaking`),
            day: n,
            onFinish: (pct) => { const d = Store.day(n); d.best = Math.max(d.best || 0, pct); Store.save(); },
          });
        },
      };
    },

    speaking(day, n) {
      const items = day.speaking;
      return {
        html: `
        <div class="row" style="justify-content:space-between"><div><h2 style="margin:0">🎤 Sprechen – speak out loud</h2>
        <p class="muted" style="margin:0">Listen 🔊, repeat slowly 🐢, then press 🎤 and say it. Green words were understood.</p></div></div>
        ${Rec.supported ? '' : `<div class="warn">Your browser doesn’t support speech recognition. Use <b>Chrome</b> or <b>Edge</b> for automatic feedback – or record yourself with the ⏺ button and compare.</div>`}
        <div style="margin-top:14px" id="spList">${items.map((p, i) => `
          <div class="speak-item" style="animation-delay:${i * 0.05}s" data-i="${i}">
            <div><div class="sp-de">${esc(p[0])}</div><div class="sp-en">${esc(p[1] || '')}</div></div>
            <div class="row" style="gap:6px">
              <button class="say-btn" data-say="${attr(p[0])}" aria-label="Listen">🔊</button>
              <button class="say-btn" data-say="${attr(p[0])}" data-slow aria-label="Listen slowly">🐢</button>
              ${Rec.supported ? `<button class="btn small rec" data-rec="${i}">🎤</button>` : `<button class="btn small rec" data-record="${i}">⏺</button>`}
            </div>
            <div class="sp-res"></div>
          </div>`).join('')}</div>
        ${day.speakTask ? `
          <div class="card" style="margin-top:20px;background:var(--bg2)">
            <h3>🗣️ Free speaking: ${esc(day.speakTask.q)}</h3>
            <p class="muted">${esc(day.speakTask.en)}</p>
            <p>Speak for 1–2 minutes. Use today’s grammar! ${Rec.supported ? 'Press 🎤 to see a transcript of what you said.' : ''}</p>
            <div class="row">${Rec.supported ? '<button class="btn rec" id="freeRec">🎤 Speak freely</button>' : ''}<button class="btn ghost" id="showModel">👀 Show a model answer</button></div>
            <div id="freeRes"></div>
            <textarea class="txt-in" id="freeText" rows="3" style="margin-top:10px" placeholder="${Rec.supported ? 'Your transcript appears here – you can also type your answer.' : 'Type what you said to check it.'}"></textarea>
            <div id="freeAi" style="margin-top:10px"></div>
            <div id="modelAns" class="hidden" style="margin-top:12px">${GL.charBubble('bruno', esc(day.speakTask.model), '', {})}</div>
          </div>` : ''}`,
        mount() {
          const list = $('#spList');
          list.addEventListener('click', async (e) => {
            const b = e.target.closest('[data-rec]');
            const r = e.target.closest('[data-record]');
            if (b) {
              const i = +b.dataset.rec;
              const res = $(`.speak-item[data-i="${i}"] .sp-res`, list);
              b.classList.add('listening'); b.textContent = '👂';
              try {
                const alts = await Rec.listen();
                const best = alts.map((a) => ({ a, s: speechScore(items[i][0], a) })).sort((x, y) => y.s.score - x.s.score)[0];
                res.innerHTML = GL.Dialogue.scoreHTML(best.s, best.a);
                if (best.s.score >= 80) { Store.addXP(3); }
              } catch (err) { res.innerHTML = `<p class="muted">${GL.Dialogue.micError(err)}</p>`; }
              b.classList.remove('listening'); b.textContent = '🎤';
            } else if (r) {
              recordSelf(r, $(`.speak-item[data-i="${r.dataset.record}"] .sp-res`, list));
            }
          });
          const fr = $('#freeRec');
          if (fr) fr.onclick = async () => {
            fr.classList.add('listening'); fr.textContent = '👂 Listening…';
            try { const alts = await Rec.listen(); const ft = $('#freeText'); ft.value = (ft.value ? ft.value + ' ' : '') + alts[0]; $('#freeRes').innerHTML = `<p class="muted">Compare with the model answer. Did you use the verb in position 2? The right articles?</p>`; Store.addXP(5); }
            catch (err) { $('#freeRes').innerHTML = `<p class="muted">${GL.Dialogue.micError(err)}</p>`; }
            fr.classList.remove('listening'); fr.textContent = '🎤 Speak again';
          };
          const fa = $('#freeAi');
          if (fa) GL.Tutor.mountCorrector(fa, () => $('#freeText').value, { task: day.speakTask.q, taskEn: day.speakTask.en, level: GL.Tutor.levelOfDay(n) });
          const sm = $('#showModel');
          if (sm) sm.onclick = () => $('#modelAns').classList.toggle('hidden');
        },
      };
    },

    writing(day, n) {
      const w = day.writing;
      const saved = Store.state.writing[n] || '';
      return {
        html: `
        <h2>✍️ Schreiben</h2>
        <div class="rule"><b>${esc(w.task)}</b><br><span class="muted">${esc(w.en)}</span></div>
        <textarea class="write" id="wText" placeholder="Schreib hier … (your text is saved automatically on this device)">${esc(saved)}</textarea>
        <div class="row" style="margin:8px 0 16px"><span class="muted" id="wCount"></span><span class="spacer"></span>
          <button class="btn ghost small" id="wRead">🔊 Read my text aloud</button></div>
        <div id="wAi" style="margin-bottom:10px"></div>
        <div id="wTeacher" style="margin-bottom:16px"></div>
        <h3>✅ Grammar checklist</h3>
        <ul class="checklist">${w.check.map((c, i) => `<li><label><input type="checkbox" data-c="${i}"> <span>${c}</span></label></li>`).join('')}</ul>
        <div class="row" style="margin-top:16px"><button class="btn purple" id="wModel">👀 Show model answer</button></div>
        <div class="card model hidden" id="wModelBox" style="margin-top:14px;box-shadow:none">
          <h3>Model answer</h3><p style="white-space:pre-line">${esc(w.model)}</p>
          <button class="btn ghost small" data-say="${attr(w.model)}">🔊 Listen</button>
        </div>`,
        mount() {
          const t = $('#wText');
          const upd = () => {
            const words = t.value.trim().split(/\s+/).filter(Boolean).length;
            const sents = (t.value.match(/[.!?](\s|$)/g) || []).length;
            $('#wCount').textContent = `${words} words · ${sents} sentences`;
            Store.state.writing[n] = t.value; Store.save();
          };
          t.addEventListener('input', upd); upd();
          $('#wRead').onclick = () => Speech.speak(t.value || 'Du hast noch nichts geschrieben.');
          $('#wModel').onclick = () => $('#wModelBox').classList.toggle('hidden');
          GL.Tutor.mountCorrector($('#wAi'), () => t.value, { task: w.task, taskEn: w.en, level: GL.Tutor.levelOfDay(n) });
          GL.sendToTeacherButton($('#wTeacher'), () => t.value, `Day ${n} – writing: ${w.task}`);
        },
      };
    },

    done(day, n) {
      const ds = Store.day(n);
      const vis = STEPS.slice(0, -1).filter((s) => ds.steps[s[0]]);
      const missing = STEPS.slice(0, -1).filter((s) => !ds.steps[s[0]]);
      const nextDay = GL.days[n];
      return {
        html: `<div class="done-wrap">
          <div id="doneChar">${GL.charSVG('bruno', ds.done ? 'happy waving' : 'idle')}</div>
          <h2>${ds.done ? `🎉 Tag ${n} geschafft!` : `Almost there – finish Day ${n}`}</h2>
          <p class="muted">${esc(day.title)}</p>
          <div class="badges">
            ${STEPS.slice(0, -1).map((s, i) => `<span class="badge" style="animation-delay:${i * 0.07}s;${ds.steps[s[0]] ? '' : 'opacity:.4'}">${s[1]} ${s[2]} ${ds.steps[s[0]] ? '✔' : ''}</span>`).join('')}
          </div>
          ${ds.best ? `<p>Best exercise score: <span class="score-badge ${ds.best >= 80 ? '' : ds.best >= 50 ? 'mid' : 'low'}">${ds.best}%</span></p>` : ''}
          ${missing.length && !ds.done ? `<p class="muted">You haven’t opened: ${missing.map((s) => `<a href="#/day/${n}/${s[0]}">${s[2]}</a>`).join(', ')}. You can still finish now.</p>` : ''}
          <div class="card" style="text-align:left;max-width:620px;margin:16px auto;box-shadow:none;background:var(--bg2)">
            <h3>🧠 Recap of today</h3>
            <ul style="margin:0;padding-left:1.2em">${(day.recap || day.goals).map((g) => `<li>${g}</li>`).join('')}</ul>
          </div>
          <div class="row" style="justify-content:center;margin-top:10px">
            ${ds.done ? '' : `<button class="btn green big" id="finishDay">✅ Complete Day ${n} (+100 XP)</button>`}
            ${nextDay ? `<a class="btn ${ds.done ? 'green big' : 'ghost'}" href="#/day/${n + 1}" id="nextDayBtn" ${ds.done ? '' : 'style="display:none"'}>Day ${n + 1}: ${esc(nextDay.title)} →</a>` : `<a class="btn gold big" href="#/review">🏆 Course finished – keep reviewing!</a>`}
            <a class="btn ghost" href="#/review">🔁 Review words</a>
          </div>
          ${n === GL.days.length ? `<div class="card cert-wrap" id="certCard" style="margin-top:20px;${ds.done ? '' : 'display:none'}">
            <h3>🎓 Your certificate</h3>
            <div class="row" style="justify-content:center"><input class="txt-in" id="certName" placeholder="Your name" value="${attr(Store.state.settings.name || '')}" style="max-width:280px"><button class="btn gold" id="certSave">⬇ Save certificate</button></div>
            <canvas id="certCanvas" width="1400" height="990" aria-label="Course certificate"></canvas>
          </div>` : ''}
        </div>`,
        mount() {
          const f = $('#finishDay');
          if (f) f.onclick = () => {
            Store.completeDay(n);
            confetti();
            const svg = $('#doneChar svg');
            svg.classList.add('happy', 'waving');
            GL.charSay(svg, `Super! Tag ${n} ist geschafft. Ich bin stolz auf dich!`, 'bruno');
            f.remove();
            const nb = $('#nextDayBtn');
            if (nb) { nb.style.display = ''; nb.classList.remove('ghost'); nb.classList.add('green', 'big'); }
            $('.done-wrap h2').textContent = `🎉 Tag ${n} geschafft!`;
            toast('+100 XP – Day complete! 🎉', 'ok');
            GL.sfx('done');
            const cc = $('#certCard');
            if (cc) { cc.style.display = ''; drawCertificate(); }
          };
          if ($('#certCanvas')) {
            drawCertificate();
            $('#certName').oninput = (e) => { Store.state.settings.name = e.target.value; Store.save(); drawCertificate(); };
            $('#certSave').onclick = () => $('#certCanvas').toBlob((b) => GL.saveFile('Deutsch-in-30-Tagen-Zertifikat.png', b, 'image/png'));
          }
        },
      };
    },
  };

  /* Course certificate drawn on a canvas. */
  function drawCertificate() {
    const c = $('#certCanvas');
    if (!c) return;
    const x = c.getContext('2d'), W = c.width, H = c.height;
    const name = (Store.state.settings.name || '').trim() || 'Your Name';
    x.fillStyle = '#fffaf0'; x.fillRect(0, 0, W, H);
    x.strokeStyle = '#1f2a48'; x.lineWidth = 14; x.strokeRect(30, 30, W - 60, H - 60);
    x.strokeStyle = '#ffc23c'; x.lineWidth = 4; x.strokeRect(58, 58, W - 116, H - 116);
    [['#222', 0], ['#dd0000', 1], ['#ffce00', 2]].forEach(([col, i]) => { x.fillStyle = col; x.fillRect(W / 2 - 90, 110 + i * 22, 180, 22); });
    x.textAlign = 'center'; x.fillStyle = '#1f2a48';
    x.font = '600 74px Fredoka, Nunito, sans-serif'; x.fillText('Zertifikat', W / 2, 290);
    x.font = '600 30px Nunito, sans-serif'; x.fillStyle = '#5a6480'; x.fillText('Deutsch in 30 Tagen – this certifies that', W / 2, 360);
    x.font = '700 84px Fredoka, Nunito, sans-serif'; x.fillStyle = '#e63946'; x.fillText(name, W / 2, 480);
    x.fillStyle = '#1f2a48'; x.font = '600 32px Nunito, sans-serif';
    x.fillText('has completed all 30 days of the German course:', W / 2, 560);
    x.font = '400 28px Nunito, sans-serif'; x.fillStyle = '#5a6480';
    x.fillText(`${GL.days.reduce((a, d) => a + d.vocab.length, 0)} words · ${Object.keys(GL.grammar).length} grammar topics · ${Store.state.xp} XP earned`, W / 2, 610);
    x.fillText('from „Hallo“ to Konjunktiv II, relative clauses and the passive', W / 2, 655);
    x.font = '600 30px Nunito, sans-serif'; x.fillStyle = '#1f2a48';
    x.fillText(new Date().toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }), W / 2 - 330, 840);
    x.fillText('Bruno, Kursleiter', W / 2 + 330, 840);
    x.strokeStyle = '#1f2a48'; x.lineWidth = 2;
    x.beginPath(); x.moveTo(W / 2 - 480, 800); x.lineTo(W / 2 - 180, 800); x.moveTo(W / 2 + 180, 800); x.lineTo(W / 2 + 480, 800); x.stroke();
    x.font = '90px serif'; x.fillText('🐻', W / 2, 860);
  }

  /* Record-yourself fallback (MediaRecorder) when speech recognition is unavailable. */
  async function recordSelf(btn, out) {
    if (!navigator.mediaDevices || !window.MediaRecorder) { out.innerHTML = '<p class="muted">Recording is not supported in this browser. Say it out loud anyway!</p>'; return; }
    if (btn._rec) { btn._rec.stop(); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      const chunks = [];
      rec.ondataavailable = (e) => chunks.push(e.data);
      rec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const url = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType }));
        out.innerHTML = `<div class="heard">Your recording: <audio controls src="${url}"></audio> – compare it with 🔊.</div>`;
        btn._rec = null; btn.textContent = '⏺'; btn.classList.remove('listening');
      };
      rec.start(); btn._rec = rec; btn.textContent = '⏹'; btn.classList.add('listening');
      setTimeout(() => btn._rec === rec && rec.stop(), 8000);
    } catch (e) { out.innerHTML = '<p class="muted">Microphone access was blocked.</p>'; }
  }

  /* ---------- study timer (floating) ---------- */
  let timer = null;
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-timer]');
    if (!b) return;
    startTimer(+b.dataset.timer, b.dataset.label);
  });
  function startTimer(min, label) {
    clearInterval(timer && timer.iv);
    let el = $('#timerFloat');
    if (!el) {
      el = document.createElement('div');
      el.id = 'timerFloat';
      el.style.cssText = 'position:fixed;right:16px;bottom:86px;z-index:70;background:var(--card);border:2px solid var(--line);border-radius:18px;padding:10px 14px;box-shadow:var(--shadow);display:flex;gap:10px;align-items:center;animation:popIn .4s';
      document.body.appendChild(el);
    }
    const end = Date.now() + min * 60000;
    const tick = () => {
      const left = Math.max(0, end - Date.now());
      const m = Math.floor(left / 60000), s = Math.floor((left % 60000) / 1000);
      el.innerHTML = `<div><small class="muted" style="display:block;font-weight:800">${esc(label)}</small><span class="timer">${m}:${String(s).padStart(2, '0')}</span></div><button class="btn tiny ghost" id="tClose" aria-label="Stop timer">✖</button>`;
      $('#tClose', el).onclick = () => { clearInterval(timer.iv); el.remove(); timer = null; };
      if (left <= 0) { clearInterval(timer.iv); toast('⏰ Zeit ist um! Time for the next block.', 'ok'); Speech.speak('Zeit ist um! Weiter geht’s.', { char: 'bruno' }); }
    };
    timer = { iv: setInterval(tick, 1000) };
    tick();
    toast(`⏱️ ${min}-minute timer started`);
  }

  /* ======================================================
     GRAMMAR A–Z
     ====================================================== */
  function topicList() {
    return Object.entries(GL.grammar).map(([id, t]) => Object.assign({ id }, t));
  }
  function viewGrammar() {
    const all = topicList();
    return {
      html: `
      <h1>📘 Grammar A–Z</h1>
      <p class="muted">Every grammar topic of the course in one place – from articles to the passive. Search, filter by level, or browse in course order.</p>
      <input class="search" id="gSearch" placeholder="🔎 Search: e.g. dative, Perfekt, weil, adjective endings …" autocomplete="off">
      <div class="row" style="margin:14px 0">
        <div class="chips" id="gLevel">${['All', 'A1', 'A2', 'B1'].map((l, i) => `<button class="chip ${i ? '' : 'on'}" data-l="${l}">${l}</button>`).join('')}</div>
        <span class="spacer"></span>
        <div class="chips" id="gSort"><button class="chip on" data-s="az">A → Z</button><button class="chip" data-s="day">By course day</button></div>
      </div>
      <div id="gList"></div>
      <div class="card" style="margin-top:24px">
        <h3>🧭 The big picture: German grammar in 8 ideas</h3>
        <ol>
          <li><b>Every noun has a gender</b> (der/die/das) – learn it with the word.</li>
          <li><b>Four cases</b> (Nominativ, Akkusativ, Dativ, Genitiv) show the role of a noun – mostly visible on the article.</li>
          <li><b>The conjugated verb is in position 2</b> in main clauses.</li>
          <li><b>The second verb part goes to the end</b> (infinitive, participle, separable prefix) – the “sentence bracket”.</li>
          <li><b>In subordinate clauses the conjugated verb goes to the very end.</b></li>
          <li><b>Adjective endings</b> depend on gender, case and the article before them.</li>
          <li><b>Past in speech = Perfekt</b> (haben/sein + participle); written stories use Präteritum.</li>
          <li><b>Konjunktiv II</b> (würde, hätte, wäre, könnte) is for politeness, wishes and “if” situations.</li>
        </ol>
      </div>`,
      mount() {
        let level = 'All', sort = 'az', q = '';
        const draw = () => {
          const nq = q.toLowerCase();
          let items = all.filter((t) => (level === 'All' || t.level === level) && (!nq || (t.title + ' ' + (t.de || '') + ' ' + (t.summary || '') + ' ' + GL.stripTags(t.html)).toLowerCase().includes(nq)));
          let html = '';
          if (sort === 'az') {
            items.sort((a, b) => a.title.localeCompare(b.title));
            let letter = '';
            let group = [];
            const flush = () => { if (group.length) html += `<div class="letter">${letter}</div><div class="grid grid-3">${group.join('')}</div>`; group = []; };
            items.forEach((t) => {
              const L = t.title[0].toUpperCase();
              if (L !== letter) { flush(); letter = L; }
              group.push(card(t));
            });
            flush();
          } else {
            items.sort((a, b) => (a.day || 99) - (b.day || 99));
            html = `<div class="grid grid-3">${items.map(card).join('')}</div>`;
          }
          $('#gList').innerHTML = html || '<p class="muted">No topic found.</p>';
        };
        const card = (t) => `<a class="topic-card" href="#/grammar/${encodeURIComponent(t.id)}"><span class="level ${t.level}">${t.level}</span> ${t.day ? `<span class="path-tag">Day ${t.day}</span>` : '<span class="path-tag">Reference</span>'}<b>${esc(t.title)}</b><small>${esc(t.summary || t.de || '')}</small></a>`;
        $('#gSearch').oninput = (e) => { q = e.target.value; draw(); };
        $('#gLevel').onclick = (e) => { const b = e.target.closest('.chip'); if (!b) return; level = b.dataset.l; $$('#gLevel .chip').forEach((c) => c.classList.toggle('on', c === b)); draw(); };
        $('#gSort').onclick = (e) => { const b = e.target.closest('.chip'); if (!b) return; sort = b.dataset.s; $$('#gSort .chip').forEach((c) => c.classList.toggle('on', c === b)); draw(); };
        draw();
      },
    };
  }
  function viewTopic(id) {
    const t = GL.grammar[id];
    if (!t) return { html: `<div class="card"><h2>Topic not found</h2><a class="btn" href="#/grammar">Grammar A–Z</a></div>` };
    const all = topicList().sort((a, b) => (a.day || 99) - (b.day || 99) || a.title.localeCompare(b.title));
    const i = all.findIndex((x) => x.id === id);
    const prev = all[i - 1], next = all[i + 1];
    return {
      html: `<p><a href="#/grammar">← Grammar A–Z</a></p>
      <div class="card gram">
        <h1>${esc(t.title)} <span class="level ${t.level}">${t.level}</span></h1>
        ${t.de ? `<p class="muted">${esc(t.de)}${t.day ? ` · taught on <a href="#/day/${t.day}/grammar">Day ${t.day}</a>` : ''}</p>` : ''}
        ${rich(t.html)}
        ${t.day ? `<div class="row" style="margin-top:18px"><button class="btn green" id="tPractice">🧩 Practise this (Day ${t.day} exercises)</button><a class="btn ghost" href="#/trainer">🏋️ Grammar Trainer</a></div><div id="tPracticeRoot" style="margin-top:16px"></div>` : ''}
        <div class="ask-slot" id="topicAsk"></div>
        <p class="hidden" id="askTeacher" style="margin-top:12px"><a class="btn ghost small" href="#/teacher">📨 Ask my teacher about this topic</a></p>
      </div>
      <div class="step-nav">${prev ? `<a class="btn ghost" href="#/grammar/${encodeURIComponent(prev.id)}">← ${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a class="btn ghost" href="#/grammar/${encodeURIComponent(next.id)}">${esc(next.title)} →</a>` : ''}</div>`,
      mount() {
        GL.Tutor.mountAsk($('#topicAsk'), t);
        GL.Cloud.init.then(() => { const p = $('#askTeacher'); if (p && GL.Cloud.ready && !GL.Cloud.owner) { p.classList.remove('hidden'); $('a', p).onclick = () => { GL.teacherDraft = { type: 'question', context: 'Grammar: ' + t.title }; }; } });
        const b = $('#tPractice');
        if (b) b.onclick = () => {
          const d = GL.days[t.day - 1];
          const r = $('#tPracticeRoot');
          GL.Exercises.run(r, shuffle(d.exercises).slice(0, 12), { day: t.day, reshuffle: () => shuffle(d.exercises).slice(0, 12) });
          r.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
      },
    };
  }

  /* ======================================================
     REVIEW (flashcards / quiz / word list)
     ====================================================== */
  const INTERVALS = [0, 1, 2, 4, 8, 16, 32]; // days per Leitner box
  function poolDays() {
    const st = Store.state;
    const ds = GL.days.filter((d) => st.days[d.day] && (st.days[d.day].done || Object.keys(st.days[d.day].steps || {}).length));
    return ds.length ? ds : GL.days.slice(0, 1);
  }
  function viewReview(tab) {
    const tabs = [['cards', '🃏 Flashcards'], ['mistakes', `❗ My mistakes (${Object.keys(Store.state.mistakes || {}).length})`], ['quiz', '🧩 Mixed quiz'], ['words', '📖 Word list']];
    const days = poolDays();
    return {
      html: `<h1>🔁 Wiederholen – Review</h1>
      <p class="muted">Spaced repetition: words you know come back less often, difficult words more often. Content from the days you have started (${days.length} day${days.length > 1 ? 's' : ''}).</p>
      <div class="chips tabs-row" style="margin-bottom:18px">${tabs.map(([k, l]) => `<a class="chip ${k === tab ? 'on' : ''}" href="#/review/${k}" style="text-decoration:none">${l}</a>`).join('')}</div>
      <div id="revRoot"></div>`,
      mount() {
        const root = $('#revRoot');
        if (tab === 'quiz') reviewQuiz(root, days);
        else if (tab === 'words') reviewWords(root, days);
        else if (tab === 'mistakes') reviewMistakes(root);
        else reviewCards(root, days);
      },
    };
  }
  function reviewCards(root, days) {
    const srs = Store.state.srs;
    const now = Date.now();
    const words = [];
    days.forEach((d) => d.vocab.forEach((v) => words.push(Object.assign(GL.parseVocab(v), { day: d.day }))));
    const due = words.filter((w) => srs[w.de] && srs[w.de].due <= now);
    const fresh = words.filter((w) => !srs[w.de]);
    let deck = shuffle(due).concat(shuffle(fresh).slice(0, Math.max(0, 20 - due.length)));
    let dir = 'de';
    const boxes = [1, 2, 3, 4, 5, 6].map((b) => words.filter((w) => srs[w.de] && srs[w.de].box === b).length);
    let i = 0;
    let known = 0;
    const draw = () => {
      if (!deck.length || i >= deck.length) {
        root.innerHTML = `<div class="card center">${GL.charSVG('bruno', 'happy waving')}<h2>${deck.length ? 'Session complete! 🎉' : 'Nothing due right now ✨'}</h2>
          <p class="muted">${deck.length ? `You reviewed ${deck.length} cards (${known} known).` : 'All your cards are scheduled for later. Come back tomorrow – or learn new words in today’s lesson.'}</p>
          <div class="row" style="justify-content:center"><a class="btn" href="#/review/quiz">🧩 Mixed quiz</a><a class="btn ghost" href="#/day/${Store.nextDay()}">Today’s lesson</a></div></div>`;
        if (deck.length) confetti(80);
        return;
      }
      const w = deck[i];
      const front = dir === 'de' ? `<div class="f-word">${vocabWord(w)}</div><div class="f-sub">${esc(w.forms)}</div>` : `<div class="f-word">${esc(w.en)}</div><div class="f-sub">Say it in German – with the article!</div>`;
      const back = `<div class="f-word">${vocabWord(w)}</div><div class="f-sub">${esc(w.forms)}</div><div style="margin-top:10px;font-weight:700">${esc(w.en)}</div>${w.ex ? `<div class="f-sub" style="margin-top:10px">„${esc(w.ex)}“</div>` : ''}`;
      root.innerHTML = `
        <div class="row" style="justify-content:center;margin-bottom:10px">
          <span class="pill">🃏 ${i + 1} / ${deck.length}</span>
          <button class="chip ${dir === 'de' ? 'on' : ''}" id="dDe">DE → EN</button><button class="chip ${dir === 'en' ? 'on' : ''}" id="dEn">EN → DE</button>
        </div>
        <div class="boxes">${boxes.map((n, k) => `<span title="Leitner box ${k + 1}">📦${k + 1}: ${n}</span>`).join('')}</div>
        <div class="flash-wrap"><div class="flash" id="flash">
          <div class="face front ${w.gender || ''}">${front}<p class="muted" style="margin-top:16px;font-size:.85rem">Click to flip</p></div>
          <div class="face back ${w.gender || ''}">${back}</div>
        </div></div>
        <div class="row" style="justify-content:center;margin-top:18px">
          <button class="btn ghost" id="fSay">🔊</button>
          <button class="btn red" id="fAgain">😕 Again</button>
          <button class="btn" id="fGood">🙂 Good</button>
          <button class="btn green" id="fEasy">😎 Easy</button>
        </div>
        <p class="center muted" style="font-size:.85rem;margin-top:10px">Keys: <span class="kbd">Space</span> flip · <span class="kbd">1</span> again · <span class="kbd">2</span> good · <span class="kbd">3</span> easy</p>`;
      const fl = $('#flash');
      fl.onclick = () => { fl.classList.toggle('flipped'); if (fl.classList.contains('flipped') && dir === 'en') Speech.speak(sayText(w.de)); };
      if (dir === 'de') Speech.speak(sayText(w.de));
      $('#fSay').onclick = () => Speech.speak(sayText(w.de));
      const grade = (g) => {
        const cur = srs[w.de] || { box: 0 };
        let box = g === 0 ? 1 : Math.min(6, cur.box + (g === 2 ? 2 : 1));
        srs[w.de] = { box, due: Date.now() + (g === 0 ? 0 : INTERVALS[box] * 864e5 - 36e5) };
        if (g === 0) deck.push(w); else { known++; Store.addXP(1); }
        Store.save();
        i++;
        draw();
      };
      $('#fAgain').onclick = () => grade(0);
      $('#fGood').onclick = () => grade(1);
      $('#fEasy').onclick = () => grade(2);
      $('#dDe').onclick = () => { dir = 'de'; draw(); };
      $('#dEn').onclick = () => { dir = 'en'; draw(); };
    };
    const key = (e) => {
      if (!$('#flash')) { document.removeEventListener('keydown', key); return; }
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.code === 'Space') { e.preventDefault(); $('#flash').click(); }
      if (e.key === '1') $('#fAgain').click();
      if (e.key === '2') $('#fGood').click();
      if (e.key === '3') $('#fEasy').click();
    };
    document.addEventListener('keydown', key);
    draw();
  }
  function reviewMistakes(root) {
    const list = Store.mistakeList();
    if (!list.length) {
      root.innerHTML = `<div class="card center">${GL.charSVG('bruno', 'happy waving')}<h2>No mistakes saved ✨</h2><p class="muted">Every exercise you answer wrong is collected here automatically. Answer it right once and it disappears.</p><a class="btn" href="#/day/${Store.nextDay()}/practice">🧩 Practise today’s exercises</a></div>`;
      return;
    }
    const q2txt = (q) => GL.stripTags(q.q || q.en || q.a || q.w || '').slice(0, 90);
    root.innerHTML = `<div class="card"><div class="row"><div style="flex:1;min-width:0"><h2 style="margin:0">❗ ${list.length} mistake${list.length > 1 ? 's' : ''} to fix</h2>
      <p class="muted" style="margin:0">The ones you got wrong most often come first. Practise them until the list is empty.</p></div>
      <button class="btn green big" id="mStart">Practise ${Math.min(15, list.length)} ➜</button></div>
      <div class="gtable-wrap" style="margin-top:14px"><table class="gtable"><thead><tr><th>Exercise</th><th>Type</th><th>Wrong</th><th>Day</th></tr></thead><tbody>
      ${list.slice(0, 40).map((m) => `<tr><td>${esc(q2txt(m.q))}</td><td>${esc(GL.Exercises.KIND[m.q.t] || '')}</td><td>${m.n}×</td><td>${m.day ? `<a href="#/day/${m.day}/grammar">${m.day}</a>` : '–'}</td></tr>`).join('')}
      </tbody></table></div></div>`;
    $('#mStart').onclick = () => GL.Exercises.run(root, list.slice(0, 15).map((m) => m.q), { mistakeMode: true, noMistakes: false, onFinish: () => {} });
  }
  function reviewQuiz(root, days) {
    const build = () => {
      const pool = [];
      days.forEach((d) => d.exercises.forEach((q) => pool.push(q)));
      const auto = days.flatMap((d) => GL.Exercises.autoFromVocab(d).filter((q) => q.t === 'gender'));
      return shuffle(sample(pool, 15).concat(sample(auto, 5)));
    };
    root.innerHTML = `<div class="card center">${GL.charSVG('bruno', 'idle')}<h2>🧩 Mixed quiz</h2><p>20 random questions from the days you have studied – grammar, word order, translation and articles.</p><button class="btn green big" id="qStart">Start ➜</button></div>`;
    $('#qStart').onclick = () => GL.Exercises.run(root, build(), { reshuffle: build });
  }
  function reviewWords(root, days) {
    const words = [];
    days.forEach((d) => d.vocab.forEach((v) => words.push(Object.assign(GL.parseVocab(v), { day: d.day }))));
    root.innerHTML = `<input class="search" id="wSearch" placeholder="🔎 Search German or English …"><div class="gtable-wrap" style="margin-top:14px"><table class="gtable"><thead><tr><th></th><th>Deutsch</th><th>Forms</th><th>English</th><th>Day</th></tr></thead><tbody id="wBody"></tbody></table></div>`;
    const draw = (q = '') => {
      const nq = q.toLowerCase();
      $('#wBody').innerHTML = words.filter((w) => !nq || (w.de + ' ' + w.en).toLowerCase().includes(nq)).map((w) =>
        `<tr><td><button class="say-btn" data-say="${attr(sayText(w.de))}">🔊</button></td><td>${vocabWord(w)}</td><td class="muted">${esc(w.forms)}</td><td>${esc(w.en)}</td><td><a href="#/day/${w.day}/vocab">${w.day}</a></td></tr>`).join('');
    };
    $('#wSearch').oninput = (e) => draw(e.target.value);
    draw();
  }

  /* ======================================================
     PRONUNCIATION
     ====================================================== */
  function viewSounds() {
    const S = GL.sounds;
    return {
      html: `<h1>🗣️ Aussprache – Pronunciation</h1>
      <p class="muted">German is spelled the way it sounds – learn these rules once and you can read any word. Click everything!</p>
      <div class="card"><h2>🔤 Das Alphabet</h2><div class="alpha">${S.alphabet.map(([l, name, hint]) => `<button data-say="${attr(name)}" class="${/[ÄÖÜß]/.test(l) ? 'special' : ''}"><b>${l}</b><small>${esc(hint)}</small></button>`).join('')}</div>
      <p class="muted" style="margin-top:12px">Spelling your name is a classic exam task: <span class="say" data-say="Wie schreibt man das?">„Wie schreibt man das?“</span> – How do you spell that?</p></div>
      ${S.groups.map((g) => `<div class="card gram"><h2>${g.title}</h2>${g.intro ? `<p>${g.intro}</p>` : ''}
        <div class="gtable-wrap"><table class="gtable"><thead><tr><th>Spelling</th><th>Sounds like</th><th>Examples (click)</th></tr></thead><tbody>
        ${g.rows.map((r) => `<tr><td><b style="font-size:1.15rem">${esc(r[0])}</b></td><td>${r[1]}</td><td>${r[2].map((w) => `<span class="say" data-say="${attr(w)}">${esc(w)}</span>`).join(', ')}</td></tr>`).join('')}
        </tbody></table></div>${g.tip ? `<div class="tip">${g.tip}</div>` : ''}</div>`).join('')}
      <div class="card" id="pairs"><h2>👂 Listening game: minimal pairs</h2><p>Listen and choose the word you hear. These pairs differ by only one sound!</p><div id="mpRoot"></div></div>
      <div class="card"><h2>🎵 Word stress & melody</h2>
        <ul><li>Most German words are stressed on the <b>first syllable</b>: <span class="say" data-say="Arbeit">ARbeit</span>, <span class="say" data-say="Mutter">MUTter</span>, <span class="say" data-say="Abend">Abend</span>.</li>
        <li>Separable prefixes are stressed: <span class="say" data-say="aufstehen">AUFstehen</span>, <span class="say" data-say="einkaufen">EINkaufen</span>. Inseparable ones are not: <span class="say" data-say="verstehen">verSTEHen</span>, <span class="say" data-say="besuchen">beSUchen</span>.</li>
        <li>Words ending in <b>-ieren</b>, <b>-ion</b>, <b>-tät</b>, <b>-ei</b> are stressed at the end: <span class="say" data-say="studieren">studIEren</span>, <span class="say" data-say="Station">StatiON</span>, <span class="say" data-say="Universität">UniversiTÄT</span>, <span class="say" data-say="Bäckerei">BäckeREI</span>.</li>
        <li>Questions with W-words go <b>down</b> at the end; yes/no questions go <b>up</b>: <span class="say" data-say="Wo wohnst du?">Wo wohnst du? ↘</span> · <span class="say" data-say="Wohnst du in Berlin?">Wohnst du in Berlin? ↗</span></li></ul>
      </div>`,
      mount() { minimalPairs($('#mpRoot')); },
    };
  }
  function minimalPairs(root) {
    const pairs = shuffle(GL.sounds.pairs);
    let i = 0, score = 0;
    const draw = () => {
      if (i >= pairs.length) { root.innerHTML = `<p><b>${score} / ${pairs.length}</b> correct. ${score >= pairs.length * 0.8 ? 'Super Ohren! 👂✨' : 'Play again to train your ear.'}</p><button class="btn" id="mpAgain">🔁 Again</button>`; $('#mpAgain').onclick = () => minimalPairs(root); return; }
      const p = pairs[i];
      const target = p[Math.random() < 0.5 ? 0 : 1];
      root.innerHTML = `<div class="row"><button class="btn round" id="mpPlay">🔊</button><span class="pill">${i + 1}/${pairs.length}</span><span class="muted">${esc(p[2] || '')}</span></div>
        <div class="opts" style="grid-template-columns:1fr 1fr;margin-top:12px">${shuffle([p[0], p[1]]).map((w) => `<button class="opt center" data-w="${attr(w)}">${esc(w)}</button>`).join('')}</div><div id="mpFb"></div>`;
      $('#mpPlay').onclick = () => Speech.speak(target);
      setTimeout(() => Speech.speak(target), 200);
      $$('.opt', root).forEach((b) => (b.onclick = () => {
        const ok = b.dataset.w === target;
        if (ok) score++;
        $$('.opt', root).forEach((x) => { x.disabled = true; if (x.dataset.w === target) x.classList.add('right'); else if (x === b) x.classList.add('wrong'); });
        $('#mpFb').innerHTML = `<div class="feedback ${ok ? 'ok' : 'bad'}">${ok ? 'Richtig!' : 'It was: ' + esc(target)} <button class="btn tiny ghost" data-say="${attr(p[0])}">🔊 ${esc(p[0])}</button> <button class="btn tiny ghost" data-say="${attr(p[1])}">🔊 ${esc(p[1])}</button> <button class="btn small" id="mpNext">Next ➜</button></div>`;
        $('#mpNext').onclick = () => { i++; draw(); };
      }));
    };
    draw();
  }

  /* ======================================================
     SETTINGS
     ====================================================== */
  function viewSettings() {
    const s = Store.state.settings;
    return {
      html: `<h1>⚙️ Settings</h1>
      <div class="card">
        <h2>🔊 Audio</h2>
        <div class="set-row"><label><b>German voice</b><small id="voiceInfo"></small></label><select id="sVoice"></select></div>
        <div class="set-row"><label for="sRate"><b>Speaking speed</b><small>Slower is great at the beginning.</small></label><div class="row"><input type="range" id="sRate" min="0.5" max="1.3" step="0.05" value="${s.rate}"><span id="rateVal" class="pill">${s.rate}×</span><button class="btn small ghost" id="sTest">▶ Test</button></div></div>
        <div class="set-row"><label><b>Speech recognition</b><small>${Rec.supported ? '✅ Supported in this browser. Allow microphone access when asked.' : '❌ Not supported here – use Chrome or Edge on desktop/Android for pronunciation scoring.'}</small></label></div>
      </div>
      <div class="card">
        <h2>🎓 Learning</h2>
        <div class="set-row"><label><b>Unlock all days</b><small>Normally each day unlocks after the previous one.</small></label><label class="switch"><input type="checkbox" id="sUnlock" ${s.unlockAll ? 'checked' : ''}><span></span></label></div>
        <div class="set-row"><label><b>Show English translations in dialogues</b><small>Turn off to challenge yourself (hover to peek).</small></label><label class="switch"><input type="checkbox" id="sEn" ${s.showEn ? 'checked' : ''}><span></span></label></div>
        <div class="set-row"><label><b>Sound effects</b><small>Short sounds for right and wrong answers.</small></label><label class="switch"><input type="checkbox" id="sSfx" ${s.sfx ? 'checked' : ''}><span></span></label></div>
        <div class="set-row"><label><b>Theme</b></label><select id="sTheme">${[['auto', 'Automatic'], ['light', 'Light'], ['dark', 'Dark']].map(([v, l]) => `<option value="${v}" ${s.theme === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div>
      </div>
      <div class="card">
        <h2>💾 Progress</h2>
        <p class="muted">Your progress is stored in this browser only. Export it to move to another device.</p>
        <div class="row"><button class="btn ghost" id="sExport">⬇ Export progress</button><label class="btn ghost" style="cursor:pointer">⬆ Import<input type="file" id="sImport" accept="application/json" hidden></label><button class="btn red" id="sReset">🗑 Reset everything</button></div>
      </div>
      <div class="card">
        <h2>ℹ️ About this course</h2>
        <p>30 days × 2–3 hours ≈ 75 hours of focused study. That is enough to build a solid <b>A1–A2 foundation and meet every core B1 grammar structure</b>: you will understand how German sentences work and be able to hold everyday conversations. Real fluency comes from using it every day after these 30 days – keep reviewing, keep speaking.</p>
        <p class="muted">Audio uses your device’s built-in German text-to-speech voice. For the most natural voice use Chrome (Google Deutsch), Edge (Microsoft Katja/Conrad Online) or Safari (Anna).</p>
      </div>`,
      mount() {
        const fill = () => {
          const sel = $('#sVoice');
          if (!sel) return;
          const vs = Speech.voices;
          sel.innerHTML = `<option value="">Automatic (best available)</option>` + vs.map((v) => `<option value="${attr(v.voiceURI)}" ${v.voiceURI === s.voice ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('');
          $('#voiceInfo').textContent = vs.length ? `${vs.length} German voice(s) found on this device.` : 'No German voice found yet. On Windows: Settings → Time & Language → Speech → add German. On Android: install Google TTS German.';
        };
        fill();
        document.addEventListener('gl:voices', fill);
        $('#sVoice').onchange = (e) => { s.voice = e.target.value; Store.save(); Speech.speak('Hallo! So klinge ich.'); };
        $('#sRate').oninput = (e) => { s.rate = +e.target.value; $('#rateVal').textContent = s.rate + '×'; Store.save(); };
        $('#sTest').onclick = () => Speech.speak('Guten Tag! Ich heiße Bruno. Wie geht es dir?', { char: 'bruno' });
        $('#sUnlock').onchange = (e) => { s.unlockAll = e.target.checked; Store.save(); toast(s.unlockAll ? '🔓 All days unlocked' : '🔒 Step-by-step mode'); };
        $('#sEn').onchange = (e) => { s.showEn = e.target.checked; Store.save(); };
        $('#sTheme').onchange = (e) => { s.theme = e.target.value; Store.save(); applyTheme(); };
        $('#sSfx').onchange = (e) => { s.sfx = e.target.checked; Store.save(); GL.sfx('ok'); };
        $('#sExport').onclick = () => GL.saveFile(`deutsch30-progress-${GL.todayStr()}.json`, JSON.stringify(Store.state, null, 2), 'application/json');
        $('#sImport').onchange = (e) => {
          const f = e.target.files[0];
          if (!f) return;
          f.text().then((t) => { Store.importJSON(JSON.parse(t)); toast('✅ Progress imported', 'ok'); route(); }).catch(() => toast('❌ Invalid file', 'bad'));
        };
        const rb = $('#sReset');
        rb.onclick = () => {
          if (!rb.dataset.armed) { rb.dataset.armed = '1'; rb.textContent = '⚠️ Click again to delete all progress'; setTimeout(() => { if (rb.isConnected) { delete rb.dataset.armed; rb.textContent = '🗑 Reset everything'; } }, 4000); return; }
          Store.reset(); applyTheme(); toast('Progress reset'); route();
        };
      },
    };
  }

  /* ---------- boot ---------- */
  applyTheme();
  window.addEventListener('hashchange', route);
  route();
})();
