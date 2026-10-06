/* Exercise engine: multiple choice, fill-in, word order, translation, dictation, gender quiz, matching. */
(function () {
  'use strict';
  const { $, $$, esc, attr, shuffle, checkAnswer, rich, Store, Speech, toast } = GL;

  const KIND = {
    mc: '🧩 Choose the right answer',
    fill: '✏️ Fill in the gap',
    order: '🧱 Build the sentence',
    tr: '🌍 Translate into German',
    listen: '🎧 Listen and write',
    gender: '🎨 der, die oder das?',
    match: '🔗 Match the pairs',
  };

  const umlautBar = () => `<div class="umlauts" aria-label="Special characters">${['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map((c) => `<button type="button" data-ch="${c}" tabindex="-1">${c}</button>`).join('')}</div>`;
  const splitWords = (s) => String(s).replace(/[.!?]$/, '').split(/\s+/).filter(Boolean);

  /* Build automatic vocab exercises for a day. */
  function autoFromVocab(day) {
    const out = [];
    const vocab = (day.vocab || []).map(GL.parseVocab);
    const pairs = shuffle(vocab.filter((v) => v.en.length < 28 && v.de.length < 26)).slice(0, 6);
    if (pairs.length >= 4) out.push({ t: 'match', pairs: pairs.map((v) => [v.de, v.en]) });
    const nouns = shuffle(vocab.filter((v) => v.gender && !/[,/(]/.test(v.de))).slice(0, 4);
    nouns.forEach((v) => out.push({ t: 'gender', w: v.de.replace(/^(der|die|das)\s+/i, ''), a: v.gender, en: v.en }));
    const lis = shuffle(vocab.filter((v) => v.ex)).slice(0, 2);
    lis.forEach((v) => out.push({ t: 'listen', a: v.ex, en: v.exEn || '' }));
    return out;
  }

  function run(root, list, opts = {}) {
    const queue = list.map((q, i) => ({ q, i, retry: false }));
    const total = list.length;
    let pos = 0, firstTry = 0, answered = 0, xp = 0;
    const wrongOnce = new Set();

    function header() {
      const pct = Math.round((answered / total) * 100);
      return `<div class="ex-top"><span class="pill">✅ ${firstTry}</span><div class="progress"><i style="width:${pct}%"></i></div><span class="pill">${Math.min(answered + 1, total)}/${total}</span></div>`;
    }

    function next() {
      if (pos >= queue.length) return finish();
      const item = queue[pos];
      root.innerHTML = `<div class="ex-shell">${header()}<div class="ex-card" id="exCard"></div></div>`;
      const card = $('#exCard', root);
      render(card, item.q, (correct) => {
        if (!item.retry) {
          answered++;
          if (correct) { firstTry++; xp += 5; }
          else if (!wrongOnce.has(item.i)) { wrongOnce.add(item.i); queue.push({ q: item.q, i: item.i, retry: true }); }
        }
        $('.ex-top', root).outerHTML = header();
      }, () => { pos++; next(); }, item.retry);
    }

    function finish() {
      const pct = total ? Math.round((firstTry / total) * 100) : 100;
      if (xp) Store.addXP(xp);
      opts.onFinish && opts.onFinish(pct, firstTry, total);
      const msg = pct >= 90 ? 'Ausgezeichnet! 🏆' : pct >= 70 ? 'Sehr gut! 🎉' : pct >= 50 ? 'Gut gemacht! 👍' : 'Weiter üben! 💪';
      root.innerHTML = `<div class="ex-shell"><div class="ex-card center">
        ${GL.charSVG('bruno', pct >= 70 ? 'happy waving' : 'idle')}
        <div class="result-big">${pct}%</div>
        <h2>${msg}</h2>
        <p class="muted">${firstTry} of ${total} correct on the first try · +${xp} XP</p>
        ${pct < 70 ? '<p>Tip: re-read the grammar section, then try again. Repetition is how grammar becomes automatic.</p>' : ''}
        <div class="ex-actions" style="justify-content:center">
          <button class="btn ghost" id="exRetry">🔁 Try again</button>
          ${opts.nextLabel ? `<button class="btn green" id="exNext">${opts.nextLabel}</button>` : ''}
        </div></div></div>`;
      if (pct >= 70) GL.confetti(90);
      $('#exRetry', root).onclick = () => run(root, opts.reshuffle ? opts.reshuffle() : list, opts);
      const n = $('#exNext', root);
      if (n) n.onclick = () => opts.onNext && opts.onNext();
    }

    next();
  }

  /* Render one exercise into card. report(correct) is called once, cont() moves on. */
  function render(card, q, report, cont, isRetry) {
    card.__q = q; // exposed for automated tests
    let checked = false;
    let getAnswer = () => null;
    let evaluate = () => ({ ok: false });
    const kind = KIND[q.t] || '';
    const retryTag = isRetry ? ' · <span style="color:var(--red)">second chance</span>' : '';
    let body = '';

    switch (q.t) {
      case 'mc': {
        const order = shuffle(q.o.map((o, i) => i));
        body = `<div class="ex-q">${rich(q.q)}</div>${q.hint ? `<p class="ex-hint">${q.hint}</p>` : ''}
          <div class="opts">${order.map((i) => `<button class="opt" data-i="${i}">${esc(q.o[i])}</button>`).join('')}</div>`;
        let sel = null;
        card.innerHTML = frame(body);
        $$('.opt', card).forEach((b) => (b.onclick = () => {
          if (checked) return;
          $$('.opt', card).forEach((x) => x.classList.remove('sel'));
          b.classList.add('sel'); sel = +b.dataset.i;
          enableCheck();
        }));
        getAnswer = () => sel;
        evaluate = () => {
          const ok = sel === q.a;
          $$('.opt', card).forEach((b) => { if (+b.dataset.i === q.a) b.classList.add('right'); else if (+b.dataset.i === sel) b.classList.add('wrong'); });
          return { ok, answer: q.o[q.a] };
        };
        break;
      }
      case 'gender': {
        body = `<div class="ex-q center" style="font-size:1.8rem">___ ${esc(q.w)} <button class="say-btn" data-say="${attr(q.a + ' ' + q.w)}" aria-label="Listen">🔊</button></div>
          <p class="center muted">${esc(q.en)}</p>
          <div class="opts gender">${['der', 'die', 'das'].map((g) => `<button class="opt g-${g}" data-g="${g}">${g}</button>`).join('')}</div>`;
        card.innerHTML = frame(body);
        let sel = null;
        $$('.opt', card).forEach((b) => (b.onclick = () => { if (checked) return; sel = b.dataset.g; doCheck(); }));
        getAnswer = () => sel;
        evaluate = () => {
          $$('.opt', card).forEach((b) => { if (b.dataset.g === q.a) b.classList.add('right'); else if (b.dataset.g === sel) b.classList.add('wrong'); });
          return { ok: sel === q.a, answer: q.a + ' ' + q.w };
        };
        q.ex = q.ex || 'Learn every noun together with its article – the colour code helps: <b class="g-der">der</b>, <b class="g-die">die</b>, <b class="g-das">das</b>.';
        break;
      }
      case 'fill': {
        const parts = q.q.split('___');
        const n = parts.length - 1;
        const answers = n === 1 ? [Array.isArray(q.a) ? q.a : [q.a]] : q.a.map((x) => (Array.isArray(x) ? x : [x]));
        let html = '';
        parts.forEach((p, i) => {
          html += rich(esc(p).replace(/&lt;(\/?)(b|i)&gt;/g, '<$1$2>'));
          if (i < n) html += `<input class="txt-in blank-in" data-k="${i}" autocomplete="off" autocapitalize="off" spellcheck="false" style="display:inline-block;width:${Math.max(4, Math.max(...answers[i].map((a) => a.length)) + 2)}ch;padding:6px 8px;margin:4px" aria-label="gap ${i + 1}">`;
        });
        body = `<div class="ex-q">${html}</div>${q.hint ? `<p class="ex-hint">💡 ${q.hint}</p>` : ''}${q.en ? `<p class="ex-hint">🇬🇧 ${esc(q.en)}</p>` : ''}${umlautBar()}`;
        card.innerHTML = frame(body);
        const ins = $$('.blank-in', card);
        ins.forEach((inp) => inp.addEventListener('input', () => enableCheck(ins.every((x) => x.value.trim()))));
        setTimeout(() => ins[0] && ins[0].focus(), 50);
        getAnswer = () => ins.map((x) => x.value);
        evaluate = () => {
          let all = true, inexact = false;
          ins.forEach((inp, i) => {
            const r = checkAnswer(inp.value, answers[i]);
            inp.style.borderColor = r.ok ? 'var(--green)' : 'var(--red)';
            if (!r.ok) all = false; else if (!r.exact) inexact = true;
            inp.disabled = true;
          });
          return { ok: all, inexact, answer: q.q.split('___').reduce((acc, p, i) => acc + p + (i < n ? `<b>${answers[i][0]}</b>` : ''), '') };
        };
        break;
      }
      case 'tr':
      case 'listen': {
        const isL = q.t === 'listen';
        body = isL
          ? `<div class="center"><button class="btn round listen-big" id="lPlay" aria-label="Play">🔊</button> <button class="btn ghost small" id="lSlow">🐢 slower</button></div>
             <p class="center muted" style="margin-top:10px">Type exactly what you hear.</p>`
          : `<div class="ex-q">„${esc(q.en)}“</div>${q.hint ? `<p class="ex-hint">💡 ${q.hint}</p>` : ''}`;
        body += `<textarea class="txt-in" rows="2" id="trIn" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="Auf Deutsch …"></textarea>${umlautBar()}`;
        card.innerHTML = frame(body);
        const inp = $('#trIn', card);
        inp.addEventListener('input', () => enableCheck(inp.value.trim().length > 0));
        inp.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); $('#exCheck', card).click(); } });
        if (isL) {
          $('#lPlay', card).onclick = () => Speech.speak(q.a);
          $('#lSlow', card).onclick = () => Speech.speak(q.a, { slow: true });
          setTimeout(() => Speech.speak(q.a), 350);
        }
        setTimeout(() => inp.focus(), 60);
        const acc = Array.isArray(q.a) ? q.a : [q.a];
        getAnswer = () => inp.value;
        evaluate = () => {
          const r = checkAnswer(inp.value, acc.concat(q.alt || []));
          inp.disabled = true;
          inp.style.borderColor = r.ok ? 'var(--green)' : 'var(--red)';
          return { ok: r.ok, inexact: r.ok && !r.exact, answer: acc[0] + (isL && q.en ? ` <span class="muted">(${esc(q.en)})</span>` : '') };
        };
        break;
      }
      case 'order': {
        const words = splitWords(q.a);
        const bank = shuffle(words.concat(q.x || []).map((w, i) => ({ w, i })));
        body = `${q.en ? `<div class="ex-q">„${esc(q.en)}“</div>` : '<div class="ex-q">Put the words in the correct order.</div>'}
          ${q.hint ? `<p class="ex-hint">💡 ${q.hint}</p>` : ''}
          <div class="word-line" id="wl" aria-label="Your sentence"></div>
          <div class="word-bank" id="wb">${bank.map((b) => `<button class="wchip" data-i="${b.i}">${esc(b.w)}</button>`).join('')}</div>`;
        card.innerHTML = frame(body);
        const line = [];
        const wl = $('#wl', card), wb = $('#wb', card);
        const all = words.concat(q.x || []);
        const draw = () => {
          wl.innerHTML = line.map((i, k) => `<button class="wchip" data-k="${k}">${esc(all[i])}</button>`).join('');
          $$('.wchip', wb).forEach((b) => b.classList.toggle('used', line.includes(+b.dataset.i)));
          enableCheck(line.length > 0);
        };
        wb.onclick = (e) => { const b = e.target.closest('.wchip'); if (!b || checked || b.classList.contains('used')) return; line.push(+b.dataset.i); draw(); };
        wl.onclick = (e) => { const b = e.target.closest('.wchip'); if (!b || checked) return; line.splice(+b.dataset.k, 1); draw(); };
        getAnswer = () => line.map((i) => all[i]).join(' ');
        evaluate = () => {
          const r = checkAnswer(getAnswer(), [q.a].concat(q.alt || []));
          return { ok: r.ok, answer: q.a };
        };
        break;
      }
      case 'match': {
        const left = shuffle(q.pairs.map((p, i) => ({ t: p[0], i })));
        const right = shuffle(q.pairs.map((p, i) => ({ t: p[1], i })));
        body = `<div class="ex-q">Tap a German word, then its meaning.</div>
          <div class="match-grid"><div class="opts">${left.map((l) => `<button class="opt" data-side="l" data-i="${l.i}">${esc(l.t)}</button>`).join('')}</div>
          <div class="opts">${right.map((r) => `<button class="opt" data-side="r" data-i="${r.i}">${esc(r.t)}</button>`).join('')}</div></div>`;
        card.innerHTML = frame(body, true);
        let selL = null, selR = null, done = 0, mistakes = 0;
        const tryPair = () => {
          if (!selL || !selR) return;
          if (selL.dataset.i === selR.dataset.i) {
            [selL, selR].forEach((b) => { b.classList.remove('sel'); b.classList.add('matched', 'pop'); });
            done++;
            if (done === q.pairs.length) { checked = true; report(mistakes <= 1); showFeedback(card, { ok: mistakes <= 1, answer: '' }, mistakes ? `Done with ${mistakes} mistake${mistakes > 1 ? 's' : ''}.` : 'Perfect match!', cont); }
          } else {
            mistakes++;
            [selL, selR].forEach((b) => { b.classList.add('wrong', 'shake'); setTimeout(() => b.classList.remove('wrong', 'shake', 'sel'), 450); });
          }
          selL = selR = null;
        };
        $$('.opt', card).forEach((b) => (b.onclick = () => {
          if (b.dataset.side === 'l') { selL && selL.classList.remove('sel'); selL = b; Speech.speak(b.textContent); }
          else { selR && selR.classList.remove('sel'); selR = b; }
          b.classList.add('sel');
          tryPair();
        }));
        return;
      }
      default:
        card.innerHTML = '<p>Unknown exercise.</p>';
        return;
    }

    function frame(inner, noCheck) {
      return `<div class="ex-kind">${kind}${retryTag}</div>${inner}<div id="fb"></div>
        ${noCheck ? '' : '<div class="ex-actions"><button class="btn green" id="exCheck" disabled>Check ✔</button></div>'}`;
    }
    function enableCheck(on = true) { const b = $('#exCheck', card); if (b) b.disabled = !on; }

    function doCheck() {
      if (checked) return;
      if (getAnswer() == null) return;
      checked = true;
      const r = evaluate();
      report(r.ok);
      let extra = '';
      if (r.ok && r.inexact) extra = 'Accepted – but try to type the umlauts (ä, ö, ü, ß) using the buttons.';
      showFeedback(card, r, extra, cont);
    }

    function showFeedback(card, r, extra, cont) {
      const fb = $('#fb', card);
      const praise = GL.sample(['Richtig! 🎉', 'Super! ⭐', 'Genau! ✅', 'Perfekt! 🏅', 'Toll! 🙌'], 1)[0];
      fb.innerHTML = `<div class="feedback ${r.ok ? 'ok' : 'bad'}">
        ${r.ok ? praise : '❌ Nicht ganz.'} ${!r.ok && r.answer ? `Correct answer: <span>${r.answer}</span>` : ''}
        ${extra ? `<div class="expl">${extra}</div>` : ''}
        ${q.ex ? `<div class="expl">📘 ${rich(q.ex)}</div>` : ''}
      </div>`;
      card.classList.add(r.ok ? 'pop' : 'shake');
      const act = $('.ex-actions', card) || card.appendChild(Object.assign(document.createElement('div'), { className: 'ex-actions' }));
      act.innerHTML = `${['order', 'tr', 'fill', 'listen'].includes(q.t) ? `<button class="btn ghost small" id="exHear">🔊 Hear it</button>` : ''}<button class="btn ${r.ok ? 'green' : 'red'}" id="exCont">Continue ➜</button>`;
      const hear = $('#exHear', card);
      if (hear) hear.onclick = () => Speech.speak(GL.stripTags(r.answer.replace(/<span class="muted">.*<\/span>/, '')));
      if (r.ok && ['order', 'tr', 'listen'].includes(q.t)) Speech.speak(GL.stripTags(String(r.answer).replace(/<span class="muted">.*<\/span>/, '')));
      const c = $('#exCont', card);
      c.focus();
      c.onclick = () => { Speech.stop(); cont(); };
    }

    const chk = $('#exCheck', card);
    if (chk) chk.onclick = doCheck;
    card.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' || e.target.tagName === 'TEXTAREA') return;
      if (!checked) { e.preventDefault(); const b = $('#exCheck', card); if (b && !b.disabled) doCheck(); }
    });
    card.addEventListener('click', (e) => {
      const u = e.target.closest('[data-ch]');
      if (!u) return;
      const inp = card.querySelector('input.txt-in:focus, textarea.txt-in:focus') || card.__lastInput || card.querySelector('.txt-in');
      if (!inp || inp.disabled) return;
      const s = inp.selectionStart ?? inp.value.length;
      inp.value = inp.value.slice(0, s) + u.dataset.ch + inp.value.slice(inp.selectionEnd ?? s);
      inp.focus();
      inp.setSelectionRange(s + 1, s + 1);
      inp.dispatchEvent(new Event('input'));
    });
    card.addEventListener('mousedown', (e) => { if (e.target.closest('[data-ch]')) e.preventDefault(); });
    card.addEventListener('focusin', (e) => { if (e.target.classList.contains('txt-in')) card.__lastInput = e.target; });
  }

  GL.Exercises = { run, autoFromVocab, KIND };
})();
