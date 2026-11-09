const V="amelhens-pro-v8",X="amelhens-ext",CORE=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-maskable-512.png"],EXT=/geopf\.fr|arcgisonline\.com|openstreetmap\.org|cdnjs\.cloudflare\.com/;
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>0)))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!==X).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
if(EXT.test(u.hostname)){e.respondWith(caches.open(X).then(c=>c.match(r).then(m=>m||fetch(r).then(x=>{c.put(r,x.clone());return x}).catch(()=>m))));return}
if(u.origin!==location.origin)return;
e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(h=>h.put(r,c));return x}).catch(()=>caches.match(r).then(x=>x||caches.match("./index.html"))))});
