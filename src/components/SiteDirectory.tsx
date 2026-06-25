import { useMemo, useState } from "react";
import type { Site } from "../types/site";
import { ImageIcon, PlayIcon, SearchIcon } from "./Icons";

interface SiteDirectoryProps {
  sites: Site[];
  onSelectSite: (site: Site) => void;
  onShowOnMap: (site: Site) => void;
}

const ALL = "全部";

export function SiteDirectory({ sites, onSelectSite, onShowOnMap }: SiteDirectoryProps) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState(ALL);
  const regions = useMemo(() => [ALL, ...new Set(sites.map((site) => site.region.slice(0, 2)))], [sites]);
  const filteredSites = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return sites.filter((site) => {
      const matchesRegion = region === ALL || site.region.startsWith(region);
      const haystack = [site.name, site.shortName, site.region, site.category, site.stage, ...site.tags]
        .join(" ")
        .toLowerCase();
      return matchesRegion && (!normalized || haystack.includes(normalized));
    });
  }, [query, region, sites]);

  return (
    <section className="content-page" aria-labelledby="directory-title">
      <div className="content-page__heading">
        <div>
          <p className="section-eyebrow">SITE ARCHIVE / 遗址档案</p>
          <h2 id="directory-title">淮海战役红色遗址名录</h2>
          <p>按区域浏览当前收录节点。正式史料到位后，只需替换对应档案内容。</p>
        </div>
        <div className="archive-count" aria-label={`共收录${sites.length}处遗址`}>
          <strong>{sites.length}</strong>
          <span>处遗址</span>
        </div>
      </div>

      <div className="directory-tools">
        <label className="search-field">
          <span className="sr-only">搜索遗址</span>
          <SearchIcon />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索名称、地区或类型"
          />
        </label>
        <div className="filter-row" aria-label="按省份筛选">
          {regions.map((item) => (
            <button
              key={item}
              type="button"
              className={region === item ? "is-active" : ""}
              onClick={() => setRegion(item)}
              aria-pressed={region === item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filteredSites.length > 0 ? (
        <div className="site-grid">
          {filteredSites.map((site, index) => (
            <article className="site-card" key={site.id}>
              <button type="button" className="site-card__media" onClick={() => onSelectSite(site)}>
                <img src={site.image} alt="" loading="lazy" />
                <span className="site-card__number">{String(index + 1).padStart(2, "0")}</span>
                <span className="site-card__stage">{site.stage}</span>
              </button>
              <div className="site-card__body">
                <p>{site.region} · {site.category}</p>
                <h3>
                  <button type="button" onClick={() => onSelectSite(site)}>{site.name}</button>
                </h3>
                <span className="site-card__address">{site.address}</span>
                <div className="site-card__status" aria-label="内容准备状态">
                  <span className={site.contentStatus.images === "已补充" ? "is-ready" : ""}>
                    <ImageIcon /> 图片{site.contentStatus.images}
                  </span>
                  <span className={site.contentStatus.video === "已补充" ? "is-ready" : ""}>
                    <PlayIcon /> 视频{site.contentStatus.video}
                  </span>
                </div>
                <div className="site-card__actions">
                  <button type="button" onClick={() => onSelectSite(site)}>查看档案</button>
                  <button type="button" onClick={() => onShowOnMap(site)}>地图定位</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <SearchIcon />
          <h3>没有匹配的遗址</h3>
          <p>换一个关键词或清除地区筛选试试。</p>
          <button type="button" onClick={() => { setQuery(""); setRegion(ALL); }}>清除筛选</button>
        </div>
      )}
    </section>
  );
}
