const CACHE='babybat-v312-brand-refresh';
const CORE=['./','./index.html','./styles.css?v=3.1.2','./config.js?v=3.1.2','./app.js?v=3.1.2','./manifest.json?v=3.1.2'];
const ASSETS=['./nc-cress.webp','./nc-dusk.webp','./nc-eclipse.webp','./nc-ember.webp','./nc-jinx.webp','./nc-moxie.webp','./nc-nyx.webp','./nc-sable.webp','./nc-selene.webp','./nc-vega.webp','./nocturne-collective-logo.webp','./babybat-logo.webp','./babybat-icon-192.png','./babybat-icon-512.png','./sc-silk.webp','./sc-sage.webp','./sc-saint.webp','./sc-scales.webp','./sc-shawn.webp','./sc-sigma.webp','./sc-sinister.webp','./sc-sir.webp','./sc-sphinx.webp','./sovereign-circle-logo.webp'];
self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await Promise.allSettled([...CORE,...ASSETS].map(async url=>{
    const response=await fetch(new Request(url,{cache:'reload'}));
    if(response.ok) await cache.put(url,response.clone());
  }));
  await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.hostname.endsWith('supabase.co')||url.hostname==='cdn.jsdelivr.net') return;
  const isCore=event.request.mode==='navigate'||/\/(?:app\.js|styles\.css|config\.js|index\.html)(?:\?|$)/.test(url.pathname+url.search);
  if(isCore){
    event.respondWith((async()=>{
      try{
        const fresh=await fetch(event.request,{cache:'no-store'});
        if(fresh.ok&&url.origin===self.location.origin){const cache=await caches.open(CACHE);await cache.put(event.request,fresh.clone())}
        return fresh;
      }catch{
        return (await caches.match(event.request))||(await caches.match('./index.html'));
      }
    })());
    return;
  }
  event.respondWith((async()=>{
    const cached=await caches.match(event.request);
    const network=fetch(event.request).then(async response=>{
      if(response.ok&&url.origin===self.location.origin){const cache=await caches.open(CACHE);await cache.put(event.request,response.clone())}
      return response;
    }).catch(()=>null);
    return cached||(await network)||Response.error();
  })());
});
