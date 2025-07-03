// service-worker.js

const CACHE_NAME = "authorbeacon-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/mission.html",
  "/styles.css",
  "/mission.css",
  "/favicon-32x32.png",
  "/favicon-16x16.png",
  "/apple-touch-icon.png",
  "/site.webmanifest"
];

// Install the service worker and cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Serve cached content when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
