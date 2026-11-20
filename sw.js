const C='bazar-v3',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>fetch(u,{cache:'no-store'}).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||r.url.includes('firestore.googleapis.com'))return;
  const same=new URL(r.url).origin===location.origin;
  e.respondWith(fetch(same?new Request(r,{cache:'no-store'}):r).then(x=>{if(x.ok||x.type==='opaque'){const cp=x.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{})}return x}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));
});
