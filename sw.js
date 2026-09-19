const CACHE='nocturnal-games-v323';
const CORE=['./','./index.html','./styles.css?v=3.2.3','./config.js?v=3.2.3','./app.js?v=3.2.3','./manifest.json?v=3.2.3'];
const ASSETS=['./nc-cress.webp','./nc-dusk.webp','./nc-eclipse.webp','./nc-ember.webp','./nc-jinx.webp','./nc-moxie.webp','./nc-nyx.webp','./nc-sable.webp','./nc-selene.webp','./nc-vega.webp','./nocturne-collective-logo.webp','./nocturnal-games-logo.webp','./nocturnal-games-icon-192.png','./nocturnal-games-icon-512.png','./sc-silk.webp','./sc-sage.webp','./sc-saint.webp','./sc-scales.webp','./sc-shawn.webp','./sc-sigma.webp','./sc-sinister.webp','./sc-sir.webp','./sc-sphinx.webp','./sovereign-circle-logo.webp','./infernal-firm-logo.webp','./infernal-firm-banner.webp','./if-vex.webp','./if-seraphine.webp','./if-piprix.webp','./if-lucifer.webp','./if-vesper.webp','./if-malachar.webp','./if-mime.webp','./if-grimm.webp','./if-mara.webp'];
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


// v3.2.3 — Web Push delivery for installed Nocturnal Games PWAs.
self.addEventListener('push',event=>{
  let payload={title:'Nocturnal Games',body:'New game activity',url:'./',tag:'nocturnal-games'};
  try{
    if(event.data){
      const parsed=event.data.json();
      if(parsed&&typeof parsed==='object') payload={...payload,...parsed};
    }
  }catch{
    try{if(event.data)payload.body=event.data.text()||payload.body}catch{}
  }
  const options={
    body:payload.body||'',
    icon:'./nocturnal-games-icon-192.png',
    badge:'./nocturnal-games-icon-192.png',
    tag:payload.tag||'nocturnal-games',
    renotify:true,
    data:{url:payload.url||'./'}
  };
  event.waitUntil(self.registration.showNotification(payload.title||'Nocturnal Games',options));
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const target=new URL(event.notification?.data?.url||'./',self.location.origin).href;
  event.waitUntil((async()=>{
    const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    for(const client of windows){
      if('focus' in client){await client.focus();try{if('navigate' in client)await client.navigate(target)}catch{};return}
    }
    if(self.clients.openWindow)return self.clients.openWindow(target);
  })());
});
