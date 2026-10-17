/* MOTIVATION LAYER – levels, flying XP, a daily goal, daily quests with a reward chest, badges, streak flames and
   small celebrations. Everything is saved in the browser (Store.state.game). Page: #/rewards. */
(function () {
  'use strict';
  const { $, $$, esc, Store } = GL;
  const RM = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- state ---------- */
  const G = () => {
    const s = Store.state; s.game = s.game || {}; const g = s.game;
    g.badges = g.badges || {}; g.tot = g.tot || {}; g.goal = g.goal || 50;
    const t = GL.todayStr();
    if (!g.day || g.day.date !== t) g.day = { date: t, xp: 0, c: {}, done: {}, chest: false, goal: false };
    if (g.lv == null) g.lv = level(s.xp || 0);
    return g;
  };

  /* ---------- levels ---------- */
  const need = (n) => 50 * n * (n - 1);
  function level(xp) { let n = 1; while (need(n + 1) <= xp) n++; return n; }
  const TITLES = [[1, '🌱', 'Anfänger', 'Beginner'], [3, '🧭', 'Entdecker', 'Explorer'], [5, '🗣️', 'Sprecher', 'Speaker'], [8, '📚', 'Kenner', 'Expert'], [12, '🏅', 'Profi', 'Pro'], [16, '🎓', 'Meister', 'Master'], [20, '🏆', 'Legende', 'Legend']];
  const titleOf = (n) => TITLES.filter((x) => x[0] <= n).pop();
  function levelInfo(xp = Store.state.xp || 0) {
    const n = level(xp), lo = need(n), hi = need(n + 1);
    return { n, lo, hi, into: xp - lo, span: hi - lo, pct: Math.round(((xp - lo) / (hi - lo)) * 100), title: titleOf(n) };
  }

  /* ---------- quests ---------- */
  const QUESTS = {
    lesson: { ico: '📅', t: 'Finish 3 lesson steps', k: 'lesson', n: 3, href: '#/plan' },
    exam: { ico: '🎯', t: 'Practise 1 exam task', k: 'exam', n: 1, href: '#/exam/tasks' },
    speak: { ico: '🎤', t: 'Say 10 sentences out loud', k: 'speak', n: 10, href: '#/talk' },
    listen: { ico: '🎧', t: 'Do 5 listening exercises', k: 'listen', n: 5, href: '#/listen' },
    write: { ico: '✍️', t: 'Write 40 words', k: 'write', n: 40, href: '#/writing' },
    cards: { ico: '🃏', t: 'Review 10 flashcards', k: 'cards', n: 10, href: '#/review/cards' },
    scene: { ico: '🎬', t: 'Play a real-life scene', k: 'scene', n: 1, href: '#/scenes' },
    xp: { ico: '⭐', t: 'Earn 60 XP', k: 'xp', n: 60, href: '#/daily' },
    game: { ico: '🎮', t: 'Play 2 games', k: 'game', n: 2, href: '#/games' },
    read: { ico: '📖', t: 'Read 1 text', k: 'read', n: 1, href: '#/read' },
  };
  const hash = (s) => { let h = 7; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; };
  function todaysQuests() {
    const h = hash(GL.todayStr());
    const a = ['lesson', 'exam'][h % 2], b = ['speak', 'listen'][(h >> 3) % 2], c = ['write', 'cards', 'scene', 'xp', 'game', 'read'][(h >> 6) % 6];
    return [a, b, c].map((id) => Object.assign({ id }, QUESTS[id]));
  }
  const qVal = (q) => (q.k === 'xp' ? G().day.xp : G().day.c[q.k] || 0);

  /* ---------- badges ---------- */
  const st = () => Store.state;
  const tot = (k) => G().tot[k] || 0;
  const ex = () => st().exam || {};
  const BADGES = [
    ['first', '🐣', 'First steps', 'Earn your first XP', () => [st().xp, 1]],
    ['streak3', '🔥', 'On fire', '3-day streak', () => [Store.currentStreak(), 3]],
    ['streak7', '🌋', 'Unstoppable', '7-day streak', () => [Store.currentStreak(), 7]],
    ['streak30', '☄️', 'Iron will', '30-day streak', () => [Store.currentStreak(), 30]],
    ['xp500', '⭐', 'Rising star', '500 XP', () => [st().xp, 500]],
    ['xp2000', '🌟', 'Superstar', '2,000 XP', () => [st().xp, 2000]],
    ['xp5000', '💫', 'Galaxy', '5,000 XP', () => [st().xp, 5000]],
    ['lv5', '🗣️', 'Speaker', 'Reach level 5', () => [level(st().xp), 5]],
    ['lv10', '🏅', 'Pro', 'Reach level 10', () => [level(st().xp), 10]],
    ['day1', '📅', 'Day one', 'Finish course day 1', () => [Store.doneCount(), 1]],
    ['day7', '🗓️', 'One week strong', 'Finish 7 course days', () => [Store.doneCount(), 7]],
    ['day30', '🎓', 'Course complete', 'Finish all 30 days', () => [Store.doneCount(), 30]],
    ['speak50', '🎤', 'Chatterbox', 'Say 50 sentences', () => [Math.max(tot('speak'), (st().speak || {}).n || 0), 50]],
    ['speak300', '📣', 'Big mouth', 'Say 300 sentences', () => [Math.max(tot('speak'), (st().speak || {}).n || 0), 300]],
    ['listen50', '🎧', 'Good ears', '50 listening exercises', () => [Math.max(tot('listen'), (st().listen || {}).n || 0), 50]],
    ['listen200', '👂', 'Super ears', '200 listening exercises', () => [Math.max(tot('listen'), (st().listen || {}).n || 0), 200]],
    ['write500', '✍️', 'Writer', 'Write 500 words', () => [tot('write'), 500]],
    ['write3000', '📜', 'Author', 'Write 3,000 words', () => [tot('write'), 3000]],
    ['exam10', '🎯', 'Exam trainee', 'Practise 10 exam tasks', () => [Object.keys(ex().results || {}).length, 10]],
    ['mockA1', '🥉', 'A1 ready', 'Pass the A1 mock exam', () => [((ex().mocks || {}).A1 || {}).final >= 60 ? 1 : 0, 1]],
    ['mockA2', '🥈', 'A2 ready', 'Pass the A2 mock exam', () => [((ex().mocks || {}).A2 || {}).final >= 60 ? 1 : 0, 1]],
    ['mockB1', '🥇', 'B1 ready', 'Pass a B1 mock exam', () => [((ex().mocks || {}).B1 || {}).final >= 60 || ((ex().mocks || {})['telc-B1'] || {}).final >= 60 ? 1 : 0, 1]],
    ['scenes5', '🎬', 'Actor', 'Play 5 real-life scenes', () => [Object.values(st().scenes || {}).filter((x) => x && x.done).length, 5]],
    ['scenes20', '🎭', 'Movie star', 'Play 20 real-life scenes', () => [Object.values(st().scenes || {}).filter((x) => x && x.done).length, 20]],
    ['convo5', '🗨️', 'Talker', 'Finish 5 conversations', () => [Object.keys(st().convo || {}).length, 5]],
    ['life6', '🇩🇪', 'Settler', 'Open 6 Living-in-Germany topics', () => [Object.keys(((st().life || {}).seen) || {}).length, 6]],
    ['quests', '🎁', 'Quest hunter', 'Open 5 reward chests', () => [tot('chest'), 5]],
    ['games10', '🎮', 'Gamer', 'Play 10 games', () => [((st().arcade || {}).plays) || 0, 10]],
    ['wortle5', '🟩', 'Word wizard', 'Solve 5 Wortles', () => [Object.values(((st().arcade || {}).wortle) || {}).filter((w) => w.win).length, 5]],
    ['read10', '📚', 'Bookworm', 'Read 10 texts', () => [Object.keys(((st().read || {}).done) || {}).length, 10]],
    ['early', '🌅', 'Early bird', 'Study before 8 am', () => [tot('early'), 1]],
    ['night', '🦉', 'Night owl', 'Study after 10 pm', () => [tot('night'), 1]],
  ];

  /* ---------- effects ---------- */
  let ptr = null;
  document.addEventListener('pointerdown', (e) => { ptr = { x: e.clientX, y: e.clientY, t: Date.now() }; }, true);
  function fly(x) {
    if (RM()) return;
    const t = document.getElementById('stat-xp'); if (!t || !t.offsetParent) return;
    const r = t.getBoundingClientRect();
    const p = ptr && Date.now() - ptr.t < 5000 ? ptr : { x: innerWidth / 2, y: innerHeight * 0.6 };
    const el = document.createElement('div'); el.className = 'gm-fly'; el.textContent = `+${x} XP`;
    el.style.left = p.x + 'px'; el.style.top = p.y + 'px';
    document.body.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => { el.classList.add('go'); el.style.transform = `translate(${r.left + r.width / 2 - p.x}px, ${r.top + r.height / 2 - p.y}px) scale(.55)`; }));
    setTimeout(() => { el.remove(); t.classList.remove('gm-hit'); void t.offsetWidth; t.classList.add('gm-hit'); }, 820);
  }
  function burst(target) {
    if (RM() || !target) return;
    const r = (target.getBoundingClientRect ? target : document.body).getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + Math.min(r.height / 2, 40);
    const wrap = document.createElement('div'); wrap.className = 'gm-burst'; wrap.style.left = x + 'px'; wrap.style.top = y + 'px';
    const cols = ['#ffc23c', '#22b573', '#3a86ff', '#ff4d6d', '#9b5de5', '#2ec4b6'];
    for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2, d = 40 + Math.random() * 40; const s = document.createElement('i'); s.style.setProperty('--dx', Math.cos(a) * d + 'px'); s.style.setProperty('--dy', Math.sin(a) * d + 'px'); s.style.background = cols[i % cols.length]; if (i % 3 === 0) { s.textContent = '★'; s.className = 'st'; s.style.color = cols[i % cols.length]; s.style.background = 'none'; } wrap.appendChild(s); }
    document.body.appendChild(wrap); setTimeout(() => wrap.remove(), 800);
  }
  let queue = [], busy = false;
  function overlay(html, onClose) {
    queue.push([html, onClose]); if (!busy) nextOverlay();
  }
  function nextOverlay() {
    const it = queue.shift(); if (!it) { busy = false; return; }
    busy = true;
    const o = document.createElement('div'); o.className = 'gm-ov'; o.innerHTML = `<div class="gm-rays"></div><div class="gm-card">${it[0]}<button class="btn gold big gm-close" type="button">Weiter ➜</button></div>`;
    document.body.appendChild(o);
    const close = () => { o.classList.add('out'); setTimeout(() => { o.remove(); it[1] && it[1](); nextOverlay(); }, 280); };
    o.querySelector('.gm-close').onclick = close;
    o.onclick = (e) => { if (e.target === o) close(); };
    let closed = false;
    const close2 = () => { if (closed) return; closed = true; document.removeEventListener('keydown', esc2); window.removeEventListener('hashchange', close2); clearTimeout(auto); close(); };
    const esc2 = (e) => { if (e.key === 'Escape') close2(); };
    document.addEventListener('keydown', esc2);
    window.addEventListener('hashchange', close2);
    const auto = setTimeout(close2, 4500); // a celebration, not a wall – it disappears by itself
    o.querySelector('.gm-close').onclick = close2;
    o.onclick = (e) => { if (e.target === o) close2(); };
    setTimeout(() => o.querySelector('.gm-close').focus(), 50);
  }
  function pop(html, cls = '') {
    const box = document.getElementById('gmPops') || (() => { const d = document.createElement('div'); d.id = 'gmPops'; document.body.appendChild(d); return d; })();
    const el = document.createElement('div'); el.className = 'gm-pop ' + cls; el.innerHTML = html; box.appendChild(el);
    setTimeout(() => el.classList.add('out'), 3600); setTimeout(() => el.remove(), 4100);
  }

  /* ---------- checks ---------- */
  function checkAll(silent) {
    const g = G();
    // quests
    todaysQuests().forEach((q) => {
      if (g.day.done[q.id] || qVal(q) < q.n) return;
      g.day.done[q.id] = true;
      if (!silent) { pop(`<span class="gm-pico">${q.ico}</span><div><b>Quest complete!</b><small>${esc(q.t)} · +15 XP</small></div>`, 'quest'); GL.sfx('ok'); }
      addRaw(15);
    });
    if (!g.day.chest && todaysQuests().every((q) => g.day.done[q.id])) {
      g.day.chest = true; g.tot.chest = (g.tot.chest || 0) + 1; addRaw(50);
      if (!silent) { overlay(`<div class="gm-chest">🎁</div><h2>All quests done!</h2><p>Your daily chest: <b>+50 XP</b></p>`); GL.confetti(120); GL.sfx('done'); }
    }
    // daily goal
    if (!g.day.goal && g.day.xp >= g.goal) { g.day.goal = true; if (!silent) { pop(`<span class="gm-pico">🎯</span><div><b>Daily goal reached!</b><small>${g.goal} XP today – super!</small></div>`, 'goal'); GL.confetti(70); GL.sfx('done'); } }
    // level
    const lv = level(Store.state.xp);
    if (lv > g.lv) {
      const t = titleOf(lv), oldT = titleOf(g.lv);
      g.lv = lv;
      if (!silent) { overlay(`<div class="gm-lvbig"><span>${lv}</span></div><h2>Level ${lv}!</h2>${t !== oldT ? `<p class="gm-newtitle">New title: <b>${t[1]} ${t[2]}</b> <small>(${t[3]})</small></p>` : `<p>${t[1]} ${t[2]} – keep going!</p>`}`); GL.confetti(160); GL.sfx('done'); }
    }
    // badges
    BADGES.forEach(([id, ico, ti, de, fn]) => {
      if (g.badges[id]) return;
      let v; try { v = fn(); } catch (e) { return; }
      if (v[0] >= v[1]) { g.badges[id] = Date.now(); if (!silent) { pop(`<span class="gm-pico gm-shine">${ico}</span><div><b>New badge: ${esc(ti)}</b><small>${esc(de)}</small></div>`, 'badge'); GL.sfx('chime'); } }
    });
    Store.save();
    paint();
  }
  let addRaw = (x) => { Store.state.xp += x; G().day.xp += x; };
  function paint() {
    const x = document.getElementById('stat-xp'); if (!x) return;
    const g = G();
    x.style.setProperty('--gp', Math.min(100, Math.round((g.day.xp / g.goal) * 100)) + '%');
    x.classList.toggle('gm-goaldone', g.day.goal);
    x.title = `Level ${level(Store.state.xp)} · today ${g.day.xp}/${g.goal} XP`;
    let lv = x.querySelector('.gm-lvb'); if (!lv) { lv = document.createElement('i'); lv.className = 'gm-lvb'; x.appendChild(lv); }
    lv.textContent = level(Store.state.xp);
  }

  /* ---------- hooks ---------- */
  const origAdd = Store.addXP.bind(Store);
  Store.addXP = function (x) {
    const g = G(); const had = Store.state.streak.last === GL.todayStr();
    origAdd(x);
    if (x > 0) {
      g.day.xp += x; fly(x);
      const h = new Date().getHours(); if (h < 8) g.tot.early = (g.tot.early || 0) + 1; if (h >= 22) g.tot.night = (g.tot.night || 0) + 1;
      if (!had && Store.state.streak.last === GL.todayStr() && Store.currentStreak() > 1) pop(`<span class="gm-pico gm-flame">🔥</span><div><b>${Store.currentStreak()}-day streak!</b><small>You came back – that’s how you learn a language.</small></div>`, 'streak');
    }
    checkAll(false);
  };
  addRaw = (x) => { Store.state.xp += x; G().day.xp += x; const t = GL.todayStr(); Store.state.activity[t] = (Store.state.activity[t] || 0) + x; GL.updateTopStats && GL.updateTopStats(); };
  const origStep = Store.markStep.bind(Store);
  Store.markStep = function (n, step) { const had = !!((Store.state.days[n] || {}).steps || {})[step]; origStep(n, step); if (!had) count('lesson', 1); };
  function count(kind, n = 1) {
    const g = G(); g.day.c[kind] = (g.day.c[kind] || 0) + n; g.tot[kind] = (g.tot[kind] || 0) + n;
    Store.save(); checkAll(false);
  }

  /* ---------- views ---------- */
  function questsHTML(compact) {
    const g = G();
    return `<div class="gm-quests ${compact ? 'compact' : ''}">${todaysQuests().map((q, i) => { const v = Math.min(q.n, qVal(q)), p = Math.round((v / q.n) * 100), d = g.day.done[q.id]; return `<a class="gm-q ${d ? 'done' : ''}" href="${q.href}" style="animation-delay:${i * 0.06}s"><span class="gm-qring" style="--p:${p}"><span>${d ? '✓' : q.ico}</span></span><span class="gm-qt"><b>${esc(q.t)}</b><small>${v} / ${q.n}${d ? ' · +15 XP ✓' : ''}</small></span></a>`; }).join('')}
      <div class="gm-chestrow ${g.day.chest ? 'open' : ''}"><span class="gm-chestico">${g.day.chest ? '🎉' : '🎁'}</span><small>${g.day.chest ? 'Chest opened: +50 XP' : 'Finish all 3 quests to open today’s chest (+50 XP)'}</small></div></div>`;
  }
  function homeHTML() {
    const g = G(), L = levelInfo(), gp = Math.min(100, Math.round((g.day.xp / g.goal) * 100));
    const plan = GL.Planner && GL.Planner.homeHTML ? GL.Planner.homeHTML() : '';
    return `${plan}<section class="gm-home">
      <a class="card gm-lvcard" href="#/rewards"><div class="gm-lvring" style="--p:${L.pct}"><span><b>${L.n}</b><small>Level</small></span></div><div><small>${L.title[1]} ${L.title[2]} · ${L.title[3]}</small><b class="gm-xpline">${Store.state.xp} XP</b><span class="gm-lvbar"><i style="width:${L.pct}%"></i></span><small class="muted">${L.hi - Store.state.xp} XP to level ${L.n + 1}</small></div></a>
      <div class="card gm-goalcard"><div class="gm-goalring ${g.day.goal ? 'done' : ''}" style="--p:${gp}"><span>${g.day.goal ? '🎯' : `<b>${g.day.xp}</b><small>/${g.goal}</small>`}</span></div><div><b>Daily goal</b><small class="muted">${g.day.goal ? 'Reached – fantastic! Extra practice still counts.' : `${g.goal - g.day.xp} XP to go today`}</small><a class="btn green gm-mixbtn" href="#/daily">⚡ Daily mix · 15 min</a></div></div>
      <div class="card gm-questcard"><div class="row"><b>📜 Today’s quests</b><span class="spacer"></span><a href="#/rewards" class="muted">🏆 Rewards</a></div>${questsHTML(true)}</div>
    </section>`;
  }
  function viewRewards() {
    const g = G(), L = levelInfo();
    const goals = [[20, 'Casual'], [50, 'Regular'], [100, 'Serious'], [150, 'Intense']];
    const heat = []; for (let i = 41; i >= 0; i--) { const d = GL.todayStr(new Date(Date.now() - i * 864e5)); const v = Store.state.activity[d] || 0; heat.push(`<i class="${v >= 150 ? 'l3' : v >= 60 ? 'l2' : v > 0 ? 'l1' : ''}" title="${d}: ${v} XP"></i>`); }
    const got = BADGES.filter(([id]) => g.badges[id]).length;
    return {
      html: `<section class="gm-hero"><div class="gm-lvring big" style="--p:${L.pct}"><span><b>${L.n}</b><small>Level</small></span></div>
          <div><span class="xm-pill">🏆 REWARDS</span><h1>${L.title[1]} ${L.title[2]} <small>(${L.title[3]})</small></h1><p><b>${Store.state.xp} XP</b> · ${L.hi - Store.state.xp} XP to level ${L.n + 1} · 🔥 ${Store.currentStreak()}-day streak · 🏅 ${got}/${BADGES.length} badges</p>
          <span class="gm-lvbar big"><i style="width:${L.pct}%"></i></span></div></section>
        <div class="grid grid-2">
          <div class="card"><h3 style="margin-top:0">📜 Today’s quests</h3>${questsHTML(false)}</div>
          <div class="card"><h3 style="margin-top:0">🎯 Daily goal</h3><p class="muted" style="margin-top:0">How much do you want to practise every day?</p><div class="chips" id="gmGoal">${goals.map(([v, l]) => `<button class="chip ${g.goal === v ? 'on' : ''}" data-v="${v}" type="button">${l} · ${v} XP</button>`).join('')}</div>
            <p style="margin:.8em 0 .3em">Today: <b>${g.day.xp}</b> / ${g.goal} XP</p><span class="gm-lvbar"><i style="width:${Math.min(100, (g.day.xp / g.goal) * 100)}%"></i></span>
            <h4>📈 Last 6 weeks</h4><div class="heat gm-heat">${heat.join('')}</div></div>
        </div>
        <h2>🏅 Badges <small class="muted">${got} of ${BADGES.length}</small></h2>
        <div class="gm-badges">${BADGES.map(([id, ico, ti, de, fn], i) => { let v = [0, 1]; try { v = fn(); } catch (e) { /* not available */ } const on = !!g.badges[id]; const p = Math.min(100, Math.round((v[0] / v[1]) * 100)); return `<div class="gm-badge ${on ? 'on' : ''}" style="animation-delay:${Math.min(i, 20) * 0.03}s" title="${esc(de)}"><span class="gm-bico">${ico}</span><b>${esc(ti)}</b><small>${esc(de)}</small>${on ? `<em>✓ ${new Date(g.badges[id]).toLocaleDateString()}</em>` : `<span class="gm-bbar"><i style="width:${p}%"></i></span>`}</div>`; }).join('')}</div>
        <h2>📊 Totals</h2><div class="stats">${[['🎤', (Store.state.speak || {}).n || tot('speak'), 'sentences spoken'], ['🎧', Math.max(tot('listen'), (Store.state.listen || {}).n || 0), 'listening exercises'], ['✍️', tot('write'), 'words written'], ['🃏', tot('cards'), 'flashcards'], ['🎯', Object.keys(ex().results || {}).length, 'exam tasks'], ['🎁', tot('chest'), 'chests opened']].map(([i, v, l]) => `<div class="stat"><span class="s-ico">${i}</span><div><b>${v}</b><span>${l}</span></div></div>`).join('')}</div>`,
      mount() {
        $$('#gmGoal .chip').forEach((b) => (b.onclick = () => { G().goal = +b.dataset.v; G().day.goal = G().day.xp >= G().goal; Store.save(); GL.render(); }));
      },
    };
  }

  function combo(target, n) {
    if (RM() || !target) return; const r = target.getBoundingClientRect(); const f = document.createElement('div'); f.className = 'ga-float big'; f.textContent = n >= 10 ? `⚡ ${n} in a row!` : `🔥 ${n} in a row!`; f.style.left = r.left + r.width / 2 + 'px'; f.style.top = r.top + 20 + 'px'; document.body.appendChild(f); setTimeout(() => f.remove(), 1000);
  }
  GL.Game = { combo, count, burst, fly, level, levelInfo, homeHTML, viewRewards, questsHTML, checkAll, paint, BADGES, todaysQuests };
  document.addEventListener('click', (e) => { if (e.target.closest('#stat-xp')) location.hash = '#/rewards'; });
  document.addEventListener('DOMContentLoaded', () => { G(); checkAll(true); });
  setTimeout(() => { try { G(); checkAll(true); } catch (e) { /* store not ready */ } }, 0);
})();
