self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('gyro-cache-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/motion.html',
        '/manifest.json',
        '/icon-192.png',
        '/icon-512.png',
        '/style.css',
        // Add other files here
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
