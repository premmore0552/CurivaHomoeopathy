const CACHE_NAME = 'curiva-public-static-v7';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/app_icon.png.png',
  '/manifest.json'
];

const SENSITIVE_PATH = /^\/(?:api(?:\/|$)|auth(?:\/|$)|account(?:\/|$)|appointments?(?:\/|$)|private(?:\/|$)|downloads?(?:\/|$)|resources?\/private(?:\/|$))/i;
const STATIC_DESTINATIONS = new Set(['script', 'style', 'image', 'font']);

function mayStoreResponse(request, response) {
  if (!response || !response.ok || response.type === 'opaque') return false;
  if (request.headers.has('authorization') || request.headers.has('cookie')) return false;
  if (request.cache === 'no-store') return false;

  const cacheControl = response.headers.get('cache-control') || '';
  if (/\b(?:private|no-store|no-cache)\b/i.test(cacheControl)) return false;
  if (response.headers.has('set-cookie')) return false;
  const vary = response.headers.get('vary') || '';
  if (vary === '*' || /\\b(?:cookie|authorization)\\b/i.test(vary)) return false;
  return true;
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((key) => key === CACHE_NAME ? Promise.resolve() : caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Sensitive or account-related responses never enter the Cache API.
  if (
    SENSITIVE_PATH.test(url.pathname) ||
    request.headers.has('authorization') ||
    request.headers.has('cookie') ||
    request.cache === 'no-store'
  ) {
    event.respondWith(fetch(request));
    return;
  }

  // Never cache document responses: a route may render account-specific data.
  const acceptsHtml = request.headers.get('accept')?.includes('text/html');
  if (acceptsHtml) {
    event.respondWith(fetch(request).catch(() => caches.match('/') ));
    return;
  }

  // Only static browser assets are eligible for stale-while-revalidate.
  if (!STATIC_DESTINATIONS.has(request.destination)) return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const refresh = fetch(request).then((networkResponse) => {
        if (mayStoreResponse(request, networkResponse)) {
          const copy = networkResponse.clone();
          void caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return networkResponse;
      });

      return cachedResponse || refresh;
    })
  );
});
