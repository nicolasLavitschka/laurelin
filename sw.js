// Laurelin no celular: permite instalar como aplicativo e abrir sem internet (mostra o aviso de "sem conexão").
// A página sempre vem da internet quando há conexão (as atualizações chegam sozinhas); a cópia guardada só é
// usada sem internet. Os dados (Supabase) nunca são guardados aqui.
const CACHE = "laurelin-v1";
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
