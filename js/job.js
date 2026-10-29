/* JOB GERMAN – pages for the job tracks (GL.jobs): the hub (#/job), each job's overview (#/job/<id>), interview
   preparation (#/job/<id>/interview), the 15 work days (#/job/<id>/day/N) and – where a job has them – the
   onboarding plan (…/plan), job vocabulary with a quiz (…/words) and typical mistakes (…/fix).
   Old links (#/job/interview, #/job/day/N) still open the Sales Advisor track.
   The animated scenes themselves run in the normal scene player. */
(function () {
  'use strict';
  const { $, $$, esc, attr, shuffle, Store } = GL;
  const jobs = () => GL.jobs || [];
  const byId = (id) => jobs().find((j) => j.id === id);
  const doneScene = (id) => !!(((Store.state.scenes || {})[id] || {}).done);
  const bestScene = (id) => ((Store.state.scenes || {})[id] || {}).best;
  const total = (j) => j.days.length + 1;
  const doneCount = (j) => j.days.filter((d) => doneScene(d.scene)).length + (doneScene(j.interview.scene) ? 1 : 0);
  const back = (j) => `<p><a href="${j.base}">← ${esc(j.short)}</a> · <a href="#/job">Job German</a></p>`;

  /* a phrase row: listen (global [data-say] handler) + speak practice */
  const phraseRow = (de, en, i) => `<div class="jp-row" style="animation-delay:${Math.min(i, 12) * 0.03}s">
      <button class="say-btn" type="button" data-say="${attr(de)}" aria-label="Listen">🔊</button>
      <div class="jp-txt"><b>${esc(de)}</b><small>${esc(en)}</small></div>
      <button class="btn tiny ghost jp-mic" type="button" data-t="${attr(de.replace(/…/g, ''))}" title="Practise saying it">🎤</button>
      <div class="jp-att"></div></div>`;
  function wirePhrases(root) {
    $$('.jp-mic', root).forEach((b) => (b.onclick = () => {
      const box = b.parentElement.querySelector('.jp-att');
      if (box.innerHTML) { box.innerHTML = ''; return; }
      $$('.jp-att', root).forEach((x) => { if (x !== box) x.innerHTML = ''; });
      GL.Speak.attempt(box, { targets: [b.dataset.t], label: 'Say it in German:', pass: 75 });
    }));
  }
  const list = (rows) => `<ul class="job-list">${rows.map(([de, en]) => `<li><b>${esc(de)}</b><small>${esc(en)}</small></li>`).join('')}</ul>`;

  /* ---------- hub: all jobs ---------- */
  function hub() {
    return {
      html: `<h1>💼 Job German</h1>
        <p class="muted">German for one real job at a time: the job advert, interview preparation and 15 days in the job – with animated scenes where <b>you</b> do the job and speak at every important moment.</p>
        <div class="job-hub">${jobs().map((j) => {
          const d = doneCount(j), t = total(j);
          return `<a class="job-hub-card ${j.heroClass || ''}" href="${j.base}"><span class="jhc-icon">${j.icon}</span>
            <div class="jhc-art">${j.heroChars.map((c, i) => GL.charSVG(c, i ? 'idle' : 'idle waving')).join('')}</div>
            <b>${esc(j.title)}</b><small>${esc(j.en)} · ${esc(j.place)}</small>
            <div class="jh-prog"><div class="jh-bar"><i style="width:${Math.round((d / t) * 100)}%"></i></div><small>${d} of ${t} done</small></div>
            <span class="btn small gold">${d ? '▶ Continue' : '▶ Start'}</span></a>`;
        }).join('')}</div>
        <p class="muted center">More jobs coming. Missing yours? Tell us which job advert you are preparing for.</p>`,
      mount() { GL.track && GL.track('job', 'Job German · overview'); },
    };
  }

  /* ---------- one job ---------- */
  function overview(j) {
    const ads = j.adverts || [j.advert], process = j.process || j.advert.process;
    const done = doneCount(j), t = total(j);
    const next = j.days.find((d) => !doneScene(d.scene));
    const intro = j.intro || `Interview preparation and <b>15 days in the job</b> – from your first “Hallo” to handling the Saturday rush. Every day: the key phrases (listen &amp; speak) and an animated scene where <b>you are the new ${esc(j.short)}</b>. Made for the advert <i>“${esc(j.advert.role)}”</i> – ${esc(j.advert.place)}.`;
    const adCard = (ad) => `<div class="card"><h3 style="margin-top:0">🧾 ${esc(ad.role)}</h3><p class="muted" style="margin:-4px 0 8px">${esc(ad.place)}</p>${ad.about ? `<p style="margin:0 0 8px">${esc(ad.about)}</p>` : ''}
        <h4>Your tasks</h4>${list(ad.tasks)}<h4>What they want</h4>${list(ad.want)}
        <h4>Benefits in the advert</h4><div class="chips">${ad.benefits.map((b) => `<span class="chip">${esc(b)}</span>`).join('')}</div>
        ${ad.contact ? `<p class="job-contact">👤 <b>Contact:</b> ${esc(ad.contact)}${ad.apply ? ` · <a href="${attr(ad.apply)}" target="_blank" rel="noopener">Apply online ↗</a>` : ''}</p>` : ''}
        ${ad.note ? `<p class="iv-tip">💡 ${esc(ad.note)}</p>` : ''}</div>`;
    const tools = [
      ['🤝', 'Interview', `${j.interview.questions.length} questions & model answers`, `${j.base}/interview`],
      j.plan && ['🗓️', 'Onboarding plan', 'Before day 1 → end of probation', `${j.base}/plan`],
      j.words && ['📚', 'Job vocabulary', `${j.words.reduce((a, g) => a + g.w.length, 0)} words · quiz`, `${j.base}/words`],
      j.fixes && ['✏️', 'Typical mistakes', `${j.fixes.length} corrections · quiz`, `${j.base}/fix`],
    ].filter(Boolean);
    return {
      html: `<p><a href="#/job">← Job German</a></p>
        <section class="job-hero ${j.heroClass || ''}">
          <div class="jh-text"><span class="jh-pill">💼 JOB GERMAN</span>
            <h1>${esc(j.title)}</h1>
            <p>${intro}</p>
            <div class="jh-prog"><div class="jh-bar"><i style="width:${Math.round((done / t) * 100)}%"></i></div><small>${done} of ${t} done</small></div>
            <div class="row"><a class="btn gold big" href="${j.base}/interview">🤝 Interview preparation</a>${next ? `<a class="btn ghost jh-ghost" href="${j.base}/day/${next.day}">▶ ${done ? 'Continue' : 'Start'}: Day ${next.day}</a>` : ''}</div></div>
          <div class="jh-art">${j.heroChars.map((c, i) => GL.charSVG(c, i ? 'idle' : 'idle waving')).join('')}</div>
        </section>
        ${tools.length > 1 ? `<div class="job-tools">${tools.map(([ic, tt, s, h]) => `<a class="job-tool" href="${h}"><span>${ic}</span><b>${esc(tt)}</b><small>${esc(s)}</small></a>`).join('')}</div>` : ''}
        ${ads.length > 1 ? `<div class="ad-tabs" role="tablist">${ads.map((ad, i) => `<button type="button" role="tab" class="${i ? '' : 'on'}" data-ad="${i}" aria-selected="${!i}">${esc(ad.tab)}</button>`).join('')}</div>` : ''}
        <div class="grid grid-2 job-ad">
          <div class="ad-pane">${ads.map((ad, i) => `<div data-pane="${i}" ${i ? 'hidden' : ''}>${adCard(ad)}</div>`).join('')}</div>
          <div class="card"><h3 style="margin-top:0">🪜 How the application works</h3><ol class="job-steps">${process.map(([ic, tt, d]) => `<li><span>${ic}</span><div><b>${esc(tt)}</b><small>${esc(d)}</small></div></li>`).join('')}</ol>
            ${j.recognition ? `<div class="note">🎓 ${esc(j.recognition)}</div>` : ''}</div>
        </div>
        <h2>📅 ${j.days.length} days in the job</h2>
        <div class="job-days">
          <a class="job-day jd-int ${doneScene(j.interview.scene) ? 'done' : ''}" href="${j.base}/interview"><span class="jd-no">🤝</span><div><b>Vorbereitung: Das Vorstellungsgespräch</b><small>${j.interview.questions.length} questions & answers · interview scene</small></div>${doneScene(j.interview.scene) ? '<span class="jd-ok">✓</span>' : ''}</a>
          ${j.days.map((d) => `<a class="job-day ${doneScene(d.scene) ? 'done' : ''}" href="${j.base}/day/${d.day}"><span class="jd-no">${d.day}</span><div><b>${d.icon} ${esc(d.title)}</b><small>${esc(d.en)}</small></div>${doneScene(d.scene) ? `<span class="jd-ok">✓${bestScene(d.scene) != null ? ` ${bestScene(d.scene)}%` : ''}</span>` : ''}</a>`).join('')}
        </div>`,
      mount() {
        const root = $('#app');
        $$('.ad-tabs button', root).forEach((b) => (b.onclick = () => {
          $$('.ad-tabs button', root).forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', String(x === b)); });
          $$('[data-pane]', root).forEach((p) => (p.hidden = p.dataset.pane !== b.dataset.ad));
        }));
        GL.track && GL.track('job', `Job German · ${j.short}`);
      },
    };
  }

  function interview(j) {
    const iv = j.interview;
    return {
      html: `${back(j)}
        <h1>🤝 Das Vorstellungsgespräch</h1>
        <p class="muted">${esc(iv.intro)}</p>
        <div class="card job-play"><div>${GL.charSVG(j.id === 'sales' ? 'meier' : 'hartmann', 'idle')}</div><div><h3 style="margin:0">Practise the interview as a scene</h3><p class="muted" style="margin:.3em 0 .8em">${j.id === 'sales' ? 'The store manager asks you the typical questions' : 'First you call the head of the kitchen, then the interview: they ask the typical questions'} – you answer (and speak, if your browser supports it).</p><a class="btn green" href="#/scenes/${iv.scene}">▶ Start the interview ${doneScene(iv.scene) ? '(again)' : ''}</a></div></div>
        ${iv.call ? `<div class="card"><h3 style="margin-top:0">📞 Calling before you apply</h3><p class="muted" style="margin-top:0">The advert names a contact person. A short call with one or two good questions makes you stand out.</p>${iv.call.map(([de, en], i) => phraseRow(de, en, i)).join('')}</div>` : ''}
        <h2>❓ Questions they will probably ask</h2>
        <div class="iv-list">${iv.questions.map((x, i) => `<details class="iv-q" ${i === 0 ? 'open' : ''}><summary><span class="iv-no">${i + 1}</span><div><b>${esc(x.q)}</b><small>${esc(x.en)}</small></div></summary>
            <div class="iv-body"><div class="iv-row"><button class="say-btn" type="button" data-say="${attr(x.q)}" aria-label="Listen">🔊</button><span class="muted">Listen to the question</span></div>
              <div class="iv-ans"><span class="iv-lbl">Your answer (model)</span><p class="iv-de">${esc(x.a)}</p><p class="iv-en">${esc(x.aEn)}</p>
                <div class="row"><button class="btn small ghost" type="button" data-say="${attr(x.a.split(' / ')[0])}">🔊 Listen</button><button class="btn small iv-mic" type="button" data-t="${attr(x.a.split(' / ')[0].replace(/…/g, ''))}">🎤 Practise saying it</button></div><div class="iv-att"></div></div>
              ${x.tip ? `<p class="iv-tip">💡 ${esc(x.tip)}</p>` : ''}</div></details>`).join('')}</div>
        <div class="grid grid-2" style="margin-top:18px">
          <div class="card"><h3 style="margin-top:0">🙋 Questions you can ask them</h3>${iv.ask.map(([de, en], i) => phraseRow(de, en, i)).join('')}</div>
          <div class="card"><h3 style="margin-top:0">🛟 If you don’t understand</h3>${iv.rescue.map(([de, en], i) => phraseRow(de, en, i)).join('')}</div>
        </div>
        <div class="card"><h3 style="margin-top:0">✅ Tips for the day</h3><div class="iv-tips">${iv.tips.map(([ic, tt, d]) => `<div><span>${ic}</span><b>${esc(tt)}</b><small>${esc(d)}</small></div>`).join('')}</div></div>
        <p style="text-align:center"><a class="btn big gold" href="#/scenes/${iv.scene}">▶ Practise the interview</a> <a class="btn ghost" href="${j.base}/day/1">Day 1 at work →</a></p>`,
      mount() {
        const root = $('#app');
        wirePhrases(root);
        $$('.iv-mic', root).forEach((b) => (b.onclick = () => {
          const box = b.closest('.iv-ans').querySelector('.iv-att');
          if (box.innerHTML) { box.innerHTML = ''; return; }
          GL.Speak.attempt(box, { targets: [b.dataset.t], label: 'Say your answer:', pass: 65 });
        }));
        GL.track && GL.track('job', `Job German · ${j.short} · interview preparation`);
      },
    };
  }

  function day(j, n) {
    const d = j.days[n - 1];
    if (!d) return overview(j);
    const sc = GL.scenarios.find((x) => x.id === d.scene), last = j.days.length;
    return {
      html: `${back(j)}
        <div class="jd-head"><span class="jd-big">${d.day}</span><div><small>DAY ${d.day} OF ${last} · ${esc(sc.level)}</small><h1>${d.icon} ${esc(d.title)}</h1><p class="muted">${esc(d.en)} – ${esc(d.goal)}</p></div></div>
        <div class="jd-steps"><span class="on">1 · Learn the phrases</span><span>2 · Play the scene</span><span>3 · ${n < last ? 'Next day' : 'Done!'}</span></div>
        <div class="card"><div class="row"><h3 style="margin:0">🗣️ Today’s phrases</h3><span class="spacer"></span><span class="muted">🔊 listen · 🎤 say it</span></div>
          <div class="jp-list">${d.phrases.map(([de, en], i) => phraseRow(de, en, i)).join('')}</div></div>
        <div class="note">💡 ${esc(d.tip)}</div>
        <div class="card job-play"><div class="jp-thumb">${GL.sceneBG ? `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">${GL.sceneBG[sc.scenes[0].bg]()}</svg>` : ''}</div>
          <div><h3 style="margin:0">🎬 ${esc(sc.scenes.map((x) => x.title).join(' · '))}</h3><p class="muted" style="margin:.3em 0 .8em">${esc(j.you)}</p>
          <a class="btn green big" href="#/scenes/${sc.id}">▶ ${doneScene(sc.id) ? `Play again (best ${bestScene(sc.id)}%)` : 'Play the scene'}</a></div></div>
        <div class="row" style="justify-content:space-between">${n > 1 ? `<a class="btn ghost" href="${j.base}/day/${n - 1}">← Day ${n - 1}</a>` : `<a class="btn ghost" href="${j.base}/interview">← Interview</a>`}${n < last ? `<a class="btn ghost" href="${j.base}/day/${n + 1}">Day ${n + 1} →</a>` : `<a class="btn ghost" href="${j.base}">Overview</a>`}</div>`,
      mount() { wirePhrases($('#app')); GL.track && GL.track('job', `Job German · ${j.short} · Day ${n}: ${d.title}`); },
    };
  }

  /* ---------- onboarding plan ---------- */
  function plan(j) {
    if (!j.plan) return overview(j);
    const dayLink = (n) => { const d = j.days[n - 1]; return `<a class="chip ${doneScene(d.scene) ? 'done' : ''}" href="${j.base}/day/${n}">${doneScene(d.scene) ? '✓' : d.icon} Day ${n}</a>`; };
    return {
      html: `${back(j)}
        <h1>🗓️ Dein Einarbeitungsplan</h1>
        <p class="muted">What happens before your first day, on day 1 and in the months after – what to do, what to say and which practice days prepare you for it.</p>
        <ol class="plan-tl">${j.plan.map((st, i) => `<li style="animation-delay:${i * 0.06}s"><span class="pt-dot">${st.icon}</span>
            <div class="card"><div class="row"><h3 style="margin:0">${esc(st.when)}</h3><span class="muted">· ${esc(st.en)}</span></div>
              <h4>To do</h4>${list(st.todo)}
              <h4>What you say</h4>${st.phrases.map(([de, en], k) => phraseRow(de, en, k)).join('')}
              ${st.days.length ? `<h4>Practise it</h4><div class="chips">${st.days.map(dayLink).join('')}</div>` : ''}</div></li>`).join('')}</ol>
        ${j.dayFlow ? `<div class="card"><h3 style="margin-top:0">⏰ Ein typischer Arbeitstag</h3><p class="muted" style="margin-top:0">Listen and repeat – times the German way (halb sieben = 6:30!).</p>
          <div class="day-flow">${j.dayFlow.map(([tm, de, en], i) => `<div class="df-row"><span class="df-time">${tm}</span>${phraseRow(de, en, i)}</div>`).join('')}</div></div>` : ''}
        <p style="text-align:center"><a class="btn green big" href="${j.base}/day/1">▶ Start Day 1</a></p>`,
      mount() { wirePhrases($('#app')); GL.track && GL.track('job', `Job German · ${j.short} · onboarding plan`); },
    };
  }

  /* ---------- job vocabulary + quiz ---------- */
  const ART = /^(der|die|das) ([^/()]+)$/;
  function words(j) {
    if (!j.words) return overview(j);
    const all = j.words.flatMap((g) => g.w);
    return {
      html: `${back(j)}
        <h1>📚 Fachwortschatz</h1>
        <p class="muted">The words you will hear every day – grouped by topic. 🔊 listen, 🎤 say it, then test yourself in the quiz (meanings and der/die/das).</p>
        <div class="card wq" id="wq"><div class="row"><h3 style="margin:0">🎯 Word quiz</h3><span class="spacer"></span><span class="pill" id="wqScore"></span></div>
          <div id="wqBody"><p class="muted">10 questions from all ${all.length} words. Ready?</p><button class="btn green" type="button" id="wqStart">▶ Start the quiz</button></div></div>
        ${j.words.map((g, i) => `<details class="card word-grp" ${i === 0 ? 'open' : ''}><summary><span>${g.icon}</span><b>${esc(g.title)}</b><small>${esc(g.en)} · ${g.w.length}</small></summary>
          <div class="jp-list">${g.w.map(([de, en], k) => phraseRow(de, en, k)).join('')}</div></details>`).join('')}`,
      mount() {
        const root = $('#app');
        wirePhrases(root);
        const body = $('#wqBody', root), score = $('#wqScore', root);
        function start() {
          const qs = shuffle(all.slice()).slice(0, 10).map(([de, en]) => {
            const m = de.match(ART);
            if (m && Math.random() < 0.4) return { type: 'art', de, prompt: `Der, die oder das? <b>___ ${esc(m[2])}</b>`, o: ['der', 'die', 'das'], a: ['der', 'die', 'das'].indexOf(m[1]), en };
            const wrong = shuffle(all.filter((w) => w[1] !== en)).slice(0, 2).map((w) => w[1]);
            const o = shuffle([en, ...wrong]);
            return { type: 'mean', de, prompt: `What does <b>${esc(de)}</b> mean?`, o, a: o.indexOf(en), en };
          });
          let i = 0, right = 0;
          const show = () => {
            score.textContent = `${right} / ${i}`;
            if (i >= qs.length) {
              body.innerHTML = `<div class="center"><h3>${right >= 8 ? '🎉 Super!' : right >= 5 ? '👍 Gut gemacht!' : '💪 Weiter üben!'} ${right} / ${qs.length}</h3><button class="btn green" type="button" id="wqAgain">🔁 New quiz</button></div>`;
              $('#wqAgain', body).onclick = start;
              GL.track && GL.track('job', `Job German · ${j.short} · word quiz ${right}/${qs.length}`);
              if (right >= 8) { GL.confetti && GL.confetti(); Store.addXP && (Store.addXP(10), Store.save()); }
              return;
            }
            const q = qs[i];
            body.innerHTML = `<p class="wq-q">${i + 1}. ${q.prompt} <button class="say-btn" type="button" data-say="${attr(q.de)}" aria-label="Listen">🔊</button></p>
              <div class="wq-opts">${q.o.map((o, k) => `<button class="btn ghost" type="button" data-k="${k}">${esc(o)}</button>`).join('')}</div><div class="wq-fb"></div>`;
            $$('.wq-opts button', body).forEach((b) => (b.onclick = () => {
              const k = +b.dataset.k, ok = k === q.a;
              if (ok) right++;
              GL.sfx && GL.sfx(ok ? 'ok' : 'bad');
              $$('.wq-opts button', body).forEach((x) => { x.disabled = true; if (+x.dataset.k === q.a) x.classList.add('right'); });
              if (!ok) b.classList.add('wrong');
              $('.wq-fb', body).innerHTML = `<p>${ok ? '✅ Richtig!' : '❌ Leider falsch.'} <b>${esc(q.de)}</b> = ${esc(q.en)}</p><button class="btn green small" type="button" id="wqNext">${i + 1 < qs.length ? 'Next →' : 'Result'}</button>`;
              score.textContent = `${right} / ${i + 1}`;
              $('#wqNext', body).onclick = () => { i++; show(); };
            }));
          };
          show();
        }
        $('#wqStart', body).onclick = start;
        GL.track && GL.track('job', `Job German · ${j.short} · vocabulary`);
      },
    };
  }

  /* ---------- typical mistakes: which sentence is right? ---------- */
  function fix(j) {
    if (!j.fixes) return overview(j);
    return {
      html: `${back(j)}
        <h1>✏️ Typische Fehler</h1>
        <p class="muted">Mistakes learners often make at work – in the kitchen, with patients and on the phone. Pick the correct sentence, read why, then 🔊 listen and 🎤 say the right version.</p>
        <div class="row" style="margin-bottom:10px"><span class="pill" id="fxScore">✓ 0 / 0</span><span class="spacer"></span><button class="btn small ghost" type="button" id="fxReset">🔁 Shuffle & restart</button></div>
        <div class="fx-list" id="fxList"></div>`,
      mount() {
        const root = $('#app'), box = $('#fxList', root), score = $('#fxScore', root);
        let right = 0, answered = 0;
        function render() {
          right = answered = 0; score.textContent = '✓ 0 / 0';
          box.innerHTML = shuffle(j.fixes.slice()).map((f, i) => {
            const opts = shuffle([[f.good, 1], [f.bad, 0]]);
            return `<div class="card fx" style="animation-delay:${Math.min(i, 10) * 0.04}s"><div class="fx-n">${i + 1}</div><p class="fx-q">Which sentence is correct?</p>
              <div class="fx-opts">${opts.map(([s, ok]) => `<button class="btn ghost" type="button" data-ok="${ok}">${esc(s)}</button>`).join('')}</div>
              <div class="fx-why" hidden><p>❌ <s>${esc(f.bad)}</s></p><p>✅ <b>${esc(f.good)}</b></p><p class="muted">💡 ${esc(f.why)}</p>
                <div class="jp-list">${phraseRow(f.good, 'Say the correct sentence', 0)}</div></div></div>`;
          }).join('');
          $$('.fx', box).forEach((card) => {
            $$('.fx-opts button', card).forEach((b) => (b.onclick = () => {
              const ok = b.dataset.ok === '1';
              answered++; if (ok) right++;
              GL.sfx && GL.sfx(ok ? 'ok' : 'bad');
              $$('.fx-opts button', card).forEach((x) => { x.disabled = true; x.classList.add(x.dataset.ok === '1' ? 'right' : 'wrong'); });
              card.classList.add(ok ? 'ok' : 'no');
              $('.fx-why', card).hidden = false;
              score.textContent = `✓ ${right} / ${answered}`;
              if (answered === j.fixes.length) { GL.track && GL.track('job', `Job German · ${j.short} · mistakes ${right}/${answered}`); if (right === answered && GL.confetti) GL.confetti(); }
            }));
          });
          wirePhrases(box);
        }
        $('#fxReset', root).onclick = render;
        render();
      },
    };
  }

  GL.viewJob = function (a, b, c) {
    const j = byId(a);
    if (j) {
      if (b === 'interview') return interview(j);
      if (b === 'day') return day(j, +c || 1);
      if (b === 'plan') return plan(j);
      if (b === 'words') return words(j);
      if (b === 'fix') return fix(j);
      return overview(j);
    }
    /* old links: #/job/interview, #/job/day/N → Sales Advisor */
    const sales = byId('sales');
    if (sales && a === 'interview') return interview(sales);
    if (sales && a === 'day') return day(sales, +b || 1);
    return hub();
  };
})();
