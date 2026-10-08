const VERSION="12.2.0-20261008";
const CACHE=`my-routine-${VERSION}`;
const CORE=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("message",event=>{if(event.data?.type==="SKIP_WAITING")self.skipWaiting()});
self.addEventListener("fetch",event=>{
 const req=event.request;
 if(req.method!=="GET")return;
 if(req.mode==="navigate"){
  event.respondWith(fetch(new Request(req,{cache:"no-store"})).then(res=>{
   if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put("./index.html",copy)).catch(()=>{});} return res;
  }).catch(()=>caches.match("./index.html")));
  return;
 }
 event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{if(res.ok)caches.open(CACHE).then(c=>c.put(req,res.clone())).catch(()=>{});return res})));
});
