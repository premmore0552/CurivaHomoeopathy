const CACHE_NAME = 'curiva-cache-v4';
const ASSETS_TO_CACHE = [
  '/',
  '/?pwa=true',
  '/index.html',
  '/app_icon.png',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only intercept normal GET requests on our same origin to keep external hooks safe
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // Do NOT intercept or cache dynamic scripts, stylesheets, hot updates, Maps, source files, or APIs
  if (
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/src/') ||
    url.pathname.includes('/@') ||
    url.pathname.includes('hot-update') ||
    url.pathname.includes('node_modules') ||
    (/\.(js|css|ts|tsx|map|json)$/i.test(url.pathname) && !url.pathname.endsWith('manifest.json'))
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Stale-While-Revalidate Strategy
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Return fallback page on network error for HTML navigation requests
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('/');
        }
      });

      return cachedResponse || fetchPromise;
    })
  );
});
