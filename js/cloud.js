/* Study-time tracking (everywhere) + shared learner data, teacher inbox and admin dashboard (claude.ai viewer only, `db` capability). */
(function () {
  'use strict';
  const { $, $$, esc, attr, Store, toast } = GL;

  /* ---------- study time: counts 15-second ticks while the page is visible and used ---------- */
  let lastAct = Date.now();
  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach((ev) => document.addEventListener(ev, () => (lastAct = Date.now()), { passive: true }));
  setInterval(() => {
    const speaking = window.speechSynthesis && speechSynthesis.speaking;
    if (document.hidden || (Date.now() - lastAct > 90000 && !speaking)) return;
    const t = (Store.state.time = Store.state.time || {});
    const d = GL.todayStr();
    t[d] = (t[d] || 0) + 15;
    Store.save();
  }, 15000);
  GL.minutesOn = (d) => Math.round(((Store.state.time || {})[d] || 0) / 60);

  /* ---------- shared data ---------- */
  const listeners = new Set();
  const Cloud = { ready: false, owner: false, uid: null, mine: null, all: [], blocked: false, on(fn) { listeners.add(fn); return () => listeners.delete(fn); } };
  const emit = () => { listeners.forEach((fn) => { try { fn(); } catch (e) { console.error(e); } }); updateNav(); };
  GL.Cloud = Cloud;

  function studioSummary(sd) {
    const h = ((sd || {}).history || []).filter((x) => x.score != null);
    if (!h.length) return null;
    const cats = {};
    h.forEach((x) => Object.entries(x.cats || {}).forEach(([k, n]) => (cats[k] = (cats[k] || 0) + n)));
    const last = h.slice(-10);
    return { texts: h.length, words: h.reduce((a, x) => a + (x.words || 0), 0), avg: Math.round(last.reduce((a, x) => a + x.score, 0) / last.length), last: h.slice(-12).map((x) => [x.date, x.score, x.title.slice(0, 40)]), cats };
  }

  function summary() {
    const st = Store.state;
    const best = {}, done = [];
    let steps = 0;
    Object.entries(st.days || {}).forEach(([k, v]) => { if (v.best) best[k] = v.best; if (v.done) done.push(+k); steps += Object.keys(v.steps || {}).length; });
    const time = {};
    let total = 0;
    Object.entries(st.time || {}).forEach(([d, sec]) => { total += sec; });
    for (let i = 0; i < 60; i++) { const d = GL.todayStr(new Date(Date.now() - i * 864e5)); if (st.time && st.time[d]) time[d] = Math.round(st.time[d] / 60); }
    const tr = {};
    ['verbs', 'articles', 'adjectives'].forEach((k) => { const x = (st.trainer || {})[k]; if (x) tr[k] = { right: x.right || 0, total: x.total || 0 }; });
    return {
      xp: st.xp, streak: Store.currentStreak(), done: done.sort((a, b) => a - b), currentDay: Store.nextDay(), best, steps,
      time, totalMin: Math.round(total / 60), mistakes: Object.keys(st.mistakes || {}).length, trainer: tr,
      stories: (st.trainer || {}).stories || {}, scenes: Object.fromEntries(Object.entries(st.scenes || {}).map(([k, v]) => [k, v.best || 0])),
      writing: Object.values(st.writing || {}).filter((w) => w && w.trim()).length, lastActive: GL.todayStr(),
      studio: studioSummary(st.studio),
      speak: GL.Speak ? GL.Speak.summary() : null,
      activity: (st.events || []).slice(-150),
    };
  }

  let lastKey = '', writing = Promise.resolve();
  const queue = (fn) => (writing = writing.then(fn, fn));
  function sync() {
    if (!Cloud.ready || Cloud.blocked) return Promise.resolve();
    const s = summary();
    const key = JSON.stringify(s);
    if (key === lastKey) return writing;
    return queue(async () => {
      try {
        const body = Object.assign({}, s, { updatedAt: Date.now() });
        if (Cloud.mine) await Cloud.ref.update(body);
        else {
          const snap = await Cloud.ref.get();
          if (snap.exists) await Cloud.ref.update(body);
          else await Cloud.ref.set(Object.assign(body, { messages: {} }));
        }
        lastKey = key;
      } catch (e) {
        if (e && e.code === 'invalid_argument') { Cloud.blocked = true; emit(); }
      }
    });
  }
  Cloud.sync = sync;
  Cloud._queue = queue;
  Cloud._summary = summary;

  /* Activity log ("who did what"): kept locally and shipped with the summary. */
  let trackTimer = null;
  Cloud.track = (k, x) => {
    const st = Store.state;
    const ev = (st.events = st.events || []);
    ev.push({ t: Date.now(), k, x: String(x || '').slice(0, 140) });
    if (ev.length > 200) ev.splice(0, ev.length - 200);
    Store.save();
    clearTimeout(trackTimer);
    trackTimer = setTimeout(sync, 4000);
  };
  GL.track = Cloud.track;

  /* Registration profile, stored in the learner's own document. */
  Cloud.saveProfile = (profile) => queue(async () => {
    const snap = await Cloud.ref.get();
    if (snap.exists) await Cloud.ref.update({ profile });
    else await Cloud.ref.set(Object.assign(summary(), { updatedAt: Date.now(), messages: {}, profile }));
  });

  /* Teacher-only data (status, private notes) – readable and writable by the owner only. */
  Cloud.roster = {};
  Cloud.saveRoster = (id, patch) => queue(async () => {
    const ref = Cloud.db.doc('teacher/roster');
    const body = { students: { [id]: Object.assign({}, patch, { updatedAt: Date.now() }) } };
    const snap = await ref.get();
    if (snap.exists) await ref.update(body); else await ref.set(body);
  });

  Cloud.init = (async () => {
    const [db, user] = await Promise.all([GL.useCap('db'), GL.useCap('user')]);
    if (!db || !user) return Cloud;
    const uid = await user.id();
    if (!uid) return Cloud;
    Object.assign(Cloud, { db, user, uid, ready: true, owner: await user.isOwner(), canWrite: await user.can('data.write') });
    if (Cloud.canWrite === false && !Cloud.owner) Cloud.blocked = true;
    Cloud.ref = db.doc('learners/' + uid);
    Cloud.ref.onSnapshot((snap) => { Cloud.mine = snap.exists ? snap.data() : null; Cloud.mineLoaded = true; emit(); }, () => { Cloud.mineLoaded = true; emit(); });
    if (Cloud.owner) {
      db.collection('learners').onSnapshot((q) => { Cloud.all = q.docs.map((d) => Object.assign({ id: d.id }, d.data())); emit(); }, () => {});
      db.doc('teacher/roster').onSnapshot((snap) => { Cloud.roster = (snap.exists && snap.data().students) || {}; emit(); }, () => {});
    }
    sync();
    setInterval(sync, 120000);
    document.addEventListener('visibilitychange', () => { if (document.hidden) sync(); });
    emit();
    return Cloud;
  })();

  const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  Cloud.send = async (type, text, context) => {
    await Cloud.init;
    if (!Cloud.ready || Cloud.blocked) throw { code: 'blocked' };
    await sync();
    if (!Cloud.mine) { await Cloud.ref.set(Object.assign(summary(), { updatedAt: Date.now(), messages: {} })); }
    const id = newId();
    Cloud.track('message', (TYPES[type] || type) + (context ? ' · ' + context : ''));
    const msg = { id, type, text: String(text).slice(0, 5000), context: String(context || '').slice(0, 200), createdAt: Date.now(), status: 'open' };
    await queue(() => Cloud.ref.update({ messages: { [id]: msg } }));
    return id;
  };
  Cloud.reply = (learnerId, msgId, text) => Cloud.db.doc('learners/' + learnerId).update({ messages: { [msgId]: { reply: String(text).slice(0, 5000), replyAt: Date.now(), status: 'answered' } } });
  Cloud.reopen = (learnerId, msgId) => Cloud.db.doc('learners/' + learnerId).update({ messages: { [msgId]: { status: 'open' } } });
  Cloud.unread = () => Object.values((Cloud.mine && Cloud.mine.messages) || {}).filter((m) => m.replyAt && m.replyAt > (Cloud.mine.seenAt || 0)).length;
  Cloud.markSeen = () => { if (Cloud.ready && !Cloud.blocked && Cloud.unread()) queue(() => Cloud.ref.update({ seenAt: Date.now() })); };
  Cloud.openCount = () => Cloud.all.reduce((n, l) => n + Object.values(l.messages || {}).filter((m) => m.status === 'open').length, 0);

  function updateNav() {
    const t = $('#navTeacher'), a = $('#navAdmin');
    if (t) { t.classList.toggle('hidden', !Cloud.ready || Cloud.owner); const n = Cloud.unread(); $('.nb', t).textContent = n || ''; $('.nb', t).classList.toggle('hidden', !n); }
    if (a) { a.classList.toggle('hidden', !Cloud.owner); const n = Cloud.openCount(); $('.nb', a).textContent = n || ''; $('.nb', a).classList.toggle('hidden', !n); }
  }

  const TYPES = { question: '❓ Question', correct: '✍️ Please correct my text', other: '💬 Other' };
  const fmtDate = (ts) => new Date(ts).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });

  /* ======================================================
     LEARNER: "My teacher" page
     ====================================================== */
  GL.viewTeacher = function () {
    return {
      html: `<h1>📨 My teacher</h1>
        <p class="muted">Send questions or texts to your teacher. Answers and corrections appear here.</p>
        <div id="tchRoot"><div class="card"><p class="muted">Connecting…</p></div></div>`,
      mount() {
        const root = $('#tchRoot');
        Cloud.init.then(() => {
          if (!root.isConnected) return;
          if (!Cloud.ready) { root.innerHTML = `<div class="note">Messages to a teacher work when this course is opened on claude.ai and shared with you. In this copy everything else works normally.</div>`; return; }
          const draft = GL.teacherDraft || {};
          GL.teacherDraft = null;
          root.innerHTML = `
            ${Cloud.blocked ? `<div class="warn">You have view-only access, so your progress and messages can’t be saved. Ask your teacher to share the course with you as <b>Contributor</b> (or Editor).</div>` : ''}
            <div class="card">
              <h3>✏️ New message</h3>
              <div class="row"><label for="tType"><b>Type</b></label><select id="tType">${Object.entries(TYPES).map(([k, l]) => `<option value="${k}" ${draft.type === k ? 'selected' : ''}>${l}</option>`).join('')}</select>
                <input class="txt-in" id="tCtx" placeholder="About (optional), e.g. Day 5 – accusative" value="${attr(draft.context || '')}" style="flex:1;min-width:200px"></div>
              <textarea class="write" id="tText" style="margin-top:10px;min-height:130px" placeholder="Write your question or paste your German text …">${esc(draft.text || '')}</textarea>
              <div class="row" style="margin-top:10px"><span class="muted" id="tInfo"></span><span class="spacer"></span><button class="btn green" id="tSend" ${Cloud.blocked ? 'disabled' : ''}>📨 Send to my teacher</button></div>
            </div>
            <div class="card"><h3>🗂️ My messages</h3><div id="tList"></div></div>`;
          $('#tSend').onclick = async () => {
            const text = $('#tText').value.trim();
            if (text.length < 3) { $('#tInfo').textContent = 'Write a message first.'; return; }
            $('#tSend').disabled = true; $('#tInfo').textContent = 'Sending…';
            try { await Cloud.send($('#tType').value, text, $('#tCtx').value.trim()); $('#tText').value = ''; $('#tCtx').value = ''; $('#tInfo').textContent = '✅ Sent – your teacher will answer here.'; GL.sfx('ok'); }
            catch (e) { $('#tInfo').textContent = 'Could not send. ' + (e && e.code === 'quota_exceeded' ? 'The message store is full – tell your teacher.' : 'Please try again.'); }
            $('#tSend').disabled = !!Cloud.blocked;
          };
          const draw = () => {
            const l = $('#tList');
            if (!l) return;
            const msgs = Object.values((Cloud.mine && Cloud.mine.messages) || {}).sort((a, b) => b.createdAt - a.createdAt);
            l.innerHTML = msgs.length ? msgs.map((m) => `<div class="msg-item ${m.status}">
                <div class="row"><b>${TYPES[m.type] || '💬'}</b>${m.context ? `<span class="path-tag">${esc(m.context)}</span>` : ''}<span class="spacer"></span><small class="muted">${fmtDate(m.createdAt)}</small></div>
                <p class="msg-text">${esc(m.text)}</p>
                ${m.reply ? `<div class="msg-reply"><b>👩‍🏫 Teacher</b> <small class="muted">${fmtDate(m.replyAt)}</small><p>${esc(m.reply)}</p><button class="btn tiny ghost" data-say="${attr(m.reply)}">🔊 Listen</button></div>` : '<p class="muted" style="margin:0">⏳ Waiting for an answer</p>'}
              </div>`).join('') : '<p class="muted">No messages yet. Your first question is one click away.</p>';
            Cloud.markSeen();
          };
          draw();
          const off = Cloud.on(() => { if (!root.isConnected) { off(); return; } draw(); });
        });
      },
    };
  };

  /* ======================================================
     ADMIN DASHBOARD (artifact owner only)
     ====================================================== */
  let selected = null, inboxFilter = 'open', stuFilter = 'current';
  const STATUS = { active: ['🟢', 'Active'], paused: ['⏸️', 'Paused'], finished: ['🎓', 'Finished'], archived: ['🗄️', 'Archived'] };
  const statusOf = (id) => (Cloud.roster[id] && Cloud.roster[id].status) || 'active';
  const EV = { open: '👋', register: '📝', profile: '✏️', step: '📖', day: '✅', scene: '🎬', writing: '✍️', speak: '🎤', story: '📚', talk: '🤖', message: '📨' };
  const GOAL_L = { work: 'Work', study: 'Studies', move: 'Moving to Germany', exam: 'Exam', family: 'Family / partner', travel: 'Travel', fun: 'For fun' };
  const fmtDay = (ts) => new Date(ts).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' });
  const fmtTime = (ts) => new Date(ts).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  function timelineHTML(l) {
    const evs = (l.activity || []).slice().reverse().slice(0, 80);
    if (!evs.length) return '<p class="muted">No activity recorded yet. New activity appears here as soon as the student studies.</p>';
    let html = '', day = '';
    evs.forEach((e) => {
      const d = fmtDay(e.t);
      if (d !== day) { if (day) html += '</ul>'; html += `<h5 class="tl-day">${d}</h5><ul class="timeline">`; day = d; }
      html += `<li><span class="tl-ico">${EV[e.k] || '•'}</span><span class="tl-time">${fmtTime(e.t)}</span><span>${esc(e.x)}</span></li>`;
    });
    return html + '</ul>';
  }
  function profileHTML(l) {
    const p = l.profile, r = Cloud.roster[l.id] || {};
    const week = lastNDays(7), avgDay = Math.round(sumMin(l, week) / 7);
    const contact = p ? [p.email ? `<a href="mailto:${attr(p.email)}">✉️ ${esc(p.email)}</a>` : '', p.phone ? `<a href="tel:${attr(p.phone.replace(/[^+\d]/g, ''))}">📞 ${esc(p.phone)}</a> <a href="https://wa.me/${attr(p.phone.replace(/[^\d]/g, ''))}" target="_blank" rel="noopener">WhatsApp</a>` : ''].filter(Boolean).join(' · ') : '';
    return `<div class="grid grid-2 prof-grid">
      <div class="prof-box"><h4 style="margin-top:0">📝 Registration</h4>${p ? `
        ${contact ? `<p style="margin:0 0 8px">${contact}</p>` : ''}
        <div class="kv"><span>Registered</span><b>${p.registeredAt ? fmtDay(p.registeredAt) : '–'}</b></div>
        <div class="kv"><span>German at the start</span><b>${esc(p.level || '–')}</b></div>
        <div class="kv"><span>Goals</span><b>${esc((p.goals || []).map((g) => GOAL_L[g] || g).join(', ') || '–')}</b></div>
        <div class="kv"><span>Daily time goal</span><b>${p.minutes || '–'} min · actual ⌀ ${avgDay} min (7 days)</b></div>
        <div class="kv"><span>Native language</span><b>${esc(p.lang || '–')}</b></div>
        <div class="kv"><span>City / country</span><b>${esc(p.city || '–')}</b></div>
        ${p.note ? `<p class="muted" style="margin:8px 0 0">💬 “${esc(p.note)}”</p>` : ''}` : '<p class="muted">This person opened the course but hasn’t registered yet. They’ll see the registration screen next time.</p>'}</div>
      <div class="prof-box"><h4 style="margin-top:0">🔒 Teacher only</h4><p class="muted" style="margin-top:0">Only you can see this – not the student.</p>
        <label class="muted" for="tchStatus">Status</label>
        <select class="txt-in" id="tchStatus" style="width:100%;margin:4px 0 10px">${Object.entries(STATUS).map(([k, [ic, lb]]) => `<option value="${k}" ${statusOf(l.id) === k ? 'selected' : ''}>${ic} ${lb}</option>`).join('')}</select>
        <label class="muted" for="tchNote">Private notes (payments, lesson plans, strengths …)</label>
        <textarea class="txt-in" id="tchNote" rows="5" style="width:100%;margin-top:4px" placeholder="e.g. Paid until 30.11. · Needs more speaking practice · Exam on 15 March">${esc(r.note || '')}</textarea>
        <div class="row" style="margin-top:8px"><button class="btn small green" id="tchSave">💾 Save</button><span class="muted" id="tchInfo">${r.updatedAt ? 'Last saved ' + fmtDay(r.updatedAt) : ''}</span></div></div>
    </div>`;
  }
  function csvExport(learners, nm) {
    const week = lastNDays(7);
    const rows = [['Name', 'Claude account', 'Email', 'Phone', 'Status', 'Registered', 'Level at start', 'Goals', 'Current day', 'Days done', 'XP', 'Streak', 'Minutes last 7 days', 'Total minutes', 'Avg exercise score', 'Writing texts', 'Avg writing score', 'Sentences spoken', 'Speaking accuracy', 'Mistakes in notebook', 'Last active', 'Teacher notes']];
    learners.forEach((l) => {
      const p = l.profile || {}, r = Cloud.roster[l.id] || {};
      rows.push([p.name || '', nm(l.id, true), p.email || '', p.phone || '', statusOf(l.id), p.registeredAt ? new Date(p.registeredAt).toISOString().slice(0, 10) : '', p.level || '', (p.goals || []).map((g) => GOAL_L[g] || g).join('; '),
        l.currentDay || 1, (l.done || []).length, l.xp || 0, l.streak || 0, sumMin(l, week), l.totalMin || 0, avgScore(l) == null ? '' : avgScore(l),
        l.studio ? l.studio.texts : 0, l.studio ? l.studio.avg : '', l.speak ? l.speak.n : 0, l.speak && l.speak.avg != null ? l.speak.avg : '', l.mistakes || 0, l.lastActive || '', r.note || '']);
    });
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(';')).join('\r\n');
    GL.saveFile(`students-${GL.todayStr()}.csv`, new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' }), 'text/csv');
  }
  const lastNDays = (n) => Array.from({ length: n }, (_, i) => GL.todayStr(new Date(Date.now() - (n - 1 - i) * 864e5)));
  const sumMin = (l, days) => days.reduce((a, d) => a + ((l.time || {})[d] || 0), 0);
  const fmtMin = (m) => (m >= 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m} min`);
  const avgScore = (l) => { const v = Object.values(l.best || {}); return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : null; };
  const daysAgo = (d) => { if (!d) return Infinity; return Math.round((new Date(GL.todayStr()) - new Date(d)) / 864e5); };
  const agoText = (d) => { const n = daysAgo(d); return n === Infinity ? '–' : n === 0 ? 'today' : n === 1 ? 'yesterday' : `${n} days ago`; };

  function barChart(l) {
    const days = lastNDays(14), vals = days.map((d) => (l.time || {})[d] || 0);
    const max = Math.max(30, ...vals), top = Math.ceil(max / 30) * 30;
    const W = 560, H = 190, padL = 34, padB = 26, padT = 12, cw = (W - padL - 8) / days.length, bw = Math.max(6, cw - 8);
    const y = (v) => H - padB - (v / top) * (H - padB - padT);
    const ticks = [0, top / 2, top];
    return `<div class="chart-wrap"><svg viewBox="0 0 ${W} ${H}" class="bar-chart" role="img" aria-label="Minutes studied per day, last 14 days">
      ${ticks.map((t) => `<line x1="${padL}" x2="${W - 4}" y1="${y(t)}" y2="${y(t)}" class="grid"/><text x="${padL - 6}" y="${y(t) + 4}" text-anchor="end" class="axis">${t}</text>`).join('')}
      ${vals.map((v, i) => {
        const x = padL + i * cw + (cw - bw) / 2, h = Math.max(0, H - padB - y(v)), r = Math.min(4, h / 2);
        const yy = H - padB - h;
        const path = h ? `M${x} ${H - padB} V${yy + r} Q${x} ${yy} ${x + r} ${yy} H${x + bw - r} Q${x + bw} ${yy} ${x + bw} ${yy + r} V${H - padB} Z` : '';
        const d = days[i];
        return `<g class="bar-g" data-tip="${attr(`${d.slice(8)}.${d.slice(5, 7)}.: ${v} min`)}"><rect x="${padL + i * cw}" y="${padT}" width="${cw}" height="${H - padT - padB}" fill="transparent"/>${path ? `<path d="${path}" class="bar"/>` : ''}
          ${i % 2 === 1 || i === days.length - 1 ? `<text x="${x + bw / 2}" y="${H - 8}" text-anchor="middle" class="axis">${d.slice(8)}.${d.slice(5, 7)}.</text>` : ''}</g>`;
      }).join('')}
      <line x1="${padL}" x2="${W - 4}" y1="${H - padB}" y2="${H - padB}" class="baseline"/>
    </svg><div class="chart-tip" hidden></div></div>`;
  }

  GL.viewAdmin = function () {
    return {
      html: `<h1>📊 Teacher dashboard</h1>
        <p class="muted">Your students: who registered, what each of them did and when, how much time they spend – and their questions.</p>
        <div id="admRoot"><div class="card"><p class="muted">Connecting…</p></div></div>`,
      mount() {
        const root = $('#admRoot');
        Cloud.init.then(() => {
          if (!root.isConnected) return;
          if (!Cloud.ready) { root.innerHTML = `<div class="note">The dashboard uses shared data, so it works when this course is opened on claude.ai (your published link). This local copy has no shared storage.</div>`; return; }
          if (!Cloud.owner) { root.innerHTML = `<div class="note">Only the owner of this course can see the teacher dashboard.</div><p><a class="btn" href="#/teacher">📨 Message my teacher</a></p>`; return; }
          const render = async () => {
            if (!root.isConnected) return;
            const everyone = Cloud.all.filter((l) => l.id !== Cloud.uid).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
            const ids = everyone.map((l) => l.id);
            const ps = ids.length ? await Cloud.user.profiles(ids) : {};
            const nm = (id, account) => { const l = everyone.find((x) => x.id === id); if (!account && l && l.profile && l.profile.name) return l.profile.name; return (ps[id] && ps[id].name) || (id === Cloud.uid ? 'You' : 'Student'); };
            const counts = { current: 0, finished: 0, archived: 0, all: everyone.length };
            everyone.forEach((l) => { const st = statusOf(l.id); if (st === 'finished') counts.finished++; else if (st === 'archived') counts.archived++; else counts.current++; });
            const learners = everyone.filter((l) => { const st = statusOf(l.id); return stuFilter === 'all' || (stuFilter === 'current' ? st === 'active' || st === 'paused' : st === stuFilter); });
            const registered = everyone.filter((l) => l.profile).length;
            const week = lastNDays(7);
            const active = learners.filter((l) => daysAgo(l.lastActive) <= 6).length;
            const weekMin = learners.reduce((a, l) => a + sumMin(l, week), 0);
            const open = Cloud.openCount();
            if (selected && !learners.some((l) => l.id === selected)) selected = null;
            const sel = learners.find((l) => l.id === selected);
            const allMsgs = [];
            learners.forEach((l) => Object.values(l.messages || {}).forEach((m) => allMsgs.push(Object.assign({ learner: l.id }, m))));
            const shown = allMsgs.filter((m) => inboxFilter === 'all' || m.status === inboxFilter).sort((a, b) => (inboxFilter === 'open' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt));
            root.innerHTML = `
              <div class="stats">
                <div class="stat"><span class="s-ico">👥</span><div><b>${registered}</b><span>registered students${everyone.length > registered ? ` · ${everyone.length - registered} not yet` : ''}</span></div></div>
                <div class="stat"><span class="s-ico">🟢</span><div><b>${active}</b><span>active in the last 7 days</span></div></div>
                <div class="stat"><span class="s-ico">⏱️</span><div><b>${fmtMin(weekMin)}</b><span>study time, last 7 days</span></div></div>
                <div class="stat"><span class="s-ico">📨</span><div><b>${open}</b><span>open messages</span></div></div>
              </div>
              ${everyone.length ? '' : `<div class="card"><h3>No students yet</h3><p>Share this course from the <b>Share</b> menu and give each student <b>Contributor</b> access (or invite them by email as <b>Editor</b>). When they open it, they register with their name and details – then they appear here with all their progress and activity.</p></div>`}
              ${everyone.length ? `<div class="card"><div class="row"><h3 style="margin:0">👥 Students</h3><span class="spacer"></span>
                <div class="chips" id="stuFilter">${[['current', 'Current'], ['finished', 'Finished'], ['archived', 'Archived'], ['all', 'All']].map(([k, lb]) => `<button class="chip ${stuFilter === k ? 'on' : ''}" data-f="${k}">${lb} <small>${counts[k]}</small></button>`).join('')}</div>
                <button class="btn small ghost" id="admCsv">⬇ Export CSV</button></div>
                <div class="gtable-wrap" style="margin-top:10px"><table class="gtable adm-table"><thead><tr><th>Student</th><th>Status</th><th>Registered</th><th>Day</th><th>Done</th><th>Today</th><th>7 days</th><th>Total time</th><th>Avg. score</th><th>Last active</th><th>Open</th></tr></thead><tbody>
                ${learners.map((l) => { const o = Object.values(l.messages || {}).filter((m) => m.status === 'open').length; const av = avgScore(l); const st = STATUS[statusOf(l.id)]; const p = l.profile; return `<tr class="${l.id === selected ? 'sel' : ''}" data-id="${attr(l.id)}" tabindex="0">
                  <td><b class="who" data-name="${attr(l.id)}"></b>${p ? `<br><small class="muted who-acc" data-acc="${attr(l.id)}"></small>` : '<br><span class="path-tag warn-tag">not registered</span>'}</td>
                  <td><span class="st-chip st-${statusOf(l.id)}">${st[0]} ${st[1]}</span></td><td>${p && p.registeredAt ? new Date(p.registeredAt).toLocaleDateString('de-DE') : '–'}</td>
                  <td>${l.currentDay || 1}</td><td>${(l.done || []).length}/30</td>
                  <td>${((l.time || {})[GL.todayStr()] || 0)} min</td><td>${fmtMin(sumMin(l, week))}</td><td>${fmtMin(l.totalMin || 0)}</td>
                  <td>${av == null ? '–' : `<span class="score-badge ${av >= 80 ? '' : av >= 50 ? 'mid' : 'low'}">${av}%</span>`}</td>
                  <td><span class="act ${daysAgo(l.lastActive) <= 1 ? 'on' : daysAgo(l.lastActive) <= 6 ? 'mid' : 'off'}"></span>${agoText(l.lastActive)}</td><td>${o ? `<span class="nb-inline">${o}</span>` : '–'}</td></tr>`; }).join('')}
                </tbody></table></div>${learners.length ? '' : '<p class="muted">No students in this list.</p>'}<p class="muted" style="margin:8px 0 0">Click a student for their profile, activity timeline and progress. Time counts only while the course is open and being used.</p></div>` : ''}
              ${sel ? `<div class="card" id="admDetail"><div class="row"><h3 style="margin:0">📈 <span class="who" data-name="${attr(sel.id)}"></span></h3><span class="spacer"></span><button class="btn tiny ghost" id="admClose">✖ Close</button></div>
                ${profileHTML(sel)}
                <h4>🕒 Activity – who did what</h4><div class="tl-wrap">${timelineHTML(sel)}</div>
                <h4>Minutes studied per day · last 14 days</h4>${barChart(sel)}
                <h4>30-day plan</h4><div class="day-grid">${GL.days.map((d) => { const b = (sel.best || {})[d.day], dn = (sel.done || []).includes(d.day); return `<span class="${dn ? 'done' : b ? 'part' : ''}" title="Day ${d.day}: ${esc(d.title)}${b ? ' · best ' + b + '%' : ''}">${d.day}${b ? `<small>${b}%</small>` : ''}</span>`; }).join('')}</div>
                <div class="grid grid-3" style="margin-top:14px">
                  <div><h4>🏋️ Trainer accuracy</h4>${['verbs', 'articles', 'adjectives'].map((k) => { const t = (sel.trainer || {})[k]; return `<div class="kv"><span>${{ verbs: 'Verbs', articles: 'Articles & cases', adjectives: 'Adjective endings' }[k]}</span><b>${t && t.total ? Math.round((t.right / t.total) * 100) + '% of ' + t.total : '–'}</b></div>`; }).join('')}</div>
                  <div><h4>🎬 Scenes & 📖 stories</h4>${(() => { const sc = GL.scenarios.filter((x) => (sel.scenes || {})[x.id] != null), so = GL.stories.filter((x) => (sel.stories || {})[x.id] != null); return sc.length || so.length ? sc.map((x) => `<div class="kv"><span>${x.icon} ${esc(x.title)}</span><b>${sel.scenes[x.id]}%</b></div>`).join('') + so.map((x) => `<div class="kv"><span>📖 ${esc(x.title)}</span><b>${sel.stories[x.id]}%</b></div>`).join('') + `<p class="muted" style="margin:6px 0 0">${sc.length} of ${GL.scenarios.length} scenes · ${so.length} of ${GL.stories.length} stories</p>` : '<p class="muted">None finished yet.</p>'; })()}</div>
                  <div><h4>✍️ Activity</h4><div class="kv"><span>Lesson steps opened</span><b>${sel.steps || 0}</b></div><div class="kv"><span>Writing tasks written</span><b>${sel.writing || 0}</b></div><div class="kv"><span>Sentences spoken</span><b>${sel.speak ? sel.speak.n + ' · today ' + ((sel.speak.days || {})[GL.todayStr()] || 0) : '–'}</b></div><div class="kv"><span>Speaking accuracy</span><b>${sel.speak && sel.speak.avg != null ? sel.speak.avg + '%' : '–'}</b></div>${sel.speak && (sel.speak.weak || []).length ? `<div class="kv"><span>Tricky words</span><b>${sel.speak.weak.slice(0, 4).map(esc).join(', ')}</b></div>` : ''}<div class="kv"><span>Writing studio texts</span><b>${sel.studio ? sel.studio.texts + ' · ' + sel.studio.words + ' words' : '–'}</b></div><div class="kv"><span>Avg. writing score (last 10)</span><b>${sel.studio ? sel.studio.avg + '/100' : '–'}</b></div>${sel.studio && Object.keys(sel.studio.cats || {}).length ? `<div class="kv"><span>Most frequent mistakes</span><b>${Object.entries(sel.studio.cats).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([k, n]) => esc({ grammar: 'grammar', case: 'cases', verb: 'verbs', word_order: 'word order', spelling: 'spelling', vocabulary: 'word choice', punctuation: 'commas', style: 'style' }[k] || k) + ' (' + n + ')').join(', ')}</b></div>` : ''}<div class="kv"><span>Mistakes in notebook</span><b>${sel.mistakes || 0}</b></div><div class="kv"><span>Messages sent</span><b>${Object.keys(sel.messages || {}).length}</b></div></div>
                </div></div>` : ''}
              <div class="card"><div class="row"><h3 style="margin:0">📨 Inbox</h3><span class="spacer"></span>
                <div class="chips" id="admFilter">${[['open', 'Open'], ['answered', 'Answered'], ['all', 'All']].map(([k, l]) => `<button class="chip ${inboxFilter === k ? 'on' : ''}" data-f="${k}">${l}</button>`).join('')}</div></div>
                <div id="admInbox">${shown.length ? shown.map((m) => `<div class="msg-item ${m.status}" data-l="${attr(m.learner)}" data-m="${attr(m.id)}">
                  <div class="row"><b class="who" data-name="${attr(m.learner)}"></b><span class="path-tag">${TYPES[m.type] || '💬'}</span>${m.context ? `<span class="path-tag">${esc(m.context)}</span>` : ''}<span class="spacer"></span><small class="muted">${fmtDate(m.createdAt)}</small></div>
                  <p class="msg-text">${esc(m.text)}</p>
                  ${m.reply ? `<div class="msg-reply"><b>Your answer</b> <small class="muted">${fmtDate(m.replyAt)}</small><p>${esc(m.reply)}</p></div>` : ''}
                  <textarea class="txt-in rep-in" id="rep-${attr(m.id)}" rows="3" placeholder="${m.type === 'correct' ? 'Write the corrected text and explain the mistakes …' : 'Write your answer …'}">${m.reply ? esc(m.reply) : ''}</textarea>
                  <div class="row" style="margin-top:8px"><span class="rep-info muted"></span><span class="spacer"></span><button class="btn small purple rep-ai hidden">✨ Draft with AI</button>${m.status === 'answered' ? '<button class="btn small ghost rep-open">Reopen</button>' : ''}<button class="btn small green rep-send">${m.reply ? 'Update answer' : 'Send answer'}</button></div>
                </div>`).join('') : `<p class="muted">${inboxFilter === 'open' ? 'No open messages. 🎉' : 'Nothing here yet.'}</p>`}</div></div>`;
            $$('[data-name]', root).forEach((el) => { el.textContent = nm(el.dataset.name); });
            $$('[data-acc]', root).forEach((el) => { el.textContent = 'claude.ai: ' + nm(el.dataset.acc, true); });
            $$('#stuFilter .chip', root).forEach((b) => (b.onclick = () => { stuFilter = b.dataset.f; render(); }));
            const csvB = $('#admCsv'); if (csvB) csvB.onclick = () => csvExport(everyone, nm);
            const tSave = $('#tchSave');
            if (tSave) tSave.onclick = async () => {
              const info = $('#tchInfo'); info.textContent = 'Saving…';
              try { await Cloud.saveRoster(sel.id, { status: $('#tchStatus').value, note: $('#tchNote').value.slice(0, 4000) }); info.textContent = '✅ Saved'; GL.sfx('ok'); } catch (e) { info.textContent = 'Could not save – try again.'; }
            };
            $$('.adm-table tbody tr', root).forEach((tr) => {
              const go = () => { selected = selected === tr.dataset.id ? null : tr.dataset.id; render().then(() => { const d = $('#admDetail'); d && d.scrollIntoView({ behavior: 'smooth', block: 'start' }); }); };
              tr.onclick = go; tr.onkeydown = (e) => { if (e.key === 'Enter') go(); };
            });
            const close = $('#admClose'); if (close) close.onclick = () => { selected = null; render(); };
            $$('#admFilter .chip', root).forEach((b) => (b.onclick = () => { inboxFilter = b.dataset.f; render(); }));
            // chart tooltip
            const cw = $('.chart-wrap', root);
            if (cw) {
              const tip = $('.chart-tip', cw);
              $$('.bar-g', cw).forEach((g) => {
                g.addEventListener('pointerenter', (e) => { tip.hidden = false; tip.textContent = g.dataset.tip; const r = cw.getBoundingClientRect(), b = g.getBoundingClientRect(); tip.style.left = (b.left - r.left + b.width / 2) + 'px'; tip.style.top = '0px'; g.classList.add('hover'); });
                g.addEventListener('pointerleave', () => { tip.hidden = true; g.classList.remove('hover'); });
              });
            }
            // replies
            GL.AI.get().then((sample) => { if (sample) $$('.rep-ai', root).forEach((b) => b.classList.remove('hidden')); });
            $$('#admInbox .msg-item', root).forEach((item) => {
              const lid = item.dataset.l, mid = item.dataset.m, ta = $('.rep-in', item), info = $('.rep-info', item);
              const msg = allMsgs.find((x) => x.id === mid && x.learner === lid);
              $('.rep-send', item).onclick = async () => {
                const txt = ta.value.trim();
                if (!txt) { info.textContent = 'Write an answer first.'; return; }
                info.textContent = 'Sending…';
                try { await Cloud.reply(lid, mid, txt); info.textContent = '✅ Sent'; GL.sfx('ok'); } catch (e) { info.textContent = 'Could not send – try again.'; }
              };
              const ro = $('.rep-open', item); if (ro) ro.onclick = () => Cloud.reopen(lid, mid);
              $('.rep-ai', item).onclick = async () => {
                info.textContent = 'AI is drafting…';
                try {
                  if (msg.type === 'correct') {
                    const r = await GL.Tutor.aiCorrect({ task: msg.context || 'Free text', text: msg.text, level: 'A2' });
                    ta.value = `Korrigiert:\n${r.corrected}\n\n${r.mistakes.map((x) => `• ${x.wrong} → ${x.right}: ${x.why}`).join('\n')}${r.next ? `\n\nTipp: ${r.next}` : ''}`;
                  } else {
                    const sample = await GL.AI.get();
                    const { text } = await sample(`You are a friendly German teacher answering a learner's message in a beginner course. Answer in simple English with short German examples (with translations). Under 150 words, plain text.\nTopic: ${msg.context || '-'}\nMessage: ${msg.text}`);
                    ta.value = text;
                  }
                  info.textContent = 'Draft ready – check and edit it, then send.';
                } catch (e) { info.textContent = GL.AI.errorText(e); }
              };
            });
          };
          render();
          let pending = null;
          const off = Cloud.on(() => {
            if (!root.isConnected) { off(); return; }
            // don't wipe a reply the teacher is typing
            const typing = document.activeElement && (document.activeElement.classList.contains('rep-in') && document.activeElement.value || document.activeElement.id === 'tchNote');
            if (typing) { clearTimeout(pending); pending = setTimeout(() => Cloud.on && render(), 15000); return; }
            render();
          });
        });
      },
    };
  };

  /* Send a writing text to the teacher from a lesson. */
  GL.sendToTeacherButton = function (slot, getText, context) {
    Cloud.init.then(() => {
      if (!Cloud.ready || Cloud.owner || !slot.isConnected) return;
      slot.innerHTML = `<button class="btn ghost" type="button">📨 Send to my teacher</button><span class="muted" style="margin-left:8px"></span>`;
      const b = $('button', slot), info = $('span', slot);
      b.onclick = async () => {
        const t = (getText() || '').trim();
        if (t.length < 3) { info.textContent = 'Write something first.'; return; }
        b.disabled = true; info.textContent = 'Sending…';
        try { await Cloud.send('correct', t, context); info.innerHTML = '✅ Sent. Answers appear under <a href="#/teacher">📨 My teacher</a>.'; } catch (e) { info.textContent = Cloud.blocked ? 'View-only access – ask your teacher for Contributor access.' : 'Could not send – try again.'; }
        b.disabled = false;
      };
    });
  };
})();
