const CACHE='babybat-v231-ledger-parser-fix';
const CORE=['./','./index.html','./styles.css?v=2.3.1','./config.js?v=2.3.1','./app.js?v=2.3.1','./manifest.json', './nc-cress.webp', './nc-dusk.webp', './nc-eclipse.webp', './nc-ember.webp', './nc-jinx.webp', './nc-moxie.webp', './nc-nyx.webp', './nc-sable.webp', './nc-selene.webp', './nc-vega.webp', './nocturne-collective-logo.webp', './sc-sage.webp', './sc-saint.webp', './sc-scales.webp', './sc-shawn.webp', './sc-sigma.webp', './sc-sinister.webp', './sc-sir.webp', './sc-sphinx.webp', './sovereign-circle-logo.webp'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.hostname.endsWith('supabase.co'))return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{if(resp.ok&&u.origin===self.location.origin){const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return resp})));
});
