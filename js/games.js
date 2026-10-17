/* GAMES ARCADE (#/games) – quick, replayable games built from the course's own words and sentences:
   Der·Die·Das Dash, Memory, Sentence builder, Verb blitz, Listening bubbles and the daily Wortle.
   High scores in Store.state.arcade; every game gives XP and counts for the daily quests. */
(function () {
  'use strict';
  const { $, $$, esc, attr, Store, Speech } = GL;
  const A = () => { const s = (Store.state.arcade = Store.state.arcade || {}); s.best = s.best || {}; s.plays = s.plays || 0; s.wortle = s.wortle || {}; return s; };
  const shuffle = (a) => GL.shuffle(a.slice());
  const rnd = (a) => a[Math.floor(Math.random() * a.length)];
  const RM = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- word pools ---------- */
  let NOUNS = null, WORDS = null;
  function nouns() {
    if (NOUNS) return NOUNS;
    const seen = new Set(); NOUNS = [];
    const add = (de, en, lv) => { const m = /^(der|die|das)\s+(\p{Lu}[\p{L}-]{1,14})$/u.exec(String(de || '').trim()); if (!m || seen.has(m[2]) || !en) return; seen.add(m[2]); NOUNS.push({ art: m[1], w: m[2], en: String(en).split(/[,;(]/)[0].trim(), lv }); };
    (GL.days || []).forEach((d) => (d.vocab || []).forEach((v) => add(v[0], v[2], d.day <= 11 ? 'A1' : d.day <= 21 ? 'A2' : 'B1')));
    const W = GL.exam && GL.exam.words; if (W) Object.values(W.themes).forEach((t) => t.words.forEach(([de, , en]) => add(de, en, t.level)));
    return NOUNS;
  }
  function words() {
    if (WORDS) return WORDS;
    WORDS = [];
    (GL.days || []).forEach((d) => (d.vocab || []).forEach((v) => { if (v[0] && v[2] && v[0].length <= 22) WORDS.push({ de: v[0], en: String(v[2]).split(/[;(]/)[0].trim() }); }));
    return WORDS;
  }
  function sentences() {
    const out = [];
    (GL.days || []).forEach((d) => {
      (d.exercises || []).forEach((e) => { if (e.t === 'order' && e.a) out.push({ s: e.a, en: e.en || '' }); });
      (d.vocab || []).forEach((v) => { if (v[3] && v[4]) out.push({ s: v[3], en: v[4] }); });
    });
    return out.filter((x) => { const n = x.s.split(/\s+/).length; return n >= 4 && n <= 9 && /[.!?]$/.test(x.s) && !/[„“"()…]/.test(x.s); });
  }

  /* ---------- shared bits ---------- */
  function endScreen(box, id, score, opts = {}) {
    const a = A(); const old = a.best[id] || 0; const rec = score > old; if (rec) a.best[id] = score; a.plays++; Store.save();
    const xp = Math.max(3, Math.min(40, Math.round(opts.xp != null ? opts.xp : score / 10)));
    Store.addXP(xp); if (GL.Game) GL.Game.count('game', 1);
    box.innerHTML = `<div class="ga-end"><div class="ga-trophy ${rec ? 'rec' : ''}">${rec ? '🏆' : opts.good ? '🌟' : '🎮'}</div><h2>${rec ? 'New high score!' : opts.title || 'Game over'}</h2>
      <div class="ga-score">${score}<small>${opts.unit || 'points'}</small></div><p class="muted">Best: ${Math.max(old, score)} · +${xp} XP${opts.extra ? ' · ' + opts.extra : ''}</p>
      <div class="row" style="justify-content:center"><button class="btn gold big" id="gaAgain" type="button">🔁 Play again</button><a class="btn ghost" href="#/games">🎮 All games</a></div></div>`;
    $('#gaAgain').onclick = () => GL.render();
    if (rec || opts.good) GL.confetti(rec ? 160 : 80); GL.sfx('done');
  }
  const hearts = (n, max = 3) => '❤️'.repeat(n) + '🤍'.repeat(Math.max(0, max - n));
  function timerBar(sec, onEnd, onTick) {
    const t0 = Date.now(); let stop = false;
    const bar = $('#gaTime');
    (function tick() {
      if (stop || !document.body.contains(bar)) return;
      const left = Math.max(0, sec - (Date.now() - t0) / 1000);
      bar.style.width = (left / sec) * 100 + '%'; bar.classList.toggle('low', left < 10);
      onTick && onTick(left);
      if (left <= 0) { stop = true; onEnd(); return; }
      requestAnimationFrame(tick);
    })();
    return { stop: () => (stop = true), add: () => {} };
  }
  function floatText(el, txt, cls) {
    if (!el || RM()) return;
    const r = el.getBoundingClientRect(); const f = document.createElement('div'); f.className = 'ga-float ' + (cls || ''); f.textContent = txt;
    f.style.left = r.left + r.width / 2 + 'px'; f.style.top = r.top + 'px'; document.body.appendChild(f); setTimeout(() => f.remove(), 900);
  }

  /* ---------- 1. Der·Die·Das Dash ---------- */
  function dash(box) {
    const pool = shuffle(nouns()); let i = 0, score = 0, combo = 0, lives = 3, over = false;
    box.innerHTML = `<div class="ga-hud"><span class="ga-lives" id="gaLives">${hearts(3)}</span><span class="ga-combo" id="gaCombo"></span><span class="ga-pts"><b id="gaPts">0</b></span></div><div class="ga-timebar"><i id="gaTime"></i></div>
      <div class="dd-stage"><div class="dd-word" id="ddWord"></div><small class="muted" id="ddEn"></small></div>
      <div class="dd-btns"><button class="dd-b der" data-a="der" type="button">der</button><button class="dd-b die" data-a="die" type="button">die</button><button class="dd-b das" data-a="das" type="button">das</button></div>
      <p class="muted" style="text-align:center">Keys: 1 der · 2 die · 3 das</p>`;
    const show = () => { if (!document.body.contains(box)) return; const n = pool[i % pool.length]; $('#ddWord').textContent = n.w; $('#ddEn').textContent = n.en; const w = $('#ddWord'); w.className = 'dd-word in'; };
    const end = () => { if (over) return; over = true; document.removeEventListener('keydown', key); endScreen(box, 'dash', score, { extra: `${i} words` }); };
    const T = timerBar(60, end);
    const answer = (a, btn) => {
      if (over || lives <= 0) return;
      const n = pool[i % pool.length]; const ok = a === n.art;
      if (ok) { combo++; const mult = combo >= 10 ? 3 : combo >= 5 ? 2 : 1; const pts = 10 * mult; score += pts; floatText(btn, `+${pts}`, 'ok'); GL.sfx('ok'); if (combo === 5 || combo === 10) { floatText($('#gaCombo'), combo === 5 ? '🔥 x2!' : '⚡ x3!', 'big'); } }
      else { combo = 0; lives--; GL.sfx('bad'); $('#ddWord').classList.add('shake'); floatText(btn, `${n.art} ${n.w}`, 'bad'); $('#gaLives').textContent = hearts(lives); if (lives <= 0) { T.stop(); setTimeout(end, 500); return; } }
      $('#gaPts').textContent = score; $('#gaCombo').textContent = combo >= 3 ? `🔥 ${combo}${combo >= 10 ? ' · x3' : combo >= 5 ? ' · x2' : ''}` : '';
      i++; setTimeout(show, ok ? 120 : 600);
    };
    $$('.dd-b', box).forEach((b) => (b.onclick = () => answer(b.dataset.a, b)));
    const key = (e) => { const m = { 1: 'der', 2: 'die', 3: 'das' }[e.key]; if (m) answer(m, $(`.dd-b.${m}`, box)); };
    document.addEventListener('keydown', key);
    show();
  }

  /* ---------- 2. Memory ---------- */
  function memory(box) {
    const ws = shuffle(words().filter((w) => w.de.length <= 16 && w.en.length <= 18)).slice(0, 6);
    const cards = shuffle(ws.flatMap((w, k) => [{ k, t: w.de, de: true }, { k, t: w.en, de: false }]));
    let open = [], found = 0, moves = 0, lock = false; const t0 = Date.now();
    box.innerHTML = `<div class="ga-hud"><span>🧠 Find the pairs</span><span class="ga-pts">Moves: <b id="gaMoves">0</b></span></div>
      <div class="mm-grid">${cards.map((c, i) => `<button class="mm-card" data-i="${i}" type="button" style="animation-delay:${i * 0.03}s"><span class="mm-in"><span class="mm-f">?</span><span class="mm-b ${c.de ? 'de' : 'en'}">${esc(c.t)}</span></span></button>`).join('')}</div>`;
    $$('.mm-card', box).forEach((b) => (b.onclick = () => {
      const c = cards[+b.dataset.i]; if (lock || b.classList.contains('flip')) return;
      b.classList.add('flip'); if (c.de) Speech.speak(c.t); open.push([b, c]);
      if (open.length === 2) {
        moves++; $('#gaMoves').textContent = moves; lock = true;
        const [[b1, c1], [b2, c2]] = open;
        if (c1.k === c2.k) { setTimeout(() => { b1.classList.add('got'); b2.classList.add('got'); GL.sfx('ok'); if (GL.Game) GL.Game.burst(b2); found++; open = []; lock = false; if (found === ws.length) { const sec = Math.round((Date.now() - t0) / 1000); const sc = Math.max(10, 300 - moves * 10 - sec); setTimeout(() => endScreen(box, 'memory', sc, { title: 'All pairs found!', good: true, extra: `${moves} moves · ${sec}s` }), 500); } }, 350); }
        else setTimeout(() => { b1.classList.remove('flip'); b2.classList.remove('flip'); open = []; lock = false; GL.sfx('pop'); }, 900);
      }
    }));
  }

  /* ---------- 3. Sentence builder ---------- */
  function builder(box) {
    const pool = shuffle(sentences()).slice(0, 6); let r = 0, score = 0;
    const round = () => {
      if (!document.body.contains(box)) return;
      if (r >= pool.length) { endScreen(box, 'builder', score, { title: 'Sentences built!', good: score >= 400 }); return; }
      const it = pool[r]; const end = it.s.slice(-1); const toks = it.s.slice(0, -1).split(/\s+/); const tiles = shuffle(toks.map((t, k) => ({ t, k })));
      let picked = []; const t0 = Date.now(); let hint = false;
      box.innerHTML = `<div class="ga-hud"><span>🧱 ${r + 1} / ${pool.length}</span><span class="ga-pts"><b id="gaPts">${score}</b></span></div>
        <p class="sb-en">🇬🇧 ${esc(it.en)}</p><div class="sb-line" id="sbLine"></div><div class="sb-tiles" id="sbTiles">${tiles.map((x, i) => `<button class="sb-tile" data-i="${i}" type="button" style="animation-delay:${i * 0.04}s">${esc(x.t)}</button>`).join('')}</div>
        <div class="row" style="justify-content:center"><button class="btn ghost" id="sbUndo" type="button">↩ Undo</button><button class="btn ghost" id="sbHint" type="button">💡 Hint</button><button class="btn ghost" id="sbSkip" type="button">⏭ Skip</button></div><div id="sbFb"></div>`;
      const line = $('#sbLine');
      const paint = () => { line.innerHTML = picked.map((i) => `<span class="sb-w">${esc(tiles[i].t)}</span>`).join(' ') + (picked.length === tiles.length ? end : ''); $$('.sb-tile', box).forEach((b) => (b.disabled = picked.includes(+b.dataset.i))); };
      const check = () => {
        const s = picked.map((i) => tiles[i].t).join(' ') + end;
        if (s === it.s || s.toLowerCase() === it.s.toLowerCase()) {
          const sec = (Date.now() - t0) / 1000; const pts = Math.max(30, Math.round(120 - sec * 4)) - (hint ? 30 : 0); score += pts; GL.sfx('ok'); line.classList.add('win'); floatText(line, `+${pts}`, 'ok'); Speech.speak(it.s);
          $('#sbFb').innerHTML = `<div class="ls-res ok">✅ ${esc(it.s)}</div>`; setTimeout(() => { r++; round(); }, 1300);
        } else { GL.sfx('bad'); line.classList.add('shake'); setTimeout(() => { line.classList.remove('shake'); picked = []; paint(); }, 600); }
      };
      $$('.sb-tile', box).forEach((b) => (b.onclick = () => { picked.push(+b.dataset.i); paint(); GL.sfx('pop'); if (picked.length === tiles.length) check(); }));
      $('#sbUndo').onclick = () => { picked.pop(); paint(); };
      $('#sbHint').onclick = () => { hint = true; const next = tiles.findIndex((x) => x.k === picked.length); if (next >= 0 && !picked.includes(next)) { picked.push(next); paint(); if (picked.length === tiles.length) check(); } };
      $('#sbSkip').onclick = () => { $('#sbFb').innerHTML = `<div class="ls-res bad">${esc(it.s)}</div>`; setTimeout(() => { r++; round(); }, 1600); };
      paint();
    };
    round();
  }

  /* ---------- 4. Verb blitz ---------- */
  const PERS = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
  function blitz(box) {
    const V = (GL.verbs || []).map(([inf, en, pres, prat]) => ({ inf, en, pres: pres.split(',').map((x) => x.split('/')[0]), prat: prat ? prat.split(',').map((x) => x.split('/')[0]) : null }));
    let score = 0, combo = 0, n = 0, over = false;
    box.innerHTML = `<div class="ga-hud"><span class="ga-combo" id="gaCombo"></span><span class="ga-pts"><b id="gaPts">0</b></span></div><div class="ga-timebar"><i id="gaTime"></i></div><div id="vbQ"></div>`;
    const end = () => { over = true; endScreen(box, 'blitz', score, { extra: `${n} verbs` }); };
    timerBar(60, end);
    const ask = () => {
      if (over || !document.body.contains(box)) return;
      const v = rnd(V); const tense = v.prat && Math.random() < (Store.doneCount() >= 15 ? 0.35 : 0.1) ? 'prat' : 'pres'; const p = Math.floor(Math.random() * 6);
      const right = v[tense][p]; const opts = shuffle([...new Set([right, ...shuffle(v[tense].filter((x) => x !== right)), ...(v.prat && tense === 'pres' ? [v.prat[p]] : [])])].slice(0, 4));
      $('#vbQ').innerHTML = `<div class="vb-card in"><small>${tense === 'pres' ? 'Präsens' : 'Präteritum'} · ${esc(v.en)}</small><div class="vb-q"><b>${PERS[p]}</b> + <b>${esc(v.inf)}</b></div></div><div class="vb-opts">${opts.map((o) => `<button class="btn ghost vb-o" type="button">${esc(o)}</button>`).join('')}</div>`;
      $$('.vb-o', box).forEach((b) => (b.onclick = () => {
        if (over) return; n++;
        if (b.textContent === right) { combo++; const pts = 10 * (combo >= 8 ? 3 : combo >= 4 ? 2 : 1); score += pts; b.classList.add('right'); floatText(b, `+${pts}`, 'ok'); GL.sfx('ok'); }
        else { combo = 0; b.classList.add('wrong'); $$('.vb-o', box).forEach((x) => { if (x.textContent === right) x.classList.add('right'); }); GL.sfx('bad'); }
        $('#gaPts').textContent = score; $('#gaCombo').textContent = combo >= 3 ? `🔥 ${combo}` : '';
        setTimeout(ask, b.textContent === right ? 250 : 900);
      }));
    };
    ask();
  }

  /* ---------- 5. Listening bubbles ---------- */
  function bubbles(box) {
    const pool = shuffle(nouns()).slice(0, 40); let r = 0, score = 0, lives = 3;
    box.innerHTML = `<div class="ga-hud"><span class="ga-lives" id="gaLives">${hearts(3)}</span><span>🫧 <b id="bbR">1</b>/10</span><span class="ga-pts"><b id="gaPts">0</b></span></div>
      <div class="bb-sky" id="bbSky"></div><div class="row" style="justify-content:center"><button class="btn green" id="bbPlay" type="button">🔊 Listen again</button></div>`;
    let cur = null;
    const round = () => {
      if (!document.body.contains(box)) return;
      if (r >= 10 || lives <= 0) { endScreen(box, 'bubbles', score, { good: lives > 0 }); return; }
      cur = pool[r * 4]; const opts = shuffle([cur, pool[r * 4 + 1], pool[r * 4 + 2], pool[r * 4 + 3]].filter(Boolean));
      $('#bbR').textContent = r + 1;
      $('#bbSky').innerHTML = opts.map((o, i) => `<button class="bb" type="button" data-w="${attr(o.w)}" style="--x:${8 + i * 23}%;--d:${(i * 0.37) % 1.2}s;--s:${5 + (i % 3)}s">${esc(o.art)} ${esc(o.w)}</button>`).join('');
      const t0 = Date.now(); setTimeout(() => Speech.speak(`${cur.art} ${cur.w}`), 250);
      $$('.bb', box).forEach((b) => (b.onclick = () => {
        if (lives <= 0 || b.classList.contains('nope') || b.classList.contains('pop')) return;
        if (b.dataset.w === cur.w) { const pts = Math.max(20, 100 - Math.round((Date.now() - t0) / 100)); score += pts; b.classList.add('pop'); floatText(b, `+${pts}`, 'ok'); GL.sfx('ok'); $('#gaPts').textContent = score; r++; setTimeout(round, 600); }
        else { lives--; b.classList.add('nope'); GL.sfx('bad'); $('#gaLives').textContent = hearts(lives); if (lives <= 0) setTimeout(round, 600); }
      }));
    };
    $('#bbPlay').onclick = () => cur && Speech.speak(`${cur.art} ${cur.w}`);
    round();
  }

  /* ---------- 6. Wortle (daily) ---------- */
  function wortleList() {
    const set = new Set();
    nouns().forEach((n) => { const w = n.w.toUpperCase(); if (/^[A-ZÄÖÜ]{5}$/.test(w)) set.add(w + '|' + n.art + '|' + n.en); });
    return [...set].sort();
  }
  function wortle(box) {
    const list = wortleList(); if (!list.length) { box.innerHTML = '<p>No words.</p>'; return; }
    const day = Math.floor((Date.parse(GL.todayStr()) || Date.now()) / 864e5);
    const [W, art, en] = list[(day * 7919) % list.length].split('|');
    const a = A(); const st = a.wortle[GL.todayStr()] || { g: [], done: false };
    const KEYS = ['QWERTZUIOPÜ', 'ASDFGHJKLÖÄ', 'YXCVBNM'];
    let cur = '';
    const score = (g) => { const res = Array(5).fill('x'); const rest = W.split(''); g.split('').forEach((c, i) => { if (c === W[i]) { res[i] = 'g'; rest[i] = null; } }); g.split('').forEach((c, i) => { if (res[i] === 'g') return; const k = rest.indexOf(c); if (k >= 0) { res[i] = 'y'; rest[k] = null; } }); return res; };
    const paint = () => {
      const rows = []; for (let r = 0; r < 6; r++) { const g = st.g[r] || (r === st.g.length && !st.done ? cur.padEnd(5) : '     '); const sc = st.g[r] ? score(st.g[r]) : null; rows.push(`<div class="wo-row ${r === st.g.length && !st.done ? 'cur' : ''}">${g.split('').map((c, i) => `<span class="wo-t ${sc ? 'f ' + sc[i] : c.trim() ? 'typed' : ''}" style="--i:${i}">${c.trim()}</span>`).join('')}</div>`); }
      const keyState = {}; st.g.forEach((g) => score(g).forEach((s, i) => { const c = g[i]; const pr = { g: 3, y: 2, x: 1 }; if (!keyState[c] || pr[s] > pr[keyState[c]]) keyState[c] = s; }));
      box.innerHTML = `<div class="ga-hud"><span>🟩 Wortle · ${GL.todayStr()}</span><span class="muted">a new word every day</span></div>
        <div class="wo-grid">${rows.join('')}</div>
        ${st.done ? `<div class="wo-res ${st.win ? 'ok' : 'bad'}"><b>${st.win ? `🎉 Super! ${st.g.length}/6` : '😅 Next time!'}</b> The word was <b>${art} ${W.charAt(0) + W.slice(1).toLowerCase()}</b> – ${esc(en)} <button class="say-btn sm" type="button" data-say="${attr(art + ' ' + W.charAt(0) + W.slice(1).toLowerCase())}">🔊</button>
          <div class="row" style="justify-content:center;margin-top:8px"><button class="btn small ghost" id="woShare" type="button">📋 Share result</button><a class="btn small" href="#/games">🎮 More games</a></div></div>` : ''}
        <div class="wo-kb">${KEYS.map((row, ri) => `<div class="wo-kr">${ri === 2 ? '<button class="wo-k wide" data-k="ENTER" type="button">⏎</button>' : ''}${row.split('').map((c) => `<button class="wo-k ${keyState[c] || ''}" data-k="${c}" type="button">${c}</button>`).join('')}${ri === 2 ? '<button class="wo-k wide" data-k="DEL" type="button">⌫</button>' : ''}</div>`).join('')}</div>
        <p class="muted" style="text-align:center">Guess the 5-letter German noun. 🟩 right place · 🟨 in the word · ⬜ not in the word.</p>`;
      $$('.wo-k', box).forEach((b) => (b.onclick = () => press(b.dataset.k)));
      const sh = $('#woShare'); if (sh) sh.onclick = () => { const txt = `Deutsch30 Wortle ${GL.todayStr()} ${st.win ? st.g.length : 'X'}/6\n` + st.g.map((g) => score(g).map((s) => ({ g: '🟩', y: '🟨', x: '⬜' }[s])).join('')).join('\n'); (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => GL.toast('📋 Copied – share it!', 'ok')).catch(() => prompt('Copy:', txt)); };
    };
    const press = (k) => {
      if (st.done) return;
      if (k === 'DEL') cur = cur.slice(0, -1);
      else if (k === 'ENTER') {
        if (cur.length < 5) { const row = $('.wo-row.cur', box); row && row.classList.add('shake'); setTimeout(() => row && row.classList.remove('shake'), 500); return; }
        st.g.push(cur); cur = '';
        if (st.g[st.g.length - 1] === W) { st.done = true; st.win = true; } else if (st.g.length >= 6) { st.done = true; st.win = false; }
        a.wortle[GL.todayStr()] = st; Store.save(); GL.sfx(st.win ? 'done' : 'pop');
        if (st.done) { a.plays++; Store.addXP(st.win ? 25 - st.g.length * 2 : 5); if (GL.Game) GL.Game.count('game', 1); if (st.win) GL.confetti(120); const d = Object.keys(a.wortle).filter((x) => a.wortle[x].win).length; a.best.wortle = d; }
      } else if (cur.length < 5 && /^[A-ZÄÖÜ]$/.test(k)) cur += k;
      paint();
    };
    const key = (e) => { if (!document.body.contains(box)) { document.removeEventListener('keydown', key); return; } if (e.key === 'Enter') press('ENTER'); else if (e.key === 'Backspace') press('DEL'); else if (/^[a-zäöüA-ZÄÖÜ]$/.test(e.key)) press(e.key.toUpperCase()); };
    document.addEventListener('keydown', key);
    paint();
  }

  const GAMES = [
    ['dash', '🎯', 'Der·Die·Das Dash', 'Pick the right article – 60 seconds, combos, 3 lives', '#e5386d', dash],
    ['memory', '🧠', 'Memory', 'Find the German–English pairs', '#3a86ff', memory],
    ['builder', '🧱', 'Sentence builder', 'Put the words in the right order', '#22b573', builder],
    ['blitz', '⚡', 'Verb blitz', 'Conjugate as fast as you can', '#ff8c42', blitz],
    ['bubbles', '🫧', 'Listening bubbles', 'Hear the word – pop the right bubble', '#2ec4b6', bubbles],
    ['wortle', '🟩', 'Wortle', 'The daily 5-letter word puzzle', '#9b5de5', wortle],
  ];
  GL.viewGames = function (id) {
    const g = GAMES.find((x) => x[0] === id);
    if (g) return { html: `<p class="ex-crumbs"><a href="#/games">🎮 Games</a> › ${esc(g[2])}</p><div class="card ga-box" id="gaBox" style="--gc:${g[4]}"><div class="ga-intro"><span class="ga-big">${g[1]}</span><h2>${esc(g[2])}</h2><p class="muted">${esc(g[3])}</p><button class="btn gold big" id="gaGo" type="button">▶ Play</button>${A().best[id] ? `<p class="muted">🏆 Your best: ${A().best[id]}</p>` : ''}</div></div>`,
      mount() { const box = $('#gaBox'); const go = () => { box.classList.add('playing'); g[5](box); GL.track && GL.track('game', g[2]); }; if (id === 'wortle') go(); else $('#gaGo').onclick = go; } };
    const a = A(); const today = a.wortle[GL.todayStr()];
    return {
      html: `<section class="ga-hero"><div><span class="xm-pill">🎮 ARCADE</span><h1>Play German</h1><p>Short games with the words and sentences from your course – beat your high score, keep your streak, learn without noticing.</p><div class="ls-hstats"><span>🎮 <b>${a.plays}</b> games played</span><span>🟩 Wortle today: <b>${today ? (today.win ? '✓ solved' : today.done ? '✗' : '…') : 'not played'}</b></span></div></div><div class="ga-art" aria-hidden="true"><span>🎯</span><span>🧠</span><span>⚡</span><span>🫧</span></div></section>
        <div class="ga-grid">${GAMES.map(([gid, ic, ti, de, col], i) => `<a class="card ga-card" href="#/games/${gid}" style="--gc:${col};animation-delay:${i * 0.06}s"><span class="ga-ico">${ic}</span><b>${esc(ti)}</b><small>${esc(de)}</small>${a.best[gid] ? `<span class="ga-best">🏆 ${a.best[gid]}${gid === 'wortle' ? ' solved' : ''}</span>` : '<span class="ga-new">NEW</span>'}</a>`).join('')}</div>`,
    };
  };
  GL.Games = { nouns, wortleList };
})();
