/* MY PERSONAL PLAN (#/myplan) – a short questionnaire (goal, exam, level – with an optional 2-minute check –, exam date,
   days per week, minutes per day, weak skills) → analysis → "This is your plan": the A1→B1 roadmap fitted exactly into the
   days until the exam. Lessons too long for one sitting are split, spare days become review days, the last days are exam
   week (mocks, official model test, light review), and weak skills get extra practice. Saved: Store.state.myplan. */
(function () {
  'use strict';
  const { $, $$, esc, attr, Store } = GL;
  const P = () => Store.state.myplan || null;
  const DAY = 864e5;
  const ds = (d) => GL.todayStr(d);
  const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d, 12); };
  const addD = (s, n) => ds(new Date(parse(s).getTime() + n * DAY));
  const diffD = (a, b) => Math.round((parse(b) - parse(a)) / DAY);
  const WD = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'], WDE = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const DAYSETS = { 1: [6], 2: [3, 6], 3: [1, 3, 5], 4: [1, 2, 4, 6], 5: [1, 2, 3, 4, 5], 6: [1, 2, 3, 4, 5, 6], 7: [0, 1, 2, 3, 4, 5, 6] };
  const START_WEEK = { zero: 1, little: 2, a1: 5, a2: 9 };
  const TARGET_WEEK = { A1: 4, A2: 8, B1: 12 };
  const LEVEL_NAME = { zero: 'complete beginner', little: 'beginner (some A1)', a1: 'A1', a2: 'A2' };
  const WEAK = {
    listen: ['🎧', 'Listening', [['listen', 'numbers', '🎧 Listening gym: numbers & times', 15], ['listen', 'everyday', '🎧 Everyday audio clip', 15], ['listen', 'dictation', '📝 Dictation', 15]]],
    speak: ['🗣️', 'Speaking', [['convo', '', '🗨️ Conversation with a character', 15], ['talk', '', '🎤 Speaking workout', 15], ['talk', 'shadow', '🔁 Shadowing', 15]]],
    write: ['✍️', 'Writing', [['hunt', '', '🕵️ Mistake hunt', 10], ['writing', '', '✍️ Write a text with the coach', 25]]],
    read: ['📖', 'Reading', [['read', '', '📖 A text in the reading room', 15], ['life', '', '📄 Read a real letter (Living in Germany)', 15]]],
    grammar: ['🧩', 'Grammar', [['trainer', '', '🏋️ Grammar trainer', 15], ['review', 'quiz', '🧩 Grammar quiz', 15]]],
    vocab: ['🔤', 'Vocabulary', [['review', 'cards', '🃏 Flashcards', 15], ['games', 'dash', '🎯 Der·Die·Das Dash', 10], ['words', '', '🔤 Exam words', 15]]],
  };
  const HREF = { listen: (v) => `#/listen${v ? '/' + v : ''}`, convo: () => '#/talk/convo', talk: (v) => `#/talk${v ? '/' + v : ''}`, hunt: () => '#/writing/hunt', life: () => '#/life', trainer: () => '#/trainer', daily: () => '#/daily', official: (v) => `#/exam/format/${v}`, rest: () => '#/', read: () => '#/read', games: (v) => `#/games${v ? '/' + v : ''}`, words: (v) => `#/exam/words${v ? '/' + v : ''}` };
  const ICONS = { listen: '🎧', convo: '🗨️', talk: '🎤', hunt: '🕵️', life: '🇩🇪', trainer: '🏋️', daily: '⚡', official: '📄', rest: '😴', read: '📖', games: '🎮' };
  const href = (it) => (HREF[it.type] ? HREF[it.type](it.v) : GL.Exam ? GL.Exam.itemHref([it.type, it.v]) : '#/');
  const icon = (it) => ICONS[it.type] || (GL.Exam && GL.Exam.ICON[it.type]) || '•';
  const hash = (s) => { let h = 7; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; };

  /* ---------- the plan generator ---------- */
  function units(a) {
    const W = (GL.exam && GL.exam.weeks) || [];
    let s = START_WEEK[a.level] || 1, e = TARGET_WEEK[a.target] || 12;
    if (s > e) s = e; // already at/above the target level: only the exam-prep week of that level
    const cap = a.mins;
    const parts = cap >= 120 ? 1 : cap >= 70 ? 2 : 3;
    const out = [];
    W.filter((w) => w.n >= s && w.n <= e).forEach((w) => w.days.forEach((day, di) => day.forEach(([type, v, label, min]) => {
      if (type === 'day' && min > cap * 1.25 && parts > 1) {
        const P2 = [[`${v}/vocab`, 'words & grammar'], [`${v}/dialogue`, 'dialogue, exercises, speaking & writing']];
        const P3 = [[`${v}/vocab`, 'words'], [`${v}/grammar`, 'grammar'], [`${v}/dialogue`, 'dialogue, exercises, speaking & writing']];
        (parts === 2 ? P2 : P3).forEach(([vv, what], k, arr) => out.push({ type, v: vv, label: `Course Day ${v} · part ${k + 1}/${arr.length}: ${what}`, min: Math.round(min / arr.length), week: w.n, grp: `${w.n}-${di}` }));
      } else out.push({ type, v, label, min: min || 20, week: w.n, grp: `${w.n}-${di}` });
    })));
    out.forEach((u, i) => (u.key = 'u' + i));
    return out;
  }
  function examWeek(a) {
    const lv = a.target, mock = lv === 'B1' && a.exam === 'telc' ? 'telc-B1' : lv;
    return [
      [['format', lv, `ℹ️ Re-read the ${lv} format & strategies`, 20], ['mock', mock, `🏁 Mock exam ${mock.replace('-', ' ')} – reading & listening`, 70]],
      [['mock', mock, `🏁 Mock exam ${mock.replace('-', ' ')} – writing`, 50], ['convo', '', '🗣️ Speaking simulator for your exam', 25]],
      [['official', lv, `📄 Official free model test (${a.exam === 'telc' ? 'telc.net' : 'goethe.de'}) – do it timed`, 100]],
      [['review', 'mistakes', '❗ Go through all your mistakes', 30], ['notes', lv === 'A1' ? 4 : lv === 'A2' ? 8 : 11, '📝 Read your notes sheets', 20], ['redemittel', 0, '💬 Useful phrases for writing & speaking', 20]],
      [['notes', 12, '📝 Exam-day checklist', 15], ['review', 'cards', '🃏 Light flashcard review – then rest!', 15]],
    ];
  }
  function generate(a, from, skip) {
    const all = units(a).filter((u) => !(skip || []).includes(u.key));
    const cap = a.mins, set = DAYSETS[a.days] || DAYSETS[6];
    const totalMin = all.reduce((s, u) => s + u.min, 0);
    // study dates
    let end = a.date ? addD(a.date, -1) : null;
    const dates = [];
    if (end) { for (let d = from; diffD(d, end) >= 0 && dates.length < 800; d = addD(d, 1)) if (set.includes(parse(d).getDay())) dates.push(d); }
    else {
      const needDays = Math.ceil(totalMin / cap * 1.12) + 6;
      for (let d = from; dates.length < needDays && dates.length < 800; d = addD(d, 1)) if (set.includes(parse(d).getDay())) dates.push(d);
      end = dates[dates.length - 1] || from;
    }
    const exWeek = a.date ? examWeek(a) : [];
    const R = a.date ? Math.min(exWeek.length, Math.max(1, Math.round(dates.length * 0.08)), Math.max(0, dates.length - 3)) : 0;
    const studyDates = dates.slice(0, dates.length - R), examDates = dates.slice(dates.length - R);
    const avail = studyDates.length;
    const load = avail ? totalMin / avail : totalMin;
    const ratio = avail ? totalMin / (avail * cap) : 9;
    const target = Math.max(cap, load);
    const reviewN = ratio < 0.95 ? Math.max(0, avail - Math.ceil(totalMin / cap)) : Math.floor(avail / 14);
    const reviewIdx = new Set();
    for (let k = 1; k <= reviewN; k++) reviewIdx.add(Math.min(avail - 1, Math.round((k * avail) / (reviewN + 1))));
    const weakList = (a.weak || []).filter((w) => WEAK[w]);
    const extras = (i) => { if (!weakList.length) return null; const w = WEAK[weakList[i % weakList.length]]; const it = w[2][Math.floor(i / weakList.length) % w[2].length]; return { type: it[0], v: it[1], label: it[2], min: it[3], extra: true }; };
    const scenes = (GL.scenarios || []).filter((s) => !s.track).map((s) => s.id);
    const days = []; let ui = 0, ei = 0;
    studyDates.forEach((d, i) => {
      if (reviewIdx.has(i) || ui >= all.length) {
        const items = [{ type: 'daily', v: '', label: '⚡ Daily mix', min: 15 }, { type: 'review', v: 'mistakes', label: '❗ Repeat your mistakes', min: 15 }, { type: 'review', v: 'cards', label: '🃏 Flashcards', min: 15 }];
        const x = extras(ei++); if (x) items.push(x);
        if (scenes.length) items.push({ type: 'scene', v: scenes[hash(d) % scenes.length], label: '🎬 A real-life scene for fun', min: 15 });
        let m = 0; days.push({ date: d, kind: 'review', items: items.filter((it) => (m += it.min) <= Math.max(cap, 45) + 5).map((it, k) => Object.assign(it, { key: `r${d}-${k}` })) });
        return;
      }
      const items = []; let m = 0;
      while (ui < all.length && (m === 0 || m + all[ui].min <= target * 1.12)) { items.push(all[ui]); m += all[ui].min; ui++; }
      if (m + 15 <= cap && weakList.length) { const x = extras(ei++); if (x) { x.key = `x${d}`; items.push(x); m += x.min; } }
      days.push({ date: d, kind: 'study', items });
    });
    // leftovers (packing) → spread over the last study days
    let back = days.filter((x) => x.kind === 'study').reverse(), bi = 0;
    while (ui < all.length && back.length) { back[bi % back.length].items.push(all[ui++]); bi++; }
    examDates.forEach((d, i) => { const tpl = exWeek[exWeek.length - examDates.length + i]; days.push({ date: d, kind: 'exam', items: tpl.map(([type, v, label, min], k) => ({ type, v, label, min, key: `e${d}-${k}` })) }); });
    days.forEach((x) => (x.min = x.items.reduce((s, it) => s + (it.min || 0), 0)));
    const maxDayMin = Math.max(0, ...days.map((x) => x.min));
    const sugMins = avail ? Math.ceil(totalMin / avail / 15) * 15 : cap;
    const sugDate = addD(from, Math.ceil((totalMin / cap) / set.length * 7 * 1.1) + 7);
    return { days, totalMin, avail, ratio, load: Math.round(load), maxDayMin, sugMins, sugDate, from, end, count: all.length, studyDays: dates.length };
  }
  const feas = (g) => (g.ratio <= 0.85 ? ['comfy', '👍', 'Comfortable', 'You have enough time – the plan includes extra review days.'] : g.ratio <= 1.1 ? ['good', '✅', 'Realistic', 'Fits your time well. Stay consistent and you will make it.'] : g.ratio <= 1.5 ? ['tight', '💪', 'Intense', `You need about ${g.load} minutes on each study day. Try ${g.sugMins} min/day or plan your exam a little later.`] : ['hard', '🔥', 'Very intense', `This needs about ${g.load} min per study day – more than you have. Better: more time per day (${g.sugMins} min), more days per week, a later exam date (from ${new Date(parse(g.sugDate)).toLocaleDateString()}) or a lower level first.`]);

  /* ---------- done state ---------- */
  function isDone(it) {
    const p = P(); if (!p) return false;
    if (p.done && p.done[it.key]) return true;
    if (it.type === 'day') { const n = parseInt(it.v, 10); return !!(Store.state.days[n] && Store.state.days[n].done); }
    if (GL.Exam && ['task', 'scene', 'mock'].includes(it.type)) return GL.Exam.autoDone([it.type, it.v]);
    return false;
  }
  const plan = () => { const p = P(); if (!p) return null; if (!p._g || p._gk !== JSON.stringify([p.a, p.from, p.skip])) { Object.defineProperty(p, '_g', { value: generate(p.a, p.from, p.skip), writable: true, configurable: true, enumerable: false }); Object.defineProperty(p, '_gk', { value: JSON.stringify([p.a, p.from, p.skip]), writable: true, configurable: true, enumerable: false }); } return p._g; };

  /* ---------- placement check ---------- */
  const PT = [
    ['A1', '___ heißt du?', ['Wie', 'Was', 'Wer']], ['A1', 'Ich ___ aus Indien.', ['komme', 'kommst', 'kommt']], ['A1', 'Ich habe ___ Bruder.', ['einen', 'ein', 'eine']],
    ['A2', 'Gestern ___ ich ins Kino gegangen.', ['bin', 'habe', 'war']], ['A2', 'Ich lerne Deutsch, ___ ich in Deutschland arbeiten möchte.', ['weil', 'denn', 'deshalb']], ['A2', 'Ich fahre mit ___ Bus zur Arbeit.', ['dem', 'den', 'der']],
    ['B1', 'Wenn ich mehr Zeit ___, würde ich mehr reisen.', ['hätte', 'habe', 'hatte']], ['B1', 'Das ist der Mann, ___ ich gestern geholfen habe.', ['dem', 'den', 'der']], ['B1', 'Das Haus ___ 1990 gebaut.', ['wurde', 'wird', 'ist']],
  ];

  /* ---------- wizard ---------- */
  const Q = [
    { k: 'goal', q: 'What is your main goal?', sub: 'So I know what to focus on.', opts: [['exam', '🎓', 'Pass an exam'], ['life', '🇩🇪', 'Live & work in Germany'], ['both', '🎯', 'Both']] },
    { k: 'exam', q: 'Which exam?', sub: 'Both are accepted for visas, citizenship and jobs.', opts: [['goethe', '🏛️', 'Goethe-Zertifikat'], ['telc', '📘', 'telc Deutsch'], ['unsure', '🤷', 'Not sure yet']] },
    { k: 'target', q: 'Which level do you need?', sub: 'B1 is the level for citizenship and many jobs; A1/A2 for family visas and residence.', opts: [['A1', '🌱', 'A1'], ['A2', '🚀', 'A2'], ['B1', '🎓', 'B1']] },
    { k: 'level', q: 'How much German do you know now?', sub: 'Not sure? Take the 2-minute check.', opts: [['zero', '🥚', 'Nothing yet'], ['little', '🐣', 'A little (some A1)'], ['a1', '🐥', 'A1 finished'], ['a2', '🦅', 'A2 finished'], ['test', '🧪', 'Not sure – test me']] },
    { k: 'date', q: 'When is your exam?', sub: 'I will fit the whole plan into the days until then.', date: true },
    { k: 'days', q: 'How many days a week can you study?', sub: 'Be honest – a plan you can keep beats a perfect plan.', opts: [[2, '2', 'days'], [3, '3', 'days'], [4, '4', 'days'], [5, '5', 'days'], [6, '6', 'days'], [7, '7', 'days']] },
    { k: 'mins', q: 'How much time per study day?', sub: 'Including lessons, practice and review.', opts: [[30, '⏱️', '30 min'], [45, '⏱️', '45 min'], [60, '⏱️', '1 hour'], [90, '⏱️', '1½ hours'], [120, '⏱️', '2 hours'], [180, '⏱️', '3 hours+']] },
    { k: 'weak', q: 'What is hardest for you?', sub: 'Choose all that apply – you get extra practice for them.', multi: true, opts: Object.entries(WEAK).map(([k, [ic, t]]) => [k, ic, t]) },
  ];
  function wizard(edit) {
    const prev = (edit && P() && P().a) || {};
    return {
      html: `<section class="pl-wiz card" id="plWiz"><div class="pl-wtop"><div class="pl-bruno">${GL.charSVG('bruno', 'idle waving')}</div><div class="pl-wbub" id="plBub"><b>Hallo! Ich bin Bruno.</b><p>I’ll ask you ${Q.length} quick questions and then build <b>your personal plan</b> – fitted exactly to your exam date and your time.</p></div></div>
          <div class="pl-dots" id="plDots">${Q.map((_, i) => `<i data-i="${i}"></i>`).join('')}</div>
          <div class="pl-body" id="plBody"><div class="row" style="justify-content:center"><button class="btn gold big" id="plStart" type="button">🧭 Let’s start</button></div><p class="muted" style="text-align:center">≈ 2 minutes · you can change everything later</p></div></section>`,
      mount() {
        const a = Object.assign({ weak: [] }, prev);
        let i = -1;
        const body = $('#plBody'), bub = $('#plBub');
        const dots = () => $$('#plDots i').forEach((d, k) => { d.classList.toggle('on', k === i); d.classList.toggle('done', k < i); });
        const ask = () => {
          i++; dots();
          if (a.goal === 'life' && Q[i] && Q[i].k === 'exam') { a.exam = 'unsure'; i++; dots(); }
          if (i >= Q.length) return analyse();
          const q = Q[i];
          bub.innerHTML = `<b>${esc(q.q)}</b><p>${esc(q.sub)}</p>`; bub.classList.remove('pop'); void bub.offsetWidth; bub.classList.add('pop');
          if (q.date) {
            const min = addD(ds(new Date()), 7);
            body.innerHTML = `<div class="pl-date"><input type="date" class="txt-in" id="plDate" min="${min}" value="${attr(a.date || addD(ds(new Date()), 90))}"><div class="row" style="justify-content:center"><button class="btn green big" id="plOk" type="button">✓ This is my exam date</button></div>
              <div class="chips" style="justify-content:center">${[['30', '1 month'], ['60', '2 months'], ['90', '3 months'], ['180', '6 months']].map(([d, l]) => `<button class="chip pl-q" data-d="${d}" type="button">in ${l}</button>`).join('')}<button class="chip" id="plNoDate" type="button">🤷 No date yet</button></div></div>`;
            $$('.pl-q').forEach((b) => (b.onclick = () => { $('#plDate').value = addD(ds(new Date()), +b.dataset.d); }));
            $('#plOk').onclick = () => { const v = $('#plDate').value; if (!v || diffD(ds(new Date()), v) < 7) { GL.toast('Please choose a date at least one week from today.'); return; } a.date = v; ask(); };
            $('#plNoDate').onclick = () => { a.date = ''; ask(); };
            return;
          }
          body.innerHTML = `<div class="pl-opts ${q.multi ? 'multi' : ''}">${q.opts.map(([v, ic, l], k) => `<button class="pl-opt ${(q.multi ? (a.weak || []).includes(v) : a[q.k] === v) ? 'on' : ''}" data-v="${attr(v)}" type="button" style="animation-delay:${k * 0.05}s"><span>${ic}</span><b>${esc(l)}</b></button>`).join('')}</div>
            ${q.multi ? '<div class="row" style="justify-content:center"><button class="btn green big" id="plOk" type="button">✓ Done</button></div>' : ''}
            ${i > 0 ? '<p style="text-align:center"><button class="btn tiny ghost" id="plBack" type="button">← Back</button></p>' : ''}`;
          $$('.pl-opt').forEach((b) => (b.onclick = () => {
            const raw = b.dataset.v; const v = /^\d+$/.test(raw) ? +raw : raw;
            if (q.multi) { a.weak = a.weak || []; const ix = a.weak.indexOf(v); if (ix >= 0) a.weak.splice(ix, 1); else a.weak.push(v); b.classList.toggle('on'); return; }
            if (q.k === 'level' && v === 'test') return placement();
            a[q.k] = v; $$('.pl-opt').forEach((x) => x.classList.toggle('on', x === b)); GL.sfx('pop'); setTimeout(ask, 220);
          }));
          const ok = $('#plOk'); if (ok) ok.onclick = ask;
          const bk = $('#plBack'); if (bk) bk.onclick = () => { i -= 2; if (a.goal === 'life' && Q[i + 1] && Q[i + 1].k === 'exam') i--; ask(); };
        };
        const placement = () => {
          const qs = PT.map((x) => [x[0], x[1], x[2], GL.shuffle([0, 1, 2])]); let j = 0; const right = { A1: 0, A2: 0, B1: 0 };
          const one = () => {
            if (j >= qs.length) {
              a.level = right.A1 < 2 ? 'zero' : right.A2 < 2 ? 'little' : right.B1 < 2 ? 'a1' : 'a2';
              bub.innerHTML = `<b>Thanks!</b><p>My estimate: <b>${LEVEL_NAME[a.level]}</b> (${right.A1 + right.A2 + right.B1}/9 right).</p>`;
              setTimeout(ask, 900); return;
            }
            const [lv, s, o, ord] = qs[j];
            body.innerHTML = `<div class="pl-test"><small class="muted">Question ${j + 1} of ${qs.length} · ${lv}</small><p class="pl-tq">${esc(s).replace('___', '<span class="pl-gap">___</span>')}</p><div class="pl-opts">${ord.map((k) => `<button class="pl-opt" data-k="${k}" type="button"><b>${esc(o[k])}</b></button>`).join('')}<button class="pl-opt" data-k="-1" type="button"><b>🤷 I don’t know</b></button></div></div>`;
            $$('.pl-test .pl-opt').forEach((b) => (b.onclick = () => { if (b.dataset.k === '0') right[lv]++; j++; one(); }));
          };
          bub.innerHTML = '<b>Quick check 🧪</b><p>9 short questions from A1 to B1. Just choose – no stress, “I don’t know” is fine.</p>';
          one();
        };
        const analyse = () => {
          const steps = ['Checking your level and target …', `Counting your study days until ${a.date ? new Date(parse(a.date)).toLocaleDateString() : 'your goal'} …`, 'Splitting the lessons to fit your time …', 'Adding review days and extra practice …', a.date ? 'Planning your exam week …' : 'Finishing your plan …'];
          bub.innerHTML = '<b>Analysing your answers …</b><p>One moment – I’m building your plan.</p>';
          body.innerHTML = `<div class="pl-analyse"><div class="pl-spin"></div><ul>${steps.map((s, k) => `<li style="animation-delay:${k * 0.45}s">✓ ${esc(s)}</li>`).join('')}</ul></div>`;
          setTimeout(() => {
            Store.state.myplan = { a, from: ds(new Date()), skip: [], done: (P() && P().done) || {}, created: Date.now() };
            Store.save(); GL.sfx('done'); GL.confetti(120);
            location.hash = '#/myplan'; GL.render();
          }, 2600);
        };
        $('#plStart').onclick = ask;
      },
    };
  }

  /* ---------- plan view ---------- */
  function dayHTML(d, today, open) {
    const done = d.items.filter(isDone).length, all = d.items.length;
    const dt = parse(d.date), past = d.date < today, isT = d.date === today;
    const kinds = { study: '📚 Study day', review: '🔁 Review day', exam: '🏁 Exam week' };
    return `<div class="pl-day ${d.kind} ${isT ? 'today' : ''} ${past ? 'past' : ''} ${done === all && all ? 'done' : ''}" id="pd${d.date}">
      <div class="pl-dh"><span class="pl-dd"><b>${dt.getDate()}</b><small>${WD[dt.getDay()]}</small></span><div><b>${isT ? '⭐ Today' : dt.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' })}</b><small>${kinds[d.kind]} · ≈ ${d.min} min · ${done}/${all}</small></div>${done === all && all ? '<span class="xm-ok">✓</span>' : ''}</div>
      ${open ? `<ul class="xm-items">${d.items.map((it) => { const on = isDone(it); return `<li class="${on ? 'on' : ''}"><input type="checkbox" class="pl-cb" data-k="${attr(it.key)}" ${on ? 'checked' : ''} aria-label="Done"><a href="${attr(href(it))}"><span class="xm-ii">${icon(it)}</span><span>${esc(it.label)}${it.extra ? ' <small class="pl-extra">extra</small>' : ''}</span><small>${it.min} min</small></a></li>`; }).join('')}</ul>` : ''}</div>`;
  }
  function viewPlan() {
    const p = P(); if (!p) return wizard(false);
    const g = plan(), a = p.a, today = ds(new Date());
    const f = feas(g);
    const left = a.date ? diffD(today, a.date) : null;
    const allItems = g.days.flatMap((d) => d.items), doneN = allItems.filter(isDone).length;
    const pct = allItems.length ? Math.round((doneN / allItems.length) * 100) : 0;
    const missed = g.days.filter((d) => d.date < today).flatMap((d) => d.items.filter((it) => !isDone(it) && /^u/.test(it.key))).length;
    const tday = g.days.find((d) => d.date === today), nday = g.days.find((d) => d.date >= today);
    // weeks
    const weeks = []; g.days.forEach((d) => { const dt = parse(d.date); const mon = addD(d.date, -((dt.getDay() + 6) % 7)); let w = weeks.find((x) => x.mon === mon); if (!w) weeks.push((w = { mon, days: [] })); w.days.push(d); });
    const curW = weeks.findIndex((w) => w.days.some((d) => d.date >= today));
    return {
      html: `<section class="pl-hero"><div><span class="xm-pill">🧭 MY PERSONAL PLAN</span><h1>${a.name ? esc(a.name) + ', this is your plan' : 'This is your plan'}</h1>
          <p>From <b>${esc(LEVEL_NAME[a.level] || a.level)}</b> to <b>${a.target}</b>${a.exam !== 'unsure' && a.goal !== 'life' ? ` (${a.exam === 'telc' ? 'telc' : 'Goethe'})` : ''} · ${a.days} days a week · ${a.mins} min per day${a.date ? ` · exam on <b>${new Date(parse(a.date)).toLocaleDateString()}</b>` : ''}</p>
          <div class="pl-hstats">${left != null ? `<span class="pl-count"><b>${Math.max(0, left)}</b><small>days to go</small></span>` : ''}<span class="pl-count"><b>${g.days.length}</b><small>study days</small></span><span class="pl-count"><b>${Math.round(g.totalMin / 60)}</b><small>hours of work</small></span><span class="pl-count"><b>${pct}%</b><small>done</small></span></div></div>
          <div class="pl-feas ${f[0]}"><span>${f[1]}</span><b>${f[2]}</b><small>${esc(f[3])}</small></div></section>
        ${missed ? `<div class="note pl-missed">⏰ You have <b>${missed}</b> unfinished task${missed > 1 ? 's' : ''} from past days. <button class="btn small" id="plReplan2" type="button">↻ Move them into the coming days</button></div>` : ''}
        ${tday ? `<h2>⭐ Today</h2>${dayHTML(tday, today, true)}` : nday ? `<div class="card pl-free"><h3 style="margin-top:0">😌 Today is a free day</h3><p class="muted" style="margin:0">Next study day: <b>${parse(nday.date).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}</b>. Want to do something anyway? <a href="#/daily">⚡ Daily mix</a> · <a href="#/scenes">🎬 a scene</a></p></div>` : '<div class="card"><h3 style="margin-top:0">🎉 Your plan is complete!</h3><p>Viel Erfolg in der Prüfung! You can make a new plan for the next level.</p></div>'}
        <h2>🗓️ Week by week</h2>
        <div class="pl-weeks">${weeks.map((w, wi) => { const its = w.days.flatMap((d) => d.items), dn = its.filter(isDone).length; return `<details class="card pl-week" ${wi === curW ? 'open' : ''}><summary><b>Week ${wi + 1}</b> <small class="muted">${parse(w.mon).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })} · ${w.days.length} day${w.days.length > 1 ? 's' : ''} · ${dn}/${its.length} done</small><span class="pl-wbar"><i style="width:${its.length ? (dn / its.length) * 100 : 0}%"></i></span></summary><div class="pl-wdays">${w.days.map((d) => dayHTML(d, today, true)).join('')}</div></details>`; }).join('')}</div>
        <div class="row" style="justify-content:center;margin-top:16px"><button class="btn" id="plReplan" type="button">↻ Re-plan from today</button><a class="btn ghost" href="#/myplan/edit">✏️ Change my answers</a><button class="btn ghost" id="plDel" type="button">🗑️ Delete plan</button></div>
        <p class="muted" style="text-align:center">Lessons, scenes and exam tasks tick themselves when you finish them. Tick the others yourself.</p>`,
      mount() {
        $$('.pl-cb').forEach((cb) => (cb.onchange = () => { const pl = P(); pl.done = pl.done || {}; if (cb.checked) pl.done[cb.dataset.k] = Date.now(); else delete pl.done[cb.dataset.k]; cb.closest('li').classList.toggle('on', cb.checked); Store.save(); if (cb.checked) { Store.addXP(2); GL.sfx('pop'); } }));
        const replan = () => { const pl = P(); const doneKeys = units(pl.a).filter((u) => isDone(u)).map((u) => u.key); pl.skip = doneKeys; pl.from = ds(new Date()); Store.save(); GL.toast('↻ New plan from today – done tasks stay done.', 'ok'); GL.render(); };
        $('#plReplan').onclick = replan; const r2 = $('#plReplan2'); if (r2) r2.onclick = replan;
        $('#plDel').onclick = () => { if (confirm('Delete your personal plan?')) { delete Store.state.myplan; Store.save(); GL.render(); } };
        const t = document.querySelector('.pl-day.today'); if (t && GL._anchor === 'today') t.scrollIntoView({ behavior: 'smooth' });
      },
    };
  }

  /* ---------- home card ---------- */
  function homeHTML() {
    const p = P();
    if (!p) return `<a class="card pl-cta" href="#/myplan"><span class="pl-ctaico">🧭</span><div><b>Get your personal plan – in 2 minutes</b><small>Tell me your level, exam date and time – I’ll build a day-by-day plan that fits exactly.</small></div><span class="btn gold">Start ➜</span></a>`;
    const g = plan(), today = ds(new Date()), d = g.days.find((x) => x.date === today);
    const left = p.a.date ? diffD(today, p.a.date) : null;
    if (!d) { const n = g.days.find((x) => x.date > today); return `<a class="card pl-homecard free" href="#/myplan"><span class="pl-ctaico">😌</span><div><b>My plan: free day today</b><small>${n ? `Next: ${parse(n.date).toLocaleDateString(undefined, { weekday: 'long' })} · ${n.items.length} tasks` : 'Plan finished – make a new one!'}${left != null ? ` · ${left} days to your exam` : ''}</small></div><span class="btn ghost">Open ➜</span></a>`; }
    const dn = d.items.filter(isDone).length;
    return `<div class="card pl-homecard"><div class="row"><b>🧭 My plan · today</b><span class="spacer"></span>${left != null ? `<span class="pl-chip">🎓 ${left} days to the exam</span>` : ''}<a href="#/myplan" class="muted">Full plan →</a></div>
      <ul class="xm-items">${d.items.map((it) => `<li class="${isDone(it) ? 'on' : ''}"><input type="checkbox" class="pl-cb" data-k="${attr(it.key)}" ${isDone(it) ? 'checked' : ''} aria-label="Done"><a href="${attr(href(it))}"><span class="xm-ii">${icon(it)}</span><span>${esc(it.label)}</span><small>${it.min} min</small></a></li>`).join('')}</ul>
      <div class="pl-hprog"><span class="pl-wbar"><i style="width:${Math.round((dn / d.items.length) * 100)}%"></i></span><small>${dn}/${d.items.length} done today</small></div></div>`;
  }
  function wireHome(root) {
    $$('.pl-homecard .pl-cb', root).forEach((cb) => (cb.onchange = () => { const pl = P(); pl.done = pl.done || {}; if (cb.checked) pl.done[cb.dataset.k] = Date.now(); else delete pl.done[cb.dataset.k]; cb.closest('li').classList.toggle('on', cb.checked); Store.save(); if (cb.checked) { Store.addXP(2); GL.sfx('pop'); } }));
  }

  GL.viewMyPlan = (a) => (a === 'edit' || a === 'new' ? wizard(a === 'edit') : viewPlan());
  GL.Planner = { generate, units, homeHTML, wireHome, isDone, feas };
})();
