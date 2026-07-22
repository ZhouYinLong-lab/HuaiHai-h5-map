import { useEffect, useMemo, useRef, useState } from "react";
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

const stageOptions = ["全部", "第一阶段", "第二阶段", "第三阶段", "纪念传承"] as const;

const kindLabels: Record<Site["kind"], string> = {
  battlefield: "战场与战斗",
  command: "指挥旧址",
  uprising: "起义事件",
  memorial: "纪念设施",
};

function compactDate(site: Site) {
  if (site.stage === "纪念传承") return "纪念传承";
  return site.eventDate
    .replace(/，.*$/, "")
    .replace("1948年", "1948·")
    .replace("1949年", "1949·")
    .replace("至", "—");
}

export function MapStage({ sites, activeSiteId, onSelectSite }: MapStageProps) {
  const transformRef = useRef<ReactZoomPanPinchContentRef>(null);
  const [activeStage, setActiveStage] = useState<(typeof stageOptions)[number]>("全部");
  const visibleSites = useMemo(
    () => sites.filter((site) => activeStage === "全部" || site.stage === activeStage || site.id === activeSiteId),
    [activeSiteId, activeStage, sites],
  );

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
          <div className={`map-canvas relative overflow-hidden bg-archive-paper shadow-archive ${activeStage === "全部" ? "is-overview" : "is-filtered"}`}>
            <img
              src="./archive-map.svg"
              alt="依据权威公开资料原创绘制的淮海战役地标与战场态势示意图"
              className="h-full w-full select-none object-cover"
              draggable={false}
            />
            {visibleSites.map((site) => {
              const active = site.id === activeSiteId;
              return (
                <button
                  key={site.id}
                  id={`site-${site.id}`}
                  type="button"
                  className={`site-marker site-marker--${site.kind} site-marker--label-${site.labelPosition} group ${active ? "site-marker--active" : ""}`}
                  style={{ left: `${site.x}%`, top: `${site.y}%` }}
                  onClick={() => onSelectSite(site)}
                  aria-label={`查看${site.name}`}
                  aria-pressed={active}
                  title={`${site.eventDate}｜${site.eventTitle}`}
                >
                  <span className="site-marker__symbol" aria-hidden="true"><span /></span>
                  <span className="site-marker__label">
                    <small>{compactDate(site)}</small>
                    {site.shortName}
                  </span>
                </button>
              );
            })}
          </div>
        </TransformComponent>
      </TransformWrapper>

      <div className="map-stage-filter" aria-label="按战役阶段筛选">
        {stageOptions.map((stage) => (
          <button
            key={stage}
            type="button"
            className={activeStage === stage ? "is-active" : ""}
            onClick={() => setActiveStage(stage)}
            aria-pressed={activeStage === stage}
          >
            {stage}
            <span>{stage === "全部" ? sites.length : sites.filter((site) => site.stage === stage).length}</span>
          </button>
        ))}
      </div>

      <div className="map-legend" aria-label="地图图例">
        {(Object.entries(kindLabels) as Array<[Site["kind"], string]>).map(([kind, label]) => (
          <span key={kind}><i className={`legend-symbol legend-symbol--${kind}`} />{label}</span>
        ))}
      </div>

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

      <div className="map-tip">
        拖拽地图 · 双指缩放 · 点击地标
      </div>
    </section>
  );
}
