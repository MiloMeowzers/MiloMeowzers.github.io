/* moved: SLOOP for the SMK-37 is now at https://milomeowzers.github.io/mewcoder-smk37/ . This worker replaces the old
 * app's: it clears the old caches, unregisters itself and sends its open pages to the new address. */
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.map(function (k) { return caches.delete(k); })); })
    .then(function () { return self.registration.unregister(); })
    .then(function () { return self.clients.matchAll({ type: "window" }); })
    .then(function (cs) {
      cs.forEach(function (c) {
        var u = new URL(c.url), i = u.pathname.indexOf("/sloop-smk37");
        var rest = i >= 0 ? u.pathname.slice(i + "/sloop-smk37".length) : "/";
        c.navigate("https://milomeowzers.github.io/mewcoder-smk37" + rest + u.search + u.hash);
      });
    }));
});
