/* Deutsch in 30 Tagen – backend for the stand-alone website (Vercel Functions).
   One RPC endpoint: POST /api/v1 {op, ...}. Data lives in a private Vercel Blob store
   (BLOB_READ_WRITE_TOKEN); without it, a local folder is used (development only).

   Environment:
     SESSION_SECRET      random string used to sign login tokens (required)
     TEACHER_USERNAME    teacher login name (default "teacher")
     TEACHER_PASSWORD    teacher's first password (can be changed in the portal)
     BLOB_READ_WRITE_TOKEN  set automatically when a Blob store is connected
     ANTHROPIC_API_KEY   optional – turns on the AI features (writing analysis, AI conversations)
     AI_MODEL            optional – Claude model id (default claude-opus-5-5)                       */
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const TEACHER = (process.env.TEACHER_USERNAME || 'teacher').toLowerCase();
const TEACHER_UID = 'u_teacher';
const SECRET = process.env.SESSION_SECRET || '';
const TOKEN_DAYS = 60;

/* ---------- storage: private Vercel Blob, or a local folder for development ----------
   Few, larger files keep usage inside the free Blob allowance:
     accounts.json      all logins (students + teacher password override)
     b/<owner>.json     every document of one person: { docs: { "<path>": {...} } }
   Writes are read-modify-write with ETag checks (ifMatch), so two writers never overwrite each other.
   Reads may come from a short in-memory cache (per function instance). */
let blobMod = null;
async function blob() { return (blobMod = blobMod || (await import('@vercel/blob'))); }
const useBlob = !!(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
// on Vercel the local disk is temporary – never pretend to save there
const noStorage = !useBlob && !!process.env.VERCEL;
const LOCAL_DIR = process.env.D30_DATA_DIR || path.join(process.env.TMPDIR || '/tmp', 'd30-data');
const etagOf = (body) => crypto.createHash('sha1').update(body).digest('hex');
class Conflict extends Error {}
const raw = {
  async read(key) {
    if (noStorage) throw new HttpError(503, 'unavailable', 'Storage is not connected yet (create a private Blob store for this project).');
    if (useBlob) {
      const { get } = await blob();
      const r = await get(key, { access: 'private', useCache: false });
      if (!r || !r.stream) return null;
      return { data: JSON.parse(await new Response(r.stream).text()), etag: r.blob.etag };
    }
    try { const body = await fs.readFile(path.join(LOCAL_DIR, key), 'utf8'); return { data: JSON.parse(body), etag: etagOf(body) }; } catch (e) { return null; }
  },
  /* etag: the version we read (null = the file must not exist yet). Returns the new etag. */
  async write(key, obj, etag) {
    if (noStorage) throw new HttpError(503, 'unavailable', 'Storage is not connected yet (create a private Blob store for this project).');
    const body = JSON.stringify(obj);
    if (useBlob) {
      const { put, BlobPreconditionFailedError } = await blob();
      try {
        const opts = { access: 'private', addRandomSuffix: false, contentType: 'application/json', cacheControlMaxAge: 60 };
        if (etag) opts.ifMatch = etag; else opts.allowOverwrite = false;
        const r = await put(key, body, opts);
        return r.etag;
      } catch (e) {
        if ((BlobPreconditionFailedError && e instanceof BlobPreconditionFailedError) || /precondition|already exists/i.test(String(e && e.message))) throw new Conflict();
        throw e;
      }
    }
    const f = path.join(LOCAL_DIR, key);
    const cur = await raw.read(key);
    if ((cur ? cur.etag : null) !== (etag || null)) throw new Conflict();
    await fs.mkdir(path.dirname(f), { recursive: true });
    await fs.writeFile(f, body);
    return etagOf(body);
  },
};
const cache = new Map();
const store = {
  /* maxAge: how old a cached copy may be (ms); 0 = always fetch */
  async read(key, maxAge = 0) {
    const c = cache.get(key);
    if (c && maxAge && Date.now() - c.at < maxAge) return c.val;
    const val = await raw.read(key);
    cache.set(key, { val, at: Date.now() });
    return val;
  },
  /* Atomically change a file: fn(current data or null) returns the new data (or undefined = no change). */
  async mutate(key, fn) {
    for (let i = 0; i < 6; i++) {
      const cur = await store.read(key, 0);
      const next = fn(cur ? JSON.parse(JSON.stringify(cur.data)) : null);
      if (next === undefined) return cur ? cur.data : null;
      if (JSON.stringify(next).length > 950000) throw new HttpError(413, 'too_large', 'Too much data saved – please tell your teacher.');
      try {
        const etag = await raw.write(key, next, cur ? cur.etag : null);
        cache.set(key, { val: { data: next, etag }, at: Date.now() });
        return next;
      } catch (e) {
        if (!(e instanceof Conflict)) throw e;
        cache.delete(key);
        await new Promise((r) => setTimeout(r, 80 + Math.random() * 200));
      }
    }
    throw new HttpError(503, 'unavailable', 'Busy – please try again.');
  },
};

/* ---------- helpers ---------- */
class HttpError extends Error { constructor(status, code, msg) { super(msg || code); this.status = status; this.code = code; } }
const b64u = (buf) => Buffer.from(buf).toString('base64url');
const sign = (data) => b64u(crypto.createHmac('sha256', SECRET).update(data).digest());
function makeToken(p) {
  const payload = b64u(JSON.stringify(Object.assign({}, p, { exp: Date.now() + TOKEN_DAYS * 864e5 })));
  return payload + '.' + sign(payload);
}
function readToken(tok) {
  if (!tok || !SECRET) return null;
  const [payload, sig] = String(tok).split('.');
  if (!payload || !sig) return null;
  const good = sign(payload);
  if (good.length !== sig.length || !crypto.timingSafeEqual(Buffer.from(good), Buffer.from(sig))) return null;
  try { const p = JSON.parse(Buffer.from(payload, 'base64url').toString()); return p.exp > Date.now() ? p : null; } catch (e) { return null; }
}
const hashPw = (pw, salt) => crypto.scryptSync(String(pw), salt, 64).toString('hex');
function newPwRecord(pw) { const salt = crypto.randomBytes(16).toString('hex'); return { salt, hash: hashPw(pw, salt) }; }
function checkPw(pw, rec) {
  if (!rec || !rec.salt || !rec.hash) return false;
  const h = Buffer.from(hashPw(pw, rec.salt), 'hex'), want = Buffer.from(rec.hash, 'hex');
  return h.length === want.length && crypto.timingSafeEqual(h, want);
}
const sameText = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };
const normUser = (u) => String(u || '').trim().toLowerCase();
const validUser = (u) => /^[a-z0-9][a-z0-9._-]{2,29}$/.test(u);
const isObj = (x) => x && typeof x === 'object' && !Array.isArray(x);
function merge(a, b) {
  const o = Object.assign({}, isObj(a) ? a : {});
  for (const k of Object.keys(b)) o[k] = isObj(b[k]) && isObj(o[k]) ? merge(o[k], b[k]) : b[k];
  return o;
}
function checkPath(p, parity) {
  const s = String(p || '');
  if (!/^[A-Za-z0-9_\-.~:@+]+(\/[A-Za-z0-9_\-.~:@+]+)*$/.test(s) || s.split('/').some((x) => x === '.' || x === '..')) throw new HttpError(400, 'invalid_argument', 'Bad path');
  const n = s.split('/').length;
  if ((parity === 'doc' && n % 2) || (parity === 'col' && !(n % 2))) throw new HttpError(400, 'invalid_argument', 'Bad path parity');
  return s;
}
/* Access rules – the same as on claude.ai: a learner reads/writes only learners/<own id> and their private
   data/users/<own id>/…; the teacher reads all learners and the teacher/… documents.
   Returns the owner whose file holds the document, or null when not allowed. */
function ownerOf(sess, p) {
  const s = p.split('/');
  if (s[0] === 'learners' && s.length === 2) return sess.role === 'teacher' || s[1] === sess.uid ? s[1] : null;
  if (s[0] === 'teacher') return sess.role === 'teacher' ? 'teacher' : null;
  if (s[0] === 'data' && s[1] === 'users' && s.length >= 4) return s[2] === sess.uid ? s[2] : null;
  return null;
}
const bucketKey = (owner) => `b/${owner}.json`;
const ACC = 'accounts.json';
const accounts = async (maxAge = 20000) => { const r = await store.read(ACC, maxAge); return (r && r.data) || { users: {} }; };
const publicUser = (u) => ({ uid: u.uid, username: u.username, name: u.name, email: u.email || '', disabled: !!u.disabled, createdAt: u.createdAt });
const genPassword = () => { const w = 'abcdefghjkmnpqrstuvwxyz23456789'; let s = ''; const r = crypto.randomBytes(9); for (let i = 0; i < 9; i++) s += w[r[i] % w.length]; return s.slice(0, 3) + '-' + s.slice(3, 6) + '-' + s.slice(6); };

async function session(req) {
  const h = req.headers.authorization || '';
  const p = readToken(h.startsWith('Bearer ') ? h.slice(7) : '');
  const bad = () => new HttpError(401, 'unauthenticated', 'Please log in again.');
  if (!p) throw bad();
  const valid = (acc) => {
    if (p.role === 'teacher') return ((acc.teacher && acc.teacher.pv) || 0) === (p.pv || 0);
    const u = acc.users[p.u];
    return !!u && !u.disabled && u.uid === p.uid && (u.pv || 0) === (p.pv || 0);
  };
  // a cached copy may be a few seconds old (e.g. a login created on another instance): re-check before refusing
  if (!valid(await accounts()) && !valid(await accounts(0))) throw bad();
  return p;
}
const teacherOnly = (s) => { if (s.role !== 'teacher') throw new HttpError(403, 'invalid_argument', 'Teacher only'); };

/* Apply a list of writes [{type:'set'|'update'|'delete', path, data}] – one file write per person. */
async function applyWrites(sess, writes) {
  if (!Array.isArray(writes) || !writes.length || writes.length > 20) throw new HttpError(400, 'invalid_argument', 'Bad writes');
  const groups = new Map();
  for (const w of writes) {
    const p = checkPath(w && w.path, 'doc');
    const owner = ownerOf(sess, p);
    if (!owner) throw new HttpError(403, 'invalid_argument', 'Not allowed');
    if (w.type !== 'delete' && !isObj(w.data)) throw new HttpError(400, 'invalid_argument', 'Bad data');
    if (w.type !== 'delete' && JSON.stringify(w.data).length > 262144) throw new HttpError(413, 'too_large', 'Document too large');
    if (!['set', 'update', 'delete'].includes(w.type)) throw new HttpError(400, 'invalid_argument', 'Bad write type');
    if (!groups.has(owner)) groups.set(owner, []);
    groups.get(owner).push(Object.assign({}, w, { path: p }));
  }
  const missing = [];
  for (const [owner, ws] of groups) {
    let miss = [];
    await store.mutate(bucketKey(owner), (cur) => {
      const b = cur || { docs: {} };
      b.docs = b.docs || {};
      miss = [];
      for (const w of ws) {
        if (w.type === 'delete') delete b.docs[w.path];
        else if (w.type === 'set') b.docs[w.path] = w.data;
        else if (b.docs[w.path]) b.docs[w.path] = merge(b.docs[w.path], w.data);
        else miss.push(w.path);
      }
      return b;
    });
    missing.push(...miss);
  }
  return { ok: true, missing };
}
async function readDocs(sess, paths, maxAge) {
  const out = {};
  const files = new Map();
  for (const p0 of paths) {
    const p = checkPath(p0, 'doc');
    const owner = ownerOf(sess, p);
    if (!owner) { out[p] = null; continue; }
    if (!files.has(owner)) files.set(owner, store.read(bucketKey(owner), maxAge));
    const f = await files.get(owner);
    out[p] = (f && f.data.docs && f.data.docs[p]) || null;
  }
  return out;
}
async function listLearners(sess, maxAge) {
  if (sess.role !== 'teacher') { const d = await readDocs(sess, ['learners/' + sess.uid], maxAge); const x = d['learners/' + sess.uid]; return x ? [{ id: sess.uid, data: x }] : []; }
  const acc = await accounts();
  const uids = Object.values(acc.users).map((u) => u.uid);
  const docs = await Promise.all(uids.map(async (id) => { const f = await store.read(bucketKey(id), maxAge); return { id, data: f && f.data.docs && f.data.docs['learners/' + id] }; }));
  return docs.filter((d) => d.data);
}

/* ---------- AI (optional) ---------- */
let anthropic = null;
async function ai(input, json) {
  if (!process.env.ANTHROPIC_API_KEY) throw new HttpError(501, 'not_granted', 'AI is not configured');
  if (!anthropic) { const { default: Anthropic } = await import('@anthropic-ai/sdk'); anthropic = new Anthropic(); }
  const messages = typeof input === 'string' ? [{ role: 'user', content: input }]
    : (Array.isArray(input) ? input : []).filter((m) => m && (m.role === 'user' || m.role === 'assistant')).map((m) => ({ role: m.role, content: String(m.content || '').slice(0, 20000) }));
  if (!messages.length || messages[0].role !== 'user' || messages[messages.length - 1].role !== 'user') throw new HttpError(400, 'invalid_argument', 'Bad input');
  if (JSON.stringify(messages).length > 80000) throw new HttpError(413, 'invalid_argument', 'Input too long');
  if (json) messages[messages.length - 1] = { role: 'user', content: messages[messages.length - 1].content + '\n\nReply with only the JSON object – no other text.' };
  let r;
  try {
    r = await anthropic.beta.messages.create({
      model: process.env.AI_MODEL || 'claude-opus-5-5',
      max_tokens: 16000,
      output_config: { effort: json ? 'medium' : 'low' },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      messages,
    });
  } catch (e) {
    if (e && e.status === 429) throw new HttpError(429, 'rate_limited', 'Too many requests');
    throw e;
  }
  if (r.stop_reason === 'refusal') throw new HttpError(422, 'refused', 'Declined');
  const text = r.content.filter((b) => b.type === 'text').map((b) => b.text).join('').trim();
  if (!json) return { text, truncated: r.stop_reason === 'max_tokens' };
  const a = text.indexOf('{'), z = text.lastIndexOf('}');
  try { return { data: JSON.parse(text.slice(a, z + 1)) }; } catch (e) { throw new HttpError(502, 'invalid_json', 'Answer was not valid JSON'); }
}

/* ---------- operations ---------- */
const ops = {
  async health() {
    return { ok: true, ai: !!process.env.ANTHROPIC_API_KEY, storage: useBlob ? 'blob' : noStorage ? 'missing' : 'local', configured: !!(SECRET && process.env.TEACHER_PASSWORD && !noStorage) };
  },
  async login(req, b) {
    const u = normUser(b.username), pw = String(b.password || '');
    if (!SECRET) throw new HttpError(500, 'unavailable', 'Server not configured (SESSION_SECRET).');
    const fail = async () => { await new Promise((r) => setTimeout(r, 600)); throw new HttpError(401, 'bad_login', 'Wrong username or password.'); };
    const acc = await accounts(0);
    if (u === TEACHER) {
      const t = acc.teacher;
      const ok = t && t.hash ? checkPw(pw, t) : !!process.env.TEACHER_PASSWORD && sameText(pw, process.env.TEACHER_PASSWORD);
      if (!ok) return fail();
      const name = (t && t.name) || 'Teacher';
      return { token: makeToken({ uid: TEACHER_UID, role: 'teacher', u: TEACHER, name, pv: (t && t.pv) || 0 }), user: { uid: TEACHER_UID, role: 'teacher', username: TEACHER, name } };
    }
    const rec = validUser(u) ? acc.users[u] : null;
    if (!rec || rec.disabled || !checkPw(pw, rec)) return fail();
    return { token: makeToken({ uid: rec.uid, role: 'student', u, name: rec.name, pv: rec.pv || 0 }), user: { uid: rec.uid, role: 'student', username: u, name: rec.name } };
  },
  async me(req) { const s = await session(req); return { uid: s.uid, role: s.role, username: s.u, name: s.name }; },
  /* read documents and collections in one request: {docs:[paths], cols:[paths], fresh} */
  async pull(req, b) {
    const s = await session(req);
    const docs = Array.isArray(b.docs) ? b.docs.slice(0, 30) : [];
    const cols = Array.isArray(b.cols) ? b.cols.slice(0, 5) : [];
    const maxAge = b.fresh ? 0 : 15000;
    const out = { docs: await readDocs(s, docs, maxAge), cols: {} };
    for (const c0 of cols) {
      const c = checkPath(c0, 'col');
      if (c !== 'learners') throw new HttpError(403, 'invalid_argument', 'Not allowed');
      out.cols[c] = await listLearners(s, maxAge);
    }
    return out;
  },
  async write(req, b) { const s = await session(req); return applyWrites(s, b.writes); },
  async 'users.list'(req) {
    teacherOnly(await session(req));
    const acc = await accounts(0);
    return { users: Object.values(acc.users).map(publicUser).sort((a, b) => a.createdAt - b.createdAt) };
  },
  async 'users.create'(req, b) {
    teacherOnly(await session(req));
    const username = normUser(b.username), name = String(b.name || '').trim().slice(0, 80), email = String(b.email || '').trim().slice(0, 120);
    const password = String(b.password || '') || genPassword();
    if (!name) throw new HttpError(400, 'invalid_argument', 'Please enter the student’s name.');
    if (!validUser(username) || username === TEACHER) throw new HttpError(400, 'invalid_argument', 'Username: 3–30 small letters, numbers, dots or dashes (no spaces).');
    if (password.length < 6) throw new HttpError(400, 'invalid_argument', 'Password: at least 6 characters.');
    const uid = 'u_' + crypto.randomBytes(10).toString('hex');
    const rec = Object.assign({ uid, username, name, email, role: 'student', createdAt: Date.now(), pv: 0 }, newPwRecord(password));
    let taken = false;
    await store.mutate(ACC, (cur) => {
      const acc = cur || { users: {} };
      acc.users = acc.users || {};
      if (acc.users[username]) { taken = true; return undefined; }
      acc.users[username] = rec;
      return acc;
    });
    if (taken) throw new HttpError(409, 'invalid_argument', 'This username is already taken – choose another one.');
    // put the student on the teacher's list right away
    await store.mutate(bucketKey('teacher'), (cur) => {
      const bk = cur || { docs: {} };
      bk.docs = bk.docs || {};
      const r = (bk.docs['teacher/roster'] = bk.docs['teacher/roster'] || { students: {}, invites: {} });
      r.invites = r.invites || {};
      r.invites['i' + uid.slice(2, 12)] = { name, email, uid, username, createdAt: Date.now() };
      return bk;
    });
    return { user: publicUser(rec), password };
  },
  async 'users.update'(req, b) {
    teacherOnly(await session(req));
    const username = normUser(b.username);
    let password = null, out = null;
    if (b.resetPassword) { password = String(b.password || '') || genPassword(); if (password.length < 6) throw new HttpError(400, 'invalid_argument', 'Password: at least 6 characters.'); }
    await store.mutate(ACC, (cur) => {
      const rec = cur && cur.users && cur.users[username];
      if (!rec) return undefined;
      if (password) { Object.assign(rec, newPwRecord(password)); rec.pv = (rec.pv || 0) + 1; }
      if (typeof b.disabled === 'boolean' && b.disabled !== !!rec.disabled) { rec.disabled = b.disabled; rec.pv = (rec.pv || 0) + 1; }
      if (b.name) rec.name = String(b.name).trim().slice(0, 80);
      out = rec;
      return cur;
    });
    if (!out) throw new HttpError(404, 'not_found', 'No such student login.');
    return { user: publicUser(out), password };
  },
  async 'password.change'(req, b) {
    const s = await session(req);
    const next = String(b.next || '');
    if (next.length < 6) throw new HttpError(400, 'invalid_argument', 'The new password needs at least 6 characters.');
    let token = null, wrong = false;
    await store.mutate(ACC, (cur) => {
      const acc = cur || { users: {} };
      acc.users = acc.users || {};
      if (s.role === 'teacher') {
        const t = acc.teacher;
        const ok = t && t.hash ? checkPw(b.current, t) : !!process.env.TEACHER_PASSWORD && sameText(String(b.current || ''), process.env.TEACHER_PASSWORD);
        if (!ok) { wrong = true; return undefined; }
        acc.teacher = Object.assign({ name: (t && t.name) || 'Teacher', pv: ((t && t.pv) || 0) + 1 }, newPwRecord(next));
        token = makeToken({ uid: TEACHER_UID, role: 'teacher', u: TEACHER, name: acc.teacher.name, pv: acc.teacher.pv });
        return acc;
      }
      const rec = acc.users[s.u];
      if (!rec || !checkPw(b.current, rec)) { wrong = true; return undefined; }
      Object.assign(rec, newPwRecord(next)); rec.pv = (rec.pv || 0) + 1;
      token = makeToken({ uid: rec.uid, role: 'student', u: s.u, name: rec.name, pv: rec.pv });
      return acc;
    });
    if (wrong) throw new HttpError(403, 'bad_login', 'The current password is wrong.');
    return { token };
  },
  async ai(req, b) { await session(req); return ai(b.input, !!b.json); },
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  try {
    const q = req.query || {};
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    body = body || {};
    const op = req.method === 'GET' ? q.op : body.op;
    if (req.method === 'GET' && op !== 'health') throw new HttpError(405, 'invalid_argument', 'Use POST');
    const fn = Object.prototype.hasOwnProperty.call(ops, op) ? ops[op] : null;
    if (!fn) throw new HttpError(404, 'invalid_argument', 'Unknown operation');
    const out = await fn(req, body);
    res.status(200).json(out);
  } catch (e) {
    const status = e.status || 500;
    if (status >= 500) console.error(e);
    res.status(status).json({ error: e.status ? e.message : 'Server error – please try again.', code: e.code || 'unavailable' });
  }
}
