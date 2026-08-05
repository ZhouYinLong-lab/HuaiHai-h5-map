// 注意：sw.js 是纯静态文件，无法 import TS 模块。
// 此版本号必须与 src/utils/asset-revision.ts 的 ASSET_REVISION 保持同步，
// 且 APP_SHELL 中带 ?rev 的条目必须与对应组件里的请求 URL 完全一致
//（Cache API 按完整 URL 含 query 匹配，不一致会导致预缓存永不命中）。
const ASSET_REVISION = "9";
const CACHE_NAME = `huaihai-map-v${ASSET_REVISION}`;
const CORE_APP_SHELL = [
  "./",
  `./archive-map.svg?rev=${ASSET_REVISION}`,
  "./media/pixel/map-base-v2.png",
  "./site-placeholder.svg",
  "./media/pixel/icon-atlas-v1.png",
  "./media/pixel/archive-background-v1.png",
  "./media/pixel/navigation-background-v1.png",
  "./media/pixel/site-marker-atlas-v1.png",
];
const OPTIONAL_APP_SHELL = [
  "./manifest.webmanifest",
  "./app-icon.svg",
  "./favicon-pixel.png",
];
const APP_SHELL = [...CORE_APP_SHELL, ...OPTIONAL_APP_SHELL];

self.addEventListener("install", (event) => {
  // 逐个缓存 + allSettled：可选资源失败不拖垮 install，核心资源失败则拒绝安装，保留旧版 SW。
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(async (cache) => {
        const results = await Promise.allSettled(APP_SHELL.map((url) => cache.add(url)));
        const coreFailures = results.slice(0, CORE_APP_SHELL.length).filter((result) => result.status === "rejected");
        const optionalFailures = results.slice(CORE_APP_SHELL.length).filter((result) => result.status === "rejected");

        if (optionalFailures.length > 0) {
          console.warn(`[SW] ${optionalFailures.length} 个可选资源预缓存失败`);
        }
        if (coreFailures.length > 0) {
          throw new Error(`[SW] ${coreFailures.length} 个核心资源预缓存失败，保留旧版 SW`);
        }
      })
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./", copy));
          return response;
        })
        .catch(() => caches.match("./")),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200) return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match("./"));
    }),
  );
});
