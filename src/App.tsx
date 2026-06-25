import { useEffect, useState } from "react";
import { AppNavigation } from "./components/AppNavigation";
import { CampaignTimeline } from "./components/CampaignTimeline";
import { ShareIcon } from "./components/Icons";
import { MapStage } from "./components/MapStage";
import { ProjectAbout } from "./components/ProjectAbout";
import { SiteDirectory } from "./components/SiteDirectory";
import { SitePanel } from "./components/SitePanel";
import siteData from "./data/sites.json";
import type { AppView, Site } from "./types/site";

const sites = siteData as Site[];

function App() {
  const [activeSite, setActiveSite] = useState<Site | null>(null);
  const [activeView, setActiveView] = useState<AppView>("map");
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!activeSite) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveSite(null);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeSite]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const changeView = (view: AppView) => {
    setActiveView(view);
    setActiveSite(null);
  };

  const showSiteOnMap = (site: Site) => {
    setActiveView("map");
    setActiveSite(site);
  };

  const shareProject = async () => {
    const shareData = {
      title: "淮海战役红色遗址交互地图",
      text: "通过交互地图了解淮海战役红色遗址。",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setToast("链接已复制");
      }
    } catch (error) {
      if ((error as DOMException).name !== "AbortError") setToast("暂时无法分享，请复制浏览器地址");
    }
  };

  const viewTitles: Record<AppView, string> = {
    map: "遗址交互地图",
    timeline: "战役脉络",
    directory: "遗址档案名录",
    about: "项目说明",
  };

  return (
    <main className="app-shell">
      <AppNavigation activeView={activeView} onChange={changeView} />

      <div className="app-main">
        <header className="app-header">
          <div className="min-w-0">
            <div className="app-header__eyebrow">
              <span />
              红色文化数字化传播实践
            </div>
            <h1>{viewTitles[activeView]}</h1>
          </div>
          <button type="button" className="header-action" onClick={shareProject} aria-label="分享项目">
            <ShareIcon />
            <span>分享</span>
          </button>
        </header>

        <div className={`view-shell view-shell--${activeView}`}>
          {activeView === "map" && (
            <MapStage
              sites={sites}
              activeSiteId={activeSite?.id ?? null}
              onSelectSite={setActiveSite}
            />
          )}
          {activeView === "timeline" && <CampaignTimeline sites={sites} onShowOnMap={showSiteOnMap} />}
          {activeView === "directory" && (
            <SiteDirectory sites={sites} onSelectSite={setActiveSite} onShowOnMap={showSiteOnMap} />
          )}
          {activeView === "about" && <ProjectAbout sites={sites} />}
        </div>
      </div>

      {activeSite && (
        <>
          <button
            type="button"
            className="site-backdrop"
            onClick={() => setActiveSite(null)}
            aria-label="关闭遗址详情"
          />
          <SitePanel site={activeSite} onClose={() => setActiveSite(null)} />
        </>
      )}

      {toast && <div className="toast" role="status">{toast}</div>}
    </main>
  );
}

export default App;
