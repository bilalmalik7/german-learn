/* LISTENING GYM (#/listen) – train your ears for real German:
   numbers, prices, times, dates, phone numbers and spelling (generated, endless), dictation with course sentences,
   everyday audio (station, voicemail, radio, doctor …) with questions, and real spoken German (haste, ne?, Moin …). */
(function () {
  'use strict';
  const { $, $$, esc, attr, Store, Speech, toast } = GL;
  const S = () => { const s = (Store.state.listen = Store.state.listen || {}); s.best = s.best || {}; s.clips = s.clips || {}; s.n = s.n || 0; s.ok = s.ok || 0; return s; };
  const LV = { A1: '#22b573', A2: '#3a86ff', B1: '#9b5de5' };
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const norm = (s) => String(s).toLowerCase().replace(/[„“"!?.,;:]/g, ' ').replace(/\s+/g, ' ').trim();

  /* ---------- German numbers ---------- */
  const ONES = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
  const TENS = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];
  function num(n, unit) {
    if (n < 20) return n === 1 && unit ? 'ein' : ONES[n];
    if (n < 100) { const o = n % 10, t = Math.floor(n / 10); return o ? (o === 1 ? 'ein' : ONES[o]) + 'und' + TENS[t] : TENS[t]; }
    if (n < 1000) { const h = Math.floor(n / 100), r = n % 100; return (h === 1 ? 'ein' : ONES[h]) + 'hundert' + (r ? num(r) : ''); }
    const th = Math.floor(n / 1000), r = n % 1000; return (th === 1 ? 'ein' : num(th, true)) + 'tausend' + (r ? num(r) : '');
  }
  const ORD = (n) => (n === 1 ? 'erste' : n === 3 ? 'dritte' : n === 7 ? 'siebte' : n === 8 ? 'achte' : n < 20 ? num(n) + 'te' : num(n) + 'ste');
  const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  const LETTERS = { a: 'a', b: 'be', c: 'ze', d: 'de', e: 'e', f: 'eff', g: 'ge', h: 'ha', i: 'i', j: 'jott', k: 'ka', l: 'ell', m: 'emm', n: 'enn', o: 'o', p: 'pe', q: 'ku', r: 'err', s: 'ess', t: 'te', u: 'u', v: 'fau', w: 'we', x: 'iks', y: 'üpsilon', z: 'zett', ä: 'ä', ö: 'ö', ü: 'ü', ß: 'eszett' };
  const NAMES = ['Kowalski', 'Sharma', 'Müller', 'Schmidt', 'Yilmaz', 'Khan', 'Becker', 'Weber', 'Fischer', 'Wagner', 'Hoffmann', 'Novak', 'Patel', 'Rahman', 'Schulz', 'Krüger', 'Lange', 'Wolf', 'Braun', 'Singh', 'Iqbal', 'Nowak', 'Petrov', 'Ahmed', 'Meier'];
  const MODES = {
    num: { ico: '🔢', title: 'Numbers', en: '1 – 1000', ph: 'e.g. 47', gen: () => { const n = Math.random() < 0.5 ? rnd(13, 99) : rnd(100, 999); return { say: num(n), a: [String(n)], show: String(n) }; } },
    price: { ico: '💶', title: 'Prices', en: 'Euro & Cent', ph: 'e.g. 3,49', gen: () => { const e = rnd(0, 49), c = pick([0, 5, 9, 19, 29, 49, 50, 79, 95, 99, rnd(1, 99)]); const say = e ? `${num(e, true)} Euro${c ? ' ' + num(c) : ''}` : `${num(c)} Cent`; const show = `${e},${String(c).padStart(2, '0')}`; return { say, a: [show, show.replace(',', '.'), e && !c ? String(e) : show, e ? '' : `0,${String(c).padStart(2, '0')}`].filter(Boolean), show: show + ' €' }; } },
    time: { ico: '🕒', title: 'Times', en: 'halb vier, Viertel nach …', ph: 'e.g. 3:30', gen: () => {
      if (Math.random() < 0.4) { const h = rnd(0, 23), m = pick([0, 5, 10, 15, 20, 30, 35, 40, 45, 50, 55]); const say = `${h === 1 ? 'ein' : num(h)} Uhr${m ? ' ' + num(m) : ''}`; const show = `${h}:${String(m).padStart(2, '0')}`; return { say, a: [show, `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`], show }; }
      const h = rnd(1, 12), m = pick([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]), nx = h % 12 + 1;
      const H = (x) => (x === 1 ? 'eins' : num(x));
      const say = ({ 0: `${H(h)} Uhr`.replace('eins Uhr', 'ein Uhr'), 5: `fünf nach ${H(h)}`, 10: `zehn nach ${H(h)}`, 15: `Viertel nach ${H(h)}`, 20: `zwanzig nach ${H(h)}`, 25: `fünf vor halb ${H(nx)}`, 30: `halb ${H(nx)}`, 35: `fünf nach halb ${H(nx)}`, 40: `zwanzig vor ${H(nx)}`, 45: `Viertel vor ${H(nx)}`, 50: `zehn vor ${H(nx)}`, 55: `fünf vor ${H(nx)}` })[m];
      const mm = String(m).padStart(2, '0');
      return { say, a: [`${h}:${mm}`, `${h + 12}:${mm}`, `${String(h).padStart(2, '0')}:${mm}`].concat(h === 12 ? [`0:${mm}`, `00:${mm}`] : []), show: `${h}:${mm} / ${h + 12 === 24 ? 0 : h + 12}:${mm}` };
    } },
    date: { ico: '📅', title: 'Dates', en: 'am dritten Mai', ph: 'e.g. 3.5.', gen: () => { const d = rnd(1, 31), mo = rnd(1, 12); const say = `der ${ORD(d)} ${MONTHS[mo - 1]}`; return { say, a: [`${d}.${mo}.`, `${d}.${mo}`, `${String(d).padStart(2, '0')}.${String(mo).padStart(2, '0')}.`, `${String(d).padStart(2, '0')}.${String(mo).padStart(2, '0')}`, `${d}. ${MONTHS[mo - 1].toLowerCase()}`], show: `${d}. ${MONTHS[mo - 1]} (${d}.${mo}.)` }; } },
    phone: { ico: '📞', title: 'Phone numbers', en: 'null eins sieben …', ph: 'digits', gen: () => { const d = '01' + pick(['5', '6', '7']) + Array.from({ length: rnd(7, 8) }, () => rnd(0, 9)).join(''); return { say: d.split('').map((x) => ONES[+x]).join(', '), a: [d], show: d, digits: true }; } },
    spell: { ico: '🔤', title: 'Spelling', en: 'Buchstabieren', ph: 'the name', gen: () => { const n = pick(NAMES); return { say: n.toLowerCase().split('').map((c) => LETTERS[c] || c).join(', '), a: [n.toLowerCase()], show: n }; } },
  };
  const okAns = (q, v) => { const x = String(v).replace(/\s+/g, ' ').trim().toLowerCase().replace(/€|euro/g, '').replace(/uhr/g, '').trim(); const cmp = (a) => String(a).toLowerCase(); return q.digits ? q.a.includes(x.replace(/\D/g, '')) : q.a.some((a) => cmp(a) === x || cmp(a).replace(/\.$/, '') === x.replace(/\.$/, '')); };

  const count = (ok) => { const s = S(); s.n++; if (ok) s.ok++; Store.save(); if (GL.Game) GL.Game.count('listen', 1); };
  function waveHTML() { return '<span class="ls-wave" aria-hidden="true">' + '<i></i>'.repeat(9) + '</span>'; }
  async function say(text, btn, opts = {}) {
    const box = btn && btn.closest('.ls-player'); box && box.classList.add('playing');
    await Speech.speak(text, opts); box && box.classList.remove('playing');
  }

  /* ---------- numbers trainer ---------- */
  function numbers(mode) {
    const M = MODES[mode];
    if (!M) {
      return `<div class="ls-modes">${Object.entries(MODES).map(([k, m], i) => `<a class="card ls-mode" href="#/listen/numbers/${k}" style="animation-delay:${i * 0.05}s"><span class="ls-mico">${m.ico}</span><b>${m.title}</b><small>${esc(m.en)}</small>${S().best[k] != null ? `<span class="ls-best">🏆 ${S().best[k]}/10</span>` : ''}</a>`).join('')}</div>
        <div class="note">💡 Numbers, prices, times and spelled names come up in every A1/A2 listening exam – and every day at the bakery, the doctor’s and on the phone. 10 a day and you will never miss them again.</div>`;
    }
    return `<div class="card ls-drill" id="lsDrill" data-mode="${mode}"><div class="row"><a href="#/listen/numbers">← All</a><span class="spacer"></span><b>${M.ico} ${M.title}</b><span class="spacer"></span><span class="ls-prog"><b id="lsI">1</b>/10 · ✅ <b id="lsOk">0</b></span></div>
      <div class="ls-player"><button class="btn big ls-play" type="button">🔊 Listen</button><button class="btn ghost ls-slow" type="button">🐢 Slowly</button>${waveHTML()}</div>
      <div class="ls-in"><input class="txt-in" id="lsAns" placeholder="${attr(M.ph)}" autocomplete="off" inputmode="${mode === 'spell' ? 'text' : 'decimal'}"><button class="btn green" id="lsCheck" type="button">Check</button></div>
      <div id="lsFb" class="ls-fb"></div></div>`;
  }
  function wireNumbers(mode) {
    const M = MODES[mode]; if (!M) return;
    let i = 0, ok = 0, q = null, answered = false;
    const inp = $('#lsAns'), fb = $('#lsFb');
    const next = () => {
      if (i >= 10) {
        const s = S(); const b = s.best[mode]; if (b == null || ok > b) s.best[mode] = ok; Store.save();
        $('#lsDrill').innerHTML = `<div class="ls-done"><div class="xm-ring" style="--p:${ok * 10}"><b>${ok}/10</b></div><h2>${ok >= 9 ? 'Ausgezeichnet! 🌟' : ok >= 7 ? 'Sehr gut! 👏' : 'Weiter üben! 💪'}</h2><p class="muted">Best: ${s.best[mode]}/10</p><div class="row" style="justify-content:center"><button class="btn green" id="lsAgain" type="button">🔁 10 more</button><a class="btn ghost" href="#/listen/numbers">Other drills</a></div></div>`;
        $('#lsAgain').onclick = () => GL.render(); if (ok >= 9) GL.confetti(90); GL.sfx('done'); Store.addXP(ok); return;
      }
      q = M.gen(); answered = false; i++; $('#lsI').textContent = i; inp.value = ''; inp.disabled = false; fb.innerHTML = ''; $('#lsCheck').textContent = 'Check'; inp.focus();
      setTimeout(() => say(q.say, $('.ls-play')), 250);
    };
    $('.ls-play').onclick = (e) => say(q.say, e.currentTarget);
    $('.ls-slow').onclick = (e) => say(q.say, e.currentTarget, { slow: true });
    const check = () => {
      if (answered) { next(); return; }
      if (!inp.value.trim()) { inp.focus(); return; }
      answered = true; const good = okAns(q, inp.value); if (good) ok++;
      $('#lsOk').textContent = ok; count(good); GL.sfx(good ? 'ok' : 'bad'); if (good && GL.Game) GL.Game.burst(inp);
      fb.innerHTML = `<div class="ls-res ${good ? 'ok' : 'bad'}">${good ? '✅ Richtig!' : `❌ It was <b>${esc(q.show)}</b>`} <span class="muted">„${esc(q.say)}“</span></div>`;
      inp.disabled = true; $('#lsCheck').textContent = i >= 10 ? 'Finish' : 'Next →'; $('#lsCheck').focus();
    };
    $('#lsCheck').onclick = check;
    inp.onkeydown = (e) => { if (e.key === 'Enter') check(); };
    next();
  }

  /* ---------- dictation ---------- */
  const RANGES = { A1: [1, 11], A2: [12, 21], B1: [22, 30] };
  function dictPool(lv) {
    const [a, b] = RANGES[lv]; const out = [];
    (GL.days || []).filter((d) => d.day >= a && d.day <= b).forEach((d) => {
      (d.vocab || []).forEach((v) => v[3] && out.push([v[3], v[4] || '']));
      (d.exercises || []).forEach((e) => { if (e.t === 'listen') out.push([e.a, e.en || '']); if (e.t === 'order') out.push([e.a, e.en || '']); });
    });
    return out.filter(([s]) => /[.!?]$/.test(s) && s.split(/\s+/).length >= 3 && s.split(/\s+/).length <= (lv === 'B1' ? 16 : 11) && !/[„“…()]/.test(s));
  }
  function dictation(lv) {
    if (!RANGES[lv]) return `<div class="ls-modes">${Object.keys(RANGES).map((l, i) => `<a class="card ls-mode" href="#/listen/dictation/${l}" style="--lv:${LV[l]};animation-delay:${i * 0.06}s"><span class="ls-mico" style="background:${LV[l]};color:#fff">${l}</span><b>Dictation ${l}</b><small>${l === 'A1' ? 'short everyday sentences' : l === 'A2' ? 'Perfekt, weil, dass …' : 'longer sentences, B1 grammar'}</small>${S().best['d' + l] != null ? `<span class="ls-best">🏆 ${S().best['d' + l]}%</span>` : ''}</a>`).join('')}</div>
      <div class="note">✍️ Dictation trains listening <b>and</b> spelling at the same time: capitals for nouns, ä/ö/ü/ß, endings you can’t hear … Every mistake is shown word by word.</div>`;
    return `<div class="card ls-drill" id="lsDict"><div class="row"><a href="#/listen/dictation">← Levels</a><span class="spacer"></span><b>📝 Dictation ${lv}</b><span class="spacer"></span><span class="ls-prog"><b id="ldI">1</b>/8 · Ø <b id="ldAvg">–</b>%</span></div>
      <div class="ls-player"><button class="btn big ls-play" type="button">🔊 Listen</button><button class="btn ghost ls-slow" type="button">🐢 Slowly</button>${waveHTML()}</div>
      <textarea class="txt-in ls-ta" id="ldIn" rows="2" placeholder="Write what you hear …" spellcheck="false"></textarea>
      <div class="umlauts" id="ldUml">${['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map((c) => `<button type="button" class="btn tiny ghost" data-c="${c}">${c}</button>`).join('')}</div>
      <div class="row" style="margin-top:8px"><button class="btn green" id="ldCheck" type="button">Check</button><span class="muted">Enter = check</span></div><div id="ldFb"></div></div>`;
  }
  function wireDictation(lv) {
    if (!RANGES[lv]) return;
    const pool = GL.shuffle(dictPool(lv)).slice(0, 8);
    let i = -1, sum = 0, cur = null, answered = false;
    const ta = $('#ldIn'), fb = $('#ldFb');
    const score = (want, got) => {
      const W = norm(want).split(' '), G = norm(got).split(' ');
      const exact = want.replace(/[„“]/g, '').split(/\s+/).map((w) => w.replace(/[.,!?]/g, ''));
      const gotW = got.split(/\s+/).map((w) => w.replace(/[.,!?]/g, ''));
      let hit = 0; const used = new Set();
      exact.forEach((w) => { const k = gotW.findIndex((g, j) => !used.has(j) && g === w); if (k >= 0) { used.add(k); hit++; } });
      return W.length ? Math.round((hit / exact.length) * 100) - Math.max(0, G.length - W.length) * 5 : 0;
    };
    const next = () => {
      i++;
      if (i >= pool.length) {
        const avg = Math.round(sum / pool.length); const s = S(); const b = s.best['d' + lv]; if (b == null || avg > b) s.best['d' + lv] = avg; Store.save();
        $('#lsDict').innerHTML = `<div class="ls-done"><div class="xm-ring" style="--p:${avg}"><b>${avg}%</b></div><h2>${avg >= 90 ? 'Perfekt geschrieben! 🌟' : avg >= 70 ? 'Gut gemacht! 👏' : 'Weiter so! 💪'}</h2><div class="row" style="justify-content:center"><button class="btn green" id="ldAgain" type="button">🔁 New dictation</button><a class="btn ghost" href="#/listen/dictation">Levels</a></div></div>`;
        $('#ldAgain').onclick = () => GL.render(); GL.sfx('done'); if (avg >= 90) GL.confetti(90); Store.addXP(Math.round(avg / 10)); return;
      }
      cur = pool[i]; answered = false; $('#ldI').textContent = i + 1; ta.value = ''; ta.disabled = false; fb.innerHTML = ''; $('#ldCheck').textContent = 'Check'; ta.focus();
      setTimeout(() => say(cur[0], $('#lsDict .ls-play')), 250);
    };
    $('#lsDict .ls-play').onclick = (e) => say(cur[0], e.currentTarget);
    $('#lsDict .ls-slow').onclick = (e) => say(cur[0], e.currentTarget, { slow: true });
    $('#ldUml').onclick = (e) => { const b = e.target.closest('[data-c]'); if (!b) return; const s0 = ta.selectionStart; ta.value = ta.value.slice(0, s0) + b.dataset.c + ta.value.slice(ta.selectionEnd); ta.focus(); ta.selectionStart = ta.selectionEnd = s0 + 1; };
    const check = () => {
      if (answered) { next(); return; }
      if (!ta.value.trim()) { ta.focus(); return; }
      answered = true; const sc = Math.max(0, score(cur[0], ta.value.trim())); sum += sc;
      $('#ldAvg').textContent = Math.round(sum / (i + 1)); count(sc >= 80); GL.sfx(sc >= 80 ? 'ok' : 'bad');
      fb.innerHTML = `<div class="ls-res ${sc >= 80 ? 'ok' : 'bad'}"><b>${sc >= 100 ? '✅ Perfekt!' : sc + '%'}</b><p class="ck-diff">${GL.Writing ? GL.Writing.diffHTML(ta.value.trim(), cur[0]) : esc(cur[0])}</p>${cur[1] ? `<small class="muted">🇬🇧 ${esc(cur[1])}</small>` : ''}</div>`;
      ta.disabled = true; $('#ldCheck').textContent = i + 1 >= pool.length ? 'Finish' : 'Next →'; $('#ldCheck').focus();
    };
    $('#ldCheck').onclick = check;
    ta.onkeydown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); check(); } };
    next();
  }

  /* ---------- everyday clips ---------- */
  const PLACES = { bahnhof: ['🚆', 'Station'], flughafen: ['✈️', 'Airport'], einkaufen: ['🛒', 'Shopping'], arzt: ['🩺', 'Doctor'], telefon: ['📞', 'Phone & voicemail'], radio: ['📻', 'Radio'], arbeit: ['💼', 'Work'], schule: ['🏫', 'School & Kita'], amt: ['🏛️', 'Offices'], wohnen: ['🏠', 'Home & neighbours'], stadt: ['🏙️', 'In town'], freizeit: ['🎉', 'Free time'] };
  function clips(lvF) {
    const C = (GL.listening && GL.listening.clips) || [];
    const lvs = ['all', 'A1', 'A2', 'B1'];
    const f = lvF && lvF !== 'all' ? lvF : 'all';
    return `<div class="chips" style="margin:4px 0 14px">${lvs.map((l) => `<a class="chip ${f === l ? 'on' : ''}" href="#/listen/everyday${l === 'all' ? '' : '/' + l}">${l === 'all' ? 'All levels' : l}</a>`).join('')}</div>
      ${Object.entries(PLACES).map(([pl, [ic, en]]) => { const cs = C.filter((c) => c.place === pl && (f === 'all' || c.level === f)); if (!cs.length) return ''; return `<h3 class="ls-ph">${ic} ${en}</h3><div class="ls-clips">${cs.map((c, i) => { const r = S().clips[c.id]; return `<a class="card ls-clip ${r ? 'done' : ''}" href="#/listen/clip/${c.id}" style="--lv:${LV[c.level]};animation-delay:${i * 0.04}s"><span class="ls-cico">${c.icon}</span><span><b>${esc(c.title)}</b><small>${esc(c.en)}</small></span><span class="xm-lv" style="--lv:${LV[c.level]}">${c.level}</span>${r ? `<span class="xm-chip ${r >= 80 ? 'hi' : r >= 50 ? 'mid' : 'lo'}">${r}%</span>` : ''}</a>`; }).join('')}</div>`; }).join('')}`;
  }
  function clip(id) {
    const C = (GL.listening && GL.listening.clips) || []; const c = C.find((x) => x.id === id);
    if (!c) return '<div class="card">Not found.</div>';
    const i = C.indexOf(c), nx = C[i + 1];
    return `<p class="ex-crumbs"><a href="#/listen/everyday">← Everyday audio</a></p>
      <div class="card ls-cliproom" style="--lv:${LV[c.level]}"><div class="ls-chead"><span class="ls-cbig">${c.icon}</span><div><span class="xm-lv" style="--lv:${LV[c.level]}">${c.level}</span> <span class="xm-tag">${PLACES[c.place] ? PLACES[c.place][1] : ''}</span><h1 style="margin:.2em 0">${esc(c.title)}</h1><p class="muted" style="margin:0">${esc(c.en)} · Listen first, then answer. You may listen as often as you like.</p></div></div>
        <div class="ls-player ls-big"><button class="btn big green ls-playclip" type="button">▶ Play</button><button class="btn ghost ls-slowclip" type="button">🐢 Slowly</button>${waveHTML()}<span class="muted ls-plays">0 plays</span></div>
        ${(c.gloss || []).length ? `<div class="xm-gloss"><b>🔑 Key words</b>${c.gloss.map(([de, en]) => `<button class="xm-g" type="button" data-say="${attr(de)}"><b>${esc(de)}</b><small>${esc(en)}</small></button>`).join('')}</div>` : ''}
        <div class="ls-qs">${c.q.map((q, k) => `<div class="xm-q" data-k="${k}"><div class="xm-qt"><span class="xm-no">${k + 1}</span><span>${esc(q.q)}</span></div><div class="xm-opts ${q.o.length === 2 ? 'two' : ''}">${q.o.map((o, j) => `<label class="xm-opt"><input type="radio" name="lq${k}" value="${j}"><span class="xm-ol">${q.o.length === 2 ? '' : String.fromCharCode(97 + j)}</span><span>${esc(o)}</span></label>`).join('')}</div><div class="xm-ex hidden"></div></div>`).join('')}</div>
        <div class="row" style="margin-top:12px"><button class="btn green big" id="lcCheck" type="button">✅ Check</button>${nx ? `<a class="btn ghost" href="#/listen/clip/${nx.id}">Next clip →</a>` : ''}</div>
        <details class="ex-trans hidden" id="lcTrans"><summary>📜 Transcript</summary>${c.audio.map(([w, t]) => `<p><b>${w === '_' ? '🔈' : esc((GL.chars[w] || { name: w }).name.replace(/ \(.*\)/, ''))}:</b> ${esc(t)} <button class="say-btn sm" type="button" data-say="${attr(t)}" ${w !== '_' ? `data-char="${attr(w)}"` : ''}>🔊</button></p>`).join('')}</details>
        <div id="lcRes"></div></div>`;
  }
  let tok = 0;
  function wireClip(id) {
    const c = ((GL.listening && GL.listening.clips) || []).find((x) => x.id === id); if (!c) return;
    let plays = 0;
    const play = async (slow, btn) => {
      const box = $('.ls-player'); if (box.classList.contains('playing')) { tok++; Speech.stop(); box.classList.remove('playing'); return; }
      const my = ++tok; box.classList.add('playing'); plays++; $('.ls-plays').textContent = `${plays} play${plays > 1 ? 's' : ''}`;
      for (const [w, t] of c.audio) { if (my !== tok) break; await Speech.speak(t, { char: w === '_' ? undefined : w, slow }); }
      if (my === tok) box.classList.remove('playing');
    };
    $('.ls-playclip').onclick = (e) => play(false, e.currentTarget);
    $('.ls-slowclip').onclick = (e) => play(true, e.currentTarget);
    $('#lcCheck').onclick = () => {
      let ok = 0;
      c.q.forEach((q, k) => {
        const el = $(`.xm-q[data-k="${k}"]`), ch = $(`input[name="lq${k}"]:checked`, el); const good = ch && +ch.value === q.a; if (good) ok++;
        el.classList.add(good ? 'ok' : 'bad');
        $$('.xm-opt', el).forEach((l) => { const j = +$('input', l).value; l.classList.toggle('right', j === q.a); l.classList.toggle('wrong', !!ch && j === +ch.value && !good); $('input', l).disabled = true; });
        const ex = $('.xm-ex', el); ex.innerHTML = `${good ? '✅' : `❌ <b>${esc(q.o[q.a])}</b> –`} ${esc(q.ex)}`; ex.classList.remove('hidden');
      });
      const pct = Math.round((ok / c.q.length) * 100);
      S().clips[id] = Math.max(S().clips[id] || 0, pct); count(pct >= 50); Store.addXP(ok * 3 + 2);
      $('#lcTrans').classList.remove('hidden'); $('#lcTrans').open = pct < 100;
      $('#lcCheck').disabled = true; GL.sfx(pct === 100 ? 'done' : pct >= 50 ? 'ok' : 'bad'); if (pct === 100 && GL.Game) GL.Game.burst($('#lcCheck'));
      $('#lcRes').innerHTML = `<div class="xm-score ${pct >= 80 ? 'hi' : pct >= 50 ? 'mid' : 'lo'}"><div class="xm-ring" style="--p:${pct}"><b>${ok}/${c.q.length}</b></div><div><h3 style="margin:0">${pct === 100 ? 'Alles richtig! 🎧' : pct >= 50 ? 'Gut! Read the transcript once.' : 'Listen again with the transcript.'}</h3><p class="muted" style="margin:.3em 0 0">Tip: play it once more and read along – then without the text.</p></div></div>`;
    };
  }

  /* ---------- real spoken German ---------- */
  const CATS = { reduction: ['✂️', 'Short forms', 'How words melt together in fast speech'], filler: ['💭', 'Filler words', 'also, halt, eben, ne?'], reaction: ['😮', 'Reactions', 'echt? krass! na klar'], greeting: ['👋', 'Greetings', 'Moin, Servus, Grüß Gott'], smalltalk: ['☕', 'Small talk', 'Wie läuft’s?'], idiom: ['🧠', 'Idioms', 'Ich drücke dir die Daumen'], office: ['🏢', 'Offices & phone', 'what you hear at counters'] };
  function real(cat) {
    const R = (GL.listening && GL.listening.real) || [];
    if (cat === 'quiz') return `<div class="card ls-drill" id="lrQuiz"></div>`;
    return `<div class="row" style="margin-bottom:10px"><p class="muted" style="margin:0;flex:1">German in real life sounds different from the textbook. Tap 🔊 to hear how people really say it.</p><a class="btn green" href="#/listen/real/quiz">🧩 Quiz: what does it mean?</a></div>
      ${Object.entries(CATS).map(([k, [ic, ti, sub]]) => { const rs = R.filter((r) => r.cat === k); if (!rs.length) return ''; return `<h3 class="ls-ph">${ic} ${ti} <small class="muted">${esc(sub)}</small></h3><div class="ls-reals">${rs.map((r, i) => `<div class="card ls-real" style="animation-delay:${Math.min(i, 10) * 0.04}s"><div class="row"><button class="say-btn" type="button" data-say="${attr(r.said)}">🔊</button><b class="ls-said">${esc(r.said)}</b><span class="spacer"></span><span class="xm-lv" style="--lv:${LV[r.level]}">${r.level}</span></div><p class="ls-full">= ${esc(r.full)}</p><p class="ls-en">🇬🇧 ${esc(r.en)}</p><small class="muted">${esc(r.note)}</small></div>`).join('')}</div>`; }).join('')}`;
  }
  function wireRealQuiz() {
    const R = (GL.listening && GL.listening.real) || []; const box = $('#lrQuiz'); if (!box || R.length < 4) return;
    const pool = GL.shuffle(R.slice()).slice(0, 10); let i = 0, ok = 0;
    const next = () => {
      if (i >= pool.length) { box.innerHTML = `<div class="ls-done"><div class="xm-ring" style="--p:${ok * 10}"><b>${ok}/${pool.length}</b></div><h2>${ok >= 8 ? 'Du verstehst echtes Deutsch! 🌟' : 'Weiter üben! 💪'}</h2><div class="row" style="justify-content:center"><button class="btn green" id="lrAgain" type="button">🔁 Again</button><a class="btn ghost" href="#/listen/real">All phrases</a></div></div>`; $('#lrAgain').onclick = () => GL.render(); Store.addXP(ok); GL.sfx('done'); return; }
      const r = pool[i]; const opts = GL.shuffle([r, ...GL.shuffle(R.filter((x) => x !== r)).slice(0, 3)]);
      box.innerHTML = `<div class="row"><a href="#/listen/real">← Phrases</a><span class="spacer"></span><span class="ls-prog">${i + 1}/${pool.length} · ✅ ${ok}</span></div>
        <div class="ls-player"><button class="btn big ls-play" type="button">🔊 Listen</button>${waveHTML()}</div><p class="muted" style="text-align:center">What does it mean?</p>
        <div class="ls-qopts">${opts.map((o, j) => `<button class="btn ghost ls-qo" data-j="${j}" type="button">${esc(o.en)}</button>`).join('')}</div><div id="lrFb"></div>`;
      const play = () => say(r.said, $('.ls-play', box)); $('.ls-play', box).onclick = play; setTimeout(play, 250);
      $$('.ls-qo', box).forEach((b) => (b.onclick = () => {
        const good = opts[+b.dataset.j] === r; if (good) ok++; count(good); GL.sfx(good ? 'ok' : 'bad');
        $$('.ls-qo', box).forEach((x) => { x.disabled = true; if (opts[+x.dataset.j] === r) x.classList.add('right'); }); if (!good) b.classList.add('wrong');
        $('#lrFb').innerHTML = `<div class="ls-res ${good ? 'ok' : 'bad'}"><b>„${esc(r.said)}“</b> = ${esc(r.full)}<br><small class="muted">${esc(r.note)}</small><div class="row" style="margin-top:8px"><button class="btn green" id="lrNext" type="button">Next →</button></div></div>`;
        $('#lrNext').onclick = () => { i++; next(); };
      }));
    };
    next();
  }

  /* ---------- page ---------- */
  const TABS = [['', '🏠 Overview'], ['numbers', '🔢 Numbers & times'], ['dictation', '📝 Dictation'], ['everyday', '🎧 Everyday audio'], ['real', '🗣️ Real German']];
  function overview() {
    const C = (GL.listening && GL.listening.clips) || [], s = S();
    const done = Object.keys(s.clips).length;
    return `<div class="ls-cards">
      <a class="card ls-big-card" href="#/listen/numbers" style="--c:#ff8c42"><span>🔢</span><b>Numbers, prices & times</b><small>Endless drills – exactly what A1/A2 exams test</small></a>
      <a class="card ls-big-card" href="#/listen/dictation" style="--c:#3a86ff"><span>📝</span><b>Dictation</b><small>Listen & write – spelling, endings, capitals</small></a>
      <a class="card ls-big-card" href="#/listen/everyday" style="--c:#22b573"><span>🎧</span><b>Everyday audio</b><small>${C.length} clips: station, voicemail, radio, doctor … (${done} done)</small></a>
      <a class="card ls-big-card" href="#/listen/real" style="--c:#9b5de5"><span>🗣️</span><b>Real spoken German</b><small>haste, ne?, Moin, Servus – how people really talk</small></a></div>
      <div class="card"><h3 style="margin-top:0">🎯 How to train your ears</h3><ol class="ls-tips"><li><b>Listen first without text</b> – catch the main idea (who? where? what?).</li><li><b>Read the question before you listen</b> – in the exam you get time for that.</li><li><b>Listen again with the transcript</b> – find the words you missed.</li><li><b>Shadow it</b>: say it together with the voice (Speak → Shadowing).</li><li>Every day 10 minutes beats 2 hours on Sunday.</li></ol></div>`;
  }
  GL.viewListen = function (a, b) {
    const tab = a === 'clip' ? 'everyday' : a || '';
    const s = S();
    const body = a === 'numbers' ? numbers(b) : a === 'dictation' ? dictation(b) : a === 'everyday' ? clips(b) : a === 'clip' ? clip(b) : a === 'real' ? real(b) : overview();
    return {
      html: `<section class="ls-hero"><div><span class="xm-pill">🎧 LISTENING GYM</span><h1>Understand real German</h1><p>Numbers at the bakery, announcements at the station, a voicemail from the doctor, fast small talk – train your ears every day.</p>
          <div class="ls-hstats"><span>🎧 <b>${s.n}</b> exercises</span><span>✅ <b>${s.n ? Math.round((s.ok / s.n) * 100) : 0}%</b> right</span></div></div>
          <div class="ls-hero-art" aria-hidden="true"><div class="ls-eq">${'<i></i>'.repeat(12)}</div><span class="ls-ear">👂</span></div></section>
        ${a === 'clip' ? '' : `<div class="chips tabs-row ls-tabs">${TABS.map(([k, l]) => `<a class="chip ${tab === k ? 'on' : ''}" href="#/listen${k ? '/' + k : ''}">${l}</a>`).join('')}</div>`}
        ${body}`,
      mount() {
        if (a === 'numbers') wireNumbers(b);
        else if (a === 'dictation') wireDictation(b);
        else if (a === 'clip') wireClip(b);
        else if (a === 'real' && b === 'quiz') wireRealQuiz();
        GL.track && GL.track('listen', 'Listening gym');
      },
    };
  };
  GL.Listen = { num, MODES, okAns, dictPool, say };
})();
