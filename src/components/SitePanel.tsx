import type { Site } from "../types/site";
import { CheckIcon, CloseIcon, ExternalIcon, ImageIcon, PlayIcon, RouteIcon } from "./Icons";

interface SitePanelProps {
  site: Site;
  onClose: () => void;
}

function buildAmapUrl(query: string) {
  return `https://uri.amap.com/search?keyword=${encodeURIComponent(query)}&callnative=1`;
}

export function SitePanel({ site, onClose }: SitePanelProps) {
  return (
    <aside
      className="site-panel animate-rise"
      role="dialog"
      aria-modal="true"
      aria-labelledby="site-panel-title"
    >
      <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-archive-ink/20" aria-hidden="true" />
      <button
        type="button"
        className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full border border-archive-ink/15 bg-[#f7ebce]/90 text-archive-ink shadow-lg transition hover:bg-[#f7ebce] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-archive-red"
        onClick={onClose}
        aria-label="关闭遗址详情"
      >
        <CloseIcon />
      </button>

      <div className="grid gap-4 sm:grid-cols-[11rem_1fr]">
        <img
          src={site.image}
          alt={site.imageAlt}
          className="aspect-[4/3] w-full rounded-sm border border-archive-ink/15 object-cover sepia"
          loading="lazy"
        />
        <div className="min-w-0 pr-10 sm:pr-0">
          <p className="mb-1 text-xs tracking-[0.18em] text-archive-red">
            {site.region} · {site.category} · {site.stage}
          </p>
          <h2 id="site-panel-title" className="font-display text-2xl font-bold leading-tight text-archive-ink">
            {site.name}
          </h2>
          <p className="mt-3 text-sm leading-7 text-archive-muted">{site.summary}</p>
          <p className="site-address">{site.address}</p>
          <p className="mt-3 border-l-2 border-archive-gold bg-black/[0.035] px-3 py-2 text-xs leading-5 text-archive-muted">
            资料提示：{site.verificationNote}
          </p>
        </div>
      </div>

      <div className="site-panel__section">
        <h3>遗址档案</h3>
        <p>{site.history}</p>
        <div className="status-pills">
          <span className={site.contentStatus.history === "已核实" ? "is-ready" : ""}>
            <CheckIcon /> 史实{site.contentStatus.history}
          </span>
          <span className={site.contentStatus.images === "已补充" ? "is-ready" : ""}>
            <ImageIcon /> 图片{site.contentStatus.images}
          </span>
          <span className={site.contentStatus.video === "已补充" ? "is-ready" : ""}>
            <PlayIcon /> 视频{site.contentStatus.video}
          </span>
        </div>
      </div>

      {site.gallery.length > 0 && (
        <div className="site-panel__section">
          <h3>历史影像</h3>
          <div className="site-gallery">
            {site.gallery.map((image) => (
              <figure key={image.src}>
                <img src={image.src} alt={image.alt} loading="lazy" />
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      {site.sources.length > 0 && (
        <div className="site-panel__section">
          <h3>资料来源</h3>
          <ul className="source-list">
            {site.sources.map((source) => (
              <li key={source.title}>
                {source.url ? <a href={source.url} target="_blank" rel="noreferrer">{source.title}<ExternalIcon /></a> : source.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3">
        <a
          className="site-action site-action--primary"
          href={site.videoUrl ?? site.videoSearchUrl}
          target="_blank"
          rel="noreferrer"
        >
          <PlayIcon />
          {site.videoUrl ? "播放专题视频" : "检索相关视频"}
        </a>
        <a
          className="site-action"
          href={buildAmapUrl(site.navigationQuery)}
          target="_blank"
          rel="noreferrer"
        >
          <RouteIcon />
          高德地图检索
        </a>
      </div>
    </aside>
  );
}
