self.addEventListener("install", function(e) {
  console.log("Service Worker Installed");
});
const CACHE_NAME = "shane-hadiye-zaman-v1";

const urlsToCache = [
"/",
"/index.html",
"/manifest.json"
];

self.addEventListener("install", function(event) {
event.waitUntil(
caches.open(CACHE_NAME).then(function(cache) {
return cache.addAll(urlsToCache);
})
);
});

self.addEventListener("fetch", function(event) {
event.respondWith(
caches.match(event.request).then(function(response) {
if (response) {
return response;
}
return fetch(event.request).then(function(networkResponse) {
return caches.open(CACHE_NAME).then(function(cache) {
cache.put(event.request, networkResponse.clone());
return networkResponse;
});
});
})
);
});
