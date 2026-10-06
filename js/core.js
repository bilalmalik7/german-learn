/* Deutsch in 30 Tagen – core engine: helpers, progress store, speech (TTS + recognition), toast, confetti. */
window.GL = window.GL || {};
GL.days = GL.days || [];
GL.grammar = GL.grammar || {};

(function () {
  'use strict';

  /* ---------- tiny DOM helpers ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const attr = esc;

  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const sample = (a, n) => shuffle(a).slice(0, n);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  /* Normalise an answer for comparison: case-insensitive, punctuation-insensitive. */
  function norm(s) {
    return String(s)
      .toLowerCase()
      .replace(/[.,!?;:¿¡"„“”‚‘’'«»()…]/g, ' ')
      .replace(/[–—]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  /* Transliteration fold: ä→ae, ö→oe, ü→ue, ß→ss (accepted spelling on keyboards without umlauts). */
  function fold(s) {
    return norm(s).replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
  }
  /* Returns {ok, exact, matched} comparing user input against one or more accepted answers. */
  function checkAnswer(input, answers) {
    const list = Array.isArray(answers) ? answers : [answers];
    const n = norm(input);
    for (const a of list) if (norm(a) === n) return { ok: true, exact: true, matched: a };
    const f = fold(input);
    for (const a of list) if (fold(a) === f) return { ok: true, exact: false, matched: a };
    return { ok: false, matched: list[0] };
  }

  /* Word-level alignment score between a target sentence and what speech recognition heard. */
  function speechScore(target, heard) {
    const t = fold(target).split(' ').filter(Boolean);
    const h = fold(heard).split(' ').filter(Boolean);
    const m = t.length, n = h.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    const close = (a, b) => a === b || (a.length > 3 && lev(a, b) <= 1);
    for (let i = m - 1; i >= 0; i--)
      for (let j = n - 1; j >= 0; j--)
        dp[i][j] = close(t[i], h[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    const hit = new Array(m).fill(false);
    let i = 0, j = 0;
    while (i < m && j < n) {
      if (close(t[i], h[j])) { hit[i] = true; i++; j++; }
      else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
      else j++;
    }
    const origWords = String(target).split(/\s+/).filter(Boolean);
    const score = m ? Math.round((dp[0][0] / m) * 100) : 0;
    return { score, words: origWords.map((w, k) => ({ w, hit: !!hit[k] })) };
  }
  function lev(a, b) {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++)
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }

  const todayStr = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');

  /* ---------- progress store (localStorage) ---------- */
  const KEY = 'deutsch30:v1';
  const defaults = () => ({
    days: {},
    xp: 0,
    streak: { count: 0, last: null },
    activity: {},
    srs: {},
    writing: {},
    mistakes: {},
    trainer: {},
    settings: { rate: 0.9, voice: '', unlockAll: false, showEn: true, theme: 'auto', recLang: 'de-DE', sfx: true, name: '' },
    created: todayStr(),
  });
  let state = defaults();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = Object.assign(defaults(), parsed);
      state.settings = Object.assign(defaults().settings, parsed.settings || {});
    }
  } catch (e) { /* private mode or corrupted – start fresh */ }

  const Store = {
    get state() { return state; },
    save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} },
    day(n) { return (state.days[n] = state.days[n] || { steps: {}, done: false, best: 0 }); },
    markStep(n, step) {
      const d = Store.day(n);
      if (!d.steps[step]) { d.steps[step] = true; d.opened = d.opened || todayStr(); Store.save(); }
    },
    isUnlocked(n) {
      if (state.settings.unlockAll || n === 1) return true;
      const prev = state.days[n - 1];
      return !!(prev && prev.done);
    },
    completeDay(n) {
      const d = Store.day(n);
      const first = !d.done;
      d.done = true;
      d.doneOn = d.doneOn || todayStr();
      if (first) Store.addXP(100);
      Store.save();
      return first;
    },
    addXP(x) {
      state.xp += x;
      const t = todayStr();
      state.activity[t] = (state.activity[t] || 0) + x;
      const y = todayStr(new Date(Date.now() - 864e5));
      if (state.streak.last !== t) {
        state.streak.count = state.streak.last === y ? state.streak.count + 1 : 1;
        state.streak.last = t;
      }
      Store.save();
      GL.updateTopStats && GL.updateTopStats();
    },
    currentStreak() {
      const t = todayStr(), y = todayStr(new Date(Date.now() - 864e5));
      return state.streak.last === t || state.streak.last === y ? state.streak.count : 0;
    },
    doneCount() { return Object.values(state.days).filter((d) => d.done).length; },
    nextDay() {
      for (let i = 1; i <= GL.days.length; i++) if (!(state.days[i] && state.days[i].done)) return i;
      return GL.days.length;
    },
    reset() { state = defaults(); Store.save(); },
    /* Mistake notebook: exercises answered wrong are kept until answered right in a review. */
    addMistake(q, day) {
      const k = JSON.stringify(q);
      const m = state.mistakes[k] || { q, day: day || null, n: 0 };
      m.n++; m.last = Date.now();
      state.mistakes[k] = m;
      const keys = Object.keys(state.mistakes);
      if (keys.length > 300) keys.sort((a, b) => state.mistakes[a].last - state.mistakes[b].last).slice(0, keys.length - 300).forEach((x) => delete state.mistakes[x]);
      Store.save();
    },
    clearMistake(q) { const k = JSON.stringify(q); if (state.mistakes[k]) { delete state.mistakes[k]; Store.save(); } },
    mistakeList() { return Object.values(state.mistakes).sort((a, b) => b.n - a.n || b.last - a.last); },
    dueCards() {
      const now = Date.now();
      return Object.values(state.srs).filter((c) => c.due <= now).length;
    },
    importJSON(obj) { state = Object.assign(defaults(), obj); state.settings = Object.assign(defaults().settings, obj.settings || {}); Store.save(); },
  };

  /* ---------- Speech synthesis ---------- */
  const FEMALE = /female|frau|anna|petra|katja|hedda|marlene|vicki|helena|amala|seraphina|ingrid|louisa|elke|klarissa|maja|tanja|gisela|julia|lea|hannah|google deutsch/i;
  const MALE = /\bmale|mann|markus|yannick|conrad|stefan|hans|martin|killian|florian|ralf|bernd|jonas|christoph|kasper|klaus|viktor|daniel|reed|eddy|grandpa/i;

  const Speech = {
    supported: 'speechSynthesis' in window,
    voices: [],
    init() {
      if (!this.supported) return;
      const load = () => {
        const all = speechSynthesis.getVoices();
        this.voices = all.filter((v) => /^de([-_]|$)/i.test(v.lang));
        // Prefer high-quality voices first.
        const rank = (v) => (/natural|neural|online|premium|enhanced/i.test(v.name) ? 0 : /google/i.test(v.name) ? 1 : 2);
        this.voices.sort((a, b) => rank(a) - rank(b));
        document.dispatchEvent(new CustomEvent('gl:voices'));
      };
      load();
      speechSynthesis.addEventListener ? speechSynthesis.addEventListener('voiceschanged', load) : (speechSynthesis.onvoiceschanged = load);
    },
    pickVoice(gender) {
      const pref = state.settings.voice;
      if (!gender && pref) {
        const v = this.voices.find((x) => x.voiceURI === pref);
        if (v) return v;
      }
      if (gender === 'f') { const v = this.voices.find((x) => FEMALE.test(x.name)); if (v) return v; }
      if (gender === 'm') { const v = this.voices.find((x) => !FEMALE.test(x.name) && MALE.test(x.name)); if (v) return v; }
      if (pref) { const v = this.voices.find((x) => x.voiceURI === pref); if (v) return v; }
      return this.voices[0] || null;
    },
    /* speak(text, {char:'lena', rate:1, slow:true}) -> Promise resolved when finished. */
    _tok: 0,
    speak(text, opts = {}) {
      if (!this.supported || !text) return Promise.resolve();
      const my = ++this._tok;
      const clean = String(text).replace(/\s*\([^)]*\)/g, '').replace(/[“”„]/g, '').replace(/\|/g, ' ').replace(/\s*\/\s*/g, ', ').replace(/…/g, '...').replace(/\s*[–—]\s*/g, ', ');
      // Long texts are spoken sentence by sentence: some online voices stop after ~15 seconds.
      const parts = clean.length > 160 ? (clean.match(/[^.!?\n]+[.!?]*/g) || [clean]).map((p) => p.trim()).filter(Boolean) : [clean];
      speechSynthesis.cancel();
      return (async () => {
        for (let i = 0; i < parts.length && my === this._tok; i++) await this._utter(parts[i], opts, i === 0);
        opts.onend && opts.onend();
      })();
    },
    _utter(text, opts, first) {
      return new Promise((resolve) => {
        const u = new SpeechSynthesisUtterance(text);
        const c = opts.char && GL.chars && GL.chars[opts.char];
        u.lang = 'de-DE';
        const v = this.pickVoice(c ? c.gender : null);
        if (v) u.voice = v;
        let rate = state.settings.rate * (c && c.rate ? c.rate : 1);
        if (opts.slow) rate *= 0.65;
        u.rate = Math.max(0.4, Math.min(1.6, rate));
        u.pitch = c && c.pitch ? c.pitch : 1;
        let done = false;
        const finish = () => { if (done) return; done = true; clearTimeout(guard); resolve(); };
        if (first) u.onstart = () => opts.onstart && opts.onstart();
        u.onend = finish;
        u.onerror = finish;
        // Safety net: some browsers never fire onend.
        const guard = setTimeout(finish, 2500 + text.length * 140 / u.rate);
        // Chrome sometimes needs a tick after cancel().
        setTimeout(() => speechSynthesis.speak(u), first ? 30 : 0);
      });
    },
    stop() { if (this.supported) { this._tok++; speechSynthesis.cancel(); } },
  };

  /* ---------- Speech recognition ---------- */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const Rec = {
    supported: !!SR,
    active: null,
    /* Resolves with an array of transcript alternatives, rejects on error. */
    listen() {
      return new Promise((resolve, reject) => {
        if (!SR) { reject(new Error('unsupported')); return; }
        try { this.active && this.active.abort(); } catch (e) {}
        const r = new SR();
        this.active = r;
        r.lang = state.settings.recLang || 'de-DE';
        r.interimResults = false;
        r.maxAlternatives = 4;
        let got = false;
        r.onresult = (e) => {
          got = true;
          const alts = [];
          for (let i = 0; i < e.results[0].length; i++) alts.push(e.results[0][i].transcript);
          resolve(alts);
        };
        r.onerror = (e) => { if (!got) reject(new Error(e.error || 'error')); };
        r.onend = () => { this.active = null; if (!got) reject(new Error('no-speech')); };
        r.start();
      });
    },
    stop() { try { this.active && this.active.stop(); } catch (e) {} },
  };

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg, kind = '') {
    const t = $('#toast');
    if (!t) return;
    t.className = 'show ' + kind;
    t.innerHTML = msg;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (t.className = ''), 2600);
  }

  /* ---------- Confetti ---------- */
  function confetti(amount = 160) {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = $('#confetti');
    if (!c) return;
    const ctx = c.getContext('2d');
    const W = (c.width = innerWidth), H = (c.height = innerHeight);
    const colors = ['#ffce00', '#dd0000', '#222222', '#3a86ff', '#2ec4b6', '#ff4d6d', '#9b5de5'];
    const parts = Array.from({ length: amount }, () => ({
      x: W / 2 + (Math.random() - 0.5) * W * 0.3,
      y: H * 0.35,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 14 - 4,
      s: Math.random() * 8 + 5,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      c: colors[(Math.random() * colors.length) | 0],
    }));
    let frame = 0;
    c.style.display = 'block';
    (function tick() {
      ctx.clearRect(0, 0, W, H);
      parts.forEach((p) => {
        p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        ctx.restore();
      });
      if (++frame < 180) requestAnimationFrame(tick);
      else { ctx.clearRect(0, 0, W, H); c.style.display = 'none'; }
    })();
  }

  /* ---------- Rich-text mini markup used in content ----------
     {{Deutsch|English}}   -> example row with audio button
     [[Deutsch]]           -> inline clickable German that speaks on click            */
  function rich(html) {
    return String(html)
      .replace(/\{\{([^|}]+)\|([^}]*)\}\}/g, (_, de, en) =>
        `<div class="ex"><button class="say-btn" data-say="${attr(stripTags(de))}" aria-label="Listen">🔊</button><span class="ex-de">${de}</span><span class="ex-en">${en}</span></div>`)
      .replace(/\[\[([^\]]+)\]\]/g, (_, de) => `<span class="say" data-say="${attr(stripTags(de))}">${de}</span>`);
  }
  const stripTags = (s) => String(s).replace(/<[^>]+>/g, '');

  /* Gender helpers for nouns written like "der Tisch". */
  function genderOf(word) {
    const m = /^(der|die|das)\s/i.exec(word || '');
    return m ? m[1].toLowerCase() : null;
  }

  /* ---------- Sound effects (Web Audio, no files needed) ---------- */
  let actx = null;
  function sfx(kind) {
    if (!state.settings.sfx) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const notes = { ok: [[660, 0], [880, 0.09]], bad: [[220, 0], [180, 0.12]], done: [[523, 0], [659, 0.1], [784, 0.2], [1047, 0.3]], pop: [[900, 0]] }[kind] || [];
      notes.forEach(([f, t]) => {
        const o = actx.createOscillator(), g = actx.createGain();
        o.type = kind === 'bad' ? 'triangle' : 'sine';
        o.frequency.value = f;
        const t0 = actx.currentTime + t;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(0.18, t0 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + (kind === 'pop' ? 0.08 : 0.22));
        o.connect(g).connect(actx.destination);
        o.start(t0); o.stop(t0 + 0.25);
      });
    } catch (e) { /* audio not available */ }
  }

  /* ---------- Claude runtime capabilities (only inside the claude.ai viewer) ---------- */
  const useCap = (name) => (window.claude && typeof window.claude.use === 'function' ? window.claude.use(name).catch(() => null) : Promise.resolve(null));
  const AI = {
    disabled: false,
    ready: useCap('sample'),
    async get() { if (AI.disabled) return null; return AI.ready; },
    /* Hide AI features for the rest of the view on permanent errors. */
    errorText(e) {
      const c = e && e.code;
      if (['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed'].includes(c)) { AI.disabled = true; return 'The AI tutor is not available here (permission declined or disabled). Everything else still works.'; }
      if (c === 'rate_limited') return 'Too many requests right now – wait a minute and try again.';
      if (c === 'session_expired') return 'Please sign in to claude.ai again, then retry.';
      if (c === 'refused') return 'Bruno could not answer that. Try rephrasing.';
      if (c === 'invalid_json' || c === 'empty_completion') return 'The answer came back incomplete – please press the button again.';
      if (c === 'cancelled') return '';
      return 'Connection problem – please try again.';
    },
  };
  const downloadsCap = useCap('downloads');
  /* Save a file: through the viewer's download capability when present, else a normal browser download. */
  async function saveFile(filename, data, mime) {
    const dl = await downloadsCap;
    if (dl) {
      try { await dl.save({ filename, data }); toast('✅ Saved ' + esc(filename), 'ok'); } catch (e) { if (e && e.code !== 'declined') toast('Could not save the file here.', 'bad'); }
      return;
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(data instanceof Blob ? data : new Blob([data], { type: mime || 'application/octet-stream' }));
    a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
  }

  Object.assign(GL, { sfx, AI, saveFile, useCap });
  Object.assign(GL, { $, $$, esc, attr, shuffle, sample, sleep, norm, fold, checkAnswer, speechScore, todayStr, Store, Speech, Rec, toast, confetti, rich, stripTags, genderOf });

  Speech.init();

  /* Global: anything with data-say speaks on click. */
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-say]');
    if (!el) return;
    e.preventDefault();
    const slow = el.hasAttribute('data-slow');
    el.classList.add('saying');
    Speech.speak(el.getAttribute('data-say'), { char: el.getAttribute('data-char') || undefined, slow }).then(() => el.classList.remove('saying'));
  });
})();
