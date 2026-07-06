import { useEffect, useMemo, useRef, useState } from "react";
import type { Site } from "../types/site";
import { ExternalIcon, RouteIcon, SearchIcon } from "./Icons";

interface AmapExplorerProps {
  sites: Site[];
  onSelectSite: (site: Site) => void;
}

type AmapLoadState = "idle" | "missing-key" | "loading" | "ready" | "error";

declare global {
  interface Window {
    _AMapSecurityConfig?: {
      securityJsCode?: string;
    };
    AMapLoader?: {
      load: (options: {
        key: string;
        version: string;
        plugins?: string[];
      }) => Promise<AmapNamespace>;
    };
  }
}

interface AmapNamespace {
  Map: new (container: HTMLElement, options: Record<string, unknown>) => AmapMap;
  Marker: new (options: Record<string, unknown>) => unknown;
  Pixel: new (x: number, y: number) => unknown;
  PlaceSearch?: new (options: Record<string, unknown>) => {
    search: (keyword: string) => void;
  };
}

interface AmapMap {
  destroy: () => void;
}

const AMAP_KEY = import.meta.env.VITE_AMAP_KEY?.trim() ?? "";
const AMAP_SECURITY_JS_CODE = import.meta.env.VITE_AMAP_SECURITY_JS_CODE?.trim() ?? "";
const AMAP_LOADER_URL = "https://webapi.amap.com/loader.js";
const AMAP_DOC_URL = "https://lbs.amap.com/";
const AMAP_KEY_STATUS = AMAP_KEY ? "高德 JS API 已预置" : "高德 JS API 待部署配置";

function buildAmapSearchUrl(query: string) {
  return `https://uri.amap.com/search?keyword=${encodeURIComponent(query)}&callnative=1`;
}

function loadAmapLoader() {
  if (window.AMapLoader) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${AMAP_LOADER_URL}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("高德地图 Loader 加载失败")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = AMAP_LOADER_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("高德地图 Loader 加载失败"));
    document.head.appendChild(script);
  });
}

export function AmapExplorer({ sites, onSelectSite }: AmapExplorerProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<AmapMap | null>(null);
  const placeSearch = useRef<{ search: (keyword: string) => void } | null>(null);
  const [loadState, setLoadState] = useState<AmapLoadState>(AMAP_KEY ? "idle" : "missing-key");
  const [activeSiteId, setActiveSiteId] = useState(sites[0]?.id ?? "");
  const [query, setQuery] = useState("");

  const activeSite = sites.find((site) => site.id === activeSiteId) ?? sites[0];
  const filteredSites = useMemo(() => {
    const keyword = query.trim();
    if (!keyword) return sites;
    return sites.filter((site) =>
      [site.name, site.shortName, site.region, site.address, site.stage, site.category]
        .join(" ")
        .includes(keyword),
    );
  }, [query, sites]);

  useEffect(() => {
    if (!AMAP_KEY || !mapRef.current) return;

    let cancelled = false;
    setLoadState("loading");

    if (AMAP_SECURITY_JS_CODE) {
      window._AMapSecurityConfig = {
        securityJsCode: AMAP_SECURITY_JS_CODE,
      };
    }

    loadAmapLoader()
      .then(() => window.AMapLoader?.load({
        key: AMAP_KEY,
        version: "2.0",
        plugins: ["AMap.PlaceSearch"],
      }))
      .then((AMap) => {
        if (!AMap || cancelled || !mapRef.current) return;
        const map = new AMap.Map(mapRef.current, {
          zoom: 7,
          center: [117.2, 33.8],
          mapStyle: "amap://styles/whitesmoke",
          viewMode: "2D",
        });
        mapInstance.current = map;
        if (AMap.PlaceSearch && activeSite) {
          placeSearch.current = new AMap.PlaceSearch({
            map,
            pageSize: 1,
            pageIndex: 1,
            autoFitView: true,
          });
          placeSearch.current.search(activeSite.navigationQuery);
        }
        setLoadState("ready");
      })
      .catch((error) => {
        console.error(error);
        if (!cancelled) setLoadState("error");
      });

    return () => {
      cancelled = true;
      mapInstance.current?.destroy();
      mapInstance.current = null;
      placeSearch.current = null;
    };
  }, []);

  useEffect(() => {
    if (loadState !== "ready" || !activeSite || !placeSearch.current) return;
    placeSearch.current.search(activeSite.navigationQuery);
  }, [activeSite, loadState]);

  const statusText = {
    idle: "准备加载高德地图",
    "missing-key": "高德内嵌地图待部署配置",
    loading: "正在加载高德地图 JS API",
    ready: "高德地图 API 已接入",
    error: "高德地图加载失败，请检查 Key、域名白名单或网络",
  }[loadState];

  return (
    <section className="amap-page" aria-label="高德地图辅助导航">
      <div className="amap-hero">
        <div>
          <p className="section-eyebrow">AMAP SERVICE</p>
          <h2>高德地图辅助核验与导航</h2>
          <p>
            本页用于把遗址档案与高德开放平台衔接起来。访问者无需填写 Key；
            项目部署时预置 Key 后，页面会自动加载高德 JS API，用于地图预览和 POI 核验。
          </p>
        </div>
        <a className="amap-doc-link" href={AMAP_DOC_URL} target="_blank" rel="noreferrer">
          <ExternalIcon />
          高德开放平台
        </a>
      </div>

      <div className="amap-layout">
        <div className="amap-map-card">
          <div className="amap-map-card__header">
            <div>
              <span>API 状态</span>
              <strong>{statusText}</strong>
            </div>
            <code>{AMAP_KEY_STATUS}</code>
          </div>
          <div className={`amap-map ${loadState === "missing-key" ? "is-empty" : ""}`} ref={mapRef}>
            {loadState === "missing-key" && (
              <div className="amap-empty">
                <RouteIcon />
                <h3>高德内嵌地图暂未启用</h3>
                <p>
                  管理员在构建或部署环境预置高德 Web 端 JSAPI Key 后，访问者打开页面即可直接使用；
                  当前仍可通过下方按钮跳转高德地图检索遗址。
                </p>
              </div>
            )}
            {loadState === "error" && (
              <div className="amap-empty">
                <RouteIcon />
                <h3>地图暂未加载</h3>
                <p>请检查 Key、Web 端 JSAPI 服务、域名白名单和安全密钥配置。</p>
              </div>
            )}
          </div>
          <p className="amap-note">
            当前遗址数据以底图百分比坐标为主，尚未录入经纬度；高德页优先用于 POI 检索、实地核验和导航跳转。
          </p>
        </div>

        <aside className="amap-side-card">
          <label className="search-field amap-search">
            <SearchIcon />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="搜索高德辅助导航中的遗址"
              placeholder="搜索遗址、地区或阶段"
            />
          </label>

          <div className="amap-site-list">
            {filteredSites.map((site) => (
              <article className={`amap-site ${activeSite?.id === site.id ? "is-active" : ""}`} key={site.id}>
                <button type="button" onClick={() => setActiveSiteId(site.id)}>
                  <small>{site.region} · {site.stage}</small>
                  <strong>{site.name}</strong>
                  <span>{site.address}</span>
                </button>
                <div className="amap-site__actions">
                  <button type="button" onClick={() => onSelectSite(site)}>
                    查看档案
                  </button>
                  <a href={buildAmapSearchUrl(site.navigationQuery)} target="_blank" rel="noreferrer">
                    高德检索
                  </a>
                </div>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
