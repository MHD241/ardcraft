// Ard Blocks service worker: lets the game open and run without a connection once it has been loaded.
// Bump CACHE when you change any file in CORE so players get the update.
const CACHE = "ard-blocks-v4";
const CORE = ["./", "index.html", "parents.html", "privacy.html", "terms.html", "manifest.webmanifest", "lib/three.min.js", "lib/peerjs.min.js", "fonts/fonts.css", "fonts/font0.ttf", "fonts/font1.ttf", "fonts/font2.ttf", "fonts/font3.ttf", "fonts/font4.ttf", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/apple-touch-icon.png", "icons/favicon-64.png"];
// big media: saved too, but a missing one must not stop the game from installing
const MEDIA = ["adhan.mp3", "audio/animals/chicken.mp3", "audio/animals/bull.mp3", "audio/animals/cow.mp3", "audio/animals/sheep.mp3", "textures/textures.png", "skins/man-kufi.png", "skins/man-ghutra.png", "skins/man-turban.png", "tile-andalus.png", "tile-star.jpg", "tile-strapwork.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE).then(() => Promise.allSettled(MEDIA.map(u => c.add(u))))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin || r.headers.has("range")) return; // other sites (multiplayer) and audio seeking go straight to the network
  const page = r.mode === "navigate" || u.pathname.endsWith("/index.html");
  if (page) { // pages: newest from the network, the saved copy when offline
    e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put("index.html", cp)); return res; }).catch(() => caches.match("index.html").then(m => m || caches.match("./"))));
    return;
  }
  e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => { if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); } return res; })));
});
