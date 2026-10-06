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

  Cloud.init = (async () => {
    const [db, user] = await Promise.all([GL.useCap('db'), GL.useCap('user')]);
    if (!db || !user) return Cloud;
    const uid = await user.id();
    if (!uid) return Cloud;
    Object.assign(Cloud, { db, user, uid, ready: true, owner: await user.isOwner(), canWrite: await user.can('data.write') });
    if (Cloud.canWrite === false && !Cloud.owner) Cloud.blocked = true;
    Cloud.ref = db.doc('learners/' + uid);
    Cloud.ref.onSnapshot((snap) => { Cloud.mine = snap.exists ? snap.data() : null; emit(); }, () => {});
    if (Cloud.owner) db.collection('learners').onSnapshot((q) => { Cloud.all = q.docs.map((d) => Object.assign({ id: d.id }, d.data())); emit(); }, () => {});
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
  let selected = null, inboxFilter = 'open';
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
        <p class="muted">See how your learners are doing, how much time they spend, and answer their questions.</p>
        <div id="admRoot"><div class="card"><p class="muted">Connecting…</p></div></div>`,
      mount() {
        const root = $('#admRoot');
        Cloud.init.then(() => {
          if (!root.isConnected) return;
          if (!Cloud.ready) { root.innerHTML = `<div class="note">The dashboard uses shared data, so it works when this course is opened on claude.ai (your published link). This local copy has no shared storage.</div>`; return; }
          if (!Cloud.owner) { root.innerHTML = `<div class="note">Only the owner of this course can see the teacher dashboard.</div><p><a class="btn" href="#/teacher">📨 Message my teacher</a></p>`; return; }
          const render = async () => {
            if (!root.isConnected) return;
            const learners = Cloud.all.slice().sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
            const ids = learners.map((l) => l.id);
            const ps = ids.length ? await Cloud.user.profiles(ids) : {};
            const nm = (id) => (ps[id] && ps[id].name) || (id === Cloud.uid ? 'You' : 'Learner');
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
                <div class="stat"><span class="s-ico">👥</span><div><b>${learners.length}</b><span>learners</span></div></div>
                <div class="stat"><span class="s-ico">🟢</span><div><b>${active}</b><span>active in the last 7 days</span></div></div>
                <div class="stat"><span class="s-ico">⏱️</span><div><b>${fmtMin(weekMin)}</b><span>study time, last 7 days</span></div></div>
                <div class="stat"><span class="s-ico">📨</span><div><b>${open}</b><span>open messages</span></div></div>
              </div>
              ${learners.length ? '' : `<div class="card"><h3>No learners yet</h3><p>Share this course from the <b>Share</b> menu and give each learner <b>Contributor</b> access (or invite them by email as <b>Editor</b>). Viewers can open the course but can’t save progress. As soon as someone studies, they appear here.</p></div>`}
              ${learners.length ? `<div class="card"><h3>👥 Learners</h3>
                <div class="gtable-wrap"><table class="gtable adm-table"><thead><tr><th>Learner</th><th>Day</th><th>Done</th><th>XP</th><th>Streak</th><th>Today</th><th>7 days</th><th>Total time</th><th>Avg. score</th><th>Mistakes</th><th>Last active</th><th>Open</th></tr></thead><tbody>
                ${learners.map((l) => { const o = Object.values(l.messages || {}).filter((m) => m.status === 'open').length; const av = avgScore(l); return `<tr class="${l.id === selected ? 'sel' : ''}" data-id="${attr(l.id)}" tabindex="0">
                  <td><span class="who" data-name="${attr(l.id)}"></span></td><td>${l.currentDay || 1}</td><td>${(l.done || []).length}/30</td><td>${l.xp || 0}</td><td>🔥 ${l.streak || 0}</td>
                  <td>${((l.time || {})[GL.todayStr()] || 0)} min</td><td>${fmtMin(sumMin(l, week))}</td><td>${fmtMin(l.totalMin || 0)}</td>
                  <td>${av == null ? '–' : `<span class="score-badge ${av >= 80 ? '' : av >= 50 ? 'mid' : 'low'}">${av}%</span>`}</td><td>${l.mistakes || 0}</td>
                  <td><span class="act ${daysAgo(l.lastActive) <= 1 ? 'on' : daysAgo(l.lastActive) <= 6 ? 'mid' : 'off'}"></span>${agoText(l.lastActive)}</td><td>${o ? `<span class="nb-inline">${o}</span>` : '–'}</td></tr>`; }).join('')}
                </tbody></table></div><p class="muted" style="margin:8px 0 0">Click a learner for details. Time counts only while the course is open and being used.</p></div>` : ''}
              ${sel ? `<div class="card" id="admDetail"><div class="row"><h3 style="margin:0">📈 <span class="who" data-name="${attr(sel.id)}"></span></h3><span class="spacer"></span><button class="btn tiny ghost" id="admClose">✖ Close</button></div>
                <h4>Minutes studied per day · last 14 days</h4>${barChart(sel)}
                <h4>30-day plan</h4><div class="day-grid">${GL.days.map((d) => { const b = (sel.best || {})[d.day], dn = (sel.done || []).includes(d.day); return `<span class="${dn ? 'done' : b ? 'part' : ''}" title="Day ${d.day}: ${esc(d.title)}${b ? ' · best ' + b + '%' : ''}">${d.day}${b ? `<small>${b}%</small>` : ''}</span>`; }).join('')}</div>
                <div class="grid grid-3" style="margin-top:14px">
                  <div><h4>🏋️ Trainer accuracy</h4>${['verbs', 'articles', 'adjectives'].map((k) => { const t = (sel.trainer || {})[k]; return `<div class="kv"><span>${{ verbs: 'Verbs', articles: 'Articles & cases', adjectives: 'Adjective endings' }[k]}</span><b>${t && t.total ? Math.round((t.right / t.total) * 100) + '% of ' + t.total : '–'}</b></div>`; }).join('')}</div>
                  <div><h4>🎬 Scenes & 📖 stories</h4>${GL.scenarios.map((s) => `<div class="kv"><span>${s.icon} ${esc(s.title)}</span><b>${(sel.scenes || {})[s.id] != null ? sel.scenes[s.id] + '%' : '–'}</b></div>`).join('')}${GL.stories.map((s) => `<div class="kv"><span>📖 ${esc(s.title)}</span><b>${(sel.stories || {})[s.id] != null ? sel.stories[s.id] + '%' : '–'}</b></div>`).join('')}</div>
                  <div><h4>✍️ Activity</h4><div class="kv"><span>Lesson steps opened</span><b>${sel.steps || 0}</b></div><div class="kv"><span>Writing tasks written</span><b>${sel.writing || 0}</b></div><div class="kv"><span>Mistakes in notebook</span><b>${sel.mistakes || 0}</b></div><div class="kv"><span>Messages sent</span><b>${Object.keys(sel.messages || {}).length}</b></div></div>
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
            const typing = document.activeElement && document.activeElement.classList.contains('rep-in') && document.activeElement.value;
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
