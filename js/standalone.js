/* Stand-alone website mode (any browser, no claude.ai): username/password login against our own server (api/v1.js)
   and small stand-ins for the claude.ai capabilities the course uses – `db` (shared documents), `user` (who is logged in)
   and `sample` (AI, when the server has an API key). The rest of the course code runs unchanged.
   Saving is frugal on purpose (the free storage plan counts every write): routine progress is collected locally and
   sent every few minutes or when the page is hidden; messages, profile and teacher actions are sent at once. */
(function () {
  'use strict';
  if (window.claude || location.protocol === 'file:') return;
  const API = 'api/v1';
  const SKEY = 'd30:session', GUEST = 'd30:guest';
  const FLUSH_MS = 10 * 60000;
  const ls = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* private mode */ } },
  };
  const ss = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* private mode */ } },
    del(k) { try { sessionStorage.removeItem(k); } catch (e) { /* private mode */ } },
  };
  let sess = null;
  try { sess = JSON.parse(ls.get(SKEY) || 'null'); } catch (e) { sess = null; }
  if (!sess || !sess.token || !sess.user || !sess.user.uid) sess = null;
  // every account keeps its own progress in this browser (several students can share one device)
  if (sess) window.D30_STORE_KEY = 'deutsch30:v1:' + sess.user.uid;

  const clone = (x) => (x == null ? x : JSON.parse(JSON.stringify(x)));
  const isObj = (x) => x && typeof x === 'object' && !Array.isArray(x);
  const merge = (a, b) => { const o = Object.assign({}, isObj(a) ? a : {}); Object.keys(b).forEach((k) => { o[k] = isObj(b[k]) && isObj(o[k]) ? merge(o[k], b[k]) : b[k]; }); return o; };
  const h = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const whenDom = (fn) => (document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn());

  async function call(op, body, opts) {
    opts = opts || {};
    const payload = JSON.stringify(Object.assign({ op }, body || {}));
    const headers = { 'Content-Type': 'application/json' };
    if (sess) headers.Authorization = 'Bearer ' + sess.token;
    let r;
    try { r = await fetch(API, { method: 'POST', headers, body: payload, signal: opts.signal, keepalive: !!opts.keepalive && payload.length < 60000 }); }
    catch (e) { throw e && e.name === 'AbortError' ? { code: 'cancelled', message: 'Cancelled' } : { code: 'offline', message: 'No connection to the server.' }; }
    let j = null;
    try { j = await r.json(); } catch (e) { /* not JSON */ }
    if (!r.ok) {
      const err = { code: (j && j.code) || 'unavailable', message: (j && j.error) || 'Server error (' + r.status + ')', status: r.status };
      if (r.status === 401 && op !== 'login' && op !== 'password.change' && sess) expired();
      throw err;
    }
    return j;
  }

  let resolveCaps;
  const capsReady = new Promise((r) => (resolveCaps = r));
  const D30 = (window.D30 = {
    standalone: true, health: null, call, showLogin, logout, changePassword,
    session: () => sess, users: async () => [], refresh: () => Promise.resolve(), flush: () => Promise.resolve(),
    guest: () => !sess && ss.get(GUEST) === '1',
  });
  window.claude = { __standalone: true, use: (name) => capsReady.then((c) => (c && c[name]) || null) };

  (async function boot() {
    let health = null;
    try { const r = await fetch(API + '?op=health', { cache: 'no-store' }); if (r.ok) health = await r.json(); } catch (e) { /* no server */ }
    D30.health = health;
    if (!health || !health.ok) { D30.standalone = false; resolveCaps(null); return; } // plain static copy: the course works, without accounts
    if (!sess) {
      if (ss.get(GUEST) === '1') { resolveCaps(null); return; }
      whenDom(() => showLogin());
      return; // logging in reloads the page
    }
    try {
      const me = await call('me');
      if (me.name && me.name !== sess.user.name) { sess.user.name = me.name; ls.set(SKEY, JSON.stringify(sess)); }
    } catch (e) {
      if (e.status === 401) return; // expired() already shows the login screen
      resolveCaps(null);
      whenDom(() => setTimeout(() => window.GL && GL.toast && GL.toast('📴 No connection to the server – your progress is kept in this browser for now.'), 1500));
      return;
    }
    resolveCaps({ db: makeDb(), user: makeUser(), sample: health.ai ? makeSample() : null });
  })();

  /* ---------- db: documents with snapshots, backed by the server ---------- */
  function makeDb() {
    const uid = sess.user.uid, teacher = sess.user.role === 'teacher';
    const POLL_MS = teacher ? 3 * 60000 : 5 * 60000;
    const docs = new Map();   // path -> { remote: data | null (missing) | undefined (unknown), at, subs: Set }
    const cols = new Map();   // path -> { remote: [{id, data}] | undefined, at, subs: Set }
    let pending = new Map();  // path -> {type, data}
    let inflight = new Map();
    const wroteAt = new Map();
    const docE = (p) => { if (!docs.has(p)) docs.set(p, { remote: undefined, at: 0, subs: new Set() }); return docs.get(p); };
    const colE = (p) => { if (!cols.has(p)) cols.set(p, { remote: undefined, at: 0, subs: new Set() }); return cols.get(p); };
    const applyOp = (v, w) => (w.type === 'delete' ? null : w.type === 'set' ? w.data : v ? merge(v, w.data) : v);
    const compose = (a, b) => (b.type !== 'update' ? b : a.type === 'delete' ? a : { type: a.type, data: merge(a.data, b.data) });
    function view(p, base) {
      let v = base !== undefined ? base : docE(p).remote;
      if (inflight.has(p)) v = applyOp(v, inflight.get(p));
      if (pending.has(p)) v = applyOp(v, pending.get(p));
      return v === undefined ? null : v;
    }
    const docSnap = (p) => { const v = view(p); return { id: p.split('/').pop(), exists: v != null, data: () => clone(v), metadata: { hasPendingWrites: pending.has(p) || inflight.has(p), fromCache: false } }; };
    function colSnap(c) {
      const e = colE(c), byId = new Map((e.remote || []).map((d) => [d.id, d.data]));
      [...pending.keys(), ...inflight.keys()].forEach((p) => { const s = p.split('/'); if (s.length === 2 && s[0] === c && !byId.has(s[1])) byId.set(s[1], null); });
      const list = [...byId.entries()].map(([id, data]) => { const v = view(c + '/' + id, data); return v ? { id, exists: true, data: () => clone(v), metadata: {} } : null; }).filter(Boolean);
      return { docs: list, size: list.length, empty: !list.length, docChanges: () => [] };
    }
    function notify() {
      docs.forEach((e, p) => { if (!e.subs.size || e.remote === undefined) return; const s = docSnap(p), key = JSON.stringify(s.exists ? s.data() : null); e.subs.forEach((sub) => { if (sub.last !== key) { sub.last = key; try { sub.next(s); } catch (x) { console.error(x); } } }); });
      cols.forEach((e, c) => { if (!e.subs.size || e.remote === undefined) return; const s = colSnap(c), key = JSON.stringify(s.docs.map((d) => [d.id, d.data()])); e.subs.forEach((sub) => { if (sub.last !== key) { sub.last = key; try { sub.next(s); } catch (x) { console.error(x); } } }); });
    }
    let lastPull = 0, pulling = null;
    async function pull(fresh, only) {
      const started = Date.now();
      const dp = only || [...docs.keys()].filter((p) => docs.get(p).subs.size);
      const cp = only ? [] : [...cols.keys()].filter((c) => cols.get(c).subs.size);
      if (!dp.length && !cp.length) return;
      if (!only) lastPull = started;
      try {
        const r = await call('pull', { docs: dp, cols: cp, fresh: !!fresh });
        Object.entries(r.docs || {}).forEach(([p, v]) => { if ((wroteAt.get(p) || 0) < started) { const e = docE(p); e.remote = v; e.at = Date.now(); } });
        Object.entries(r.cols || {}).forEach(([c, list]) => {
          const e = colE(c), old = new Map((e.remote || []).map((d) => [d.id, d.data]));
          e.remote = list.map((d) => ((wroteAt.get(c + '/' + d.id) || 0) >= started && old.has(d.id) ? { id: d.id, data: old.get(d.id) } : d));
          e.at = Date.now();
        });
        notify();
      } catch (e) {
        if (e.status !== 401) [...dp.map((p) => docE(p)), ...cp.map((c) => colE(c))].forEach((x) => x.subs.forEach((sub) => { if (sub.error && !x.at) try { sub.error(e); } catch (y) { /* ignore */ } }));
        throw e;
      }
    }
    let pullTimer = null;
    const pullSoon = () => { clearTimeout(pullTimer); pullTimer = setTimeout(() => { pulling = pulling || pull(false).catch(() => {}).finally(() => (pulling = null)); }, 30); };
    setInterval(() => { if (!document.hidden && Date.now() - lastPull > POLL_MS) pullSoon(); }, 20000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden && Date.now() - lastPull > 60000) pullSoon(); });
    D30.refresh = () => pull(true).catch(() => {});

    /* writes */
    let timer = null, flushing = null;
    const isLazy = (p, w) => p.startsWith('data/users/' + uid + '/') || (p === 'learners/' + uid && w.type === 'update' && !['messages', 'profile', 'seenAt'].some((k) => k in w.data));
    async function flush(opts) {
      clearTimeout(timer); timer = null;
      while (flushing) { try { await flushing; } catch (e) { /* handled by its caller */ } }
      if (!pending.size) return;
      const batch = pending; pending = new Map(); inflight = batch;
      const writes = [...batch.entries()].map(([path, w]) => ({ type: w.type, path, data: w.data }));
      flushing = call('write', { writes }, opts).then(() => {
        const now = Date.now();
        batch.forEach((w, p) => {
          wroteAt.set(p, now);
          const e = docE(p);
          if (e.remote !== undefined || w.type !== 'update') e.remote = applyOp(e.remote, w);
          const s = p.split('/');
          if (s.length === 2 && cols.has(s[0]) && cols.get(s[0]).remote) {
            const ce = cols.get(s[0]), i = ce.remote.findIndex((d) => d.id === s[1]);
            const nv = applyOp(i >= 0 ? ce.remote[i].data : null, w);
            if (i >= 0) { if (nv) ce.remote[i] = { id: s[1], data: nv }; else ce.remote.splice(i, 1); } else if (nv) ce.remote.push({ id: s[1], data: nv });
          }
        });
        inflight = new Map();
        notify();
      }, (err) => {
        const retry = err.code === 'offline' || err.status === 401 || err.status === 429 || err.status >= 500 || err.code === 'unavailable';
        if (retry) { batch.forEach((w, p) => pending.set(p, pending.has(p) ? compose(w, pending.get(p)) : w)); if (err.status !== 401) timer = setTimeout(() => flush().catch(() => {}), 60000); }
        inflight = new Map();
        notify();
        throw err;
      }).finally(() => { flushing = null; });
      return flushing;
    }
    D30.flush = flush;
    const flushHidden = (keepalive) => setTimeout(() => { if (pending.size) flush({ keepalive }).catch(() => {}); }, 60);
    document.addEventListener('visibilitychange', () => { if (document.hidden) flushHidden(false); });
    window.addEventListener('pagehide', () => flushHidden(true));

    async function known(p) {
      const e = docE(p);
      if (e.remote === undefined || Date.now() - e.at > 15000) { try { await pull(false, [p]); } catch (x) { if (e.remote === undefined) throw x; } }
    }
    function queue(p, w) {
      pending.set(p, pending.has(p) ? compose(pending.get(p), w) : w);
      notify();
      if (isLazy(p, w)) { if (!timer) timer = setTimeout(() => flush().catch(() => {}), FLUSH_MS); return Promise.resolve(); }
      return flush();
    }
    const ref = (p) => ({
      id: p.split('/').pop(), path: p,
      async get() { await known(p); return docSnap(p); },
      async set(data) { if (!isObj(data)) throw { code: 'invalid_argument', message: 'Bad data' }; return queue(p, { type: 'set', data: clone(data) }); },
      async update(data) {
        if (!isObj(data)) throw { code: 'invalid_argument', message: 'Bad data' };
        await known(p);
        if (view(p) == null) throw { code: 'not_found', message: 'Document does not exist' };
        return queue(p, { type: 'update', data: clone(data) });
      },
      async delete() { return queue(p, { type: 'delete' }); },
      onSnapshot(next, error) {
        const e = docE(p), sub = { next, error, last: undefined };
        e.subs.add(sub);
        if (e.remote !== undefined) setTimeout(() => { if (e.subs.has(sub)) { const s = docSnap(p); sub.last = JSON.stringify(s.exists ? s.data() : null); next(s); } }, 0);
        else pullSoon();
        return () => e.subs.delete(sub);
      },
    });
    return {
      doc: (p) => ref(String(p)),
      collection: (c) => ({
        doc: (id) => ref(c + '/' + id),
        onSnapshot(next, error) {
          const e = colE(c), sub = { next, error, last: undefined };
          e.subs.add(sub);
          if (e.remote !== undefined) setTimeout(() => { if (e.subs.has(sub)) next(colSnap(c)); }, 0);
          else pullSoon();
          return () => e.subs.delete(sub);
        },
      }),
    };
  }

  /* ---------- user: the logged-in account ---------- */
  const avatar = (name) => {
    const ch = (String(name || '?').trim()[0] || '?').toUpperCase();
    let hue = 0; for (const c of String(name || '')) hue = (hue * 31 + c.charCodeAt(0)) % 360;
    return 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="hsl(${hue},55%,50%)"/><text x="20" y="26" font-family="Arial,sans-serif" font-size="18" font-weight="700" fill="#fff" text-anchor="middle">${h(ch)}</text></svg>`);
  };
  function makeUser() {
    const u = sess.user, owner = u.role === 'teacher';
    let list = null;
    D30.users = (force) => {
      if (!owner) return Promise.resolve([]);
      if (!list || force) list = call('users.list').then((r) => r.users).catch(() => { list = null; return []; });
      return list;
    };
    const prof = (id, x) => ({ id, name: (x && x.name) || '', username: (x && x.username) || '', avatarUrl: avatar((x && x.name) || '?'), color: '#888' });
    return {
      id: async () => u.uid,
      isOwner: async () => owner,
      canEdit: async () => owner,
      can: async () => true,
      me: async () => Object.assign(prof(u.uid, u), { email: null, isOwner: owner, canEdit: owner }),
      profiles: async (ids) => {
        const all = await D30.users();
        const out = {};
        [].concat(ids).forEach((id) => { out[id] = prof(id, id === u.uid ? u : all.find((y) => y.uid === id)); });
        return out;
      },
      search: async () => [],
    };
  }

  /* ---------- sample: AI through the server (only when it has an API key) ---------- */
  function makeSample() {
    const run = async (input, opts, json) => {
      opts = opts || {};
      const r = await call('ai', { input, json }, { signal: opts.signal });
      if (json) return r.data;
      if (opts.onText) { try { opts.onText({ text: r.text, delta: r.text }); } catch (e) { /* ignore */ } }
      return { text: r.text, truncated: !!r.truncated };
    };
    const sample = (input, opts) => run(input, opts, false);
    sample.json = (input, opts) => run(input, opts, true);
    sample.limits = async () => ({ images: false });
    return sample;
  }

  /* Shown to the site owner until the Vercel project is fully set up. */
  function setupHTML(missing) {
    const env = missing.filter((m) => m !== 'BLOB');
    return `<div class="warn setup-warn"><b>⚙️ Setup not finished</b> – the website still needs:
      <ul>${env.map((m) => `<li><b>${h(m)}</b> – Vercel → your project → <i>Settings → Environment Variables</i> → add <code>${h(m)}</code>${m === 'SESSION_SECRET' ? ' (any long random text)' : ' (the teacher’s first password)'}</li>`).join('')}
      ${missing.includes('BLOB') ? '<li><b>Storage</b> – Vercel → your project → <i>Storage → Create → Blob</i>, choose <b>Private</b>, connect it to this project</li>' : ''}</ul>
      Then: <i>Deployments → ⋯ → <b>Redeploy</b></i>. Settings only take effect after a redeploy.</div>`;
  }

  /* ---------- login screen ---------- */
  function showLogin(note) {
    if (document.getElementById('d30Login')) return;
    const box = document.createElement('div');
    box.id = 'd30Login';
    box.className = 'login-screen';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-labelledby', 'd30LoginT');
    const bruno = window.GL && GL.charSVG ? GL.charSVG('bruno', 'idle waving') : '';
    box.innerHTML = `<div class="login-box">
      <div class="login-hero">${bruno}<div><div class="login-logo"><span class="logo-flag" aria-hidden="true"><i></i><i></i><i></i></span> Deutsch<b>30</b></div><h1 id="d30LoginT">Log in</h1><p class="muted">Willkommen! Log in with the <b>username</b> and <b>password</b> you got from your teacher.</p></div></div>
      ${note ? `<div class="warn">${h(note)}</div>` : ''}
      <form id="d30LoginForm" class="login-form" autocomplete="on">
        <label><span>Username</span><input class="txt-in" name="username" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" required maxlength="40"></label>
        <label><span>Password</span><span class="pw-wrap"><input class="txt-in" name="password" type="password" autocomplete="current-password" required maxlength="100"><button type="button" class="pw-eye" aria-label="Show password" title="Show password">👁️</button></span></label>
        <button class="btn green big" type="submit">🔐 Log in</button>
        <p class="login-err" role="alert"></p>
      </form>
      <p class="muted login-help">No login yet? Your teacher creates it for you in the teacher portal.</p>
      ${D30.health && D30.health.configured === false ? setupHTML(D30.health.missing || ['SESSION_SECRET', 'TEACHER_PASSWORD']) : ''}
      <button type="button" class="login-guest" id="d30Guest">Just look around without an account →</button>
    </div>`;
    document.body.appendChild(box);
    document.body.classList.add('login-open');
    const f = box.querySelector('form'), err = box.querySelector('.login-err');
    const pw = f.querySelector('[name=password]');
    box.querySelector('.pw-eye').onclick = () => { pw.type = pw.type === 'password' ? 'text' : 'password'; };
    setTimeout(() => f.querySelector('[name=username]').focus(), 50);
    f.onsubmit = async (e) => {
      e.preventDefault();
      const btn = f.querySelector('button[type=submit]');
      btn.disabled = true; err.textContent = 'Logging in…';
      try {
        sess = null;
        const r = await call('login', { username: f.username.value.trim(), password: pw.value });
        ls.set(SKEY, JSON.stringify({ token: r.token, user: r.user }));
        ss.del(GUEST);
        err.textContent = '✅ Welcome!';
        location.hash = r.user.role === 'teacher' ? '#/admin' : '#/';
        location.reload();
      } catch (x) {
        err.textContent = x.code === 'offline' ? 'No connection – check your internet and try again.' : x.message || 'Login failed.';
        btn.disabled = false;
      }
    };
    box.querySelector('#d30Guest').onclick = () => {
      ss.set(GUEST, '1');
      if (sess) { location.reload(); return; }
      box.remove(); document.body.classList.remove('login-open');
      resolveCaps(null);
    };
  }
  let expiredShown = false;
  function expired() {
    if (expiredShown) return;
    expiredShown = true;
    ls.del(SKEY);
    sess = null;
    whenDom(() => showLogin('Your login has ended (for example, the password was changed). Please log in again.'));
  }
  async function logout() {
    try {
      const G = window.GL;
      if (G && G.Cloud && G.Cloud.ready) await G.Cloud.sync();
      if (G && G.Accounts && G.Accounts.backupNow) await G.Accounts.backupNow();
      await D30.flush();
    } catch (e) { /* offline – progress stays in this browser */ }
    ls.del(SKEY); ss.del(GUEST);
    location.hash = '#/';
    location.reload();
  }
  async function changePassword(current, next) {
    const r = await call('password.change', { current, next });
    sess.token = r.token;
    ls.set(SKEY, JSON.stringify(sess));
    return true;
  }
})();
