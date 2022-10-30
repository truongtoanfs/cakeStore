const version = 1;
let staticCache = `staticCache-${version}`;
let imageCache = `imageCache-${version}`;

let assets = ['./', './index.html', './404.html'];

const addResourcesToCache = async () => {
  try {
    const cache = await caches.open(staticCache);
    await cache.addAll(assets);
  } catch (error) {
    console.log(`failed to update ${staticCache}.`);
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(addResourcesToCache());
});

const putInCache = async (cacheName, request, response) => {
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
}

const handleResponse = async ({ request, fallbackUrl}) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  try {
    const responseFromNetwork = await fetch(request);
    let type = responseFromNetwork.headers.get('content-type');
    if ((type && type.match(/^image\//i))) {
      putInCache(imageCache, request, responseFromNetwork.clone());
    } else {
      putInCache(staticCache, request, responseFromNetwork.clone());
    }
    return responseFromNetwork;
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    return new Response ("Network error happend", {
      status: 408,
      headers: { "Content-Type": "text/plain"},
    });
  }
};

self.addEventListener("fetch", (event) => {
  event.respondWith(
    handleResponse({
      request: event.request,
      fallbackUrl: './404.html',
    })
  )
})

const deleteOldCaches = async () => {
  const cacheKeepList = [staticCache, imageCache];
  const keyList = await caches.keys();
  const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
  await Promise.all(cachesToDelete.map((key) => caches.delete(key)));
};
self.addEventListener("activate", (event) => {
  event.waitUntil(deleteOldCaches());
})