const static = "whativelearned-v1"
const assets = [
  "/",
  "1280px-Indian_Ocean_Waves_Coco_Beach.jpg",
  "/index.html",
  "src/css/main.css",
  "src/css/responsive.css",
  "src/js/data.js",
  "src/js/main.js",
  "src/js/quotes.js"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(static).then(cache => {
      cache.addAll(assets)
    })
  )
})


self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})