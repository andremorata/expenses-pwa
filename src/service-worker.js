importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');

const CACHE_VER = 'v1.5';

workbox.setConfig({
  debug: false
});
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.warn); // debug, log, warn, error, silent

workbox.core.setCacheNameDetails({
  prefix: 'expenses',
  suffix: CACHE_VER,
  precache: 'precache',
  runtime: 'runtime-cache'
});

workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: `google-fonts-cache-${CACHE_VER}`,
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  }),
);

workbox.routing.registerRoute(
  /.*\.(?:ttf|eot|woff|woff2|otf)/,
  workbox.strategies.cacheFirst({
    cacheName: `font-cache-${CACHE_VER}`,
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
      })
    ]
  })
);

workbox.routing.registerRoute(
  /.*\.js/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: `js-cache-${CACHE_VER}`
  })
);

workbox.routing.registerRoute(
  /.*\.css/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: `css-cache-${CACHE_VER}`
  })
);

workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  workbox.strategies.cacheFirst({
    cacheName: `image-cache-${CACHE_VER}`,
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60 // 1 week
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('^(?:.*/localhost:.*/v1/|.*.api.*/v1/)'),
  workbox.strategies.networkFirst({
    cacheName: `api-cache-${CACHE_VER}`,
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 // 1 day
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [200]
      })
    ]
  })
);

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
    .then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key.indexOf(CACHE_VER) === -1) {
            caches.delete(key);
          }
        })
      );
    }));
  return self.clients.claim();
});

workbox.precaching.precacheAndRoute([]);
