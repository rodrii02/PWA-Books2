// // // serviceWorker.js

// let cacheData = "appV1";

// // Agrega los recursos que deseas cachear aquí
//         // Por ejemplo:
//         // ... Agrega otros recursos que necesites cachear
// this.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(cacheData).then((cache) => {
//       cache.addAll([
//         // '/',
//         // '/PWA-Books',
//         // '/index.html',
//         // '/PWA-Books/static/js/bundle.js',
//         // '/PWA-Books/manifest.json',
//         // '/PWA-Books/logo192.png',
//         // '/PWA-Books/favicon.ico'
//       ]);
//     })
//   );
// });

// this.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((resp) => {
//       if (resp) {
//         return resp;
//       }
//     })
//   );
// });
