/* Deutsch30 service worker – makes the course installable and usable offline.
   Strategy: network first (always fresh when online), cached copy when offline.
   On install it caches the app shell: index.html plus every script and stylesheet it references. */
const CACHE = 'deutsch30-v1';
const FONT_CACHE = 'deutsch30-fonts';

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    try {
      const res = await fetch('/index.html', { cache: 'no-cache' });
      const html = await res.clone().text();
      await c.put('/', res.clone()); await c.put('/index.html', res);
      const urls = [...html.matchAll(/(?:src|href)="((?:js|css)\/[^"]+)"/g)].map((m) => '/' + m[1]);
      await c.addAll([...new Set([...urls, '/site.webmanifest', '/icon-192.png', '/icon-512.png'])]);
    } catch (err) { /* offline during install – runtime caching fills the cache later */ }
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE && k !== FONT_CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

const timeout = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms));

self.addEventListener('fetch', (e) => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Google Fonts: cache first (they never change)
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(FONT_CACHE).then(async (c) => (await c.match(req)) || fetch(req).then((r) => { c.put(req, r.clone()); return r; })));
    return;
  }
  if (url.origin !== location.origin || url.pathname.startsWith('/api/')) return;
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    try {
      const res = await Promise.race([fetch(req), timeout(req.mode === 'navigate' ? 4000 : 8000)]);
      if (res && res.ok) c.put(req, res.clone());
      return res;
    } catch (err) {
      const hit = await c.match(req, { ignoreSearch: true });
      if (hit) return hit;
      if (req.mode === 'navigate') return (await c.match('/')) || Response.error();
      return Response.error();
    }
  })());
});
