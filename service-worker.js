const CACHE_NAME = "motion-app-v5";
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
  self.skipWaiting(); // <-- Add this line
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
  self.clients.claim(); // <-- Add this line
});

// Fetch event (serve cache first, with error handling)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Serve cached file if available
      if (response) return response;

      // Otherwise try fetching from network
      return fetch(event.request).catch(error => {
        console.error("❌ Fetch failed:", error);
        return new Response("Network error or resource not found", {
          status: 503,
          statusText: "Service Unavailable"
        });
      });
    })
  );
});



