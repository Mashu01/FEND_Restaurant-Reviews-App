let staticCacheName = 'restaurant-cache';
let cachedItems = [
	'/',
	'/index.html',
	'/restaurant.html',
	'/css/styles.css',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/register_sw.js',
	'/js/restaurant_info.js',
	'/data/restaurants.json',
	'/restaurant.html?id=1',
	'/restaurant.html?id=2',
	'/restaurant.html?id=3',
	'/restaurant.html?id=4',
	'/restaurant.html?id=5',
	'/restaurant.html?id=6',
	'/restaurant.html?id=7',
	'/restaurant.html?id=8',
	'/restaurant.html?id=9',
	'/restaurant.html?id=10',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg'
];

self.addEventListener('install', function(e) {
	e.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll(cachedItems);
		}).catch(function(error) {
			console.log('Caches open failed' + error);
		})
	);
});

self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.match(e.request).then(function(response) {
			return response || fetch(e.request).then(function(fetchResponse) {
				return caches.open(staticCacheName).then(function(cache) {
					cache.put(e.request, fetchResponse.clone());
					return fetchResponse;
				});	
			});
		}).catch(function(error) {
			return new Response('Not connected to the internet', {
				status: 404,
				statusText:"Not connected to the internet"
			});
		})
	);
});
