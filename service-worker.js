// service-worker.js

const CACHE_NAME = "authorbeacon-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/mission.html",
  "/services.html",
  "/featured.html",
  "/contact.html",
  "/blog.html",
  "/styles/styles.css", // <-- Corrected path
  "/styles/mission.css", // <-- Corrected path
  "/favicon-32x32.png",
  "/favicon-16x16.png",
  "/android-chrome-192x192.png",
  "/site.webmanifest",
  "/manifest.json",
];

// Install the service worker and cache assets (safely)
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        urlsToCache.map((url) =>
          fetch(url)
            .then((response) => {
              if (!response.ok) throw new Error(`${url} failed to fetch`);
              return cache.put(url, response.clone());
            })
            .catch((err) => {
              console.warn(`Skipping cache for ${url}:`, err.message);
            })
        )
      )
    )
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
