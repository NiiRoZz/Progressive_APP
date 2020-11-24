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

self.addEventListener('fetch', (e) => {
    console.log('[Service Worker] Fetched resource '+e.request.url);
});