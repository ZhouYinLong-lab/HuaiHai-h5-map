import { useEffect, useRef } from "react";
import {
  TransformComponent,
  TransformWrapper,
  type ReactZoomPanPinchContentRef,
} from "react-zoom-pan-pinch";
import type { Site } from "../types/site";
import { MinusIcon, PlusIcon, ResetIcon } from "./Icons";

interface MapStageProps {
  sites: Site[];
  activeSiteId: string | null;
  onSelectSite: (site: Site) => void;
}

export function MapStage({ sites, activeSiteId, onSelectSite }: MapStageProps) {
  const transformRef = useRef<ReactZoomPanPinchContentRef>(null);

  useEffect(() => {
    if (!activeSiteId) return;
    const timer = window.setTimeout(() => {
      transformRef.current?.zoomToElement(`site-${activeSiteId}`, 1.65, 350);
    }, 100);
    return () => window.clearTimeout(timer);
  }, [activeSiteId]);

  return (
    <section className="relative min-h-0 min-w-0 w-full flex-1 overflow-hidden" aria-label="淮海战役遗址交互地图">
      <TransformWrapper
        ref={transformRef}
        initialScale={1}
        minScale={0.85}
        maxScale={4}
        centerOnInit
        limitToBounds={false}
        wheel={{ step: 0.12 }}
        doubleClick={{ disabled: true }}
        panning={{ velocityDisabled: true }}
      >
        <TransformComponent
          wrapperClass="map-transform-wrapper"
          contentClass="map-transform-content"
        >
          <div className="map-canvas relative overflow-hidden bg-archive-paper shadow-archive">
            <img
              src="/archive-map-placeholder.svg"
              alt="淮海战役区域态势示意底图，正式历史作战图待替换核验"
              className="h-full w-full select-none object-cover"
              draggable={false}
            />
            {sites.map((site, index) => {
              const active = site.id === activeSiteId;
              return (
                <button
                  key={site.id}
                  id={`site-${site.id}`}
                  type="button"
                  className={`site-marker group ${active ? "site-marker--active" : ""}`}
                  style={{ left: `${site.x}%`, top: `${site.y}%` }}
                  onClick={() => onSelectSite(site)}
                  aria-label={`查看${site.name}`}
                  aria-pressed={active}
                >
                  <span className="site-marker__flag" aria-hidden="true">
                    <span>{index + 1}</span>
                  </span>
                  <span className="site-marker__label">{site.shortName}</span>
                </button>
              );
            })}
          </div>
        </TransformComponent>
      </TransformWrapper>

      <div className="map-controls">
        <button className="map-control" type="button" onClick={() => transformRef.current?.zoomIn()} aria-label="放大地图">
          <PlusIcon />
        </button>
        <button className="map-control" type="button" onClick={() => transformRef.current?.zoomOut()} aria-label="缩小地图">
          <MinusIcon />
        </button>
        <button className="map-control" type="button" onClick={() => transformRef.current?.resetTransform()} aria-label="重置地图">
          <ResetIcon />
        </button>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/15 bg-archive-dark/75 px-3 py-1.5 text-center text-[11px] tracking-[0.12em] text-[#f8ebcc] shadow-lg backdrop-blur-sm">
        单指拖拽 · 双指缩放 · 点击红旗
      </div>
    </section>
  );
}
