const CACHE_NAME = 'baos-math-v1';

// Every single file in your repository mapped explicitly for offline usage
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './icon.png',
    './panda.png',
    
    // Audio FX
    './pop.wav',
    './chime.wav',
    './boop.wav',

    // Core Game Illustrations / Objects
    './apple.png',
    './balloon.png',
    './banana.png',
    './bunny.png',
    './butterfly.png',
    './car.png',
    './cookie.png',
    './fish.png',
    './frog.png',
    './grape.png',
    './heart.png',
    './lilypad.png',
    './orange.png',
    './star.png',
    './watermelon.png',

    // Real World Shapes Texture Elements
    './real-book.png',
    './real-clock.png',
    './real-door.png',
    './real-sandwich.png',

    // Geometry Shapes
    './shape-circle.png',
    './shape-cube.png',
    './shape-cylinder.png',
    './shape-sphere.png',
    './shape-square.png',
    './shape-triangle.png',

    // All Active Gameplay HTML Modules (Excluding non-existent module-l)
    './module-a.html', './module-b.html', './module-c.html', './module-d.html',
    './module-e.html', './module-f.html', './module-g.html', './module-h.html',
    './module-i.html', './module-j.html', './module-k.html', './module-m.html',
    './module-n.html', './module-o.html', './module-p.html', './module-q.html',
    './module-r.html', './module-s.html', './module-t.html', './module-u.html',
    './module-v.html', './module-w.html', './module-x.html', './module-y.html',
    './module-z.html', './module-aa.html', './module-bb.html', './module-cc.html',
    './module-dd.html', './module-ee.html', './module-ff.html', './module-gg.html',
    './module-hh.html', './module-ii.html', './module-jj.html', './module-kk.html',
    './module-ll.html', './module-mm.html', './module-nn.html'
];

// Install Event: Saves everything into the iPad storage cache upfront
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Caching all game files for offline stability...');
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => self.skipWaiting())
    );
});

// Activate Event: Clears out old cache versions when you release updates
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Clearing deprecated cache version:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Interceptor: Serves cached files instantly without needing cellular/Wi-Fi
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse; // Return the fast, offline file
            }
            return fetch(event.request); // Fallback to network if something extra is pulled
        })
    );
});