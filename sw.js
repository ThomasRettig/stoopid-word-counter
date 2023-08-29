var CACHE = "cache-v1";

var urls = [
  "/",
  "js/scripts.js",
  "css/styles.css",
  "icon-256x256.svg",
  "icon-256x256.png",
  "install.svg",
  "share.svg",
  "settings.svg",
  "sw.js",
  "manifest.webmanifest",
  "fonts/Inter-Bold.woff2",
  "fonts/Inter-Regular.woff2",
];

self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(urls);
    }),
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    }),
  );
});