/* Keeping progress: remember where the learner stopped and bring them back there, ask the browser to keep the
   saved data, warn inside in-app browsers (Facebook, Instagram …) where saved data often gets lost, and a
   "progress link" to move progress to another phone or browser without any account. */
(function () {
  'use strict';
  const { $, esc, attr, Store, toast } = GL;

  /* ---------- 1. where did the learner stop? ---------- */
  const STEP_NAMES = { intro: 'Overview', vocab: 'Vocabulary', grammar: 'Grammar', dialogue: 'Dialogue', practice: 'Exercises', speaking: 'Speaking', writing: 'Writing', done: 'Finish' };
  const STUDY = ['day', 'grammar', 'scenes', 'trainer', 'talk', 'writing', 'review', 'sounds', 'job', 'exam'];
  function label(page, a, b) {
    if (page === 'day') return `📅 Day ${+a || 1} · ${STEP_NAMES[b] || 'Overview'}`;
    if (page === 'scenes') { const s = a && GL.scenarios.find((x) => x.id === a); return s ? `🎬 ${s.title}` : '🎬 Real-life scenes'; }
    if (page === 'grammar') { const t = a && GL.grammar[decodeURIComponent(a)]; return t ? `📘 ${t.title}` : '📘 Grammar A–Z'; }
    if (page === 'job') return a === 'day' ? `💼 Job German · Day ${b}` : a === 'interview' ? '💼 Job German · Interview' : '💼 Job German';
    if (page === 'exam') return GL.Exam ? GL.Exam.label(a, b) : '🎓 Exam prep';
    return ({ trainer: '🏋️ Grammar trainer', talk: '🎤 Speaking practice', writing: '✍️ Writing studio', review: '🔁 Review', sounds: '🗣️ Sounds' })[page] || '';
  }
  function visit(page, a, b) {
    if (!STUDY.includes(page)) return;
    const st = Store.state;
    if (page === 'day') { const n = +a || 1; const d = Store.day(n); d.lastStep = b || d.lastStep || 'intro'; }
    st.last = { hash: location.hash || '#/', label: label(page, a, b), at: Date.now() };
    Store.save();
  }
  /* #/day/5 without a step → the step where the learner stopped on that day */
  const lastStep = (n) => (Store.state.days[n] && Store.state.days[n].lastStep) || 'intro';

  const ago = (t) => { const m = Math.round((Date.now() - t) / 60000); return m < 2 ? 'just now' : m < 60 ? `${m} minutes ago` : m < 1440 ? `${Math.round(m / 60)} hours ago` : m < 2880 ? 'yesterday' : `${Math.round(m / 1440)} days ago`; };

  /* ---------- 2. in-app browsers lose saved data ---------- */
  const IN_APP = /FBAN|FBAV|FB_IAB|FBIOS|Instagram|Line\/|Snapchat|TikTok|musical_ly|LinkedInApp|Twitter/i.test(navigator.userAgent || '');
  const appName = () => { const u = navigator.userAgent || ''; return /Instagram/i.test(u) ? 'Instagram' : /FBAN|FBAV|FB_IAB|FBIOS/i.test(u) ? 'Facebook' : /TikTok|musical_ly/i.test(u) ? 'TikTok' : /Snapchat/i.test(u) ? 'Snapchat' : 'this app'; };

  /* ---------- 3. ask the browser to keep the saved data ---------- */
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persisted().then((p) => { if (!p) navigator.storage.persist().catch(() => {}); }).catch(() => {}); } catch (e) { /* not supported */ }

  /* ---------- 4. progress link (no account needed) ---------- */
  const KEEP = ['days', 'xp', 'streak', 'activity', 'srs', 'scenes', 'trainer', 'speak', 'time', 'timeAreas', 'last', 'created', 'mistakes', 'exam'];
  const b64u = (bytes) => { let s = ''; bytes.forEach((x) => (s += String.fromCharCode(x))); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
  const unb64u = (str) => { const s = atob(str.replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(s, (c) => c.charCodeAt(0)); };
  async function pack() {
    const st = Store.state, o = {};
    KEEP.forEach((k) => { if (st[k] != null) o[k] = st[k]; });
    o.settings = { unlockAll: st.settings.unlockAll, name: st.settings.name, showEn: st.settings.showEn, theme: st.settings.theme, rate: st.settings.rate };
    if (o.exam) o.exam = Object.assign({}, o.exam, { texts: undefined }); // exam writing drafts stay on this device (keeps the link short)
    let json = JSON.stringify(o);
    if (json.length > 60000 && o.mistakes) { delete o.mistakes; json = JSON.stringify(o); }
    const raw = new TextEncoder().encode(json);
    if (window.CompressionStream) {
      const buf = await new Response(new Blob([raw]).stream().pipeThrough(new CompressionStream('deflate-raw'))).arrayBuffer();
      return 'z' + b64u(new Uint8Array(buf));
    }
    return 'u' + b64u(raw);
  }
  async function unpack(code) {
    const kind = code[0], bytes = unb64u(code.slice(1));
    let text;
    if (kind === 'z') text = await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
    else text = new TextDecoder().decode(bytes);
    return JSON.parse(text);
  }
  const linkFor = (code) => location.origin + location.pathname + '#/restore/' + code;
  const summary = (o) => { const done = Object.values(o.days || {}).filter((d) => d.done).length; return `${done} of 30 days finished · ${o.xp || 0} XP${o.last && o.last.label ? ' · last: ' + o.last.label : ''}`; };

  function linkCardHTML() {
    return `<div class="card prog-link" id="progLink"><h3 style="margin-top:0">📲 Continue on another phone or browser</h3>
      <p class="muted" style="margin-top:0">Your progress is saved in <b>this browser</b>. To continue somewhere else, create your progress link and send it to yourself (e.g. on WhatsApp). Open it on the other phone – done.</p>
      <div class="row"><button class="btn green" id="plMake" type="button">🔗 Create my progress link</button><span class="muted" id="plInfo"></span></div>
      <div id="plOut"></div></div>`;
  }
  function wireLinkCard(root) {
    const btn = $('#plMake', root);
    if (!btn) return;
    btn.onclick = async () => {
      btn.disabled = true; $('#plInfo', root).textContent = 'Creating…';
      try {
        const url = linkFor(await pack());
        $('#plInfo', root).textContent = '';
        $('#plOut', root).innerHTML = `<textarea class="txt-in pl-url" readonly rows="3">${esc(url)}</textarea>
          <div class="row"><button class="btn small" id="plCopy" type="button">📋 Copy link</button><a class="btn small wa-btn" target="_blank" rel="noopener" href="https://wa.me/?text=${attr(encodeURIComponent('My Deutsch30 progress – open this link to continue: ' + url))}">💬 Send to myself on WhatsApp</a></div>
          <p class="muted" style="margin:6px 0 0">The link contains your progress (${esc(summary(Store.state))}). Create a new one whenever you want to move again.</p>`;
        $('#plCopy', root).onclick = async () => { try { await navigator.clipboard.writeText(url); toast('✅ Link copied', 'ok'); } catch (e) { const ta = $('.pl-url', root); ta.select(); document.execCommand('copy'); toast('✅ Link copied', 'ok'); } };
      } catch (e) { $('#plInfo', root).textContent = 'Could not create the link on this browser – use Settings → Export instead.'; }
      btn.disabled = false;
    };
  }

  /* #/restore/<code> – load progress from a link */
  function viewRestore(code) {
    return {
      html: `<div class="card center restore-card" id="rsRoot"><p class="muted">Reading your progress link…</p></div>`,
      mount() {
        const root = $('#rsRoot');
        unpack(code || '').then((o) => {
          const here = Store.state, hasHere = here.xp || Object.keys(here.days || {}).length;
          root.innerHTML = `${GL.charSVG('bruno', 'idle waving')}<h2>📲 Your progress link</h2>
            <p><b>${esc(summary(o))}</b></p>
            ${hasHere ? `<div class="warn">This browser already has progress (${esc(summary(here))}). Loading the link replaces it.</div>` : ''}
            <div class="row" style="justify-content:center"><button class="btn green big" id="rsLoad" type="button">✅ Load my progress here</button><a class="btn ghost" href="#/">Cancel</a></div>`;
          $('#rsLoad').onclick = () => {
            const settings = Object.assign({}, Store.state.settings, o.settings || {});
            if (o.exam && Store.state.exam && Store.state.exam.texts) o.exam.texts = Store.state.exam.texts;
            const next = Object.assign({}, Store.state, o, { settings });
            Store.importJSON(next);
            toast('✅ Progress loaded – welcome back!', 'ok'); GL.confetti && GL.confetti();
            location.hash = (o.last && o.last.hash) || '#/';
            if (GL.render) GL.render();
          };
        }).catch(() => { root.innerHTML = `<h2>😕 This link doesn’t work</h2><p>It may be incomplete (copy the whole link) or created on an older version.</p><a class="btn" href="#/">Home</a>`; });
      },
    };
  }

  /* ---------- home: welcome back + in-app warning ---------- */
  function homeHTML() {
    const L = Store.state.last;
    const inApp = IN_APP ? `<div class="inapp-warn"><b>⚠️ You opened the course inside ${appName()}.</b> ${appName()} can delete your saved progress when it closes. Tap <b>⋯</b> (top right) → <b>“Open in browser”</b> (Chrome / Safari) to keep your progress.
        <div class="row" style="margin-top:8px"><button class="btn small" id="iaCopy" type="button">📋 Copy the link</button></div></div>` : '';
    const back = L && L.hash && L.hash !== '#/' && L.label ? `<a class="welcome-back" href="${attr(L.hash)}"><span class="wb-ico">👋</span><span><b>Welcome back!</b> You stopped at <b>${esc(L.label)}</b> <small>(${ago(L.at)})</small></span><span class="btn small green">▶ Continue</span></a>` : '';
    const more = L && L.hash ? '<p class="wb-more"><a href="#/settings">📲 Using another phone? Take your progress with you →</a></p>' : '';
    return inApp + back + more;
  }
  function wireHome(root) {
    const c = $('#iaCopy', root);
    if (c) c.onclick = async () => { const url = location.origin + location.pathname; try { await navigator.clipboard.writeText(url); toast('✅ Link copied – paste it into Chrome or Safari', 'ok'); } catch (e) { prompt('Copy this link:', url); } };
  }

  GL.Resume = { visit, lastStep, homeHTML, wireHome, linkCardHTML, wireLinkCard, viewRestore, pack, unpack, IN_APP };
})();
