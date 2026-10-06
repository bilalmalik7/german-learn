/* Grammar Trainer: unlimited generated drills (verbs, articles & cases, adjective endings) + graded stories. */
(function () {
  'use strict';
  const { $, $$, esc, attr, shuffle, checkAnswer, Store, Speech } = GL;
  const pick = (a) => a[(Math.random() * a.length) | 0];

  /* ---------- verb conjugation ---------- */
  const PERSONS = [
    { p: 'ich', i: 0 }, { p: 'du', i: 1 }, { p: 'er', i: 2 }, { p: 'sie', i: 2, note: 'she' }, { p: 'es', i: 2 },
    { p: 'wir', i: 3 }, { p: 'ihr', i: 4 }, { p: 'sie', i: 5, note: 'they' }, { p: 'Sie', i: 5, note: 'formal you' },
  ];
  const AUX = { haben: 'habe,hast,hat,haben,habt,haben'.split(','), sein: 'bin,bist,ist,sind,seid,sind'.split(',') };
  const TENSES = { pres: 'Präsens', perf: 'Perfekt', prät: 'Präteritum' };
  const verbObj = (v) => ({ inf: v[0], en: v[1], pres: v[2].split(','), prät: v[3].split(','), perf: v[4] ? v[4].split(' ') : null });
  const formsFor = (v, tense) => (tense === 'perf' ? AUX[v.perf[0]].map((a) => a + ' ' + v.perf[1]) : v[tense]);
  const MODALS = ['können', 'müssen', 'wollen', 'dürfen', 'sollen', 'mögen'];
  const SEPARABLE = ['aufstehen', 'anrufen', 'einkaufen'];
  const REGULAR = ['machen', 'arbeiten', 'wohnen', 'lernen', 'kaufen', 'spielen', 'tanzen', 'reisen', 'studieren', 'einkaufen'];

  function verbQuestion(cfg) {
    let pool = GL.verbs.map(verbObj);
    if (cfg.group === 'irregular') pool = pool.filter((v) => !REGULAR.includes(v.inf) && !MODALS.includes(v.inf));
    if (cfg.group === 'modal') pool = pool.filter((v) => MODALS.includes(v.inf) || v.inf === 'wissen');
    if (cfg.group === 'separable') pool = pool.filter((v) => SEPARABLE.includes(v.inf));
    const tense = cfg.tense === 'mix' ? pick(['pres', 'perf', 'prät']) : cfg.tense;
    if (tense === 'perf') pool = pool.filter((v) => v.perf);
    if (!pool.length) pool = GL.verbs.map(verbObj).filter((v) => v.perf);
    const v = pick(pool);
    const per = pick(PERSONS);
    const forms = formsFor(v, tense);
    const ans = forms[per.i].split('/');
    const rows = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
    return {
      prompt: `<div class="drill-tag">${TENSES[tense]}</div>
        <div class="drill-q"><span class="drill-person">${per.p}</span>${per.note ? `<small class="muted"> (${per.note})</small>` : ''} <span class="blank">?</span></div>
        <p class="muted">${esc(v.inf)} – ${esc(v.en)}${tense === 'perf' ? ' · type the helper verb + participle, e.g. „bin gegangen“' : ''}</p>`,
      answers: ans.concat(ans.map((a) => per.p + ' ' + a)),
      say: per.p + ' ' + ans[0],
      explain: `<div class="gtable-wrap"><table class="gtable"><thead><tr><th colspan="2">${esc(v.inf)} · ${TENSES[tense]}</th></tr></thead><tbody>${rows.map((r, k) => `<tr${k === per.i ? ' class="hl"' : ''}><td>${r}</td><td>${esc(forms[k].replace('/', ' / '))}</td></tr>`).join('')}</tbody></table></div>`,
    };
  }

  /* ---------- articles & cases ---------- */
  const ART = {
    def: { nom: { m: 'der', f: 'die', n: 'das', pl: 'die' }, akk: { m: 'den', f: 'die', n: 'das', pl: 'die' }, dat: { m: 'dem', f: 'der', n: 'dem', pl: 'den' } },
    indef: { nom: { m: 'ein', f: 'eine', n: 'ein' }, akk: { m: 'einen', f: 'eine', n: 'ein' }, dat: { m: 'einem', f: 'einer', n: 'einem' } },
  };
  const kForm = (base) => ({ nom: { m: base, f: base + 'e', n: base, pl: base + 'e' }, akk: { m: base + 'en', f: base + 'e', n: base, pl: base + 'e' }, dat: { m: base + 'em', f: base + 'er', n: base + 'em', pl: base + 'en' } });
  ART.kein = kForm('kein');
  ART.mein = kForm('mein');
  const ART_LABEL = { def: 'der / die / das', indef: 'ein / eine', kein: 'kein', mein: 'mein (my)' };
  const CASE_LABEL = { nom: 'Nominativ', akk: 'Akkusativ', dat: 'Dativ' };
  const CASE_WHY = { nom: 'after „sein“ (Das ist …) → Nominativ', akk: 'direct object of „sehen“ → Akkusativ', dat: 'after „von“ (always dative) → Dativ' };
  const GENDER_LABEL = { m: 'masculine', f: 'feminine', n: 'neuter', pl: 'plural' };
  const datPl = (pl) => (/[ns]$/.test(pl) ? pl : pl + 'n');
  const nounForm = (n, g, cas) => (g === 'pl' ? (cas === 'dat' ? datPl(n[2]) : n[2]) : n[1]);

  function articleQuestion(cfg) {
    let type = cfg.art === 'mix' ? pick(['def', 'indef', 'kein', 'mein']) : cfg.art;
    const cas = cfg.cas === 'mix' ? pick(['nom', 'akk', 'dat']) : cfg.cas;
    if (type === 'kein' && cas === 'dat') type = 'mein'; // "von keinem …" is correct but sounds odd
    const n = pick(GL.drillNouns);
    const g = type !== 'indef' && Math.random() < 0.22 ? 'pl' : n[0];
    const art = ART[type][cas][g];
    const noun = nounForm(n, g, cas);
    const frame = { nom: g === 'pl' ? 'Das sind ___ {N}.' : 'Das ist ___ {N}.', akk: 'Ich sehe ___ {N}.', dat: 'Wir sprechen von ___ {N}.' }[cas];
    const sentence = frame.replace('{N}', noun);
    const table = ART[type][cas];
    return {
      prompt: `<div class="drill-tag">${CASE_LABEL[cas]} · ${ART_LABEL[type]}</div>
        <div class="drill-q">${esc(sentence).replace('___', '<span class="blank">?</span>')}</div>
        <p class="muted">${esc(noun)} = ${esc(n[3])}${g === 'pl' ? ' (plural)' : ''} · <b class="g-${{ m: 'der', f: 'die', n: 'das', pl: 'pl' }[g]}">${GENDER_LABEL[g]}</b></p>`,
      answers: [art],
      say: sentence.replace('___', art),
      explain: `<p><b>${CASE_WHY[cas]}</b>${cas === 'dat' && g === 'pl' ? ' · dative plural nouns add <b>-n</b>' : ''}</p>
        <div class="gtable-wrap"><table class="gtable"><thead><tr><th>${CASE_LABEL[cas]}</th><th>masc.</th><th>fem.</th><th>neut.</th><th>plural</th></tr></thead>
        <tbody><tr><td>${ART_LABEL[type]}</td>${['m', 'f', 'n', 'pl'].map((x) => `<td${x === g ? ' class="hl"' : ''}>${table[x] || '–'}</td>`).join('')}</tr></tbody></table></div>`,
    };
  }

  /* ---------- adjective endings ---------- */
  const END = {
    weak: { nom: { m: 'e', f: 'e', n: 'e', pl: 'en' }, akk: { m: 'en', f: 'e', n: 'e', pl: 'en' }, dat: { m: 'en', f: 'en', n: 'en', pl: 'en' } },
    mixed: { nom: { m: 'er', f: 'e', n: 'es', pl: 'en' }, akk: { m: 'en', f: 'e', n: 'es', pl: 'en' }, dat: { m: 'en', f: 'en', n: 'en', pl: 'en' } },
    strong: { nom: { m: 'er', f: 'e', n: 'es', pl: 'e' }, akk: { m: 'en', f: 'e', n: 'es', pl: 'e' }, dat: { m: 'em', f: 'er', n: 'em', pl: 'en' } },
  };
  const PEOPLE = ['Hund', 'Freund', 'Bruder', 'Freundin', 'Schwester', 'Katze', 'Kollegin', 'Kind'];
  const PEOPLE_ADJ = ['nett', 'alt', 'jung', 'klein', 'groß', 'lustig'];
  const ABSTRACT = ['Stadt', 'Idee', 'Film', 'Garten', 'Bahnhof', 'Wohnung', 'Haus', 'Küche'];
  const ABSTRACT_ADJ = ['neu', 'gut', 'interessant', 'schön', 'alt'];

  function adjectiveQuestion(cfg) {
    let type = cfg.art === 'mix' ? pick(['def', 'indef', 'kein', 'mein', 'none']) : cfg.art;
    if (type === 'kein' && Math.random() < 0.5) type = 'mein';
    const cas = cfg.cas === 'mix' ? pick(['nom', 'akk', 'dat']) : cfg.cas;
    if (type === 'kein' && cas === 'dat') type = 'mein';
    let n, g, adj, art = '', noun, decl;
    if (type === 'none' && Math.random() < 0.6) {
      const m = pick(GL.massNouns);
      n = [m[0], m[1], '', m[2]]; g = m[0]; adj = pick(GL.foodAdjectives); noun = m[1];
    } else {
      n = pick(GL.drillNouns);
      g = type === 'indef' ? n[0] : type === 'none' ? 'pl' : Math.random() < 0.22 ? 'pl' : n[0];
      adj = PEOPLE.includes(n[1]) ? pick(PEOPLE_ADJ) : ABSTRACT.includes(n[1]) ? pick(ABSTRACT_ADJ) : pick(GL.drillAdjectives.filter((a) => a !== 'nett'));
      noun = nounForm(n, g, cas);
    }
    if (type === 'def') { art = ART.def[cas][g]; decl = 'weak'; }
    else if (type === 'none') { decl = 'strong'; }
    else { art = ART[type][cas][g]; decl = 'mixed'; }
    const ending = END[decl][cas][g];
    const mass = type === 'none' && g !== 'pl';
    const frame = mass
      ? { nom: 'Das ist {A} {N}.', akk: 'Ich kaufe {A} {N}.', dat: 'Das schmeckt gut mit {A} {N}.' }[cas]
      : { nom: g === 'pl' ? 'Das sind {A} {N}.' : 'Das ist {A} {N}.', akk: 'Ich sehe {A} {N}.', dat: 'Was machst du mit {A} {N}?' }[cas];
    const phrase = (art ? art + ' ' : '') + adj;
    const shown = frame.replace('{A}', phrase + '@@').replace('{N}', noun).replace(/\s+/g, ' ');
    const full = shown.replace('@@', ending);
    const declName = { weak: 'after der/die/das (only -e / -en)', mixed: 'after ein / kein / mein', strong: 'no article – the adjective shows the case' }[decl];
    return {
      prompt: `<div class="drill-tag">${CASE_LABEL[cas]} · ${type === 'none' ? 'no article' : ART_LABEL[type]}</div>
        <div class="drill-q">${esc(shown).replace('@@', '<span class="blank">?</span>')}</div>
        <p class="muted">Type the ending (e.g. <b>en</b>) or the whole adjective · ${esc(noun)} = ${esc(n[3])} · <b class="g-${{ m: 'der', f: 'die', n: 'das', pl: 'pl' }[g]}">${GENDER_LABEL[g]}</b></p>`,
      answers: [ending, adj + ending],
      say: full,
      explain: `<p><b>${declName}</b> → ${CASE_LABEL[cas]} ${GENDER_LABEL[g]}: <b>-${ending}</b></p>
        <div class="gtable-wrap"><table class="gtable"><thead><tr><th></th><th>masc.</th><th>fem.</th><th>neut.</th><th>plural</th></tr></thead><tbody>
        ${['nom', 'akk', 'dat'].map((c) => `<tr><td>${CASE_LABEL[c]}</td>${['m', 'f', 'n', 'pl'].map((x) => `<td${c === cas && x === g ? ' class="hl"' : ''}>-${END[decl][c][x]}</td>`).join('')}</tr>`).join('')}
        </tbody></table></div>`,
    };
  }

  const DRILLS = {
    verbs: {
      label: '🔤 Verb conjugation', intro: 'Present, Perfekt and Präteritum of the 45 most important verbs. Every form you type is checked and the full table is shown.',
      gen: verbQuestion, defaults: { tense: 'pres', group: 'all' },
      options: [
        ['tense', 'Tense', [['pres', 'Präsens'], ['perf', 'Perfekt'], ['prät', 'Präteritum'], ['mix', 'Mixed']]],
        ['group', 'Verbs', [['all', 'All'], ['irregular', 'Irregular'], ['modal', 'Modal verbs'], ['separable', 'Separable']]],
      ],
    },
    articles: {
      label: '🎯 Articles & cases', intro: 'der, den, dem, einen, keinem, meiner … Choose the case and article type, then fill the gap. This is the core of correct German.',
      gen: articleQuestion, defaults: { cas: 'mix', art: 'mix' },
      options: [
        ['cas', 'Case', [['nom', 'Nominativ'], ['akk', 'Akkusativ'], ['dat', 'Dativ'], ['mix', 'Mixed']]],
        ['art', 'Article', [['def', 'der/die/das'], ['indef', 'ein/eine'], ['kein', 'kein'], ['mein', 'mein'], ['mix', 'Mixed']]],
      ],
    },
    adjectives: {
      label: '🎨 Adjective endings', intro: 'The ending depends on the article, the gender and the case. Practise each table separately, then mix them.',
      gen: adjectiveQuestion, defaults: { cas: 'mix', art: 'def' },
      options: [
        ['art', 'After', [['def', 'der/die/das'], ['indef', 'ein'], ['kein', 'kein/mein'], ['none', 'no article'], ['mix', 'Mixed']]],
        ['cas', 'Case', [['nom', 'Nominativ'], ['akk', 'Akkusativ'], ['dat', 'Dativ'], ['mix', 'Mixed']]],
      ],
    },
  };

  function trainerStats(key) {
    const t = (Store.state.trainer = Store.state.trainer || {});
    return (t[key] = t[key] || { right: 0, total: 0, best: 0 });
  }

  function runDrill(root, key) {
    const D = DRILLS[key];
    const stats = trainerStats(key);
    const cfg = Object.assign({}, D.defaults, stats.cfg || {});
    let streak = 0, session = 0, sessionRight = 0, q = null, checked = false;

    root.innerHTML = `
      <p class="muted">${D.intro}</p>
      <div class="drill-opts">${D.options.map(([k, label, opts]) => `<div class="row"><b style="min-width:70px">${label}</b><div class="chips" data-k="${k}">${opts.map(([v, l]) => `<button class="chip ${cfg[k] === v ? 'on' : ''}" data-v="${v}">${l}</button>`).join('')}</div></div>`).join('')}</div>
      <div class="ex-shell" style="margin-top:16px">
        <div class="ex-head"><div class="coach">${GL.charSVG('bruno', 'idle')}<span class="coach-say" id="coachSay"></span></div>
          <div class="ex-top"><span class="pill" id="dStreak">🔥 0</span><span class="pill" id="dScore">✅ 0 / 0</span><span class="spacer"></span><span class="pill" title="Best streak">🏆 ${stats.best}</span></div></div>
        <div class="ex-card" id="drillCard"></div>
      </div>`;
    $$('.drill-opts .chips', root).forEach((c) => c.addEventListener('click', (e) => {
      const b = e.target.closest('.chip'); if (!b) return;
      cfg[c.dataset.k] = b.dataset.v;
      $$('.chip', c).forEach((x) => x.classList.toggle('on', x === b));
      stats.cfg = Object.assign({}, cfg); Store.save();
      next();
    }));

    function next() {
      q = D.gen(cfg);
      checked = false;
      const card = $('#drillCard', root);
      card.__q = q; // exposed for automated tests
      card.classList.remove('pop', 'shake');
      card.innerHTML = `${q.prompt}
        <div class="row" style="margin-top:6px"><input class="txt-in" id="dIn" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Your answer …" style="flex:1;min-width:0"></div>
        <div class="umlauts">${['ä', 'ö', 'ü', 'ß'].map((c) => `<button type="button" data-ch="${c}" tabindex="-1">${c}</button>`).join('')}</div>
        <div id="dFb"></div>
        <div class="ex-actions"><button class="btn ghost small" id="dSkip">Skip</button><button class="btn green" id="dCheck">Check ✔</button></div>`;
      const inp = $('#dIn', card);
      setTimeout(() => inp.focus(), 30);
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); checked ? next() : check(); } });
      card.onmousedown = (e) => { if (e.target.closest('[data-ch]')) e.preventDefault(); };
      card.onclick = (e) => {
        const u = e.target.closest('[data-ch]');
        if (u && !checked) { const s = inp.selectionStart ?? inp.value.length; inp.value = inp.value.slice(0, s) + u.dataset.ch + inp.value.slice(s); inp.focus(); inp.setSelectionRange(s + 1, s + 1); }
      };
      $('#dCheck', card).onclick = () => (checked ? next() : check());
      $('#dSkip', card).onclick = next;
    }

    function check() {
      const inp = $('#dIn', root);
      if (!inp.value.trim()) { inp.focus(); return; }
      checked = true;
      const r = checkAnswer(inp.value, q.answers);
      inp.disabled = true;
      inp.style.borderColor = r.ok ? 'var(--green)' : 'var(--red)';
      session++; stats.total++;
      if (r.ok) { streak++; sessionRight++; stats.right++; Store.addXP(2); } else streak = 0;
      stats.best = Math.max(stats.best, streak);
      Store.save();
      GL.sfx(r.ok ? 'ok' : 'bad');
      const svg = $('.coach svg', root), say = $('#coachSay', root);
      svg.classList.remove('happy', 'sad'); void svg.getBoundingClientRect(); svg.classList.add(r.ok ? 'happy' : 'sad');
      say.textContent = r.ok ? (streak >= 5 ? `🔥 ${streak} in a row!` : pick(['Super!', 'Genau!', 'Richtig!', 'Klasse!'])) : pick(['Fast!', 'Nochmal!', 'Kein Problem!']);
      say.className = 'coach-say show ' + (r.ok ? 'ok' : 'bad');
      setTimeout(() => { say.className = 'coach-say'; svg.classList.remove('happy', 'sad'); }, 1500);
      $('#dStreak', root).textContent = '🔥 ' + streak;
      $('#dScore', root).textContent = `✅ ${sessionRight} / ${session}`;
      const card = $('#drillCard', root);
      card.classList.add(r.ok ? 'pop' : 'shake');
      $('#dFb', root).innerHTML = `<div class="feedback ${r.ok ? 'ok' : 'bad'}">${r.ok ? '✔ Richtig!' : `✘ Correct: <b>${esc(q.answers[0])}</b>`}
        <button class="btn tiny ghost" data-say="${attr(q.say)}">🔊 ${esc(q.say)}</button><div class="expl">${q.explain}</div></div>`;
      $('#dCheck', root).textContent = 'Next ➜';
      $('#dCheck', root).focus();
      if (r.ok) Speech.speak(q.say);
    }
    next();
  }

  /* ---------- stories ---------- */
  function storyList(root) {
    root.innerHTML = `<p class="muted">Short graded stories with the characters. Listen sentence by sentence, read along, then answer the questions. One story per week of the course.</p>
      <div class="grid grid-2">${GL.stories.map((s) => {
        const done = (Store.state.trainer.stories || {})[s.id];
        return `<a class="card story-card" href="#/trainer/stories/${s.id}" style="margin:0;text-decoration:none;color:inherit">
          <div class="row" style="gap:14px;align-items:center">${GL.charSVG(s.char, 'idle')}<div style="flex:1;min-width:0">
          <span class="level ${s.level}">${s.level}</span> <span class="path-tag">Week ${s.week}</span>${done != null ? ` <span class="score-badge ${done >= 80 ? '' : 'mid'}">${done}%</span>` : ''}
          <h3 style="margin:.4em 0 .2em">${esc(s.title)}</h3><small class="muted">${esc(s.en)} · ${s.sentences.length} sentences · ${s.questions.length} questions</small></div></div></a>`;
      }).join('')}</div>`;
  }
  function storyView(root, id) {
    const s = GL.stories.find((x) => x.id === id);
    if (!s) return storyList(root);
    let token = 0;
    root.innerHTML = `<p><a href="#/trainer/stories">← All stories</a></p>
      <div class="row" style="gap:16px;align-items:center">${GL.charSVG(s.char, 'idle')}<div><span class="level ${s.level}">${s.level}</span><h2 style="margin:.3em 0">${esc(s.title)}</h2><p class="muted" style="margin:0">${esc(s.en)} · read by ${esc(GL.chars[s.char].name)}</p></div></div>
      <div class="row" style="margin:14px 0"><button class="btn green" id="sPlay">▶ Listen to the story</button><button class="btn ghost" id="sStop">⏹ Stop</button><button class="btn ghost" id="sEn">🙈 Hide English</button></div>
      <div class="story" id="sText">${s.sentences.map((x, i) => `<p class="st-line" data-i="${i}"><span class="st-de">${esc(x[0])}</span><span class="st-en ln-en">${esc(x[1])}</span></p>`).join('')}</div>
      <div class="row" style="margin-top:16px"><button class="btn purple" id="sQuiz">🧩 Answer the questions</button></div>
      <div id="sQuizRoot" style="margin-top:16px"></div>`;
    const lines = $$('.st-line', root), svg = $('svg.char', root);
    const playFrom = async (start) => {
      const my = ++token;
      for (let i = start; i < s.sentences.length; i++) {
        if (my !== token || !root.isConnected) return;
        lines.forEach((l) => l.classList.toggle('now', +l.dataset.i === i));
        lines[i].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        const t0 = Date.now();
        await GL.charSay(svg, s.sentences[i][0], s.char);
        const rest = 500 + s.sentences[i][0].length * 40 - (Date.now() - t0);
        if (rest > 0) await GL.sleep(rest);
      }
      if (my === token) lines.forEach((l) => l.classList.remove('now'));
    };
    $('#sPlay', root).onclick = () => playFrom(0);
    $('#sStop', root).onclick = () => { token++; Speech.stop(); lines.forEach((l) => l.classList.remove('now')); };
    $('#sText', root).onclick = (e) => { const l = e.target.closest('.st-line'); if (!l) return; token++; lines.forEach((x) => x.classList.toggle('now', x === l)); GL.charSay(svg, s.sentences[+l.dataset.i][0], s.char); };
    $('#sEn', root).onclick = (e) => { const t = $('#sText', root); t.classList.toggle('hide-en'); e.target.textContent = t.classList.contains('hide-en') ? '👀 Show English' : '🙈 Hide English'; };
    $('#sQuiz', root).onclick = () => {
      token++; Speech.stop();
      const qs = shuffle(s.questions).map((q) => ({ t: 'mc', q: q.q, o: q.o, a: q.a }));
      const r = $('#sQuizRoot', root);
      GL.Exercises.run(r, qs, {
        noMistakes: true,
        onFinish: (pct) => { const st = (Store.state.trainer.stories = Store.state.trainer.stories || {}); st[s.id] = Math.max(st[s.id] || 0, pct); Store.save(); },
      });
      r.scrollIntoView({ behavior: 'smooth' });
    };
  }

  /* ---------- page ---------- */
  GL.viewTrainer = function (tab, sub) {
    const tabs = [['verbs', '🔤 Verbs'], ['articles', '🎯 Articles & cases'], ['adjectives', '🎨 Adjective endings'], ['stories', '📖 Stories']];
    tab = tabs.some((t) => t[0] === tab) ? tab : 'verbs';
    const st = Store.state.trainer || {};
    const acc = (k) => (st[k] && st[k].total ? Math.round((st[k].right / st[k].total) * 100) + '%' : '–');
    return {
      html: `<h1>🏋️ Grammar Trainer</h1>
        <p class="muted">Unlimited practice for the grammar that makes German correct: verb forms, articles in every case and adjective endings. Questions are generated fresh every time.</p>
        <div class="chips" style="margin-bottom:18px">${tabs.map(([k, l]) => `<a class="chip ${k === tab ? 'on' : ''}" href="#/trainer/${k}" style="text-decoration:none">${l}${DRILLS[k] ? ` <small style="opacity:.7">${acc(k)}</small>` : ''}</a>`).join('')}</div>
        <div class="card" id="trRoot"></div>`,
      mount() {
        const root = $('#trRoot');
        if (tab === 'stories') sub ? storyView(root, sub) : storyList(root);
        else runDrill(root, tab);
      },
    };
  };
  GL.Trainer = { verbQuestion, articleQuestion, adjectiveQuestion };
})();
