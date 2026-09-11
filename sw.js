const CACHE='babybat-v211-assets';
const CORE=['./','./index.html','./styles.css?v=2.1.1','./config.js?v=2.1.1','./app.js?v=2.1.1','./manifest.json', './assets/nc-cress.webp', './assets/nc-dusk.webp', './assets/nc-eclipse.webp', './assets/nc-ember.webp', './assets/nc-jinx.webp', './assets/nc-moxie.webp', './assets/nc-nyx.webp', './assets/nc-sable.webp', './assets/nc-selene.webp', './assets/nc-vega.webp', './assets/nocturne-collective-logo.webp', './assets/sc-sage.webp', './assets/sc-saint.webp', './assets/sc-scales.webp', './assets/sc-shawn.webp', './assets/sc-sigma.webp', './assets/sc-sinister.webp', './assets/sc-sir.webp', './assets/sc-sphinx.webp', './assets/sovereign-circle-logo.webp'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.hostname.endsWith('supabase.co'))return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{if(resp.ok&&u.origin===self.location.origin){const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return resp})));
});
