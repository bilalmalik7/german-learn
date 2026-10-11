/* Vercel Web Analytics for the website version (cookieless page views).
   The course uses hash routes (#/day/5/vocab), which the plain-HTML script does not track on its own,
   so automatic tracking is switched off and every page change is reported here as a page view.
   Only active on the deployed https site – not inside claude.ai, on localhost or in a downloaded copy. */
(function () {
  'use strict';
  const h = location.hostname;
  if (location.protocol !== 'https:' || h === 'localhost' || /claude|anthropic/.test(h) || window.parent !== window) return;
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  const s = document.createElement('script');
  s.defer = true;
  s.src = '/_vercel/insights/script.js';
  s.dataset.disableAutoTrack = '1';
  document.head.appendChild(s);

  // /day/5/vocab → route /day/[day]/[step]; ids (scenes, grammar topics, writing tasks) → [id]
  const ROUTES = { day: ['day', 'step'], grammar: ['topic'], scenes: ['scene'], trainer: ['tab', 'item'], talk: ['mode'], writing: ['task', 'item'], review: ['tab'], job: ['part', 'n'] };
  let last = '';
  function track() {
    const parts = (location.hash.replace(/^#\/?/, '').split('#')[0] || '').split('/').filter(Boolean);
    const path = '/' + parts.join('/');
    if (path === last) return;
    last = path;
    const names = ROUTES[parts[0]] || [];
    const route = '/' + parts.map((p, i) => (i === 0 ? p : names[i - 1] ? `[${names[i - 1]}]` : p)).join('/');
    window.va('pageview', { route, path });
  }
  window.addEventListener('hashchange', track);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', track); else track();
})();
