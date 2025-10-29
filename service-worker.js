const CACHE_NAME = "motion-app-v1";
const FILES_TO_CACHE = [
  "index.html",
  "style.css",
  "manifest.json",
  "icon-192.png",
  "icon-512.png",
  "motion.html",
  "history.html"
];

// Install event
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// Activate event (clear old cache)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
    )
  );
});

// Fetch event (serve cache first)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});


