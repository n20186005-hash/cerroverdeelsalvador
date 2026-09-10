/* Service Worker - Parque Natural Cerro Verde 静态站点
   版本更新时请递增 CACHE_VERSION 以强制刷新缓存。 */
const CACHE_VERSION = 'cerroverde-v3';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/zh.html',
  '/en.html',
  '/es.html',
  '/manifest.webmanifest',
  '/icons/icon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => {
          // 离线回退：导航请求返回默认语言（中文）页面缓存
          if (request.mode === 'navigate') {
            return caches.match('/es.html');
          }
          return cached;
        });

      return cached || networkFetch;
    })
  );
});
