const script = `
const CACHE = 'mot-a-mot-v1';
const allowed = (url) => url.origin === self.location.origin && !url.pathname.startsWith('/api/') && !url.pathname.startsWith('/hcgi/') && url.pathname !== '/sw.js';
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(['/', '/manifest.webmanifest', '/app-icon.svg', '/app-icon.png?size=192', '/app-icon.png?size=512'])).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('mot-a-mot-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('message', event => {
  if (event.data?.type !== 'CACHE_RESOURCES') return;
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const urls = [...new Set(['/', ...(event.data.urls || [])])].filter(value => allowed(new URL(value, self.location.origin)));
    const results = await Promise.allSettled(urls.map(async value => {
      const response = await fetch(value);
      if (!response.ok) throw new Error('Cache indisponible');
      await cache.put(value, response);
    }));
    if (results.every(result => result.status === 'fulfilled')) event.source?.postMessage('OFFLINE_READY');
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || !allowed(url)) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      if (response.ok && url.pathname === '/') { const copy = response.clone(); event.waitUntil(caches.open(CACHE).then(cache => cache.put('/', copy))); }
      return response;
    }).catch(async () => (await caches.match(request)) || (await caches.match('/')) || new Response('Ouvre Mot à mot une première fois avec une connexion Internet.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })));
    return;
  }
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response.ok && !url.pathname.includes('@vite')) { const copy = response.clone(); event.waitUntil(caches.open(CACHE).then(cache => cache.put(request, copy))); }
    return response;
  })));
});
`;
export function loader() {
  return new Response(script, { headers: { 'Content-Type': 'application/javascript; charset=utf-8', 'Cache-Control': 'no-cache', 'Service-Worker-Allowed': '/' } });
}
