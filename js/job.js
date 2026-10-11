/* JOB GERMAN – pages for the Sales Advisor track: overview (#/job), interview preparation (#/job/interview)
   and the 15 work days (#/job/day/N). The animated scenes themselves run in the normal scene player. */
(function () {
  'use strict';
  const { $, $$, esc, attr, Store } = GL;
  const J = () => GL.job;
  const doneScene = (id) => !!(((Store.state.scenes || {})[id] || {}).done);
  const bestScene = (id) => ((Store.state.scenes || {})[id] || {}).best;

  /* a phrase row: listen (global [data-say] handler) + speak practice */
  const phraseRow = (de, en, i) => `<div class="jp-row" style="animation-delay:${Math.min(i, 12) * 0.03}s">
      <button class="say-btn" type="button" data-say="${attr(de)}" aria-label="Listen">🔊</button>
      <div class="jp-txt"><b>${esc(de)}</b><small>${esc(en)}</small></div>
      <button class="btn tiny ghost jp-mic" type="button" data-t="${attr(de)}" title="Practise saying it">🎤</button>
      <div class="jp-att"></div></div>`;
  function wirePhrases(root) {
    $$('.jp-mic', root).forEach((b) => (b.onclick = () => {
      const box = b.parentElement.querySelector('.jp-att');
      if (box.innerHTML) { box.innerHTML = ''; return; }
      $$('.jp-att', root).forEach((x) => { if (x !== box) x.innerHTML = ''; });
      GL.Speak.attempt(box, { targets: [b.dataset.t], label: 'Say it in German:', pass: 75 });
    }));
  }

  function overview() {
    const j = J(), ad = j.advert;
    const done = j.days.filter((d) => doneScene(d.scene)).length + (doneScene(j.interview.scene) ? 1 : 0);
    const next = j.days.find((d) => !doneScene(d.scene));
    return {
      html: `<section class="job-hero">
          <div class="jh-text"><span class="jh-pill">💼 JOB GERMAN</span>
            <h1>Sales Advisor im Modegeschäft</h1>
            <p>Interview preparation and <b>15 days in the job</b> – from your first “Hallo” to handling the Saturday rush. Every day: the key phrases (listen &amp; speak) and an animated scene where <b>you are the new Sales Advisor</b>. Made for the advert <i>“${esc(ad.role)}”</i> – ${esc(ad.place)}.</p>
            <div class="jh-prog"><div class="jh-bar"><i style="width:${Math.round((done / 16) * 100)}%"></i></div><small>${done} of 16 done</small></div>
            <div class="row"><a class="btn gold big" href="#/job/interview">🤝 Interview preparation</a>${next ? `<a class="btn ghost jh-ghost" href="#/job/day/${next.day}">▶ ${done ? 'Continue' : 'Start'}: Day ${next.day}</a>` : ''}</div></div>
          <div class="jh-art">${GL.charSVG('lisa', 'idle waving')}${GL.charSVG('alex', 'idle')}</div>
        </section>
        <div class="grid grid-2 job-ad">
          <div class="card"><h3 style="margin-top:0">🧾 The job</h3><ul class="job-list">${ad.tasks.map(([de, en]) => `<li><b>${esc(de)}</b><small>${esc(en)}</small></li>`).join('')}</ul>
            <h4>What they want</h4><ul class="job-list">${ad.want.map(([de, en]) => `<li><b>${esc(de)}</b><small>${esc(en)}</small></li>`).join('')}</ul></div>
          <div class="card"><h3 style="margin-top:0">🪜 How the application works</h3><ol class="job-steps">${ad.process.map(([ic, t, d]) => `<li><span>${ic}</span><div><b>${esc(t)}</b><small>${esc(d)}</small></div></li>`).join('')}</ol>
            <h4>Benefits in the advert</h4><div class="chips">${ad.benefits.map((b) => `<span class="chip">${esc(b)}</span>`).join('')}</div></div>
        </div>
        <h2>📅 15 days in the job</h2>
        <div class="job-days">
          <a class="job-day jd-int ${doneScene(j.interview.scene) ? 'done' : ''}" href="#/job/interview"><span class="jd-no">🤝</span><div><b>Vorbereitung: Das Vorstellungsgespräch</b><small>16 questions & answers · interview scene</small></div>${doneScene(j.interview.scene) ? '<span class="jd-ok">✓</span>' : ''}</a>
          ${j.days.map((d) => `<a class="job-day ${doneScene(d.scene) ? 'done' : ''}" href="#/job/day/${d.day}"><span class="jd-no">${d.day}</span><div><b>${d.icon} ${esc(d.title)}</b><small>${esc(d.en)}</small></div>${doneScene(d.scene) ? `<span class="jd-ok">✓${bestScene(d.scene) != null ? ` ${bestScene(d.scene)}%` : ''}</span>` : ''}</a>`).join('')}
        </div>`,
    };
  }

  function interview() {
    const iv = J().interview;
    return {
      html: `<p><a href="#/job">← Job German</a></p>
        <h1>🤝 Das Vorstellungsgespräch</h1>
        <p class="muted">${esc(iv.intro)}</p>
        <div class="card job-play"><div>${GL.charSVG('meier', 'idle')}</div><div><h3 style="margin:0">Practise the interview as a scene</h3><p class="muted" style="margin:.3em 0 .8em">The store manager asks you the typical questions – you answer (and speak, if your browser supports it).</p><a class="btn green" href="#/scenes/${iv.scene}">▶ Start the interview ${doneScene(iv.scene) ? '(again)' : ''}</a></div></div>
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
        <div class="card"><h3 style="margin-top:0">✅ Tips for the day</h3><div class="iv-tips">${iv.tips.map(([ic, t, d]) => `<div><span>${ic}</span><b>${esc(t)}</b><small>${esc(d)}</small></div>`).join('')}</div></div>
        <p style="text-align:center"><a class="btn big gold" href="#/scenes/${iv.scene}">▶ Practise the interview</a> <a class="btn ghost" href="#/job/day/1">Day 1 at work →</a></p>`,
      mount() {
        const root = $('#app');
        wirePhrases(root);
        $$('.iv-mic', root).forEach((b) => (b.onclick = () => {
          const box = b.closest('.iv-ans').querySelector('.iv-att');
          if (box.innerHTML) { box.innerHTML = ''; return; }
          GL.Speak.attempt(box, { targets: [b.dataset.t], label: 'Say your answer:', pass: 65 });
        }));
        GL.track && GL.track('job', 'Job German · interview preparation');
      },
    };
  }

  function day(n) {
    const j = J(), d = j.days[n - 1];
    if (!d) return overview();
    const sc = GL.scenarios.find((x) => x.id === d.scene);
    return {
      html: `<p><a href="#/job">← Job German</a></p>
        <div class="jd-head"><span class="jd-big">${d.day}</span><div><small>DAY ${d.day} OF 15 · ${esc(sc.level)}</small><h1>${d.icon} ${esc(d.title)}</h1><p class="muted">${esc(d.en)} – ${esc(d.goal)}</p></div></div>
        <div class="jd-steps"><span class="on">1 · Learn the phrases</span><span>2 · Play the scene</span><span>3 · ${n < 15 ? 'Next day' : 'Done!'}</span></div>
        <div class="card"><div class="row"><h3 style="margin:0">🗣️ Today’s phrases</h3><span class="spacer"></span><span class="muted">🔊 listen · 🎤 say it</span></div>
          <div class="jp-list">${d.phrases.map(([de, en], i) => phraseRow(de, en, i)).join('')}</div></div>
        <div class="note">💡 ${esc(d.tip)}</div>
        <div class="card job-play"><div class="jp-thumb">${GL.sceneBG ? `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">${GL.sceneBG[sc.scenes[0].bg]()}</svg>` : ''}</div>
          <div><h3 style="margin:0">🎬 ${esc(sc.scenes.map((x) => x.title).join(' · '))}</h3><p class="muted" style="margin:.3em 0 .8em">You are Alex, the new Sales Advisor. Listen, choose the right sentence – and say it out loud.</p>
          <a class="btn green big" href="#/scenes/${sc.id}">▶ ${doneScene(sc.id) ? `Play again (best ${bestScene(sc.id)}%)` : 'Play the scene'}</a></div></div>
        <div class="row" style="justify-content:space-between">${n > 1 ? `<a class="btn ghost" href="#/job/day/${n - 1}">← Day ${n - 1}</a>` : '<a class="btn ghost" href="#/job/interview">← Interview</a>'}${n < 15 ? `<a class="btn ghost" href="#/job/day/${n + 1}">Day ${n + 1} →</a>` : '<a class="btn ghost" href="#/job">Overview</a>'}</div>`,
      mount() { wirePhrases($('#app')); GL.track && GL.track('job', `Job German · Day ${n}: ${d.title}`); },
    };
  }

  GL.viewJob = function (a, b) {
    if (a === 'interview') return interview();
    if (a === 'day') return day(+b || 1);
    return overview();
  };
})();
