const CACHE_NAME = 'baos-math-v2';
const REPO = '/mathgame';

const ASSETS_TO_CACHE = [
    `${REPO}/`,
    `${REPO}/index.html`,
    `${REPO}/manifest.json`,
    `${REPO}/icon.png`,
    `${REPO}/panda.png`,

    // Audio FX
    `${REPO}/pop.wav`,
    `${REPO}/chime.wav`,
    `${REPO}/boop.wav`,

    // Core Game Illustrations / Objects
    `${REPO}/apple.png`,
    `${REPO}/balloon.png`,
    `${REPO}/banana.png`,
    `${REPO}/bunny.png`,
    `${REPO}/butterfly.png`,
    `${REPO}/car.png`,
    `${REPO}/cookie.png`,
    `${REPO}/fish.png`,
    `${REPO}/frog.png`,
    `${REPO}/grape.png`,
    `${REPO}/heart.png`,
    `${REPO}/lilypad.png`,
    `${REPO}/orange.png`,
    `${REPO}/star.png`,
    `${REPO}/watermelon.png`,

    // Real World Shapes Texture Elements
    `${REPO}/real-book.png`,
    `${REPO}/real-clock.png`,
    `${REPO}/real-door.png`,
    `${REPO}/real-sandwich.png`,

    // Geometry Shapes
    `${REPO}/shape-circle.png`,
    `${REPO}/shape-cube.png`,
    `${REPO}/shape-cylinder.png`,
    `${REPO}/shape-sphere.png`,
    `${REPO}/shape-square.png`,
    `${REPO}/shape-triangle.png`,

    // All Active Gameplay HTML Modules
    `${REPO}/module-a.html`, `${REPO}/module-b.html`, `${REPO}/module-c.html`, `${REPO}/module-d.html`,
    `${REPO}/module-e.html`, `${REPO}/module-f.html`, `${REPO}/module-g.html`, `${REPO}/module-h.html`,
    `${REPO}/module-i.html`, `${REPO}/module-j.html`, `${REPO}/module-k.html`, `${REPO}/module-m.html`,
    `${REPO}/module-n.html`, `${REPO}/module-o.html`, `${REPO}/module-p.html`, `${REPO}/module-q.html`,
    `${REPO}/module-r.html`, `${REPO}/module-s.html`, `${REPO}/module-t.html`, `${REPO}/module-u.html`,
    `${REPO}/module-v.html`, `${REPO}/module-w.html`, `${REPO}/module-x.html`, `${REPO}/module-y.html`,
    `${REPO}/module-z.html`, `${REPO}/module-aa.html`, `${REPO}/module-bb.html`, `${REPO}/module-cc.html`,
    `${REPO}/module-dd.html`, `${REPO}/module-ee.html`, `${REPO}/module-ff.html`, `${REPO}/module-gg.html`,
    `${REPO}/module-hh.html`, `${REPO}/module-ii.html`, `${REPO}/module-jj.html`, `${REPO}/module-kk.html`,
    `${REPO}/module-ll.html`, `${REPO}/module-mm.html`, `${REPO}/module-nn.html`
];

// Install Event: Cache everything upfront for offline use
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Caching all game files for offline stability...');
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => self.skipWaiting())
    );
});

// Activate Event: Clear old cache versions on update
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

// Fetch Interceptor: Serve cached files instantly offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});
