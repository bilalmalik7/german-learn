/* INSTALLABLE APP (PWA): registers the service worker (offline use) and offers "Install the app"
   – Android/Chrome/Edge/desktop: the browser's own install dialog (beforeinstallprompt)
   – iPhone/iPad (Safari): short instructions (Share → Add to Home Screen). */
(function () {
  'use strict';
  const { $, Store } = GL;
  let deferred = null;
  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const canInstall = () => !standalone() && (!!deferred || isIOS());
  const S = () => (Store.state.pwa = Store.state.pwa || {});

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
  }
  addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferred = e; decorate(); });
  addEventListener('appinstalled', () => { deferred = null; S().installed = true; Store.save(); GL.toast && GL.toast('📲 Installed! Find Deutsch30 on your home screen.'); document.querySelectorAll('.pwa-card').forEach((x) => x.remove()); });

  async function install() {
    if (deferred) {
      deferred.prompt();
      const { outcome } = await deferred.userChoice.catch(() => ({}));
      deferred = null;
      if (outcome === 'accepted') document.querySelectorAll('.pwa-card').forEach((x) => x.remove());
      return;
    }
    if (isIOS()) showIOS();
  }
  function showIOS() {
    const d = document.createElement('div');
    d.className = 'pwa-ios';
    d.innerHTML = `<div class="pwa-ios-box" role="dialog" aria-label="Install on iPhone"><b>📲 Install Deutsch30 on your iPhone</b>
      <ol><li>Tap the <b>Share</b> button <span class="pwa-share" aria-hidden="true">⬆︎</span> in Safari's toolbar</li><li>Choose <b>“Add to Home Screen”</b></li><li>Tap <b>Add</b> – done!</li></ol>
      <button class="btn green" type="button">Got it</button></div>`;
    d.addEventListener('click', (e) => { if (e.target === d || e.target.closest('button')) d.remove(); });
    document.body.appendChild(d);
  }
  const cardHTML = (compact) => `<div class="card pwa-card ${compact ? 'compact' : ''}"><span class="pwa-ico" aria-hidden="true"><img src="/icon-192.png" alt="" width="48" height="48"></span>
    <div class="pwa-txt"><b>Get the Deutsch30 app</b><small>Free · works offline · opens from your home screen like a normal app</small></div>
    <button class="btn green small pwa-go" type="button">📲 Install</button>${compact ? '' : '<button class="pwa-x" type="button" aria-label="Not now">✕</button>'}</div>`;

  /* called after every page render */
  function decorate() {
    const app = $('#app'); if (!app || !canInstall()) return;
    const page = (location.hash.replace(/^#\/?/, '').split(/[/#]/)[0]) || 'home';
    const view = $('.view', app); if (!view || $('.pwa-card', view)) return;
    if (page === 'home' && !(S().dismissed && Date.now() - S().dismissed < 7 * 864e5)) {
      const hero = view.firstElementChild; hero ? hero.insertAdjacentHTML('afterend', cardHTML(false)) : view.insertAdjacentHTML('afterbegin', cardHTML(false));
    } else if (page === 'settings') view.insertAdjacentHTML('afterbegin', cardHTML(true));
    else return;
    const c = $('.pwa-card', view);
    $('.pwa-go', c).onclick = install;
    const x = $('.pwa-x', c); if (x) x.onclick = () => { S().dismissed = Date.now(); Store.save(); c.remove(); };
  }
  GL.PWA = { install, canInstall, standalone, decorate };
})();
