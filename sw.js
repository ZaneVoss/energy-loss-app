const CACHE_NAME = 'heat-calc-v3'; // Bump version number for updates
const urlsToCache = [
  './',
  './Water_Panel_Heat_Losses_V13.html',
  './manifest.json',
  './apple-touch-icon.png',
  './apple-touch-icon-precomposed.png',
  './apple-touch-icon-120x120.png',
  './apple-touch-icon-120x120-precomposed',
  './apple-touch-icon',
  './favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});