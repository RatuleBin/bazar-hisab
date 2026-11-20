# মাসিক বাজার হিসাব

বাংলা PWA — মাসিক খরচের হিসাব। ডেটা ফোনে (localStorage + IndexedDB) থাকে, আর চাইলে Firebase দিয়ে সব ডিভাইসে মেলানো যায়।

## সব ডিভাইসে একই ডেটা (সিঙ্ক) — ৫ মিনিটের সেটআপ
1. https://console.firebase.google.com → **Add project** (ফ্রি Spark প্ল্যানই যথেষ্ট)
2. **Build → Firestore Database → Create database** (Production mode)
3. **Rules** ট্যাবে এটা বসিয়ে Publish:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{d}/documents {
    match /ledgers/{id} {
      allow get, create, update: if id.size() >= 20;
    }
  }
}
```
4. **Project settings → General → Your apps → Web (</>)** রেজিস্টার করে `projectId` ও `apiKey` কপি করুন
5. `index.html`-এ `const CLOUD={project:'',key:''}` এ সেগুলো বসান, commit করুন
6. অ্যাপে ⚙️ সেটিংস → **কোড কপি**। অন্য ডিভাইসে একই কোড বসিয়ে **কোড বসান ও মেলান** চাপুন

সিঙ্ক কোডটা পাসওয়ার্ডের মতো — যার কাছে কোড আছে সে ডেটা দেখতে/বদলাতে পারবে। ডেটা এনক্রিপ্টেড নয়।
