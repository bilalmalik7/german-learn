/* Student accounts on claude.ai: one-time registration (the claude.ai sign-in is the login),
   activity log hooks, and a private cloud backup so progress follows the student to any device. */
(function () {
  'use strict';
  const { $, $$, esc, attr, Store } = GL;
  const Cloud = GL.Cloud;

  const GOALS = [['work', '💼 Work'], ['study', '🎓 Studies'], ['move', '🏡 Moving to Germany'], ['exam', '📝 Exam (Goethe / telc)'], ['family', '❤️ Family / partner'], ['travel', '✈️ Travel'], ['fun', '😊 Just for fun']];
  const LEVELS = [['A0', 'Complete beginner'], ['A1', 'A little (A1)'], ['A2', 'Basics (A2)'], ['B1', 'Intermediate (B1)']];
  const TIMES = [['30', '30 min'], ['60', '1 hour'], ['120', '2 hours'], ['180', '3 hours']];
  const STEPS = { intro: 'Intro', vocab: 'Vocabulary', grammar: 'Grammar', dialogue: 'Dialogue', practice: 'Exercises', speaking: 'Speaking', writing: 'Writing', done: 'Review' };

  const profile = () => (Cloud.mine && Cloud.mine.profile) || null;
  /* True while a signed-in student still has to register (never for the owner or outside claude.ai). */
  const needsRegistration = () => Cloud.ready && !Cloud.owner && Cloud.mineLoaded && !profile() && !GL._skipRegister;
  GL.Accounts = { needsRegistration, profile };

  /* ---------- activity hooks ---------- */
  const track = (k, x) => Cloud.track(k, x);
  const origStep = Store.markStep;
  Store.markStep = function (n, step) {
    const first = !(Store.day(n).steps || {})[step];
    origStep.call(Store, n, step);
    if (first) track('step', `Day ${n} · ${STEPS[step] || step}`);
  };
  const origDone = Store.completeDay;
  Store.completeDay = function (n) {
    const first = origDone.call(Store, n);
    const d = GL.days[n - 1];
    if (first) track('day', `Finished Day ${n}${d ? ' – ' + d.title : ''}${Store.day(n).best ? ` (exercises ${Store.day(n).best}%)` : ''}`);
    return first;
  };
  // one "opened the course" entry per visit (at most every 30 minutes)
  const ev = Store.state.events || [];
  const lastOpen = ev.slice().reverse().find((e) => e.k === 'open');
  if (!lastOpen || Date.now() - lastOpen.t > 30 * 60000) setTimeout(() => track('open', 'Opened the course'), 1500);

  /* ---------- private cloud backup: data/users/<id>/backup (only the student can read it) ---------- */
  const backupBody = () => {
    const s = JSON.parse(JSON.stringify(Store.state));
    delete s.savedAt;
    if (s.studio && s.studio.history) s.studio.history = s.studio.history.map((h, i, a) => (i < a.length - 8 ? Object.assign({}, h, { r: undefined }) : h));
    let json = JSON.stringify(s);
    if (json.length > 230000 && s.studio) { s.studio.history = (s.studio.history || []).map((h) => Object.assign({}, h, { r: undefined, text: String(h.text || '').slice(0, 1500) })); json = JSON.stringify(s); }
    if (json.length > 230000) { const keys = Object.keys(s.mistakes || {}); keys.slice(0, Math.max(0, keys.length - 120)).forEach((k) => delete s.mistakes[k]); json = JSON.stringify(s); }
    return json.length > 240000 ? null : json;
  };
  const isFresh = (s) => !s.xp && !Object.keys(s.days || {}).length && !((s.studio || {}).history || []).length;
  let lastBackup = '';
  const backupRef = () => Cloud.db.doc('data/users/' + Cloud.uid + '/backup');
  async function backup() {
    if (!Cloud.ready || Cloud.blocked || isFresh(Store.state)) return;
    const json = backupBody();
    if (!json || json === lastBackup) return;
    try { await backupRef().set({ state: json, savedAt: Date.now() }); lastBackup = json; GL.Accounts.lastBackupAt = Date.now(); } catch (e) { /* view-only or offline – try again later */ }
  }
  GL.Accounts.restore = async () => {
    const snap = await backupRef().get();
    if (!snap.exists) return false;
    const st = JSON.parse(snap.data().state);
    Store.importJSON(st);
    lastBackup = JSON.stringify(Object.assign({}, st));
    GL.toast('✅ Your progress was restored from your account.', 'ok');
    if (GL.render) GL.render();
    return true;
  };
  GL.Accounts.backupNow = backup;

  Cloud.init.then(async () => {
    if (!Cloud.ready) return;
    // restore on a new device / browser
    try {
      const snap = await backupRef().get();
      if (snap.exists) {
        const remote = snap.data();
        GL.Accounts.cloudBackupAt = remote.savedAt;
        if (isFresh(Store.state) && !isFresh(JSON.parse(remote.state))) { await GL.Accounts.restore(); }
        else if (remote.savedAt > (Store.state.savedAt || 0) + 120000) {
          const r = JSON.parse(remote.state);
          if ((r.xp || 0) > (Store.state.xp || 0)) { GL.Accounts.newerElsewhere = { xp: r.xp, at: remote.savedAt }; GL.toast('💡 You have newer progress from another device – open <a href="#/profile">My account</a> to load it.'); }
        }
      }
    } catch (e) { /* no backup yet */ }
    setInterval(backup, 120000);
    document.addEventListener('visibilitychange', () => { if (document.hidden) backup(); });
    setTimeout(backup, 20000);
    // the registration gate: re-render as soon as we know whether the student has registered
    let gated = false;
    const check = () => {
      updateChip();
      if (needsRegistration() && !gated) { gated = true; if (GL.render) GL.render(); }
      if (!needsRegistration() && gated) { gated = false; }
    };
    Cloud.on(check); check();
  });

  function updateChip() {
    const chip = $('#navMe');
    if (!chip) return;
    const p = profile();
    chip.classList.toggle('hidden', !Cloud.ready || Cloud.owner);
    $('.me-name', chip).textContent = p ? p.name.split(' ')[0] : 'Register';
  }

  /* ---------- registration / account page ---------- */
  function form(p, editing) {
    p = p || {};
    const goals = p.goals || [];
    return `<form class="reg-form" id="regForm" autocomplete="on">
      <label><span>Your full name <b class="req">*</b></span><input class="txt-in" name="name" required maxlength="80" value="${attr(p.name || Store.state.settings.name || '')}" placeholder="e.g. Ayesha Khan" autocomplete="name"></label>
      <div class="reg-2">
        <label><span>Email <small class="muted">(optional)</small></span><input class="txt-in" name="email" type="email" maxlength="120" value="${attr(p.email || '')}" placeholder="you@example.com" autocomplete="email"></label>
        <label><span>Phone / WhatsApp <small class="muted">(optional)</small></span><input class="txt-in" name="phone" type="tel" maxlength="40" value="${attr(p.phone || '')}" placeholder="+49 …" autocomplete="tel"></label>
      </div>
      <div class="reg-2">
        <label><span>Your native language</span><input class="txt-in" name="lang" maxlength="40" value="${attr(p.lang || '')}" placeholder="e.g. Urdu, English"></label>
        <label><span>City / country</span><input class="txt-in" name="city" maxlength="60" value="${attr(p.city || '')}" placeholder="e.g. Lahore, Pakistan"></label>
      </div>
      <fieldset><legend>Why are you learning German?</legend><div class="chips">${GOALS.map(([k, l]) => `<label class="chip-check"><input type="checkbox" name="goals" value="${k}" ${goals.includes(k) ? 'checked' : ''}><span>${l}</span></label>`).join('')}</div></fieldset>
      <div class="reg-2">
        <fieldset><legend>Your German now</legend><div class="chips">${LEVELS.map(([k, l]) => `<label class="chip-check"><input type="radio" name="level" value="${k}" ${(p.level || 'A0') === k ? 'checked' : ''}><span>${l}</span></label>`).join('')}</div></fieldset>
        <fieldset><legend>Time per day</legend><div class="chips">${TIMES.map(([k, l]) => `<label class="chip-check"><input type="radio" name="minutes" value="${k}" ${String(p.minutes || '120') === k ? 'checked' : ''}><span>${l}</span></label>`).join('')}</div></fieldset>
      </div>
      <label><span>Anything your teacher should know? <small class="muted">(optional)</small></span><textarea class="txt-in" name="note" rows="2" maxlength="400" placeholder="e.g. I have a job interview in Berlin in March.">${esc(p.note || '')}</textarea></label>
      ${editing ? '' : `<label class="reg-consent"><input type="checkbox" name="consent" required> I agree that my teacher can see my progress, study time, activity and the texts I send in this course.</label>`}
      <div class="row"><button class="btn green big" type="submit">${editing ? '💾 Save changes' : '✅ Register & start learning'}</button><span class="muted" id="regInfo"></span></div>
    </form>`;
  }
  function readForm(f) {
    const fd = new FormData(f);
    return {
      name: String(fd.get('name') || '').trim().slice(0, 80), email: String(fd.get('email') || '').trim().slice(0, 120), phone: String(fd.get('phone') || '').trim().slice(0, 40),
      lang: String(fd.get('lang') || '').trim().slice(0, 40), city: String(fd.get('city') || '').trim().slice(0, 60), goals: fd.getAll('goals').map(String),
      level: String(fd.get('level') || 'A0'), minutes: +fd.get('minutes') || 120, note: String(fd.get('note') || '').trim().slice(0, 400),
    };
  }

  GL.viewRegister = function () {
    return {
      html: `<div class="reg-wrap">
        <div class="reg-hero">${GL.charSVG('bruno', 'idle waving')}<div><h1 style="margin:0">🔐 Student login</h1><p class="muted" style="margin:.3em 0 0">Willkommen! Before you start, please complete your student login once. You are already signed in with your claude.ai account – there is no extra password. Your teacher uses this to follow your progress, and your progress is saved to your account so you can continue on any device.</p></div></div>
        <div class="card" id="regCard"><p class="muted">Loading…</p></div></div>`,
      mount() {
        const card = $('#regCard');
        Cloud.init.then(async () => {
          if (!card.isConnected) return;
          if (!Cloud.ready) { card.innerHTML = '<p>Registration works when the course is opened from your teacher’s claude.ai link.</p><a class="btn" href="#/">Continue</a>'; return; }
          const me = await Cloud.user.me();
          const preview = Cloud.owner;
          card.innerHTML = `${preview ? '<div class="note">👀 <b>Preview:</b> this is the login screen your students see the first time they open the course. Saving is switched off for you as the teacher. <a href="#/admin">← Back to the teacher portal</a></div>' : ''}${me.name ? `<p class="reg-acc"><img src="${attr(me.avatarUrl)}" alt=""> Signed in as <b></b></p>` : ''}
            ${Cloud.blocked ? `<div class="warn">You can open the course but you have <b>view-only</b> access, so your registration and progress can’t be saved. Ask your teacher to share the course with you as <b>Contributor</b>, then reload this page.</div><p><button class="btn ghost" id="regSkip">Continue without saving</button></p>` : form({}, false)}`;
          if (me.name) $('.reg-acc b', card).textContent = me.name;
          const skip = $('#regSkip'); if (skip) skip.onclick = () => { GL._skipRegister = true; location.hash = '#/'; GL.render(); };
          const f = $('#regForm');
          if (!f) return;
          f.onsubmit = async (e) => {
            e.preventDefault();
            const p = readForm(f);
            if (!p.name) { $('#regInfo').textContent = 'Please enter your name.'; return; }
            if (preview) { $('#regInfo').textContent = '👀 Preview only – a student would now be logged in and see the course.'; return; }
            const btn = $('button[type=submit]', f); btn.disabled = true; $('#regInfo').textContent = 'Saving…';
            try {
              await Cloud.saveProfile(Object.assign(p, { registeredAt: Date.now(), consent: true }));
              Store.state.settings.name = p.name; Store.save();
              track('register', `Registered: ${p.name}`);
              GL.confetti(); GL.sfx('done');
              GL.toast(`Willkommen, ${esc(p.name.split(' ')[0])}! 🎉`, 'ok');
              location.hash = '#/'; GL.render();
            } catch (err) {
              btn.disabled = false;
              $('#regInfo').textContent = err && err.code === 'invalid_argument' ? 'Your access is view-only – ask your teacher for Contributor access.' : 'Could not save – check your connection and try again.';
            }
          };
        });
      },
    };
  };

  /* Home page: the teacher's way into the portal, and the student's login status. */
  GL.Accounts.mountHome = (slot) => {
    if (!slot) return;
    Cloud.init.then(() => {
      const draw = async () => {
        if (!slot.isConnected || !Cloud.ready) return;
        if (Cloud.owner) {
          const st = Cloud.all.filter((l) => l.id !== Cloud.uid);
          const reg = st.filter((l) => l.profile).length;
          const inv = Object.values(Cloud.invites || {}).filter((v) => v && !v.removed && !Cloud.matchInvite(v, st)).length;
          const today = st.filter((l) => l.lastActive === GL.todayStr()).length;
          slot.innerHTML = `<section class="card portal-card"><div class="portal-head"><span class="portal-ico">👩‍🏫</span><div><h2 style="margin:0">Teacher portal</h2><p class="muted" style="margin:.2em 0 0">You are the teacher of this course. Add students, see who logged in and follow what each of them does.</p></div></div>
            <div class="portal-stats"><span><b>${reg}</b> logged-in students</span><span><b>${inv}</b> invited, not logged in yet</span><span><b>${today}</b> active today</span><span><b>${Cloud.openCount()}</b> open messages</span></div>
            <div class="row"><a class="btn" href="#/admin">📊 Open teacher portal</a><a class="btn ghost" href="#/admin" id="portalAdd">➕ Add students</a><a class="btn ghost" href="#/register">👀 Preview student login</a></div></section>`;
          const add = $('#portalAdd', slot); if (add) add.onclick = () => { GL._openAddStudents = true; };
        } else if (profile()) {
          const me = await Cloud.user.me();
          slot.innerHTML = `<div class="login-status"><img src="${attr(me.avatarUrl)}" alt=""><span>✅ Logged in as <b></b> · progress saved to your account</span><span class="spacer"></span><a href="#/profile">👤 My account</a><a href="#/teacher">📨 My teacher</a></div>`;
          $('b', slot).textContent = profile().name;
        }
      };
      draw();
      const off = Cloud.on(() => { if (!slot.isConnected) { off(); return; } draw(); });
    });
  };

  GL.viewProfile = function () {
    return {
      html: `<h1>👤 My account</h1><div id="profRoot"><div class="card"><p class="muted">Loading…</p></div></div>`,
      mount() {
        const root = $('#profRoot');
        Cloud.init.then(async () => {
          if (!root.isConnected) return;
          if (!Cloud.ready) { root.innerHTML = `<div class="note">Accounts work when the course is opened from your teacher’s claude.ai link. Here your progress is saved in this browser only – use <a href="#/settings">Settings → Export</a> to move it.</div>`; return; }
          if (Cloud.owner) { root.innerHTML = `<div class="note">You are the teacher (owner). Your students’ accounts are in the <a href="#/admin">📊 Teacher dashboard</a>. <a href="#/register">Preview the registration screen</a>.</div>`; return; }
          const me = await Cloud.user.me();
          const p = profile();
          const fmt = (t) => (t ? new Date(t).toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' }) : '–');
          root.innerHTML = `<div class="card"><div class="row"><img class="prof-av" src="${attr(me.avatarUrl)}" alt=""><div><b id="profName"></b><br><small class="muted">Signed in with claude.ai${p ? ' · registered ' + fmt(p.registeredAt) : ''}</small></div></div>
            <h3>☁️ Progress saved to your account</h3>
            <p class="muted" style="margin-top:0">Your progress is backed up privately (only you can read the backup) and restored automatically when you open the course on a new device.</p>
            <div class="kv"><span>Last backup</span><b id="profBk">${fmt(GL.Accounts.lastBackupAt || GL.Accounts.cloudBackupAt)}</b></div>
            ${GL.Accounts.newerElsewhere ? `<div class="warn" style="margin-top:10px">Newer progress from another device (${GL.Accounts.newerElsewhere.xp} XP, ${fmt(GL.Accounts.newerElsewhere.at)}). Loading it replaces the progress in this browser.</div>` : ''}
            <div class="row" style="margin-top:10px"><button class="btn ghost small" id="profBackup">☁️ Save now</button><button class="btn ghost small" id="profRestore">⬇ Load progress from my account</button><span class="muted" id="profInfo"></span></div></div>
            <div class="card"><h3 style="margin-top:0">✏️ My details</h3>${p ? form(p, true) : '<p>You haven’t registered yet. <a class="btn" href="#/register">Register now</a></p>'}</div>`;
          $('#profName').textContent = (p && p.name) || me.name || 'You';
          $('#profBackup').onclick = async () => { $('#profInfo').textContent = 'Saving…'; await backup(); $('#profBk').textContent = fmt(GL.Accounts.lastBackupAt); $('#profInfo').textContent = '✅ Saved'; };
          const rb = $('#profRestore');
          rb.onclick = async () => {
            if (!rb.dataset.sure) { rb.dataset.sure = '1'; rb.textContent = '⚠️ Click again to replace this browser’s progress'; return; }
            const ok = await GL.Accounts.restore().catch(() => false);
            if (!ok) $('#profInfo').textContent = 'No backup found yet.';
          };
          const f = $('#regForm');
          if (f) f.onsubmit = async (e) => {
            e.preventDefault();
            const np = readForm(f);
            if (!np.name) { $('#regInfo').textContent = 'Please enter your name.'; return; }
            $('#regInfo').textContent = 'Saving…';
            try { await Cloud.saveProfile(Object.assign({}, p, np)); Store.state.settings.name = np.name; Store.save(); track('profile', 'Updated profile'); $('#regInfo').textContent = '✅ Saved'; updateChip(); }
            catch (err) { $('#regInfo').textContent = 'Could not save – try again.'; }
          };
        });
      },
    };
  };
})();
