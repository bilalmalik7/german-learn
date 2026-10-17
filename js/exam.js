/* EXAM PREP – telc & Goethe, A1 → B1 in 12 weeks.
   Pages: overview with the animated roadmap (#/exam), week plans (#/exam/week/N), exam formats (#/exam/format/A1),
   practice library (#/exam/tasks), the task trainer (#/exam/task/<id>), timed mock exams (#/exam/mock/<level>),
   exam words (#/exam/words/<theme>) and printable notes (#/exam/notes/<n>).
   Data: js/data/exam.js (formats, weeks, notes), exam-a1/a2/b1/b1-mock/telc.js (tasks), exam-words.js. */
(function () {
  'use strict';
  const { $, $$, esc, attr, Store, Speech, toast } = GL;
  const E = () => GL.exam;

  /* ---------- saved progress ---------- */
  const S = () => {
    const st = Store.state;
    st.exam = st.exam || {};
    const x = st.exam;
    x.done = x.done || {}; x.results = x.results || {}; x.mocks = x.mocks || {}; x.texts = x.texts || {};
    return x;
  };
  const result = (id) => S().results[id];
  function saveResult(id, score, max, extra) {
    const x = S(), r = x.results[id] || { n: 0 };
    const pct = max ? Math.round((score / max) * 100) : null;
    const first = !r.n;
    r.n++; r.at = Date.now(); r.last = pct;
    if (pct != null) r.best = Math.max(r.best == null ? 0 : r.best, pct);
    Object.assign(r, extra || {});
    x.results[id] = r;
    Store.addXP(first ? 15 : 5);
    Store.save();
    if (GL.Game) GL.Game.count('exam', 1);
    const t = task(id);
    GL.track && GL.track('exam', `Exam ${t ? t.level + ' · ' + t.title : id}${pct != null ? `: ${pct}%` : ''}`);
    return pct;
  }

  const task = (id) => (E().tasks || {})[id];
  const MOD = { hoeren: ['🎧', 'Hören', 'Listening'], lesen: ['📖', 'Lesen', 'Reading'], schreiben: ['✍️', 'Schreiben', 'Writing'], sprechen: ['🗣️', 'Sprechen', 'Speaking'], sprachbausteine: ['🧩', 'Sprachbausteine', 'Grammar & vocabulary'] };
  const LV = { A1: '#22b573', A2: '#3a86ff', B1: '#9b5de5' };
  const DAYS = [['Mo', 'Monday'], ['Di', 'Tuesday'], ['Mi', 'Wednesday'], ['Do', 'Thursday'], ['Fr', 'Friday'], ['Sa', 'Saturday']];
  const paras = (t) => String(t || '').split(/\n\s*\n/).map((p) => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`).join('');
  const pctCls = (p) => (p == null ? '' : p >= 80 ? 'hi' : p >= 60 ? 'mid' : 'lo');
  const scoreChip = (id) => { const r = result(id); if (!r) return ''; return r.best != null ? `<span class="xm-chip ${pctCls(r.best)}">${r.best}%</span>` : '<span class="xm-chip hi">✓</span>'; };
  const lvBadge = (lv) => `<span class="xm-lv" style="--lv:${LV[lv] || '#888'}">${esc(lv)}</span>`;
  const examName = (t) => (t.exam === 'both' ? 'Goethe & telc' : t.exam === 'telc' ? 'telc' : 'Goethe');

  /* ---------- plan items ---------- */
  const itemKey = (w, d, i) => `w${w}d${d}i${i}`;
  function itemHref([type, v]) {
    return ({ day: `#/day/${v}`, grammar: `#/grammar/${v}`, task: `#/exam/task/${v}`, words: `#/exam/words/${v}`, notes: `#/exam/notes/${v}`, mock: `#/exam/mock/${v}`, review: `#/review/${v}`, scene: `#/scenes/${v}`, format: `#/exam/format/${v}`, verbs: '#/exam/words/verbs', prepverbs: '#/exam/words/prepverbs', connectors: '#/exam/words/connectors', redemittel: '#/exam/words/redemittel', writing: '#/writing' })[type] || '#/exam';
  }
  const ICON = { day: '📅', grammar: '📘', task: '🎯', words: '🔤', notes: '📝', mock: '🏁', review: '🔁', scene: '🎬', format: 'ℹ️', verbs: '🔀', prepverbs: '🔗', connectors: '🧷', redemittel: '💬', writing: '✍️' };
  function autoDone([type, v]) {
    const st = Store.state;
    if (type === 'day') return !!(st.days[v] && st.days[v].done);
    if (type === 'task') return !!result(v);
    if (type === 'scene') return !!((st.scenes || {})[v] || {}).done;
    if (type === 'mock') return !!(S().mocks[v] && S().mocks[v].final != null);
    return false;
  }
  const isDone = (w, d, i, it) => !!S().done[itemKey(w, d, i)] || autoDone(it);
  function weekStats(wk) {
    let all = 0, done = 0, mins = 0;
    wk.days.forEach((day, d) => day.forEach((it, i) => { all++; mins += it[3] || 0; if (isDone(wk.n, d, i, it)) done++; }));
    return { all, done, pct: all ? Math.round((done / all) * 100) : 0, mins };
  }
  const allStats = () => E().weeks.reduce((s, w) => { const x = weekStats(w); s.all += x.all; s.done += x.done; return s; }, { all: 0, done: 0 });
  const currentWeek = () => (E().weeks.find((w) => weekStats(w).pct < 100) || E().weeks[E().weeks.length - 1]).n;
  function nextDay() {
    for (const wk of E().weeks) for (let d = 0; d < wk.days.length; d++) if (wk.days[d].some((it, i) => !isDone(wk.n, d, i, it))) return { wk, d };
    return null;
  }

  /* ---------- audio (text-to-speech with the exam’s play limit) ---------- */
  let audioTok = 0;
  async function playLines(lines, box) {
    const my = ++audioTok;
    box && box.classList.add('playing');
    for (const [who, text] of lines) {
      if (my !== audioTok) break;
      await Speech.speak(text, { char: who === '_' ? undefined : who });
    }
    if (my === audioTok) box && box.classList.remove('playing');
    return my === audioTok;
  }
  function audioHTML(key, lines, plays) {
    return `<div class="xm-audio" data-a="${attr(key)}" data-left="${plays || 2}">
        <button class="btn xm-play" type="button">▶ Play</button>
        <span class="xm-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
        <span class="xm-left">${plays === 1 ? 'You hear this <b>once</b>' : `You hear this <b>${plays || 2}×</b>`}</span>
      </div>${Speech.supported ? '' : '<p class="warn">This browser cannot read texts aloud – read the transcript instead.</p>'}
      <details class="xm-trans ${Speech.supported ? 'hidden' : ''}"><summary>📜 Transcript</summary>${lines.map(([who, t]) => `<p><b>${esc(who === '_' ? '🔈' : (GL.chars[who] ? GL.chars[who].name.replace(/ \(.*\)/, '') : who))}:</b> ${esc(t)}</p>`).join('')}</details>`;
  }
  function wireAudio(root, audios) {
    $$('.xm-audio', root).forEach((box) => {
      const lines = audios[box.dataset.a];
      const btn = $('.xm-play', box), left = $('.xm-left', box);
      btn.onclick = async () => {
        if (box.classList.contains('playing')) { audioTok++; Speech.stop(); box.classList.remove('playing'); btn.textContent = '▶ Play'; return; }
        let n = +box.dataset.left;
        if (n <= 0 && !box.classList.contains('free')) return;
        if (!box.classList.contains('free')) { n--; box.dataset.left = n; }
        btn.textContent = '⏹ Stop';
        const ok = await playLines(lines, box);
        if (!ok) return;
        btn.textContent = '▶ Play';
        if (!box.classList.contains('free')) {
          if (n <= 0) { btn.disabled = true; left.innerHTML = 'Finished – like in the exam, no more replays.'; }
          else left.innerHTML = `<b>${n}×</b> left`;
        }
      };
    });
  }
  /* after checking: unlimited replays + transcript */
  function freeAudio(root) {
    $$('.xm-audio', root).forEach((box) => { box.classList.add('free'); const b = $('.xm-play', box); b.disabled = false; $('.xm-left', box).innerHTML = 'Practice mode: listen as often as you like'; });
    $$('.xm-trans', root).forEach((d) => d.classList.remove('hidden'));
  }

  /* ---------- task renderers: html(t, p) + wire(root, t, p) → { grade(): {score,max,auto}, reveal() } ---------- */
  /* a/b/c options are shown in a fixed shuffled order per question (the written data has many right answers in
     the same position); the radio value stays the original index, so grading uses the data as written */
  function order(seed, n) {
    let h = 2166136261; for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
    const idx = [...Array(n).keys()];
    for (let i = n - 1; i > 0; i--) { h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0; const j = h % (i + 1); [idx[i], idx[j]] = [idx[j], idx[i]]; }
    return idx;
  }
  const optBtns = (name, opts, seed) => {
    const ix = opts.length > 2 && !opts.every((o) => /^[a-z]$/i.test(o)) ? order(seed, opts.length) : opts.map((o, j) => j);
    return `<div class="xm-opts ${opts.length === 2 ? 'two' : ''}">${ix.map((j, pos) => `<label class="xm-opt"><input type="radio" name="${attr(name)}" value="${j}"><span class="xm-ol">${opts.length === 2 ? '' : String.fromCharCode(97 + pos)}</span><span>${esc(opts[j])}</span></label>`).join('')}</div>`;
  };
  const glossHTML = (t) => (t.gloss && t.gloss.length ? `<div class="xm-gloss"><b>🔑 Key words</b>${t.gloss.map(([de, en]) => `<button class="xm-g" type="button" data-say="${attr(de)}"><b>${esc(de)}</b><small>${esc(en)}</small></button>`).join('')}</div>` : '');

  const R = {};
  R.mc = {
    html(t, p) {
      const audios = {};
      let h = '';
      if (t.audio) { audios[p + 'A'] = t.audio; h += audioHTML(p + 'A', t.audio, t.plays); }
      if (t.text) h += `<div class="xm-text">${paras(t.text)}</div>`;
      let lastAudio = '';
      h += t.items.map((it, i) => {
        let pre = '';
        const aj = it.audio ? JSON.stringify(it.audio) : '';
        if (aj && aj !== lastAudio) { audios[p + i] = it.audio; pre += `<div class="xm-item-audio">${audioHTML(p + i, it.audio, t.plays)}</div>`; }
        lastAudio = aj || lastAudio;
        if (it.text) pre += `<div class="xm-text small">${paras(it.text)}</div>`;
        return `${pre}<div class="xm-q" data-i="${i}" style="animation-delay:${Math.min(i, 10) * 0.04}s"><div class="xm-qt"><span class="xm-no">${i + 1}</span><span>${esc(it.q)}</span></div>${optBtns(p + 'q' + i, it.o, t.id + '#' + i)}<div class="xm-ex hidden"></div></div>`;
      }).join('');
      R.mc._audios[p] = audios;
      return h;
    },
    _audios: {},
    wire(root, t, p) {
      wireAudio(root, R.mc._audios[p] || {});
      return {
        grade() {
          let score = 0;
          t.items.forEach((it, i) => { const c = $(`input[name="${p}q${i}"]:checked`, root); if (c && +c.value === it.a) score++; });
          return { score, max: t.items.length, auto: true };
        },
        reveal() {
          t.items.forEach((it, i) => {
            const q = $(`.xm-q[data-i="${i}"]`, root), c = $(`input[name="${p}q${i}"]:checked`, root);
            const ok = c && +c.value === it.a;
            q.classList.add(ok ? 'ok' : 'bad');
            $$('.xm-opt', q).forEach((l) => { const j = +$('input', l).value; l.classList.toggle('right', j === it.a); l.classList.toggle('wrong', !!c && j === +c.value && !ok); $('input', l).disabled = true; });
            const ex = $('.xm-ex', q); ex.innerHTML = `${ok ? '✅' : `❌ Right answer: <b>${esc(it.o[it.a])}</b> –`} ${esc(it.ex || '')}`; ex.classList.remove('hidden');
          });
          freeAudio(root);
        },
      };
    },
  };

  R.match = {
    html(t, p) {
      const audios = {};
      let h = '';
      if (t.audio) { audios[p + 'A'] = t.audio; h += audioHTML(p + 'A', t.audio, t.plays); }
      if (t.text) h += `<div class="xm-text">${paras(t.text)}</div>`;
      R.mc._audios[p] = audios;
      const opts = t.ads.map((a) => a.k).concat(t.x ? ['x'] : []);
      h += `<div class="xm-ads">${t.ads.map((a) => `<div class="xm-ad"><span class="xm-ak">${esc(a.k)}</span><div>${a.title ? `<b>${esc(a.title)}</b><br>` : ''}${esc(a.t).replace(/\n/g, '<br>')}</div></div>`).join('')}</div>`;
      h += `<div class="xm-match">${t.items.map((it, i) => `<div class="xm-q xm-mrow" data-i="${i}"><div class="xm-qt"><span class="xm-no">${i + 1}</span><span>${esc(it.q).replace(/\n/g, '<br>')}</span></div>
          <select class="xm-sel" data-i="${i}" aria-label="Answer ${i + 1}"><option value="">–</option>${opts.map((k) => `<option value="${attr(k)}">${k === 'x' ? 'x – no ad / none' : esc(k)}</option>`).join('')}</select><div class="xm-ex hidden"></div></div>`).join('')}</div>`;
      if (t.x) h += '<p class="muted xm-xnote">x = there is no matching text for this situation.</p>';
      return h;
    },
    wire(root, t, p) {
      wireAudio(root, R.mc._audios[p] || {});
      const sel = (i) => $(`.xm-sel[data-i="${i}"]`, root);
      return {
        grade() { let score = 0; t.items.forEach((it, i) => { if (sel(i).value === it.a) score++; }); return { score, max: t.items.length, auto: true }; },
        reveal() {
          t.items.forEach((it, i) => {
            const s = sel(i), ok = s.value === it.a, q = s.closest('.xm-q');
            q.classList.add(ok ? 'ok' : 'bad'); s.disabled = true;
            const ad = t.ads.find((a) => a.k === it.a);
            const ex = $('.xm-ex', q); ex.innerHTML = `${ok ? '✅' : `❌ Right answer: <b>${esc(it.a)}</b>${ad && ad.title ? ` (${esc(ad.title)})` : ''} –`} ${esc(it.ex || '')}`; ex.classList.remove('hidden');
          });
          freeAudio(root);
        },
      };
    },
  };

  R.cloze = {
    html(t) {
      const words = t.words ? t.words.slice().sort((a, b) => a.localeCompare(b, 'de')) : null;
      const body = esc(t.text).replace(/\[(\d+)\]/g, (m, n) => {
        const g = t.gaps[n - 1]; if (!g) return m;
        const opts = words || g.o;
        return `<span class="xm-gap" data-g="${n - 1}"><sup>${n}</sup><select class="xm-sel" aria-label="Gap ${n}"><option value="">…</option>${opts.map((o, j) => `<option value="${attr(words ? o : j)}">${esc(o)}</option>`).join('')}</select></span>`;
      });
      return `${words ? `<div class="xm-wordbox">${words.map((w) => `<span>${esc(w)}</span>`).join('')}</div>` : ''}<div class="xm-text xm-cloze">${body.split(/\n\s*\n/).map((x) => `<p>${x.replace(/\n/g, '<br>')}</p>`).join('')}</div><ol class="xm-gapex hidden"></ol>`;
    },
    wire(root, t) {
      const val = (i) => $(`.xm-gap[data-g="${i}"] select`, root).value;
      const right = (g, v) => (t.words ? v === g.a : v !== '' && +v === g.a);
      return {
        grade() { let score = 0; t.gaps.forEach((g, i) => { if (right(g, val(i))) score++; }); return { score, max: t.gaps.length, auto: true }; },
        reveal() {
          t.gaps.forEach((g, i) => { const sp = $(`.xm-gap[data-g="${i}"]`, root); sp.classList.add(right(g, val(i)) ? 'ok' : 'bad'); $('select', sp).disabled = true; });
          const ol = $('.xm-gapex', root);
          ol.innerHTML = t.gaps.map((g, i) => { const ok = right(g, val(i)); return `<li class="${ok ? 'ok' : 'bad'}">${ok ? '✅' : '❌'} <b>${esc(t.words ? g.a : g.o[g.a])}</b> – ${esc(g.ex || '')}</li>`; }).join('');
          ol.classList.remove('hidden');
        },
      };
    },
  };

  R.form = {
    html(t) {
      return `<div class="xm-text">${paras(t.text)}</div>${t.textEn ? `<details class="xm-en"><summary>🇬🇧 English</summary>${paras(t.textEn)}</details>` : ''}
        <div class="xm-form">${t.fields.map((f, i) => `<label class="xm-field" data-i="${i}"><span>${esc(f.label)}</span><input class="txt-in" type="text" autocomplete="off" spellcheck="false"><small class="xm-ex hidden"></small></label>`).join('')}</div>`;
    },
    wire(root, t) {
      const inp = (i) => $(`.xm-field[data-i="${i}"] input`, root);
      const ok = (f, v) => [f.a].concat(f.alt || []).some((a) => GL.fold(a).replace(/\s+/g, ' ').trim() === GL.fold(v).replace(/\s+/g, ' ').trim());
      return {
        grade() { let score = 0; t.fields.forEach((f, i) => { if (ok(f, inp(i).value)) score++; }); return { score, max: t.fields.length, auto: true }; },
        reveal() { t.fields.forEach((f, i) => { const r = ok(f, inp(i).value), l = inp(i).closest('.xm-field'); l.classList.add(r ? 'ok' : 'bad'); inp(i).readOnly = true; const ex = $('.xm-ex', l); ex.innerHTML = r ? '✅' : `❌ ${esc(f.a)}`; ex.classList.remove('hidden'); }); },
      };
    },
  };

  const wc = (s) => (String(s).trim().match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) || []).length;
  R.write = {
    html(t, p) {
      const saved = S().texts[t.id] || '';
      return `<div class="xm-task-card"><div>${paras(t.task)}</div>
          <ul class="xm-points">${t.points.map((pt, i) => `<li data-i="${i}"><span class="xm-pmark">${i + 1}</span><span><b>${esc(pt)}</b>${t.pointsEn ? `<small>${esc(t.pointsEn[i])}</small>` : ''}</span></li>`).join('')}</ul>
          <details class="xm-en"><summary>🇬🇧 Task in English</summary>${paras(t.taskEn)}</details></div>
        <div class="xm-write"><textarea class="txt-in xm-ta" rows="9" placeholder="Schreib hier … (write here)" spellcheck="false" data-p="${attr(p)}">${esc(saved)}</textarea>
          <div class="umlauts xm-uml">${['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü', '„', '“'].map((c) => `<button type="button" class="btn tiny ghost" data-c="${c}">${c}</button>`).join('')}</div>
          <div class="xm-wc"><span class="xm-wcn">0</span> / ≈ ${t.count} words <span class="xm-wcbar"><i></i></span></div></div>
        ${t.redemittel ? `<details class="xm-more"><summary>💬 Useful phrases – tap ＋ to put one into your text (${t.redemittel.length})</summary><div class="xm-phrows">${t.redemittel.map(([de, en]) => `<div class="xm-phrow"><button class="say-btn sm" type="button" data-say="${attr(de)}" aria-label="Listen">🔊</button><span><b>${esc(de)}</b><small>${esc(en)}</small></span><button class="btn tiny ghost xm-ins" type="button" data-t="${attr(de.replace(/…/g, '').replace(/\s+$/, '') + ' ')}" title="Insert">＋</button></div>`).join('')}</div></details>` : ''}
        ${t.check ? `<details class="xm-more"><summary>✅ Check your text</summary><ul class="xm-checklist">${t.check.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></details>` : ''}
        <div class="xm-coach"></div>
        <div class="xm-model hidden"><h4>⭐ Model answer</h4><div class="xm-model-de">${paras(t.model)}</div><button class="btn small ghost" type="button" data-say="${attr(t.model.replace(/\n/g, ' '))}">🔊 Listen</button><details class="xm-en"><summary>🇬🇧 English</summary>${paras(t.modelEn)}</details></div>`;
    },
    wire(root, t) {
      const ta = $('.xm-ta', root), n = $('.xm-wcn', root), bar = $('.xm-wcbar i', root);
      const upd = () => { const c = wc(ta.value); n.textContent = c; bar.style.width = Math.min(100, (c / t.count) * 100) + '%'; bar.parentElement.classList.toggle('full', c >= t.count * 0.85); };
      ta.oninput = () => { upd(); S().texts[t.id] = ta.value; clearTimeout(ta._s); ta._s = setTimeout(() => Store.save(), 600); };
      upd();
      const insert = (txt) => {
        const s0 = ta.selectionStart, e0 = ta.selectionEnd, before = ta.value.slice(0, s0);
        const pre = before && !/[\s\n]$/.test(before) ? ' ' : '';
        ta.value = before + pre + txt + ta.value.slice(e0);
        ta.focus(); ta.selectionStart = ta.selectionEnd = s0 + pre.length + txt.length;
        ta.dispatchEvent(new Event('input'));
      };
      const uml = $('.xm-uml', root);
      if (uml) uml.onclick = (e) => { const b = e.target.closest('[data-c]'); if (!b) return; const s0 = ta.selectionStart; ta.value = ta.value.slice(0, s0) + b.dataset.c + ta.value.slice(ta.selectionEnd); ta.focus(); ta.selectionStart = ta.selectionEnd = s0 + 1; ta.dispatchEvent(new Event('input')); };
      $$('.xm-ins', root).forEach((b) => (b.onclick = () => { insert(b.dataset.t); b.classList.add('done'); GL.sfx('pop'); }));
      let last = null;
      const coach = () => (last = GL.Checker ? GL.Checker.analyze(ta.value, { level: t.level, points: t.points, count: t.count, task: t.task, letter: true, formal: /Sehr geehrte|Sie\b/.test(t.task) && !/Liebe|Lieber|Freund/.test(t.task) }) : null);
      return {
        grade() {
          const r = coach();
          if (!r) { const enough = wc(ta.value) >= t.count * 0.85 ? 1 : 0; return { score: enough, max: 1, auto: false, empty: wc(ta.value) < 5 }; }
          return { score: r.score, max: 100, auto: false, coach: true, empty: wc(ta.value) < 5 };
        },
        reveal() {
          $('.xm-model', root).classList.remove('hidden');
          const r = last || coach(); if (!r || wc(ta.value) < 5) return;
          (r.coverage || []).forEach((c, i) => { const li = $(`.xm-points li[data-i="${i}"]`, root); if (li) { li.classList.add(c.done ? 'ok' : 'no'); $('.xm-pmark', li).textContent = c.done ? '✔' : '✘'; } });
          const box = $('.xm-coach', root);
          box.innerHTML = `<div class="card xm-qc"><div class="row"><div class="wr-ring ${r.score >= 85 ? '' : r.score >= 60 ? 'mid' : 'low'}" style="--p:${r.score}"><b>${r.score}</b><small>/100</small></div><div style="flex:1;min-width:200px"><span class="ai-badge ck-badge-off">✅ Writing coach</span> <span class="level ${r.level}">≈ ${r.level}</span><p style="margin:.4em 0 0">${esc(r.summary)}</p></div></div>
            ${GL.Checker.criteriaHTML(r)}
            ${r.mistakes.length ? `<div class="wr-pane">${GL.Writing.markedHTML(ta.value, r.mistakes)}</div><ol class="wr-mlist">${r.mistakes.map((m) => `<li><b>${esc(m.rule)}</b>: <span class="m-wrong">${esc(m.wrong)}</span>${m.right ? ` → <span class="m-right">${esc(m.right)}</span>` : ''}<br><small class="muted">${m.explanation}</small></li>`).join('')}</ol>
              <details class="xm-more"><summary>✅ Your text, corrected</summary><div class="ck-diff">${GL.Writing.diffHTML(ta.value, r.corrected)}</div><div class="row" style="margin-top:8px"><button class="btn tiny ghost" type="button" data-say="${attr(r.corrected)}">🔊 Listen</button><button class="btn tiny ghost xm-usecorr" type="button">Use the corrected text</button></div></details>` : '<p>✅ No typical mistakes found. Compare your text with the model answer below.</p>'}
            ${r.tips.length ? `<h4>🎯 To get more points</h4><ul>${r.tips.map((x) => `<li>${x}</li>`).join('')}</ul>` : ''}
            <p class="muted" style="margin-bottom:0">The coach checks grammar rules and the task points automatically – an examiner also looks at meaning and style.</p></div>`;
          const use = $('.xm-usecorr', box); if (use) use.onclick = () => { ta.value = r.corrected; ta.dispatchEvent(new Event('input')); toast('Corrected text loaded ✍️'); };
          if (GL.Game) GL.Game.count('write', wc(ta.value));
        },
      };
    },
  };

  R.speak = {
    html(t) {
      return `<div class="xm-task-card"><div>${paras(t.task)}</div><details class="xm-en"><summary>🇬🇧 Task in English</summary>${paras(t.taskEn)}</details></div>
        ${t.cards && t.cards.length ? `<div class="xm-cards">${t.cards.map((c, i) => `<button class="xm-card" type="button" style="animation-delay:${i * 0.06}s"><span class="xm-card-in"><span class="xm-card-f">${esc(c.t).replace(/\n/g, '<br>')}</span><span class="xm-card-b">${esc(c.en || '')}</span></span></button>`).join('')}</div><p class="muted" style="margin-top:4px">Tap a card to see it in English.</p>` : ''}
        <div class="xm-timer-row"><button class="btn small ghost xm-prep" type="button">⏱️ Prepare: 1 minute</button><span class="xm-tm"></span></div>
        <div class="card xm-modelbox"><div class="row"><h4 style="margin:0">⭐ Model answer – listen and repeat</h4><span class="spacer"></span><button class="btn small green xm-playall" type="button">▶ Play all</button></div>
          <div class="xm-lines">${(t.model || []).map(([de, en], i) => `<div class="jp-row xm-line" style="animation-delay:${Math.min(i, 12) * 0.03}s"><button class="say-btn" type="button" data-say="${attr(de)}" aria-label="Listen">🔊</button><div class="jp-txt"><b>${esc(de)}</b><small>${esc(en)}</small></div><button class="btn tiny ghost jp-mic" type="button" data-t="${attr(de)}" title="Say it">🎤</button><div class="jp-att"></div></div>`).join('')}</div></div>
        ${t.redemittel ? `<details class="xm-more" open><summary>💬 Useful phrases</summary><div class="xm-phr">${t.redemittel.map(([de, en]) => `<button class="xm-g" type="button" data-say="${attr(de)}"><b>${esc(de)}</b><small>${esc(en)}</small></button>`).join('')}</div></details>` : ''}
        ${t.check ? `<div class="card"><h4 style="margin-top:0">✅ Did you …</h4><ul class="xm-points">${t.check.map((c, i) => `<li><label><input type="checkbox" class="xm-pt" data-i="${i}"> <span>${esc(c)}</span></label></li>`).join('')}</ul></div>` : ''}`;
    },
    wire(root, t) {
      $$('.xm-card', root).forEach((c) => (c.onclick = () => c.classList.toggle('flip')));
      $$('.jp-mic', root).forEach((b) => (b.onclick = () => {
        const box = b.parentElement.querySelector('.jp-att');
        if (box.innerHTML) { box.innerHTML = ''; return; }
        $$('.jp-att', root).forEach((x) => { if (x !== box) x.innerHTML = ''; });
        GL.Speak.attempt(box, { targets: [b.dataset.t], label: 'Say it in German:', pass: 70 });
      }));
      const all = $('.xm-playall', root);
      all.onclick = async () => {
        if (all.classList.contains('on')) { audioTok++; Speech.stop(); all.classList.remove('on'); all.textContent = '▶ Play all'; return; }
        all.classList.add('on'); all.textContent = '⏹ Stop';
        const rows = $$('.xm-line', root); const my = ++audioTok;
        for (let i = 0; i < rows.length && my === audioTok; i++) {
          rows.forEach((r) => r.classList.remove('now')); rows[i].classList.add('now');
          await Speech.speak(t.model[i][0]);
        }
        rows.forEach((r) => r.classList.remove('now')); all.classList.remove('on'); all.textContent = '▶ Play all';
      };
      const prep = $('.xm-prep', root), tm = $('.xm-tm', root);
      prep.onclick = () => countdown(60, tm, () => { tm.textContent = '🗣️ Now speak! (1–2 minutes)'; GL.sfx('chime'); });
      return {
        grade() { const c = $$('.xm-pt', root); return { score: c.filter((x) => x.checked).length, max: c.length || 1, auto: false }; },
        reveal() {},
      };
    },
  };

  function countdown(sec, el, done) {
    clearInterval(el._t);
    const end = Date.now() + sec * 1000;
    const tick = () => {
      if (!document.body.contains(el)) { clearInterval(el._t); return; }
      const s = Math.max(0, Math.round((end - Date.now()) / 1000));
      el.textContent = `⏱️ ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
      el.classList.toggle('low', s <= 60 && sec > 120);
      if (s <= 0) { clearInterval(el._t); done && done(); }
    };
    tick(); el._t = setInterval(tick, 1000);
  }

  function taskHead(t, n) {
    const m = MOD[t.module] || ['🎯', t.module, ''];
    return `<div class="xm-thead"><span class="xm-tico">${m[0]}</span><div><div class="xm-tags">${lvBadge(t.level)}<span class="xm-tag">${esc(examName(t))}</span><span class="xm-tag">${esc(m[1])} · ${esc(m[2])}</span>${t.minutes ? `<span class="xm-tag">⏱️ ${t.minutes} min</span>` : ''}</div>
      <h${n || 1} class="xm-ttl">${esc(t.title)}</h${n || 1}>${t.en ? `<p class="muted" style="margin:.2em 0 0">${esc(t.en)}</p>` : ''}</div></div>
      <div class="xm-instr"><b>${esc(t.instr)}</b>${t.instrEn ? `<small>${esc(t.instrEn)}</small>` : ''}</div>`;
  }

  /* ---------- #/exam/task/<id> ---------- */
  function viewTask(id) {
    const t = task(id);
    if (!t) return { html: `<div class="card"><h2>Task not found</h2><p class="muted">${esc(id)}</p><a class="btn" href="#/exam">🎓 Exam prep</a></div>` };
    const r = R[t.kind], p = 't_';
    const auto = ['mc', 'match', 'cloze', 'form'].includes(t.kind);
    const sib = Object.values(E().tasks).filter((x) => !/^mock-/.test(x.id) && x.level === t.level && x.exam === t.exam);
    const at = sib.findIndex((x) => x.id === t.id), next = /^mock-/.test(t.id) ? null : sib[at + 1];
    const prev = result(id);
    return {
      html: `<p class="xm-crumbs"><a href="#/exam">🎓 Exam prep</a> › <a href="#/exam/tasks#${t.level}">Practice ${t.level}</a></p>
        <div class="card xm-task">${taskHead(t)}
          ${t.tip ? `<div class="xm-tip">💡 ${esc(t.tip)}</div>` : ''}
          ${glossHTML(t)}
          <div class="xm-body">${r.html(t, p)}</div>
          <div class="xm-actions">${auto ? '<button class="btn green big xm-check" type="button">✅ Check my answers</button>' : t.kind === 'write' ? '<button class="btn green big xm-check" type="button">✅ Done – show the model answer</button>' : '<button class="btn green big xm-check" type="button">✅ I practised this</button>'}
            ${prev ? `<span class="muted">Last time: ${prev.last != null ? prev.last + '%' : 'done'}${prev.best != null ? ` · best ${prev.best}%` : ''}</span>` : ''}</div>
          <div class="xm-res"></div>
        </div>
        <div class="row" style="justify-content:space-between"><a class="btn ghost" href="#/exam/format/${t.level}">ℹ️ ${t.level} exam format</a>${next ? `<a class="btn ghost" href="#/exam/task/${next.id}">Next: ${esc(next.title)} →</a>` : ''}</div>`,
      mount() {
        const root = $('.xm-task');
        const api = r.wire(root, t, p);
        const btn = $('.xm-check', root), out = $('.xm-res', root);
        btn.onclick = () => {
          const g = api.grade();
          if (t.kind === 'write' && g.empty) { toast('Write your text first (or at least a few sentences) ✍️'); $('.xm-ta', root).focus(); return; }
          api.reveal();
          const pct = saveResult(id, g.score, g.max, t.kind === 'write' ? { words: wc($('.xm-ta', root).value) } : null);
          btn.disabled = true;
          if (auto) {
            const pass = pct >= 60;
            out.innerHTML = `<div class="xm-score ${pctCls(pct)}"><div class="xm-ring" style="--p:${pct}"><b>${g.score}/${g.max}</b></div><div><h3 style="margin:0">${pct >= 90 ? 'Ausgezeichnet! 🌟' : pct >= 75 ? 'Sehr gut! 👏' : pass ? 'Bestanden – passed! 👍' : 'Noch nicht – not yet 💪'}</h3><p class="muted" style="margin:.2em 0 .6em">${pct}% · you need 60% to pass. ${pass ? 'Read the explanations of your mistakes, then try the next task.' : 'Read every explanation and the transcript, then try again tomorrow.'}</p>
              <div class="row"><button class="btn small xm-again" type="button">↻ Try again</button>${next ? `<a class="btn small green" href="#/exam/task/${next.id}">Next task →</a>` : ''}</div></div></div>`;
            GL.sfx(pass ? 'done' : 'pop'); if (pct >= 90) GL.confetti();
          } else {
            out.innerHTML = `<div class="xm-score ${t.kind === 'write' && g.coach ? pctCls(pct) : 'hi'}">${t.kind === 'write' && g.coach ? `<div class="xm-ring" style="--p:${pct}"><b>${pct}</b></div>` : `<span class="xm-big">${t.kind === 'write' ? '📝' : '🗣️'}</span>`}<div><h3 style="margin:0">${t.kind === 'write' && g.coach ? `Coach score: ${pct}/100 ${pct >= 60 ? '👍' : '💪'}` : 'Gut gemacht! Saved.'}</h3><p class="muted" style="margin:.2em 0 .6em">${t.kind === 'write' ? 'Read the coach’s notes above, fix your text and check again. Then compare with the model answer and copy two good phrases into your notebook.' : 'Speak the model 3 times, then without looking. Record yourself and listen back.'}</p><div class="row"><button class="btn small xm-again" type="button">↻ Again</button>${next ? `<a class="btn small green" href="#/exam/task/${next.id}">Next task →</a>` : ''}</div></div></div>`;
            GL.sfx('done');
          }
          out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          const ag = $('.xm-again', out); if (ag) ag.onclick = () => GL.render();
        };
      },
    };
  }

  /* ---------- mock exams ---------- */
  const MOCKS = {
    A1: { title: 'Start Deutsch 1 (A1)', exam: 'Goethe & telc', parts: [
      { k: 'hoeren', name: 'Hören', min: 20, tasks: ['mock-a1-hoeren-1', 'mock-a1-hoeren-2', 'mock-a1-hoeren-3'] },
      { k: 'lesen', name: 'Lesen', min: 25, tasks: ['mock-a1-lesen-1', 'mock-a1-lesen-2', 'mock-a1-lesen-3'] },
      { k: 'schreiben', name: 'Schreiben', min: 20, tasks: ['mock-a1-schreiben-1', 'mock-a1-schreiben-2'] }], speak: ['a1-sprechen-1', 'a1-sprechen-2', 'a1-sprechen-3'] },
    A2: { title: 'Goethe-Zertifikat A2', exam: 'Goethe', parts: [
      { k: 'lesen', name: 'Lesen', min: 30, tasks: ['mock-a2-lesen-1', 'mock-a2-lesen-2', 'mock-a2-lesen-3', 'mock-a2-lesen-4'] },
      { k: 'hoeren', name: 'Hören', min: 30, tasks: ['mock-a2-hoeren-1', 'mock-a2-hoeren-2', 'mock-a2-hoeren-3', 'mock-a2-hoeren-4'] },
      { k: 'schreiben', name: 'Schreiben', min: 30, tasks: ['mock-a2-schreiben-1', 'mock-a2-schreiben-2'] }], speak: ['a2-sprechen-1', 'a2-sprechen-2', 'a2-sprechen-3'] },
    B1: { title: 'Goethe-Zertifikat B1', exam: 'Goethe', parts: [
      { k: 'lesen', name: 'Lesen', min: 65, tasks: ['mock-b1-lesen-1', 'mock-b1-lesen-2', 'mock-b1-lesen-3', 'mock-b1-lesen-4', 'mock-b1-lesen-5'] },
      { k: 'hoeren', name: 'Hören', min: 40, tasks: ['mock-b1-hoeren-1', 'mock-b1-hoeren-2', 'mock-b1-hoeren-3', 'mock-b1-hoeren-4'] },
      { k: 'schreiben', name: 'Schreiben', min: 60, tasks: ['mock-b1-schreiben-1', 'mock-b1-schreiben-2', 'mock-b1-schreiben-3'] }], speak: ['b1-sprechen-1', 'b1-sprechen-2', 'b1-sprechen-3'] },
    'telc-B1': { title: 'telc Deutsch B1', exam: 'telc', parts: [
      { k: 'lesen', name: 'Leseverstehen & Sprachbausteine', min: 90, tasks: ['mock-telc-lesen-1', 'mock-telc-lesen-2', 'mock-telc-lesen-3', 'mock-telc-sprachbausteine-1', 'mock-telc-sprachbausteine-2'] },
      { k: 'hoeren', name: 'Hörverstehen', min: 30, tasks: ['mock-telc-hoeren-1', 'mock-telc-hoeren-2', 'mock-telc-hoeren-3'] },
      { k: 'schreiben', name: 'Schriftlicher Ausdruck', min: 30, tasks: ['mock-telc-schreiben'] }], speak: ['telc-b1-sprechen-2'] },
  };
  const mockState = (lv) => (S().mocks[lv] = S().mocks[lv] || { parts: {} });
  function finalize(lv) {
    const m = mockState(lv), M = MOCKS[lv];
    const got = M.parts.map((p) => m.parts[p.k]).filter((x) => x != null);
    if (got.length === M.parts.length) { m.final = Math.round(got.reduce((s, x) => s + x, 0) / got.length); m.at = Date.now(); m.history = (m.history || []).concat([{ at: m.at, final: m.final, parts: Object.assign({}, m.parts) }]).slice(-10); }
    Store.save();
  }

  function viewMock(lv, part) {
    const M = MOCKS[lv];
    if (!M) return viewOverview();
    const m = mockState(lv);
    if (part) {
      const P = M.parts.find((x) => x.k === part);
      if (!P) return viewMock(lv);
      const ts = P.tasks.map(task).filter(Boolean);
      return {
        html: `<p class="xm-crumbs"><a href="#/exam">🎓 Exam prep</a> › <a href="#/exam/mock/${lv}">Mock exam ${esc(lv)}</a></p>
          <div class="xm-mockbar"><b>🏁 ${esc(M.title)} · ${esc(P.name)}</b><span class="spacer"></span><span class="xm-clock">⏱️ ${P.min}:00</span><button class="btn small green xm-submit" type="button">Submit</button></div>
          <div class="xm-mock-intro card"><p style="margin:0">⏱️ <b>${P.min} minutes</b>, like in the real exam. ${P.k === 'hoeren' ? 'Listening texts can only be played as often as in the exam. ' : ''}${P.k === 'schreiben' ? 'Your texts are scored by the writing coach when you submit (task points, grammar, vocabulary, structures). ' : ''}When the time is up, your answers are submitted automatically.</p>${ts.length < P.tasks.length ? '<p class="warn">Some parts of this mock are still missing.</p>' : ''}</div>
          ${ts.map((t, i) => `<div class="card xm-task xm-mt" data-t="${attr(t.id)}">${taskHead(t, 2)}${glossHTML(t)}<div class="xm-body">${R[t.kind].html(t, 'm' + i + '_')}</div></div>`).join('')}
          <p style="text-align:center"><button class="btn green big xm-submit2" type="button">✅ Submit ${esc(P.name)}</button></p><div class="xm-res"></div>`,
        mount() {
          const apis = ts.map((t, i) => R[t.kind].wire($(`.xm-mt[data-t="${t.id}"]`), t, 'm' + i + '_'));
          let sent = false;
          const submit = () => {
            if (sent) return; sent = true;
            let sc = 0, mx = 0, self = false;
            const rows = ts.map((t, i) => { const g = apis[i].grade(); apis[i].reveal(); if (!g.auto) self = true; sc += g.score; mx += g.max; saveResult(t.id, g.score, g.max); return [t, g]; });
            const pct = mx ? Math.round((sc / mx) * 100) : 0;
            m.parts[P.k] = pct; finalize(lv);
            $$('.xm-submit, .xm-submit2').forEach((b) => (b.disabled = true));
            clearInterval($('.xm-clock')._t);
            const out = $('.xm-res');
            out.innerHTML = `<div class="card xm-score ${pctCls(pct)}"><div class="xm-ring" style="--p:${pct}"><b>${pct}%</b></div><div><h3 style="margin:0">${esc(P.name)}: ${pct >= 60 ? 'bestanden ✅' : 'nicht bestanden ❌'}</h3>
              <ul class="xm-partlist">${rows.map(([t, g]) => `<li>${esc(t.title)}: <b>${g.score}/${g.max}</b>${g.auto ? '' : g.coach ? ' <small>(writing coach)</small>' : ' <small>(self-check)</small>'}</li>`).join('')}</ul>
              <p class="muted">${self ? 'Writing is scored by the offline writing coach (grammar rules + task points) – a real examiner also judges meaning and style. ' : ''}Scroll up: every answer now shows an explanation${P.k === 'hoeren' ? ' and the transcript' : ''}.</p>
              <div class="row"><a class="btn small green" href="#/exam/mock/${lv}">Back to the mock overview</a></div></div></div>`;
            GL.sfx(pct >= 60 ? 'done' : 'pop'); if (pct >= 80) GL.confetti();
            out.scrollIntoView({ behavior: 'smooth' });
          };
          $$('.xm-submit, .xm-submit2').forEach((b) => (b.onclick = () => { if (confirm('Submit this part now?')) submit(); }));
          countdown(P.min * 60, $('.xm-clock'), () => { toast('⏱️ Time is up – submitted.'); submit(); });
        },
      };
    }
    const doneParts = M.parts.filter((p) => m.parts[p.k] != null).length;
    return {
      html: `<p class="xm-crumbs"><a href="#/exam">🎓 Exam prep</a> › Mock exam</p>
        <section class="xm-hero xm-mockhero" style="--lv:${LV[lv.replace('telc-', '')]}"><div><span class="xm-pill">🏁 MOCK EXAM · ${esc(M.exam)}</span><h1>${esc(M.title)}</h1>
          <p>A complete practice exam with new texts in the official format. Do it like the real exam: quiet room, no dictionary, keep to the time. You pass a part with <b>60%</b>.</p>
          ${m.final != null ? `<p class="xm-final">Your result: <b>${m.final}%</b> ${m.final >= 60 ? '– bestanden! 🎉' : '– keep training 💪'}</p>` : `<p>${doneParts} of ${M.parts.length} parts done.</p>`}</div><div class="xm-trophy ${m.final >= 60 ? 'won' : ''}">🏆</div></section>
        <div class="xm-parts">${M.parts.map((p, i) => { const s = m.parts[p.k]; return `<a class="card xm-part" href="#/exam/mock/${lv}/${p.k}" style="animation-delay:${i * 0.08}s"><span class="xm-pico">${MOD[p.k] ? MOD[p.k][0] : '🎯'}</span><div><b>${esc(p.name)}</b><small>⏱️ ${p.min} min · ${p.tasks.length} part${p.tasks.length > 1 ? 's' : ''}</small></div>${s != null ? `<span class="xm-chip ${pctCls(s)}">${s}%</span>` : '<span class="btn small green">Start</span>'}</a>`; }).join('')}
          <div class="card xm-part xm-speakpart"><span class="xm-pico">🗣️</span><div><b>Sprechen</b><small>Practise with the speaking tasks (model answers, recording): ${M.speak.map((id) => task(id) ? `<a href="#/exam/task/${id}">${esc(task(id).title)}</a>` : '').join(' · ')}</small></div></div></div>
        ${(m.history || []).length > 1 ? `<div class="card"><h3 style="margin-top:0">📈 Your mock results</h3><div class="xm-hist">${m.history.map((h) => `<span class="xm-chip ${pctCls(h.final)}">${new Date(h.at).toLocaleDateString()} · ${h.final}%</span>`).join('')}</div></div>` : ''}
        <div class="note">📄 After this mock, also do the free <b>official</b> model test (Modellsatz / Übungstest) – it is the best final check: ${(E().formats[lv.replace('telc-', '')].official || []).map(([l, u]) => `<a href="${attr(u)}" target="_blank" rel="noopener">${esc(l)}</a>`).join(' · ')}</div>
        ${m.final != null ? '<p style="text-align:center"><button class="btn ghost xm-reset" type="button">↻ Start the mock again</button></p>' : ''}`,
      mount() {
        const rs = $('.xm-reset'); if (rs) rs.onclick = () => { const h = m.history; S().mocks[lv] = { parts: {}, history: h }; Store.save(); GL.render(); };
      },
    };
  }

  /* ---------- #/exam overview with the animated roadmap ---------- */
  function roadmapHTML() {
    const cur = currentWeek();
    const phases = [['A1', 'Weeks 1–4', 'Foundations', '🌱'], ['A2', 'Weeks 5–8', 'Everyday German', '🚀'], ['B1', 'Weeks 9–12', 'Independent', '🎓']];
    return `<div class="xm-road">${phases.map(([lv, wks, sub, ico], pi) => {
      const ws = E().weeks.filter((w) => w.level === lv);
      return `<div class="xm-phase" style="--lv:${LV[lv]};animation-delay:${pi * 0.12}s"><div class="xm-ph-head"><span class="xm-ph-ico">${ico}</span><div><b>${lv} · ${sub}</b><small>${wks}</small></div></div>
        <div class="xm-nodes">${ws.map((w, i) => { const s = weekStats(w); const st = s.pct >= 100 ? 'done' : w.n === cur ? 'now' : w.n < cur ? 'part' : ''; return `<a class="xm-node ${st}" href="#/exam/week/${w.n}" style="animation-delay:${pi * 0.12 + i * 0.07 + 0.15}s"><span class="xm-dot" style="--p:${s.pct}"><b>${w.milestone ? '🏁' : w.n}</b></span><span class="xm-nt"><small>Week ${w.n}${w.n === cur ? ' · <em>you are here</em>' : ''}</small><b>${esc(w.title)}</b><span class="xm-nbar"><i style="width:${s.pct}%"></i></span></span></a>`; }).join('')}</div></div>`;
    }).join('')}</div>`;
  }

  function viewOverview() {
    const st = allStats(), pct = st.all ? Math.round((st.done / st.all) * 100) : 0;
    const res = Object.entries(S().results).filter(([id, r]) => task(id) && r.best != null);
    const avg = res.length ? Math.round(res.reduce((s, [, r]) => s + r.best, 0) / res.length) : null;
    const nd = nextDay();
    const x = S();
    const daysLeft = x.date ? Math.ceil((new Date(x.date) - new Date(GL.todayStr())) / 864e5) : null;
    return {
      html: `<section class="xm-hero">
          <div class="xm-hero-txt"><span class="xm-pill">🎓 EXAM PREP · telc & Goethe</span>
            <h1>From zero to <span class="xm-b1">B1</span> in 12 weeks</h1>
            <p>A day-by-day plan that takes you from your first “Hallo” to the B1 certificate – with every grammar topic, the exam vocabulary in English, practice tests in the <b>official exam format</b>, timed mock exams and printable notes.</p>
            <div class="xm-hero-prog"><div class="xm-ring big" style="--p:${pct}"><b>${pct}%</b><small>done</small></div>
              <div class="xm-hero-stats"><span><b>${st.done}</b> of ${st.all} plan steps</span><span><b>${res.length}</b> exam tasks practised${avg != null ? ` · Ø ${avg}%` : ''}</span><span>${daysLeft != null ? (daysLeft >= 0 ? `<b>${daysLeft}</b> days until your exam` : 'Exam date passed – set a new one') : '<a href="#" class="xm-setdate">📅 Set your exam date</a>'}</span></div></div>
            <div class="row">${nd ? `<a class="btn gold big" href="#/exam/week/${nd.wk.n}#d${nd.d}">▶ ${st.done ? 'Continue' : 'Start'}: Week ${nd.wk.n} · ${DAYS[nd.d][1]}</a>` : '<a class="btn gold big" href="#/exam/mock/B1">🏁 B1 mock exam</a>'}<a class="btn ghost xm-ghost" href="#/exam/tasks">🎯 Practice tests</a></div></div>
          <div class="xm-hero-art" aria-hidden="true"><div class="xm-cert"><span>ZERTIFIKAT</span><b>B1</b><i>Deutsch</i></div>${GL.charSVG('bruno', 'idle waving')}</div>
        </section>
        <div class="xm-date card hidden"><label>📅 My exam date: <input type="date" class="txt-in xm-datein" value="${attr(x.date || '')}"></label> <button class="btn small green xm-datesave" type="button">Save</button> <span class="muted">You can register at a Goethe-Institut or a telc test centre (VHS, language schools). Book 6–8 weeks ahead.</span></div>
        <h2>🗺️ Your 12-week roadmap</h2>
        <p class="muted" style="margin-top:-6px">About 2–3 hours a day, Monday to Saturday. Sunday: review and rest. Tick each step – lessons, scenes and exam tasks tick themselves when you finish them.</p>
        ${roadmapHTML()}
        <h2>🏛️ Goethe or telc?</h2>
        <div class="grid grid-2 xm-which">
          <div class="card"><h3 style="margin-top:0">Goethe-Zertifikat</h3><ul class="xm-ul"><li>Goethe-Institut – recognised worldwide</li><li><b>B1 in 4 modules</b> (Lesen, Hören, Schreiben, Sprechen) – each needs 60%. You can repeat single modules.</li><li>Good if you are abroad or want flexibility</li></ul></div>
          <div class="card"><h3 style="margin-top:0">telc Deutsch</h3><ul class="xm-ul"><li>telc gGmbH – very common in Germany (VHS, integration courses)</li><li><b>B1: written part + oral part</b>, 60% each; includes <b>Sprachbausteine</b> (grammar gaps)</li><li>Accepted for residence, citizenship & many jobs</li></ul></div>
        </div>
        <div class="xm-lvls">${['A1', 'A2', 'B1'].map((lv) => `<a class="card xm-lvcard" href="#/exam/format/${lv}" style="--lv:${LV[lv]}"><span class="xm-lvbig">${lv}</span><div><b>${esc(E().formats[lv].title)}</b><small>Format, timing, points & strategies</small></div></a>`).join('')}</div>
        <h2>🧰 Your toolbox</h2>
        <div class="xm-tools">
          <a class="card xm-tool" href="#/exam/tasks"><span>🎯</span><b>Practice tests</b><small>Every exam part A1–B1, with explanations & transcripts</small></a>
          <a class="card xm-tool" href="#/exam/mock/A1"><span>🏁</span><b>Mock exams</b><small>Timed A1, A2, B1 & telc B1 – score vs. 60%</small></a>
          <a class="card xm-tool" href="#/exam/words"><span>🔤</span><b>Exam words</b><small>18 topics with English, irregular verbs, verbs + prepositions</small></a>
          <a class="card xm-tool" href="#/exam/notes"><span>📝</span><b>Notes sheets</b><small>12 one-page grammar summaries – printable</small></a>
          <a class="card xm-tool" href="#/grammar"><span>📘</span><b>Grammar A–Z</b><small>Every grammar topic explained in English</small></a>
          <a class="card xm-tool" href="#/writing"><span>✍️</span><b>Writing studio</b><small>Write exam texts and get them corrected</small></a>
        </div>
        <div class="xm-mocks">${Object.entries(MOCKS).map(([lv, M]) => { const m = S().mocks[lv]; return `<a class="xm-mockchip" href="#/exam/mock/${lv}">🏁 ${esc(lv.replace('-', ' '))}${m && m.final != null ? ` <b class="${pctCls(m.final)}">${m.final}%</b>` : ''}</a>`; }).join('')}</div>
        <div class="note">ℹ️ Exam formats as described by Goethe-Institut and telc (2025/26). Formats can change – check <a href="https://www.goethe.de/de/spr/kup/prf.html" target="_blank" rel="noopener">goethe.de</a> and <a href="https://www.telc.net/" target="_blank" rel="noopener">telc.net</a> before your exam and do their free official model tests. All practice texts here are original.</div>`,
      mount() {
        const sd = $('.xm-setdate'), box = $('.xm-date');
        if (sd) sd.onclick = (e) => { e.preventDefault(); box.classList.remove('hidden'); $('.xm-datein').focus(); };
        $('.xm-datesave').onclick = () => { S().date = $('.xm-datein').value || ''; Store.save(); GL.render(); };
      },
    };
  }

  /* ---------- #/exam/week/N ---------- */
  const CHEER = ['Every expert was once a beginner. 🌱', 'Small steps every day beat one big step on Sunday. 👣', 'Mistakes mean you are learning. Keep going! 💪', 'Speak out loud – your mouth needs training too. 🗣️', 'Halfway to A2 – look how far you came! 🚀', 'Listening gets easier every day. Trust the process. 🎧', 'You can already do more than you think. ✨', 'A2 is in reach – now show it in the mock! 🏁', 'B1 starts here. You are ready for real German. 🎯', 'Stories, wishes, opinions – you can say it all now. 💬', 'The finish line is close. Train like it’s the exam. ⏱️', 'You did it. Sleep well, breathe, and show them! 🎓'];
  function viewWeek(n) {
    const wk = E().weeks[n - 1];
    if (!wk) return viewOverview();
    const s = weekStats(wk), cur = currentWeek();
    return {
      html: `<p class="xm-crumbs"><a href="#/exam">🎓 Exam prep</a> › Week ${n}</p>
        <section class="xm-whead" style="--lv:${LV[wk.level]}"><div class="xm-wn"><small>WEEK</small><b>${n}</b><small>of 12</small></div>
          <div><div class="xm-tags">${lvBadge(wk.level)}${wk.milestone ? `<span class="xm-tag gold">🏁 ${wk.milestone} milestone</span>` : ''}${n === cur ? '<span class="xm-tag">📍 you are here</span>' : ''}<span class="xm-tag">⏱️ ≈ ${Math.round(s.mins / 60)} h</span></div>
          <h1>${esc(wk.title)}</h1><p class="xm-cheer">${esc(CHEER[n - 1] || '')}</p>
          <div class="xm-wprog"><span class="xm-nbar"><i style="width:${s.pct}%"></i></span><small>${s.done} of ${s.all} steps · ${s.pct}%</small></div></div></section>
        <div class="grid grid-2">
          <div class="card"><h3 style="margin-top:0">🎯 By the end of this week you can …</h3><ul class="xm-can">${wk.can.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></div>
          <div class="card"><h3 style="margin-top:0">📚 This week’s materials</h3><div class="xm-mat">${wk.themes.map((th) => { const T = E().words && E().words.themes[th]; return `<a class="xm-g" href="#/exam/words/${th}"><b>${T ? T.icon + ' ' + esc(T.title) : '🔤 ' + esc(th)}</b><small>exam words</small></a>`; }).join('')}<a class="xm-g" href="#/exam/notes/${wk.notes}"><b>📝 Notes sheet ${wk.notes}</b><small>${esc((E().notes[wk.notes - 1] || {}).title || '')}</small></a><a class="xm-g" href="#/exam/format/${wk.level}"><b>ℹ️ ${wk.level} exam format</b><small>parts & strategies</small></a></div></div>
        </div>
        <div class="xm-days">${wk.days.map((day, d) => { const dn = day.filter((it, i) => isDone(n, d, i, it)).length; const mins = day.reduce((m, it) => m + (it[3] || 0), 0); return `<div class="card xm-day ${dn === day.length ? 'done' : ''}" id="d${d}" style="animation-delay:${d * 0.05}s"><div class="xm-dh"><span class="xm-dd">${DAYS[d][0]}</span><div><b>${DAYS[d][1]}</b><small>≈ ${mins >= 60 ? (mins / 60).toFixed(1).replace('.0', '') + ' h' : mins + ' min'} · ${dn}/${day.length}</small></div>${dn === day.length ? '<span class="xm-ok">✓</span>' : ''}</div>
            <ul class="xm-items">${day.map((it, i) => { const k = itemKey(n, d, i), on = isDone(n, d, i, it), au = autoDone(it); return `<li class="${on ? 'on' : ''}"><input type="checkbox" class="xm-cb" data-k="${k}" ${on ? 'checked' : ''} ${au ? 'disabled title="Done automatically"' : ''} aria-label="Done"><a href="${attr(itemHref(it))}"><span class="xm-ii">${ICON[it[0]] || '•'}</span><span>${esc(it[2])}${it[0] === 'task' ? ' ' + scoreChip(it[1]) : ''}</span><small>${it[3] ? it[3] + ' min' : ''}</small></a></li>`; }).join('')}</ul></div>`; }).join('')}
          <div class="card xm-day xm-sun"><div class="xm-dh"><span class="xm-dd">So</span><div><b>Sunday</b><small>review & rest</small></div></div><p>☕ 30–45 minutes: <a href="#/review/cards">flashcards</a>, <a href="#/review/mistakes">your mistakes</a> and one <a href="#/scenes">real-life scene</a> for fun. Then rest – your brain stores what you learned while you relax.</p></div></div>
        <div class="row" style="justify-content:space-between">${n > 1 ? `<a class="btn ghost" href="#/exam/week/${n - 1}">← Week ${n - 1}</a>` : '<a class="btn ghost" href="#/exam">← Roadmap</a>'}${n < 12 ? `<a class="btn ghost" href="#/exam/week/${n + 1}">Week ${n + 1} →</a>` : '<a class="btn ghost" href="#/exam/mock/B1">🏁 B1 mock</a>'}</div>`,
      mount() {
        $$('.xm-cb').forEach((cb) => (cb.onchange = () => {
          const before = weekStats(wk).pct;
          if (cb.checked) S().done[cb.dataset.k] = Date.now(); else delete S().done[cb.dataset.k];
          cb.closest('li').classList.toggle('on', cb.checked);
          Store.save();
          if (cb.checked) { Store.addXP(2); GL.sfx('pop'); }
          const s2 = weekStats(wk);
          $('.xm-wprog i').style.width = s2.pct + '%'; $('.xm-wprog small').textContent = `${s2.done} of ${s2.all} steps · ${s2.pct}%`;
          const day = cb.closest('.xm-day'), all = $$('.xm-cb', day), dn = all.filter((c) => c.checked).length;
          day.classList.toggle('done', dn === all.length);
          if (s2.pct === 100 && before < 100) { GL.confetti(); GL.sfx('done'); toast(`🎉 Week ${n} complete! ${n < 12 ? 'On to week ' + (n + 1) + '.' : 'You are ready for B1!'}`, 'ok'); }
        }));
        if (GL._anchor) { const el = document.getElementById(GL._anchor); if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80); }
      },
    };
  }

  /* ---------- #/exam/format/<lvl> ---------- */
  function partsHTML(x) {
    return `<p class="muted">${esc(x.total)}</p><div class="xm-fparts">${x.parts.map(([ic, name, time, desc], i) => `<div class="xm-fpart" style="animation-delay:${i * 0.06}s"><span class="xm-pico">${ic}</span><div><b>${esc(name)}</b>${time ? ` <span class="xm-tag">${esc(time)}</span>` : ''}<p>${esc(desc)}</p></div></div>`).join('')}</div><p class="xm-pass">✅ ${esc(x.pass)}</p>`;
  }
  function viewFormat(lv) {
    const f = E().formats[lv];
    if (!f) return viewOverview();
    const ts = Object.values(E().tasks || {}).filter((t) => t.level === lv && !/^mock-/.test(t.id));
    const by = (ex) => ts.filter((t) => t.exam === ex || t.exam === 'both');
    const list = (arr) => arr.map((t) => `<a class="xm-tl" href="#/exam/task/${t.id}"><span>${(MOD[t.module] || ['🎯'])[0]}</span><span>${esc(t.title)}</span>${scoreChip(t.id)}</a>`).join('');
    const mockLinks = lv === 'B1' ? '<a class="btn green" href="#/exam/mock/B1">🏁 Goethe B1 mock</a> <a class="btn green" href="#/exam/mock/telc-B1">🏁 telc B1 mock</a>' : `<a class="btn green" href="#/exam/mock/${lv}">🏁 ${lv} mock exam</a>`;
    return {
      html: `<p class="xm-crumbs"><a href="#/exam">🎓 Exam prep</a> › Format ${lv}</p>
        <section class="xm-whead" style="--lv:${f.color}"><div class="xm-wn"><b>${lv}</b></div><div><h1>${esc(f.title)}</h1><p class="muted">${esc(f.intro)}</p><div class="row">${mockLinks}</div></div></section>
        <div class="xm-tabs" role="tablist"><button class="xm-tabb on" data-tab="goethe" type="button">Goethe-Institut</button><button class="xm-tabb" data-tab="telc" type="button">telc</button></div>
        <div class="card xm-tabp" data-p="goethe"><h3 style="margin-top:0">${esc(f.goethe.name)}</h3>${partsHTML(f.goethe)}</div>
        <div class="card xm-tabp hidden" data-p="telc"><h3 style="margin-top:0">${esc(f.telc.name)}</h3>${partsHTML(f.telc)}</div>
        <h2>🧠 Strategies</h2><div class="xm-strats">${f.strategies.map(([h, t], i) => `<div class="card xm-strat" style="animation-delay:${i * 0.05}s"><b>${esc(h)}</b><p>${esc(t)}</p></div>`).join('')}</div>
        <h2>🎯 Practise every part</h2>
        <div class="grid grid-2">${lv === 'B1' ? `<div class="card"><h3 style="margin-top:0">Goethe B1</h3><div class="xm-tlist">${list(by('goethe'))}</div></div><div class="card"><h3 style="margin-top:0">telc B1</h3><div class="xm-tlist">${list(by('telc'))}</div></div>` : `<div class="card" style="grid-column:1/-1"><div class="xm-tlist cols">${list(ts)}</div></div>`}</div>
        <div class="note">📄 Official free practice material: ${f.official.map(([l, u]) => `<a href="${attr(u)}" target="_blank" rel="noopener">${esc(l)}</a>`).join(' · ')}</div>`,
      mount() {
        $$('.xm-tabb').forEach((b) => (b.onclick = () => { $$('.xm-tabb').forEach((x) => x.classList.toggle('on', x === b)); $$('.xm-tabp').forEach((p) => p.classList.toggle('hidden', p.dataset.p !== b.dataset.tab)); }));
      },
    };
  }

  /* ---------- #/exam/tasks ---------- */
  function viewTasks() {
    const all = Object.values(E().tasks || {}).filter((t) => !/^mock-/.test(t.id));
    const groups = [['A1', 'both', 'A1 · Start Deutsch 1 (Goethe & telc)'], ['A2', 'goethe', 'A2 · Goethe-Zertifikat A2'], ['B1', 'goethe', 'B1 · Goethe-Zertifikat B1'], ['B1', 'telc', 'B1 · telc Deutsch B1']];
    return {
      html: `<p class="xm-crumbs"><a href="#/exam">🎓 Exam prep</a> › Practice tests</p>
        <h1>🎯 Practice tests</h1><p class="muted">Every part of the exams in the official format – original texts, explanations in English, transcripts for listening. Listening texts are read by the browser’s voice: use headphones and Chrome/Edge/Safari for the best voices.</p>
        ${groups.map(([lv, ex, ttl]) => { const ts = all.filter((t) => t.level === lv && t.exam === ex); if (!ts.length) return ''; const done = ts.filter((t) => result(t.id)).length; return `<section class="xm-group" id="${lv}${ex === 'telc' ? 'telc' : ''}" style="--lv:${LV[lv]}"><div class="xm-gh"><h2>${esc(ttl)}</h2><span class="muted">${done}/${ts.length} done</span></div>
          <div class="xm-mods">${Object.keys(MOD).map((mk) => { const mt = ts.filter((t) => t.module === mk); if (!mt.length) return ''; return `<div class="card xm-mod"><h3>${MOD[mk][0]} ${MOD[mk][1]} <small>${MOD[mk][2]}</small></h3>${mt.map((t) => `<a class="xm-tl" href="#/exam/task/${t.id}"><span>${t.teil ? 'Teil ' + t.teil : '•'}</span><span>${esc(t.title.replace(/^[^–]*–\s*/, ''))}</span>${scoreChip(t.id)}</a>`).join('')}</div>`; }).join('')}</div></section>`; }).join('')}
        <h2>🏁 Mock exams</h2><div class="xm-mocks">${Object.keys(MOCKS).map((lv) => `<a class="xm-mockchip" href="#/exam/mock/${lv}">🏁 ${esc(MOCKS[lv].title)}</a>`).join('')}</div>`,
      mount() { if (GL._anchor) { const el = document.getElementById(GL._anchor); if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60); } },
    };
  }

  /* ---------- #/exam/words ---------- */
  const artCls = (w) => (/^der /.test(w) ? 'der' : /^die /.test(w) ? 'die' : /^das /.test(w) ? 'das' : '');
  function wordQuiz(box, list) {
    const pool = GL.shuffle(list.slice()).slice(0, 10);
    let i = 0, ok = 0;
    const next = () => {
      if (i >= pool.length) { box.innerHTML = `<div class="xm-score ${pctCls(ok * 10)}"><div class="xm-ring" style="--p:${Math.round((ok / pool.length) * 100)}"><b>${ok}/${pool.length}</b></div><div><h3 style="margin:0">${ok >= 8 ? 'Super! 🌟' : 'Keep practising 💪'}</h3><button class="btn small xm-qagain" type="button">↻ New quiz</button></div></div>`; $('.xm-qagain', box).onclick = () => wordQuiz(box, list); if (ok >= 8) GL.sfx('done'); Store.addXP(ok); return; }
      const w = pool[i], wrong = GL.shuffle(list.filter((x) => x !== w)).slice(0, 3), opts = GL.shuffle([w, ...wrong]);
      box.innerHTML = `<div class="xm-quiz"><small>${i + 1} / ${pool.length}</small><h3>${esc(w[2])}</h3><div class="xm-qopts">${opts.map((o, j) => `<button class="btn ghost xm-qo" data-j="${j}" type="button">${esc(o[0])}</button>`).join('')}</div></div>`;
      $$('.xm-qo', box).forEach((b) => (b.onclick = () => {
        const right = opts[+b.dataset.j] === w;
        if (right) ok++;
        $$('.xm-qo', box).forEach((x) => { x.disabled = true; if (opts[+x.dataset.j] === w) x.classList.add('right'); });
        if (!right) b.classList.add('wrong');
        GL.sfx(right ? 'ok' : 'bad'); Speech.speak(w[0]);
        setTimeout(() => { i++; next(); }, right ? 900 : 1800);
      }));
    };
    next();
  }
  function viewWords(sec) {
    const W = E().words;
    if (!W) return { html: '<div class="card"><h2>Exam words are loading…</h2></div>' };
    const tabs = [['', '🗂️ Topics'], ['verbs', '🔀 Irregular verbs'], ['prepverbs', '🔗 Verbs + prepositions'], ['connectors', '🧷 Connectors'], ['redemittel', '💬 Useful phrases']];
    const isTheme = sec && W.themes[sec];
    const head = `<p class="xm-crumbs"><a href="#/exam">🎓 Exam prep</a> › Exam words</p><h1>🔤 Exam words</h1>
      <div class="xm-tabs">${tabs.map(([k, l]) => `<a class="xm-tabb ${(sec || '') === k || (isTheme && k === '') ? 'on' : ''}" href="#/exam/words${k ? '/' + k : ''}">${l}</a>`).join('')}</div>`;
    let body = '', mount = null;
    if (isTheme) {
      const T = W.themes[sec];
      body = `<section class="xm-whead" style="--lv:${LV[T.level] || '#888'}"><div class="xm-wn"><b>${T.icon}</b></div><div><div class="xm-tags">${lvBadge(T.level)}<span class="xm-tag">${T.words.length} words</span></div><h2 style="margin:.2em 0">${esc(T.title)}</h2><p class="muted" style="margin:0">🔊 tap a word to hear it · nouns in colour: <span class="xm-der">der</span> · <span class="xm-die">die</span> · <span class="xm-das">das</span> · learn every noun WITH its article and plural.</p></div></section>
        <div class="row"><button class="btn green xm-quizbtn" type="button">🧩 Quiz me (10 words)</button><button class="btn ghost xm-hideen" type="button">🙈 Hide English</button></div><div class="xm-qbox"></div>
        <div class="xm-words">${T.words.map(([de, pl, en], i) => `<button class="xm-w ${artCls(de)}" type="button" data-say="${attr(de)}" style="animation-delay:${Math.min(i, 30) * 0.015}s"><b>${esc(de)}</b>${pl ? `<i>${esc(pl)}</i>` : ''}<small>${esc(en)}</small></button>`).join('')}</div>
        <p class="muted">Plural: <b>-n</b> die Lampe → die Lampe<b>n</b> · <b>¨-e</b> der Stuhl → die St<b>ü</b>hl<b>e</b> · <b>-</b> no change.</p>`;
      mount = () => {
        $('.xm-quizbtn').onclick = () => wordQuiz($('.xm-qbox'), T.words);
        $('.xm-hideen').onclick = (e) => { $('.xm-words').classList.toggle('noen'); e.target.textContent = $('.xm-words').classList.contains('noen') ? '👀 Show English' : '🙈 Hide English'; };
      };
    } else if (sec === 'verbs') {
      body = `<p class="muted">The irregular verbs you need for A2/B1 – present (er/sie/es), Präteritum, Perfekt. <b>ist</b> = Perfekt with sein (movement / change).</p><input class="txt-in xm-filter" type="search" placeholder="🔍 Search a verb (German or English)">
        <div class="xm-tblwrap"><table class="xm-tbl xm-vt"><tr><th>Infinitive</th><th>Present</th><th>Präteritum</th><th>Perfekt</th><th>English</th></tr>${W.verbs.map((v) => `<tr data-f="${attr((v.join(' ')).toLowerCase())}"><td><button class="say-btn sm" type="button" data-say="${attr(v[0] + ', ' + v[1] + ', ' + v[2] + ', ' + v[3])}">🔊</button> <b>${esc(v[0])}</b></td><td>${esc(v[1])}</td><td>${esc(v[2])}</td><td class="${/^ist /.test(v[3]) ? 'xm-ist' : ''}">${esc(v[3])}</td><td>${esc(v[4])}</td></tr>`).join('')}</table></div>`;
      mount = () => filterRows();
    } else if (sec === 'prepverbs') {
      body = `<p class="muted">Learn verb + preposition + case as ONE unit – they are tested in telc Sprachbausteine and needed in every B1 text.</p><input class="txt-in xm-filter" type="search" placeholder="🔍 Search">
        <div class="xm-pvs">${W.prepverbs.map(([v, p, c, de, en, mean]) => `<div class="card xm-pv" data-f="${attr((v + ' ' + p + ' ' + mean).toLowerCase())}"><div><b>${esc(v)} <span class="xm-prep">${esc(p)}</span></b> <span class="xm-case ${c === 'Akk' ? 'akk' : 'dat'}">+ ${esc(c)}</span><small>${esc(mean)}</small></div><p><button class="say-btn sm" type="button" data-say="${attr(de)}">🔊</button> ${esc(de)}<br><small>${esc(en)}</small></p></div>`).join('')}</div>`;
      mount = () => filterRows('.xm-pv');
    } else if (sec === 'connectors') {
      const g = [[0, 'Position 0 – word order does not change', 'und, aber, oder, denn, sondern …'], [1, 'Position 1 – the verb comes right after', 'deshalb, trotzdem, dann …'], ['end', 'Subordinate clause – the verb goes to the END', 'weil, dass, wenn, obwohl …']];
      body = g.map(([pos, ttl, sub]) => `<div class="card"><h3 style="margin-top:0">${esc(ttl)}</h3><p class="muted" style="margin-top:-6px">${esc(sub)}</p><div class="xm-cons">${W.connectors.filter((c) => c[1] === pos).map(([w, , en, de, deEn]) => `<div class="xm-con"><b>${esc(w)}</b><small>${esc(en)}</small><p><button class="say-btn sm" type="button" data-say="${attr(de)}">🔊</button> ${esc(de)}<br><small>${esc(deEn)}</small></p></div>`).join('')}</div></div>`).join('');
    } else if (sec === 'redemittel') {
      const grp = (arr) => arr.map((s) => `<details class="card xm-rm"><summary><b>${esc(s.title)}</b> <small>${s.list.length}</small></summary><div class="xm-phr">${s.list.map(([de, en]) => `<button class="xm-g" type="button" data-say="${attr(de)}"><b>${esc(de)}</b><small>${esc(en)}</small></button>`).join('')}</div></details>`).join('');
      body = `<div class="grid grid-2"><div><h2>✍️ For writing</h2>${grp(W.redemittel.write)}</div><div><h2>🗣️ For speaking</h2>${grp(W.redemittel.speak)}</div></div>`;
    } else {
      const lvls = ['A1', 'A2', 'B1'];
      body = lvls.map((lv) => `<h2>${lvBadge(lv)} ${lv} topics</h2><div class="xm-themes">${Object.entries(W.themes).filter(([, t]) => t.level === lv).map(([k, t], i) => `<a class="card xm-theme" href="#/exam/words/${k}" style="--lv:${LV[lv]};animation-delay:${i * 0.04}s"><span>${t.icon}</span><b>${esc(t.title)}</b><small>${t.words.length} words</small></a>`).join('')}</div>`).join('');
    }
    function filterRows(sel) {
      const inp = $('.xm-filter');
      inp.oninput = () => { const q = inp.value.trim().toLowerCase(); $$(sel || '.xm-vt tr[data-f]').forEach((r) => r.classList.toggle('hidden', !!q && !r.dataset.f.includes(q))); };
    }
    return { html: head + body, mount };
  }

  /* ---------- #/exam/notes ---------- */
  function viewNotes(n) {
    const notes = E().notes;
    return {
      html: `<p class="xm-crumbs no-print"><a href="#/exam">🎓 Exam prep</a> › Notes</p>
        <div class="row no-print"><h1 style="margin:0">📝 Notes sheets</h1><span class="spacer"></span><button class="btn ghost xm-print" type="button">🖨️ Print / save as PDF</button></div>
        <p class="muted no-print">One page per week – the grammar you need for the exam in short. Read them before you sleep and before the exam.</p>
        <div class="xm-ntoc no-print">${notes.map((x) => `<a href="#/exam/notes/${x.n}" class="${+n === x.n ? 'on' : ''}">${x.n}. ${esc(x.title)}</a>`).join('')}</div>
        <div class="xm-notes">${notes.map((x, i) => `<article class="card xm-note" id="note${x.n}" style="animation-delay:${Math.min(i, 6) * 0.05}s"><div class="xm-nh"><span>${x.n}</span><h2>${esc(x.title)}</h2><small>Week ${x.n}</small></div>${x.html}</article>`).join('')}</div>`,
      mount() {
        $('.xm-print').onclick = () => window.print();
        if (n) { const el = document.getElementById('note' + n); if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80); }
      },
    };
  }

  GL.viewExam = function (a, b, c) {
    if (!GL.exam) return { html: '<div class="card"><h2>Exam prep is loading…</h2></div>' };
    if (a === 'week') return viewWeek(+b || 1);
    if (a === 'format') return viewFormat(b || 'A1');
    if (a === 'task') return viewTask(b);
    if (a === 'tasks') return viewTasks();
    if (a === 'mock') return viewMock(b || 'A1', c);
    if (a === 'words') return viewWords(b);
    if (a === 'notes') return viewNotes(b);
    return viewOverview();
  };
  GL.Exam = { MOCKS, itemHref, ICON, autoDone, weekStats, label(a, b) {
    if (a === 'week') return `🎓 Exam prep · Week ${b}`;
    if (a === 'task') { const t = task(b); return t ? `🎓 ${t.level} · ${t.title}` : '🎓 Exam prep'; }
    if (a === 'mock') return `🎓 Mock exam ${b || ''}`;
    if (a === 'words') return '🎓 Exam words';
    if (a === 'notes') return '🎓 Exam notes';
    return '🎓 Exam prep';
  } };
})();
