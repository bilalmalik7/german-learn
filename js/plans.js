/* Course plans & payments.
   Plans and prices live here (change them in one place). On the website version the teacher assigns each student a
   plan and records payments in the teacher portal; the plan decides which parts of the course open. Inside claude.ai
   (no accounts server) every part stays open and this page only shows the prices. */
(function () {
  'use strict';
  const { $, $$, esc, attr } = GL;

  /* Master switch: false = the whole course is free for everyone (no plans, no locks, no payment tools). */
  const ENABLED = false;
  const CURRENCY = 'Rs';
  /* WhatsApp contact for joining / payments */
  const WA = '4915567783533', WA_SHOW = '+49 155 67783533';
  const waLink = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text || 'Hallo! I would like to join the German course (Deutsch30).')}`;
  /* free trial for visitors and students without a plan */
  const FREE_SCENE = 'supermarkt';
  const BROWSE = ['scenes', 'writing', 'grammar']; // overview pages that can be looked at without a plan
  const PLANS = [
    { id: 'basic', name: 'Basic', icon: '🌱', price: 5000, color: '#22b573', tagline: 'The complete 30-day course',
      features: ['All 30 daily lessons – vocabulary, grammar, dialogues, exercises', 'Grammar A–Z reference (62 topics)', 'Grammar trainer: verbs, articles & cases, adjective endings', 'Review: flashcards, mistakes notebook, quizzes', 'Pronunciation guide (sounds)', 'Progress & study time saved to your account'],
      pages: ['day', 'grammar', 'trainer', 'review', 'sounds'] },
    { id: 'standard', name: 'Standard', icon: '🚀', price: 7000, color: '#3a86ff', popular: true, tagline: 'Course + real-life practice',
      features: ['Everything in Basic', '22 animated real-life scenes (doctor, Bahnhof, job interview …)', 'Speaking practice: pronunciation score, shadowing, “say it in German”', 'Writing studio with 20 tasks and quick check', 'Certificate when you finish the 30 days'],
      pages: ['day', 'grammar', 'trainer', 'review', 'sounds', 'scenes', 'talk', 'writing'] },
    { id: 'plus', name: 'Plus', icon: '👑', price: 10000, color: '#f4a100', tagline: 'Everything + your teacher & AI tutor',
      features: ['Everything in Standard', 'Personal teacher: send questions & texts, get corrections', 'AI tutor – ask anything, AI conversations', 'AI writing analysis with corrections', 'Priority answers from your teacher'],
      pages: ['day', 'grammar', 'trainer', 'review', 'sounds', 'scenes', 'talk', 'writing', 'teacher'], ai: true },
  ];
  const byId = (id) => PLANS.find((p) => p.id === id) || null;
  const money = (n) => `${CURRENCY} ${Number(n || 0).toLocaleString('en-US')}`;
  const today = () => GL.todayStr();
  const fmtD = (d) => (d ? new Date(d + 'T12:00').toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '–');
  const GRACE_DAYS = 3;

  /* the logged-in student's plan (website version only) */
  const sess = () => (window.D30 && D30.standalone && D30.session && D30.session()) || null;
  function mine() {
    const s = sess();
    if (!s || s.user.role !== 'student') return null;
    return { plan: byId(s.user.plan), paidUntil: s.user.paidUntil || '' };
  }
  function daysLeft(paidUntil) { return paidUntil ? Math.round((new Date(paidUntil + 'T12:00') - new Date(today() + 'T12:00')) / 864e5) : null; }
  function expired() { const m = mine(); if (!m || !m.paidUntil) return false; return daysLeft(m.paidUntil) < -GRACE_DAYS; }
  /* who may open what: null = no limits (claude.ai, plain copy, teacher) */
  const PLAN_PAGES = ['day', 'grammar', 'trainer', 'review', 'sounds', 'scenes', 'talk', 'writing', 'teacher'];
  function access() {
    if (!ENABLED || !(window.D30 && D30.standalone)) return null;
    const s = D30.session && D30.session();
    if (s && s.user.role === 'teacher') return null;
    if (!s) return D30.guest && D30.guest() ? { tier: 'free', guest: true } : null;
    const m = mine();
    if (expired()) return { tier: 'expired' };
    if (!m || !m.plan) return { tier: 'free' };
    return { tier: 'plan', plan: m.plan };
  }
  const isFree = (page, a) => (page === 'day' && (+a || 1) === 1) || (page === 'scenes' && a === FREE_SCENE) || (BROWSE.includes(page) && !a);
  /* null = allowed, otherwise the reason it is locked: 'free' | 'expired' | 'upgrade' */
  function lockReason(page, a) {
    if (!PLAN_PAGES.includes(page)) return null;
    const ac = access();
    if (!ac) return null;
    if (ac.tier === 'plan') return ac.plan.pages.includes(page) ? null : 'upgrade';
    return isFree(page, a) ? null : ac.tier;
  }
  /* mark locked / free links on the current page */
  function decorate() {
    const ac = access();
    if (!ac) return;
    animateTrial();
    // trial users: show the free scene first in the scenes list
    if (ac.tier !== 'plan') { const fs = $$(`#app a[href="#/scenes/${FREE_SCENE}"]`).find((x) => !x.closest('.trial-hero, .lock-card, .trial-card')); if (fs && fs.parentElement && fs.parentElement.firstElementChild !== fs && !fs.closest('.lock-card, .trial-card, .trial-hero')) fs.parentElement.prepend(fs); }
    $$('#app a[href^="#/"]').forEach((el) => {
      // badges only on cards / tiles, not on buttons or links inside a sentence
      if (el.closest('.lock-card, .trial-card, .trial-hero, .note, p, li') || el.classList.contains('node') || el.classList.contains('btn') || el.classList.contains('chip') || getComputedStyle(el).display === 'inline') return;
      const [page, a] = el.getAttribute('href').slice(2).split('/');
      const locked = !!lockReason(page, a);
      const free = !locked && ac.tier !== 'plan' && ((page === 'day' && (+a || 1) === 1 && a) || (page === 'scenes' && a === FREE_SCENE));
      const old = el.querySelector(':scope > .lock-badge');
      if (old) old.remove();
      el.classList.toggle('plan-locked', locked);
      if (!locked && !free) return;
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      el.insertAdjacentHTML('beforeend', `<span class="lock-badge ${free ? 'free' : ''}" aria-label="${free ? 'free' : 'locked'}">${free ? 'FREE' : '🔒'}</span>`);
    });
  }
  function needed(page) { return PLANS.find((p) => p.pages.includes(page)) || PLANS[PLANS.length - 1]; }
  // AI features are part of Plus
  (function gateAI() { const ac = access(); if (ac && !(ac.tier === 'plan' && ac.plan.ai)) GL.AI.disabled = true; })();

  function cardsHTML(current, opts) {
    opts = opts || {};
    return `<div class="plan-grid">${PLANS.map((p) => `<div class="plan-card ${p.popular ? 'popular' : ''} ${current === p.id ? 'current' : ''}" style="--pc:${p.color}">
      ${p.popular ? '<span class="plan-ribbon">Most popular</span>' : ''}${current === p.id ? '<span class="plan-ribbon mine">Your plan</span>' : ''}
      <div class="plan-ico">${p.icon}</div><h3>${esc(p.name)}</h3><p class="muted plan-tag">${esc(p.tagline)}</p>
      <div class="plan-price">${money(p.price)}<small> / month</small></div>
      <ul class="plan-feat">${p.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
      ${opts.buttons ? (current === p.id ? '<button class="btn ghost" disabled>✓ Your current plan</button>' : `<a class="btn plan-pick" data-plan="${p.id}" style="background:${p.color}" target="_blank" rel="noopener" href="${attr(waLink(`Hallo! I would like the ${p.name} plan (${money(p.price)} / month) for the German course Deutsch30.`))}">💬 ${current && byId(current) && byId(current).price > p.price ? 'Switch to' : 'Get'} ${esc(p.name)}</a>`) : ''}
    </div>`).join('')}</div>`;
  }

  const waCard = (title, text) => `<div class="wa-card"><div class="wa-ico">💬</div><div><b>${title}</b><br><span class="muted">${text}</span></div>
    <a class="btn wa-btn" target="_blank" rel="noopener" href="${attr(waLink())}">WhatsApp ${WA_SHOW}</a></div>`;
  const trialHTML = () => { const sc = (GL.scenarios || []).find((x) => x.id === FREE_SCENE); return `<div class="trial-card"><b>🎁 Free trial</b> – try <a href="#/day/1">📅 Day 1</a> and the real-life scene <a href="#/scenes/${FREE_SCENE}">${sc ? sc.icon + ' ' + esc(sc.title) : 'Supermarket'}</a> for free. Everything else you can look at – it opens with a plan.</div>`; };

  /* ---------- student / visitor page: #/plans ---------- */
  function viewPlans() {
    const m = mine(), s = sess(), ac = access();
    const cur = m && m.plan ? m.plan.id : '';
    const left = m ? daysLeft(m.paidUntil) : null;
    const status = !m ? '' : !m.plan ? '<div class="note">You don’t have a plan yet – you are on the free trial. Choose a plan below and pay as described; your teacher then activates it.</div>'
      : `<div class="plan-status ${left != null && left < 0 ? 'late' : left != null && left <= 5 ? 'soon' : ''}"><span class="plan-ico">${m.plan.icon}</span><div><b>Your plan: ${esc(m.plan.name)}</b> · ${money(m.plan.price)} / month<br>
        <span class="muted">${!m.paidUntil ? 'Payment period not set yet' : left >= 0 ? `Paid until <b>${fmtD(m.paidUntil)}</b> (${left} day${left === 1 ? '' : 's'} left)` : `Payment was due on <b>${fmtD(m.paidUntil)}</b>${expired() ? ' – lessons are paused until your teacher records the payment' : ` – please pay within ${GRACE_DAYS + left + 1} day(s)`}`}</span></div></div>`;
    return {
      html: `<h1>💳 Plans & payment</h1>
        <p class="muted">One price per month, no hidden costs. ${s ? '' : 'Log in to see your own plan.'}</p>
        ${waCard('Join the course or ask a question', 'Message me on WhatsApp – I’ll set up your login and plan.')}
        ${status}
        ${ac && ac.tier !== 'plan' ? trialHTML() : ''}
        ${cardsHTML(cur, { buttons: !s || s.user.role !== 'teacher' })}
        <div class="card"><h3 style="margin-top:0">💸 How to pay</h3>
          ${window.D30 && D30.payInfo ? `<div class="pay-info">${esc(D30.payInfo).replace(/\n/g, '<br>')}</div>` : '<p>Please pay your teacher directly (cash, bank transfer, JazzCash / EasyPaisa). Your teacher records the payment and your plan is activated right away.</p>'}
          <p class="muted" style="margin-bottom:0">After paying, send a message on <a target="_blank" rel="noopener" href="${attr(waLink('Hallo! I have paid for my Deutsch30 plan.'))}">WhatsApp ${WA_SHOW}</a> with the plan you chose. Your plan runs for one month from the payment.</p></div>
        <div id="planInfo" class="muted"></div>`,
      mount() {
        // the plan buttons open WhatsApp; logged-in students also leave the request in the teacher's inbox
        $$('.plan-pick').forEach((b) => b.addEventListener('click', async () => {
          const p = byId(b.dataset.plan), info = $('#planInfo');
          if (!m) return;
          try {
            await GL.Cloud.init;
            if (!GL.Cloud.ready) return;
            await GL.Cloud.send('other', `I would like the ${p.name} plan (${money(p.price)} / month).`, 'Plan request');
            info.innerHTML = `✅ Your request for <b>${esc(p.name)}</b> is also in your teacher’s inbox.`;
          } catch (e) { /* WhatsApp is enough */ }
        }));
      },
    };
  }

  function lockedWhat(page, a) {
    if (page === 'day') { const d = GL.days[(+a || 1) - 1]; return d ? `📅 Day ${d.day}: ${d.title}` : 'This lesson'; }
    if (page === 'scenes') { const sc = GL.scenarios.find((x) => x.id === a); return sc ? `${sc.icon} ${sc.title} – ${sc.en}` : 'This scene'; }
    return ({ grammar: '📘 Grammar topics', trainer: '🏋️ Grammar trainer', review: '🔁 Review & flashcards', sounds: '🗣️ Pronunciation guide', talk: '🎤 Speaking practice', writing: '✍️ Writing studio', teacher: '📨 Messages to your teacher' })[page] || 'This part of the course';
  }
  function viewLockedPlan(page, reason, a) {
    const need = needed(page), m = mine(), ac = access() || {};
    if (reason === 'free') {
      return {
        html: `<div class="card lock-card lock-rich">
          <span class="lock-big" aria-hidden="true">🔒</span>
          <h1>Part of the full course</h1>
          ${previewHTML(page, a) || `<p class="lock-what">${esc(lockedWhat(page, a))}</p>`}
          <p>${ac.guest ? 'You are trying the course without a login.' : 'You are on the free trial.'} Free to try: <b>Day 1</b> and the real-life scene <b>“Im Supermarkt”</b>. Everything else opens with a plan – from <b>${money(PLANS[0].price)} / month</b>.</p>
          <div class="row" style="justify-content:center"><a class="btn wa-btn big" target="_blank" rel="noopener" href="${attr(waLink(`Hallo! I would like to join the German course Deutsch30 (I was looking at: ${lockedWhat(page, a)}).`))}">💬 WhatsApp ${WA_SHOW}</a><a class="btn ghost" href="#/plans">💳 See plans</a></div>
          <div class="row" style="justify-content:center;margin-top:8px"><a class="btn small ghost" href="#/day/1">▶ Try Day 1 free</a><a class="btn small ghost" href="#/scenes/${FREE_SCENE}">🎬 Try the free scene</a>${ac.guest ? '<button class="btn small ghost" id="lockLogin2" type="button">🔐 Log in</button>' : ''}</div></div>`,
        mount() {
          const b = $('#lockLogin2'); if (b) b.onclick = () => D30.showLogin();
          $$('.pv-word').forEach((w) => w.addEventListener('click', () => w.classList.add('said'))); // audio: the global [data-say] handler
        },
      };
    }
    return {
      html: `<div class="card lock-card">${GL.charSVG('bruno', 'idle thinking')}
        ${reason === 'expired' ? `<h1>⏸️ Your plan has ended</h1><p>Your payment period ended on <b>${fmtD(m.paidUntil)}</b>. Please pay for the next month – as soon as your teacher records it, everything opens again. Your progress is safe.</p>`
          : `<h1>${need.icon} Part of the ${esc(need.name)} plan</h1><p>This part of the course is included from the <b>${esc(need.name)}</b> plan (${money(need.price)} / month). Your plan: <b>${esc(m.plan.name)}</b>.</p>`}
        <div class="row" style="justify-content:center"><a class="btn green big" href="#/plans">💳 See plans & how to pay</a><a class="btn wa-btn" target="_blank" rel="noopener" href="${attr(waLink(reason === 'expired' ? 'Hallo! I would like to renew my Deutsch30 plan.' : `Hallo! I would like to upgrade to the ${need.name} plan (Deutsch30).`))}">💬 WhatsApp</a></div></div>`,
    };
  }

  /* ---------- teacher portal helpers ---------- */
  function payState(u) {
    if (!u || !u.plan) return { key: 'none', label: 'No plan' };
    const left = daysLeft(u.paidUntil);
    if (left == null) return { key: 'unset', label: 'Not paid yet' };
    if (left < 0) return { key: 'overdue', label: `Overdue ${-left} day${left === -1 ? '' : 's'}`, left };
    if (left <= 5) return { key: 'soon', label: `Due in ${left} day${left === 1 ? '' : 's'}`, left };
    return { key: 'paid', label: `Paid until ${fmtD(u.paidUntil)}`, left };
  }
  const planChip = (u) => { const p = byId(u && u.plan), ps = payState(u); return `${p ? `<span class="plan-chip" style="--pc:${p.color}">${p.icon} ${esc(p.name)}</span>` : '<span class="plan-chip none">– no plan</span>'}<br><small class="pay-${ps.key}">${esc(ps.label)}</small>`; };
  const thisMonth = () => today().slice(0, 7);
  function revenue(users) {
    let month = 0, total = 0;
    users.forEach((u) => (u.payments || []).forEach((p) => { total += p.amount || 0; if (String(p.date).slice(0, 7) === thisMonth()) month += p.amount || 0; }));
    return { month, total };
  }
  function planBoxHTML(u) {
    if (!u) return '';
    const p = byId(u.plan), ps = payState(u);
    const pays = (u.payments || []).slice().reverse();
    return `<div class="plan-box" data-u="${attr(u.username)}"><h4 style="margin-top:0">💳 Plan & payments</h4>
      <div class="plan-form">
        <label>Plan<select class="txt-in" id="pbPlan"><option value="">– no plan –</option>${PLANS.map((x) => `<option value="${x.id}" ${u.plan === x.id ? 'selected' : ''}>${x.icon} ${x.name} · ${money(x.price)}</option>`).join('')}</select></label>
        <label>Paid until<input class="txt-in" type="date" id="pbUntil" value="${attr(u.paidUntil || '')}"></label>
        <button class="btn small" id="pbSave" type="button">💾 Save</button>
      </div>
      <p class="muted" style="margin:4px 0 10px">Status: <b class="pay-${ps.key}">${esc(ps.label)}</b>${p ? '' : ' – without a plan the student only has the free trial (Day 1 + one scene).'}</p>
      <details class="pay-add" ${ps.key === 'overdue' || ps.key === 'unset' ? 'open' : ''}><summary><b>➕ Record a payment</b> <span class="muted">(extends the plan by 1 month)</span></summary>
        <div class="plan-form">
          <label>Amount (${CURRENCY})<input class="txt-in" type="number" min="0" step="100" id="pbAmount" value="${p ? p.price : ''}"></label>
          <label>Date<input class="txt-in" type="date" id="pbDate" value="${today()}"></label>
          <label>Method<select class="txt-in" id="pbMethod">${['Cash', 'Bank transfer', 'JazzCash', 'EasyPaisa', 'Other'].map((x) => `<option>${x}</option>`).join('')}</select></label>
          <label class="wide">Note<input class="txt-in" id="pbNote" maxlength="200" placeholder="optional, e.g. October"></label>
          <button class="btn small green" id="pbPay" type="button">✅ Record payment</button>
        </div></details>
      ${pays.length ? `<table class="gtable pay-table"><thead><tr><th>Date</th><th>Amount</th><th>Plan</th><th>Method</th><th>Note</th><th></th></tr></thead><tbody>${pays.map((x) => `<tr><td>${fmtD(x.date)}</td><td><b>${money(x.amount)}</b></td><td>${esc((byId(x.plan) || {}).name || '–')}</td><td>${esc(x.method || '')}</td><td>${esc(x.note || '')}</td><td><button class="btn tiny ghost pb-del" data-id="${attr(x.id)}" title="Delete this payment">✖</button></td></tr>`).join('')}</tbody></table><p class="muted" style="margin:4px 0 0">Total paid: <b>${money(pays.reduce((a, x) => a + (x.amount || 0), 0))}</b></p>` : '<p class="muted" style="margin:0">No payments recorded yet.</p>'}
      <span class="muted" id="pbInfo"></span></div>`;
  }
  function wirePlanBox(root, after) {
    const box = $('.plan-box', root);
    if (!box) return;
    const username = box.dataset.u, info = $('#pbInfo', box);
    const upd = async (body, ok) => {
      info.textContent = 'Saving…';
      try { await D30.call('users.update', Object.assign({ username }, body)); await D30.users(true); GL.toast(ok, 'ok'); GL.sfx('ok'); after(); }
      catch (e) { info.textContent = e.message || 'Could not save – try again.'; }
    };
    $('#pbPlan', box).onchange = () => { const p = byId($('#pbPlan', box).value); if (p) $('#pbAmount', box).value = p.price; };
    $('#pbSave', box).onclick = () => upd({ plan: $('#pbPlan', box).value, paidUntil: $('#pbUntil', box).value }, '✅ Plan saved');
    $('#pbPay', box).onclick = () => {
      const amount = +$('#pbAmount', box).value;
      if (!(amount > 0)) { info.textContent = 'Enter the amount.'; return; }
      upd({ plan: $('#pbPlan', box).value, addPayment: { amount, date: $('#pbDate', box).value, method: $('#pbMethod', box).value, note: $('#pbNote', box).value.trim(), plan: $('#pbPlan', box).value } }, `✅ Payment of ${money(amount)} recorded – plan extended by 1 month`);
    };
    $$('.pb-del', box).forEach((b) => (b.onclick = () => { if (!b.dataset.sure) { b.dataset.sure = '1'; b.textContent = 'Delete?'; return; } upd({ removePayment: b.dataset.id }, 'Payment deleted'); }));
  }
  function payInfoHTML(text) {
    return `<details class="card pay-settings"><summary><h3 style="display:inline;margin:0">💸 Plans & payment instructions</h3> <span class="muted">what students see on “💳 Plans”</span></summary>
      ${cardsHTML('', {})}
      <label class="muted" for="payInfoTxt">How students should pay you (bank account, JazzCash / EasyPaisa number, cash …)</label>
      <textarea class="txt-in" id="payInfoTxt" rows="4" style="width:100%;margin-top:4px" maxlength="1500" placeholder="e.g. JazzCash 0300-1234567 (Bilal Malik)&#10;Bank: Meezan Bank, IBAN PK00 MEZN 0000 0000 0000 0000&#10;Please send a screenshot after paying.">${esc(text || '')}</textarea>
      <div class="row" style="margin-top:8px"><button class="btn small green" id="payInfoSave" type="button">💾 Save instructions</button><span class="muted" id="payInfoMsg"></span></div>
      <p class="muted" style="margin:8px 0 0">Prices: Basic ${money(5000)}, Standard ${money(7000)}, Plus ${money(10000)} per month. Without a plan a student only has the free trial (Day 1 and the scene “Im Supermarkt”) – the same as visitors without a login; after a missed payment there are ${GRACE_DAYS} days of grace before lessons pause.</p></details>`;
  }

  /* ======================================================
     FREE TRIAL – make the free part feel like the real thing
     ====================================================== */
  const isTrial = () => { const ac = access(); return !!ac && ac.tier === 'free'; };
  const freeScene = () => (GL.scenarios || []).find((x) => x.id === FREE_SCENE);
  const sceneThumb = (sc) => { const bg = (sc.scenes.find((x) => !['home', 'phone'].includes(x.bg)) || sc.scenes[0]).bg; return GL.sceneBG && GL.sceneBG[bg] ? `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">${GL.sceneBG[bg]()}</svg>` : ''; };
  const courseStats = () => ({ days: GL.days.length, words: GL.days.reduce((a, d) => a + (d.vocab || []).length, 0), grammar: Object.keys(GL.grammar || {}).length, scenes: (GL.scenarios || []).length, exercises: GL.days.reduce((a, d) => a + (d.exercises || []).length, 0) });
  function trialProgress() {
    const st = GL.Store.state, d1 = (st.days || {})[1] || {}, sc = (st.scenes || {})[FREE_SCENE] || {};
    const steps = Object.keys(d1.steps || {}).length;
    return { dayDone: !!d1.done, daySteps: steps, sceneDone: !!sc.done, sceneBest: sc.best };
  }
  function trialHomeHTML() {
    if (!isTrial()) return '';
    const d1 = GL.days[0], sc = freeScene(), pr = trialProgress(), cs = courseStats();
    const ring = (pct) => `<svg class="t-ring" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.9" class="t-ring-bg"/><circle cx="18" cy="18" r="15.9" class="t-ring-fg" stroke-dasharray="${Math.round(pct)} 100"/></svg>`;
    const dayPct = pr.dayDone ? 100 : Math.min(95, (pr.daySteps / 8) * 100);
    const locked = (GL.scenarios || []).filter((x) => x.id !== FREE_SCENE).slice(0, 8);
    const features = [['🎤', 'Speaking coach', 'Your pronunciation scored word by word'], ['✍️', 'Writing studio', '20 tasks with instant corrections'], ['🏋️', 'Grammar trainer', 'Unlimited drills: verbs, cases, endings'], ['🤖', 'AI tutor', 'Ask anything, practise conversations'], ['👩‍🏫', 'Your teacher', 'Questions & corrections from a real teacher']];
    return `<section class="trial-hero">
      <div class="t-sparkles" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
      <div class="t-head">
        <div class="t-bruno">${GL.charSVG('bruno', 'idle waving')}</div>
        <div>
          <span class="t-pill">🎁 FREE TRIAL</span>
          <h2 class="t-title">Try the course – <span>free</span>, no payment.</h2>
          <p class="t-sub">Play the complete <b>Day 1</b> and the animated scene <b>“${esc(sc ? sc.title : 'Im Supermarkt')}”</b>. If you like it, everything else is waiting for you.</p>
        </div>
      </div>
      <div class="t-free">
        <a class="t-card t-day" href="#/day/1">
          <div class="t-card-top"><span class="t-free-tag">FREE</span>${ring(dayPct)}<span class="t-card-ico">📅</span></div>
          <b>Day 1 · ${esc(d1.level)}</b><span>${esc(d1.title)}</span>
          <small>${d1.vocab.length} words · grammar · dialogue · exercises · speaking</small>
          <ul class="t-goals">${(d1.goals || []).slice(0, 3).map((g) => `<li>${g}</li>`).join('')}</ul>
          <span class="t-go">${pr.dayDone ? '✅ Finished – play again' : pr.daySteps ? '▶ Continue Day 1' : '▶ Start Day 1'}</span>
        </a>
        ${sc ? `<a class="t-card t-scene" href="#/scenes/${FREE_SCENE}">
          <div class="t-thumb">${sceneThumb(sc)}<span class="t-free-tag">FREE</span><span class="t-play">▶</span></div>
          <b>${sc.icon} ${esc(sc.title)} · ${esc(sc.level)}</b><span>${esc(sc.en)} – ${esc(sc.intro[1])}</span>
          <span class="t-go">${pr.sceneDone ? `✅ Done (${pr.sceneBest}%) – play again` : '🎬 Play the scene'}</span>
        </a>` : ''}
      </div>
      <div class="t-stats">${[[cs.days, 'days'], [cs.words, 'words with audio'], [cs.grammar, 'grammar topics'], [cs.scenes, 'real-life scenes'], [cs.exercises, 'exercises']].map(([n, l]) => `<div><b class="t-count" data-to="${n}">0</b><span>${l}</span></div>`).join('')}</div>
      <h3 class="t-h3">🔒 Waiting for you in the full course</h3>
      <div class="t-strip">${locked.map((x) => `<a class="t-lock-tile" href="#/scenes/${x.id}">${sceneThumb(x)}<span class="t-lock-ico">🔒</span><span class="t-lock-name">${x.icon} ${esc(x.title)}</span></a>`).join('')}
        ${features.map(([i, t, d]) => `<a class="t-feat" href="#/plans"><span class="t-feat-ico">${i}</span><b>${t}</b><small>${d}</small><span class="t-lock-ico">🔒</span></a>`).join('')}</div>
      <div class="t-cta"><a class="btn wa-btn big t-pulse" target="_blank" rel="noopener" href="${attr(waLink('Hallo! I tried Deutsch30 and would like to join the course.'))}">💬 Join on WhatsApp</a><a class="btn ghost" href="#/plans">💳 Plans from ${money(PLANS[0].price)} / month</a></div>
    </section>`;
  }
  /* count-up numbers and reveal animations */
  function animateTrial() {
    const els = $$('.t-count:not([data-done])');
    if (!els.length) return;
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    els.forEach((el) => {
      el.dataset.done = '1';
      const to = +el.dataset.to;
      if (reduce) { el.textContent = to.toLocaleString('en-US'); return; }
      const t0 = performance.now(), dur = 1400;
      const step = (t) => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(to * e).toLocaleString('en-US'); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }
  /* a taste of the locked content */
  function previewHTML(page, a) {
    if (page === 'day') {
      const d = GL.days[(+a || 1) - 1];
      if (!d) return '';
      const words = d.vocab.slice(0, 6);
      return `<div class="pv pv-day"><div class="pv-head"><span class="pv-day-no">${d.day}</span><div><small>DAY ${d.day} · ${esc(d.level)}</small><b>${esc(d.title)}</b><span class="muted">${esc(d.subtitle || '')}</span></div></div>
        <ul class="pv-goals">${(d.goals || []).slice(0, 3).map((g) => `<li>${g}</li>`).join('')}</ul>
        <p class="pv-label">🔤 ${d.vocab.length} new words – tap to hear a few:</p>
        <div class="pv-words">${words.map((w, i) => `<button type="button" class="pv-word" data-say="${attr(w[0])}" style="animation-delay:${i * 0.07}s"><b>${esc(w[0])}</b><small>${esc(w[2])}</small></button>`).join('')}<span class="pv-more">+${Math.max(0, d.vocab.length - words.length)} more 🔒</span></div></div>`;
    }
    if (page === 'scenes') {
      const sc = GL.scenarios.find((x) => x.id === a);
      if (!sc) return '';
      return `<div class="pv pv-scene"><div class="pv-thumb">${sceneThumb(sc)}<span class="pv-scene-ico">${sc.icon}</span><span class="pv-lock">🔒</span></div>
        <div class="row" style="gap:6px;margin-top:10px"><span class="level ${sc.level}">${sc.level}</span><span class="path-tag">≈ ${sc.minutes} min · ${sc.scenes.length} scenes</span></div>
        <b class="pv-scene-title">${esc(sc.title)}</b><p class="muted" style="margin:2px 0 0">${esc(sc.en)} – ${esc(sc.intro[1])}</p></div>`;
    }
    const F = { grammar: ['📘', 'All 62 grammar topics', ['Clear rules with tables', 'Examples with audio', 'Mini quiz for every topic']], trainer: ['🏋️', 'Grammar trainer', ['Verb forms in every tense', 'Articles in all four cases', 'Adjective endings until they are automatic']], talk: ['🎤', 'Speaking coach', ['Your pronunciation scored word by word', 'Shadowing with native-speed audio', '“Say it in German” challenges']], writing: ['✍️', 'Writing studio', ['20 real-life writing tasks', 'Every mistake marked and explained', 'Model answers to learn from']], review: ['🔁', 'Smart review', ['Flashcards that come back when you need them', 'Your personal mistakes notebook', 'Quick quizzes']], sounds: ['🗣️', 'Pronunciation guide', ['Every German sound with audio', 'ä, ö, ü, ch, r explained', 'Practise with your microphone']], teacher: ['👩‍🏫', 'Your personal teacher', ['Send questions any time', 'Get your texts corrected', 'Priority answers']] }[page];
    return F ? `<div class="pv pv-feat"><span class="pv-feat-ico">${F[0]}</span><b>${F[1]}</b><ul>${F[2].map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>` : '';
  }
  /* celebrate the end of the free Day 1 / free scene – once each */
  const CEL_KEY = 'd30:trialCelebrated';
  function celebrated() { try { return JSON.parse(localStorage.getItem(CEL_KEY) || '{}'); } catch (e) { return {}; } }
  function checkCelebrate() {
    if (!isTrial() || document.querySelector('.trial-modal')) return;
    const pr = trialProgress(), c = celebrated();
    const what = pr.dayDone && !c.day ? 'day' : pr.sceneDone && !c.scene ? 'scene' : null;
    if (!what) return;
    c[what] = Date.now();
    try { localStorage.setItem(CEL_KEY, JSON.stringify(c)); } catch (e) { /* private mode */ }
    setTimeout(() => showCelebration(what, pr), 1600);
  }
  function showCelebration(what, pr) {
    const d2 = GL.days[1], sc = freeScene();
    const other = what === 'day' ? (!pr.sceneDone && sc ? `<a class="btn ghost" href="#/scenes/${FREE_SCENE}">🎬 Now play the free scene “${esc(sc.title)}”</a>` : '') : (!pr.dayDone ? '<a class="btn ghost" href="#/day/1">📅 Now try Day 1 – free</a>' : '');
    const box = document.createElement('div');
    box.className = 'trial-modal';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.innerHTML = `<div class="tm-box">
      <button class="tm-x" type="button" aria-label="Close">✖</button>
      <div class="tm-bruno">${GL.charSVG('bruno', 'idle waving')}</div>
      <h2>${what === 'day' ? '🎉 Super! You finished Day 1!' : `🎉 Bravo! You did “${esc(sc ? sc.title : '')}”!`}</h2>
      <p>${what === 'day' ? `You can already greet people, introduce yourself and use <b>sein</b>. <b>Day 2</b> is next: <i>${esc(d2.title)}</i>.` : 'You just handled a real situation in German. 21 more scenes are waiting – the doctor, the Bahnhof, a job interview …'}</p>
      <div class="tm-next">${[2, 3, 4].map((n) => `<span><b>Day ${n}</b>${esc(GL.days[n - 1].title.split(/[–:!]/)[0])}</span>`).join('')}<span class="tm-more">+${GL.days.length - 4} more days</span></div>
      <div class="tm-cta"><a class="btn wa-btn big" target="_blank" rel="noopener" href="${attr(waLink(`Hallo! I finished the free ${what === 'day' ? 'Day 1' : 'scene'} of Deutsch30 and would like to continue.`))}">💬 Continue – message on WhatsApp</a><a class="btn" href="#/plans">💳 See plans</a>${other}</div>
    </div>`;
    document.body.appendChild(box);
    try { GL.confetti(); GL.sfx('done'); } catch (e) { /* no audio */ }
    const close = () => box.remove();
    box.querySelector('.tm-x').onclick = close;
    box.addEventListener('click', (e) => { if (e.target === box || e.target.closest('a')) close(); });
    document.addEventListener('keydown', function esc1(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc1); } });
  }
  const origSave = GL.Store.save;
  GL.Store.save = function () { const r = origSave.apply(this, arguments); try { checkCelebrate(); } catch (e) { /* never block saving */ } return r; };

  GL.Plans = { ENABLED, trialHomeHTML, animateTrial, previewHTML, isTrial, showCelebration, WA, WA_SHOW, waLink, FREE_SCENE, access, decorate, PLANS, byId, money, mine, lockReason, viewPlans, viewLockedPlan, payState, planChip, revenue, planBoxHTML, wirePlanBox, payInfoHTML, cardsHTML, CURRENCY, fmtD };
})();
