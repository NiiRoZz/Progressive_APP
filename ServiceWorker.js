var cacheName = 'ginkobus-v1';
var appShellFiles = [
  'index.html',
  'app.js',
  'style.css',
  'icons/favicon.ico',
  'icons/icon-32.png',
  'icons/icon-64.png',
  'icons/icon-96.png',
  'icons/icon-128.png',
  'icons/icon-168.png',
  'icons/icon-180.png',
  'icons/icon-192.png',
  'icons/icon-256.png',
  'icons/icon-512.png',
  'icons/maskable_icon.png'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
	
	e.waitUntil(
		caches.open(cacheName).then((cache) => {
			console.log('[Service Worker] Caching all: app shell and content');
			return cache.addAll(appShellFiles);
		})
	);
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    // Try the cache
    caches
		.match(event.request)
		.then(function (response) {
			// Fall back to network
			return response || fetch(e.request).then((response) => {
				return caches.open(cacheName).then((cache) => {
					console.log('[Service Worker] Caching new resource: '+event.request.url);
					cache.put(event.request, response.clone());
					return response;
				});
			});
		})
		.catch(function () {
			// If both fail, show a generic fallback:
			console.log('[Service Worker] Resource fetch failed: '+event.request.url);
			return caches.match('/index.html');
		}),
	);
});