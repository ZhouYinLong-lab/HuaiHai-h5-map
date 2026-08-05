import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
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
const stageMeta: Record<(typeof stageOptions)[number], string> = {
  全部: "OVERVIEW",
  第一阶段: "PHASE 01",
  第二阶段: "PHASE 02",
  第三阶段: "PHASE 03",
  纪念传承: "MEMORY",
};
const siteStageMeta: Record<string, string> = {
  第一阶段: "PHASE 01",
  第二阶段: "PHASE 02",
  第三阶段: "PHASE 03",
  纪念传承: "MEMORY",
};
const phaseCards = [
  { key: "phase-one", stage: "第一阶段", code: "PHASE 01", direction: "徐东 · 碾庄圩方向", left: "83.6%", top: "11.6%", tilt: "3deg" },
  { key: "phase-two", stage: "第二阶段", code: "PHASE 02", direction: "宿县 · 双堆集方向", left: "67%", top: "76%", tilt: "-2deg" },
  { key: "phase-three", stage: "第三阶段", code: "PHASE 03", direction: "永城 · 陈官庄方向", left: "26%", top: "38%", tilt: "-3deg" },
] as const;

const kindLabels: Record<Site["kind"], string> = {
  battlefield: "战场与战斗",
  command: "指挥旧址",
  uprising: "起义事件",
  memorial: "纪念设施",
};

const markerRows: Record<Site["kind"], number> = {
  battlefield: 0,
  command: 1,
  uprising: 2,
  memorial: 3,
};

const markerTilts = [-3, 2, -1, 1, 4] as const;
const markerScales = [0.96, 1, 0.93, 1.03, 0.89] as const;
const zoomLevels = [1, 1.5, 2.25] as const;

function nearestZoomLevel(scale: number) {
  return zoomLevels.reduce((nearest, level) =>
    Math.abs(level - scale) < Math.abs(nearest - scale) ? level : nearest,
  zoomLevels[0]);
}

function compactDate(site: Site) {
  if (site.stage === "纪念传承") return "传承纪念";
  return site.eventDate
    .replace(/，.*$/, "")
    .replace(/(\d{4})年(\d{1,2})月(\d{1,2})日?/g, "$1.$2.$3")
    .replace(/(\d{4})年(\d{1,2})月/g, "$1.$2")
    .replace(/(\d{1,2})月(\d{1,2})日?/g, "$1.$2")
    .replace(/(\d{1,2})月/g, "$1")
    .replace(/(\d{4})年/g, "$1")
    .replace(/日/g, "")
    .replace("至", "—");
}

function markerMeta(site: Site) {
  const stage = siteStageMeta[site.stage] ?? site.stage;
  return site.stage === "纪念传承" ? `${stage} · 传承纪念` : `${stage} · ${compactDate(site)}`;
}

export function MapStage({ sites, activeSiteId, onSelectSite }: MapStageProps) {
  const transformRef = useRef<ReactZoomPanPinchContentRef>(null);
  const [activeStage, setActiveStage] = useState<(typeof stageOptions)[number]>("全部");
  const [currentScale, setCurrentScale] = useState<number>(zoomLevels[0]);
  const visibleSites = useMemo(
    () => sites.filter((site) => activeStage === "全部" || site.stage === activeStage),
    [activeStage, sites],
  );

  useEffect(() => {
    if (!activeSiteId) return;
    const timer = window.setTimeout(() => {
      transformRef.current?.zoomToElement(`site-${activeSiteId}`, 2, 350);
    }, 100);
    return () => window.clearTimeout(timer);
  }, [activeSiteId]);

  const zoomToLevel = (level: (typeof zoomLevels)[number]) => {
    transformRef.current?.centerView(level, 520, "easeOut");
  };

  const zoomInToNextLevel = () => {
    const nextLevel = zoomLevels.find((level) => level > currentScale + 0.05) ?? zoomLevels[zoomLevels.length - 1];
    zoomToLevel(nextLevel);
  };

  const zoomOutToPreviousLevel = () => {
    const previousLevel = [...zoomLevels].reverse().find((level) => level < currentScale - 0.05) ?? zoomLevels[0];
    zoomToLevel(previousLevel);
  };

  return (
    <section className="relative min-h-0 min-w-0 w-full flex-1 overflow-hidden" aria-label="淮海战役遗址交互地图">
      <TransformWrapper
        ref={transformRef}
        initialScale={1}
        minScale={1}
        maxScale={3}
        centerOnInit
        centerZoomedOut
        disablePadding
        limitToBounds
        wheel={{ step: 0.12, smoothStep: 0.002 }}
        pinch={{ step: 1 }}
        zoomAnimation={{ animationTime: 520, animationType: "easeOut" }}
        alignmentAnimation={{ animationTime: 520, velocityAlignmentTime: 520, animationType: "easeOut" }}
        velocityAnimation={{ disabled: true }}
        doubleClick={{ disabled: true }}
        panning={{ velocityDisabled: true }}
        onTransformed={(_, state) => setCurrentScale(state.scale)}
        onPinchingStop={(ref) => {
          const level = nearestZoomLevel(ref.state.scale);
          if (Math.abs(level - ref.state.scale) > 0.01) ref.centerView(level, 520, "easeOut");
        }}
        onWheelStop={(ref) => {
          const level = nearestZoomLevel(ref.state.scale);
          if (Math.abs(level - ref.state.scale) > 0.01) ref.centerView(level, 520, "easeOut");
        }}
      >
        <TransformComponent
          wrapperClass="map-transform-wrapper"
          contentClass="map-transform-content"
        >
          <div className={`map-canvas relative overflow-hidden bg-archive-paper shadow-archive ${activeStage === "全部" ? "is-overview" : "is-filtered"}`}>
            <img
              src="./media/pixel/map-base-v2.png"
              alt=""
              aria-hidden="true"
              className="map-canvas__pixel-base"
              draggable={false}
            />
            <img
              src="./archive-map.svg"
              alt="依据权威公开资料原创绘制的淮海战役地标与战场态势示意图"
              className="map-canvas__annotation-layer h-full w-full select-none"
              draggable={false}
            />
            {phaseCards
              .filter((phase) => activeStage === "全部" || activeStage === phase.stage)
              .map((phase) => (
                <button
                  key={phase.key}
                  type="button"
                  className={`map-phase-card map-phase-card--${phase.key} ${activeStage === phase.stage ? "is-active" : ""}`}
                  style={{ left: phase.left, top: phase.top, "--phase-card-tilt": phase.tilt } as CSSProperties}
                  onClick={() => setActiveStage(phase.stage)}
                  aria-pressed={activeStage === phase.stage}
                  aria-label={`只显示${phase.stage}遗址`}
                >
                  <small>{phase.code}</small>
                  <strong>{phase.stage}</strong>
                  <span>{phase.direction}</span>
                </button>
              ))}
            {visibleSites.map((site) => {
              const active = site.id === activeSiteId;
              const kindIndex = sites.filter((item) => item.kind === site.kind).findIndex((item) => item.id === site.id);
              const markerColumn = kindIndex % 4;
              const markerStyle = {
                left: `${site.x}%`,
                top: `${site.y}%`,
                "--pixel-marker-x": `${markerColumn * 33.3333}%`,
                "--pixel-marker-y": `${markerRows[site.kind] * 33.3333}%`,
                "--pixel-marker-tilt": `${markerTilts[kindIndex % markerTilts.length]}deg`,
                "--pixel-marker-scale": markerScales[kindIndex % markerScales.length],
              } as CSSProperties;
              return (
                <button
                  key={site.id}
                  id={`site-${site.id}`}
                  type="button"
                  className={`site-marker site-marker--${site.kind} site-marker--label-${site.labelPosition} group ${active ? "site-marker--active" : ""}`}
                  style={markerStyle}
                  onClick={() => onSelectSite(site)}
                  aria-label={`查看${site.name}`}
                  aria-pressed={active}
                  title={`${site.eventDate}｜${site.eventTitle}`}
                >
                  <span className="site-marker__symbol" aria-hidden="true" />
                  <span className="site-marker__leader" aria-hidden="true" />
                  <span className="site-marker__label">
                    <small>{markerMeta(site)}</small>
                    <strong>{site.shortName}</strong>
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
            className={`map-stage-filter__item ${activeStage === stage ? "is-active" : ""}`}
            onClick={() => setActiveStage(stage)}
            aria-pressed={activeStage === stage}
          >
            <small>{stageMeta[stage]}</small>
            <strong>{stage}</strong>
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
        <div className="map-zoom-status" aria-live="polite">
          <span>视角</span>
          <strong>{zoomLevels.indexOf(nearestZoomLevel(currentScale)) + 1}</strong>
          <small>/ 3</small>
        </div>
        <button className="map-control" type="button" onClick={zoomInToNextLevel} aria-label="放大地图到下一级">
          <PlusIcon />
        </button>
        <button className="map-control" type="button" onClick={zoomOutToPreviousLevel} aria-label="缩小地图到上一级">
          <MinusIcon />
        </button>
        <button className="map-control" type="button" onClick={() => zoomToLevel(zoomLevels[0])} aria-label="重置地图视角">
          <ResetIcon />
        </button>
      </div>

      <div className="map-tip">
        边界内拖动 · 三级缩放 · 点击地标
      </div>
    </section>
  );
}
