// Laurelin no celular: permite instalar como aplicativo e abrir sem internet (mostra o aviso de "sem conexão").
// A página sempre vem da internet quando há conexão (as atualizações chegam sozinhas); a cópia guardada só é
// usada sem internet. Os dados (Supabase) nunca são guardados aqui.
// Também mostra o aviso de venda nova no site (o site manda; o conteúdo chega cifrado só para este celular).
const CACHE = "laurelin-v2";
const ARQUIVOS = ["./", "manifest.webmanifest", "icones/icon-192.png", "icones/icon-512.png", "icones/apple-touch-icon.png",
                  "icones/favicon-32.png"];

self.addEventListener("install", ev => {
  ev.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", ev => {
  ev.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", ev => {
  const req = ev.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;  // Supabase: direto
  if (req.mode === "navigate") {
    ev.respondWith(fetch(req, {cache: "no-store"})
      .then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put("./", c)); return r; })
      .catch(() => caches.match("./")));
    return;
  }
  ev.respondWith(caches.match(req).then(r => r || fetch(req)));
});

self.addEventListener("push", ev => {
  let d = {};
  try { d = ev.data ? ev.data.json() : {}; } catch (e) { d = {body: ev.data ? ev.data.text() : ""}; }
  ev.waitUntil(self.registration.showNotification(d.title || "Nova venda no site", {
    body: d.body || "", tag: d.tag || "venda", renotify: true, icon: "icones/icon-192.png", badge: "icones/icon-192.png",
    vibrate: [200, 100, 200], data: {url: d.url || "./#site"}}));
});

self.addEventListener("notificationclick", ev => {
  ev.notification.close();
  const url = new URL((ev.notification.data && ev.notification.data.url) || "./#site", self.registration.scope).href;
  ev.waitUntil(self.clients.matchAll({type: "window", includeUncontrolled: true}).then(cs => {
    for (const c of cs) {
      if (c.url.startsWith(self.registration.scope)) { c.postMessage({abrir: "vSite"}); return c.focus(); }
    }
    return self.clients.openWindow(url);
  }));
});
