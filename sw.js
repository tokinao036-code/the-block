// Offline: the app shell is precached from precache.json; audio, photos and fonts live in a media cache
// that the app fills in the background (js/offline.js). Code: network first, cache fallback.
const V = 'block-1beadcecee';            // tools/precache.py rewrites this line on every build
const SHELL = 'shell-' + V;
const MEDIA = 'block-media';      // survives app updates

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(SHELL);
    try {
      const list = await (await fetch('precache.json', { cache: 'no-store' })).json();
      for (let i = 0; i < list.files.length; i += 20) await c.addAll(list.files.slice(i, i + 20).map(f => new Request(f, { cache: 'reload' })));
    } catch (err) { await c.addAll(['./', 'index.html', 'css/app.css']); }
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('shell-') && k !== SHELL).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

const isMedia = url => /\.(mp3|jpg|jpeg|png|webp|woff2?)$/i.test(url.pathname) || url.hostname === 'i.pinimg.com' || url.hostname === 'fonts.gstatic.com';

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.endsWith('groq.com') || url.hostname.includes('dictionaryapi') || url.hostname.includes('mymemory')) return;

  if (isMedia(url)) {
    e.respondWith(caches.match(req, { ignoreSearch: url.origin === location.origin }).then(hit => hit || fetch(req).then(res => {
      if (res.ok || res.type === 'opaque') { const cp = res.clone(); caches.open(MEDIA).then(c => c.put(req, cp)); }
      return res;
    })));
    return;
  }
  if (url.hostname === 'fonts.googleapis.com') {
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(res => { const cp = res.clone(); caches.open(MEDIA).then(c => c.put(req, cp)); return res; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== location.origin) return;

  // app code and data: network first (fresh when online), cache when offline
  e.respondWith((async () => {
    try {
      const res = await fetch(req);
      if (res.ok) { const cp = res.clone(); caches.open(SHELL).then(c => c.put(req, cp)); }
      return res;
    } catch (err) {
      const hit = await caches.match(req, { ignoreSearch: true });
      if (hit) return hit;
      if (req.mode === 'navigate') return (await caches.match('index.html')) || (await caches.match('./'));
      throw err;
    }
  })());
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = './' + ((e.notification.data && e.notification.data.url) || '');
  e.waitUntil(self.clients.matchAll({ type: 'window' }).then(cs => { const c = cs[0]; if (c) { c.navigate(url).catch(() => {}); return c.focus(); } return self.clients.openWindow(url); }));
});
