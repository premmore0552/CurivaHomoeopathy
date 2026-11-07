(() => {
  const APP_VERSION = document.querySelector('meta[name="curiva-app-version"]')?.content || 'local';
  const isDev = window.location.hostname === 'localhost' ||
    window.location.hostname.includes('ais-dev') ||
    window.location.hostname.includes('ais-pre');

  const unregisterWorkers = async () => {
    if (!('serviceWorker' in navigator)) return;
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    } catch {
      // A blocked service-worker API must not prevent the learning site from opening.
    }
  };

  const clearCaches = async () => {
    if (!('caches' in window)) return;
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    } catch {
      // Cache cleanup is best-effort; sensitive responses are network-only in sw.js.
    }
  };

  const start = async () => {
    let savedVersion = null;
    try {
      savedVersion = window.localStorage.getItem('app_version');
    } catch {
      // The application must remain usable when storage is disabled.
    }

    if (isDev) {
      await unregisterWorkers();
      await clearCaches();
      try { window.localStorage.setItem('app_version', APP_VERSION); } catch { /* ignored */ }
      return;
    }

    if (savedVersion !== APP_VERSION) {
      await unregisterWorkers();
      await clearCaches();
      try { window.localStorage.setItem('app_version', APP_VERSION); } catch { /* ignored */ }
      window.location.reload();
      return;
    }

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // The website remains available without offline caching.
        });
      }, { once: true });
    }
  };

  void start();
})();
