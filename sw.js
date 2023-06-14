const cache_name = "v1_cache_Jass_PWA";

var urlsToCache = [
  "./assets/favicon/android-icon-36x36.png",
  "./assets/favicon/android-icon-48x48.png",
  "./assets/favicon/android-icon-72x72.png",
  "./assets/favicon/android-icon-96x96.png",
  "./assets/favicon/android-icon-144x144.png",
  "./assets/favicon/android-icon-192x192.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(cache_name)
      .then((cache) => {
        return cache.addAll(urlsToCache).then(() => {
          self.skipWaiting();
        });
      })
      .catch((err) => console.log("No se ha registrado el cache"), err)
  );
});

//Event activate
self.addEventListener("activate", (e) => {
  const cacheWhiteList = [cache_name];
  e.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhiteList.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        self.clients.claim();
      })
  );
});


//Event fetch
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request)
    .then(res => {
      if (res) {
        return res;
      }
      return fetch(e.request);
    })
  );
});
