/* Course plans & payments.
   Plans and prices live here (change them in one place). On the website version the teacher assigns each student a
   plan and records payments in the teacher portal; the plan decides which parts of the course open. Inside claude.ai
   (no accounts server) every part stays open and this page only shows the prices. */
(function () {
  'use strict';
  const { $, $$, esc, attr } = GL;

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
    if (!(window.D30 && D30.standalone)) return null;
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
    // trial users: show the free scene first in the scenes list
    if (ac.tier !== 'plan') { const fs = $(`#app a[href="#/scenes/${FREE_SCENE}"]`); if (fs && fs.parentElement && fs.parentElement.firstElementChild !== fs && !fs.closest('.lock-card, .trial-card')) fs.parentElement.prepend(fs); }
    $$('#app a[href^="#/"]').forEach((el) => {
      // badges only on cards / tiles, not on buttons or links inside a sentence
      if (el.closest('.lock-card, .trial-card, .note, p, li') || el.classList.contains('node') || el.classList.contains('btn') || el.classList.contains('chip') || getComputedStyle(el).display === 'inline') return;
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
        html: `<div class="card lock-card">${GL.charSVG('bruno', 'idle thinking')}
          <h1>🔒 Part of the full course</h1>
          <p class="lock-what">${esc(lockedWhat(page, a))}</p>
          <p>${ac.guest ? 'You are trying the course without a login.' : 'You are on the free trial.'} Free to try: <b>Day 1</b> and the real-life scene <b>“Im Supermarkt”</b>. Everything else opens with a plan – from <b>${money(PLANS[0].price)} / month</b>.</p>
          <div class="row" style="justify-content:center"><a class="btn wa-btn big" target="_blank" rel="noopener" href="${attr(waLink(`Hallo! I would like to join the German course Deutsch30 (I was looking at: ${lockedWhat(page, a)}).`))}">💬 WhatsApp ${WA_SHOW}</a><a class="btn ghost" href="#/plans">💳 See plans</a></div>
          <div class="row" style="justify-content:center;margin-top:8px"><a class="btn small ghost" href="#/day/1">▶ Try Day 1 free</a><a class="btn small ghost" href="#/scenes/${FREE_SCENE}">🎬 Try the free scene</a>${ac.guest ? '<button class="btn small ghost" id="lockLogin2" type="button">🔐 Log in</button>' : ''}</div></div>`,
        mount() { const b = $('#lockLogin2'); if (b) b.onclick = () => D30.showLogin(); },
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

  GL.Plans = { WA, WA_SHOW, waLink, FREE_SCENE, access, decorate, PLANS, byId, money, mine, lockReason, viewPlans, viewLockedPlan, payState, planChip, revenue, planBoxHTML, wirePlanBox, payInfoHTML, cardsHTML, CURRENCY, fmtD };
})();
