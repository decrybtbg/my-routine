const CACHE="my-routine-v9-0-0";
const CORE=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("message",e=>{if(e.data?.type==="SKIP_WAITING")self.skipWaiting()});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;if(r.mode==="navigate"){e.respondWith(fetch(r,{cache:"no-store"}).then(res=>{caches.open(CACHE).then(c=>c.put("./index.html",res.clone()));return res}).catch(()=>caches.match("./index.html")));return}e.respondWith(caches.match(r).then(c=>c||fetch(r).then(res=>{if(res.ok)caches.open(CACHE).then(x=>x.put(r,res.clone()));return res})))});
