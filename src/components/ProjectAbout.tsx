import type { Site } from "../types/site";
import { CheckIcon, ImageIcon, MapIcon, PlayIcon } from "./Icons";

interface ProjectAboutProps {
  sites: Site[];
}

export function ProjectAbout({ sites }: ProjectAboutProps) {
  const readyHistory = sites.filter((site) => site.contentStatus.history === "已核实").length;
  const readyImages = sites.filter((site) => site.contentStatus.images === "已补充").length;
  const readyVideos = sites.filter((site) => site.contentStatus.video === "已补充").length;

  return (
    <section className="content-page about-page" aria-labelledby="about-title">
      <div className="about-hero">
        <div>
          <p className="section-eyebrow">PRACTICE PROJECT / 社会实践</p>
          <h2 id="about-title">让红色遗址从名单变成可触摸的历史空间</h2>
          <p>
            项目以历史地图为叙事入口，把分散在多地的淮海战役遗址组织为可探索的数字档案。
            它不是旅游导航，也不替代专业史料数据库。
          </p>
        </div>
        <div className="about-seal" aria-hidden="true"><span>淮海</span><small>红色记忆</small></div>
      </div>

      <div className="about-grid">
        <article className="about-card about-card--wide">
          <span className="about-card__index">01</span>
          <h3>项目定位</h3>
          <p>面向手机、平板和电脑的社会实践成果展示平台。以沉浸式地图为主，遗址名录为辅，突出传播与学习体验。</p>
        </article>
        <article className="about-card">
          <span className="about-card__index">02</span>
          <h3>内容边界</h3>
          <p>未经权威来源确认的名称、坐标、史实、图片和视频均明确标记为待核实，不以推测填补空白。</p>
        </article>
        <article className="about-card">
          <span className="about-card__index">03</span>
          <h3>技术方式</h3>
          <p>纯静态 React H5，无数据库和用户系统，可部署到 Azure Static Web Apps，后续维护成本低。</p>
        </article>
      </div>

      <div className="readiness-section">
        <div>
          <p className="section-eyebrow">CONTENT READINESS / 内容准备度</p>
          <h3>当前只等待权威资料与媒体素材</h3>
        </div>
        <div className="readiness-grid">
          <ReadinessItem icon={MapIcon} label="遗址节点" value={sites.length} total={sites.length} suffix="处已建档" />
          <ReadinessItem icon={CheckIcon} label="史实核验" value={readyHistory} total={sites.length} suffix="处已完成" />
          <ReadinessItem icon={ImageIcon} label="历史图片" value={readyImages} total={sites.length} suffix="处已补充" />
          <ReadinessItem icon={PlayIcon} label="视频资料" value={readyVideos} total={sites.length} suffix="处已补充" />
        </div>
      </div>

      <div className="material-guide">
        <p className="section-eyebrow">MATERIAL CHECKLIST / 素材清单</p>
        <h3>每处遗址建议准备</h3>
        <ol>
          <li><strong>权威文字</strong><span>300–600 字简介、重要时间与来源链接</span></li>
          <li><strong>历史图片</strong><span>1 张封面、2–5 张图集，附来源和图注</span></li>
          <li><strong>视频链接</strong><span>B站或权威平台链接，不在本站自托管</span></li>
          <li><strong>地图信息</strong><span>正式名称、详细地址、高德检索结果</span></li>
        </ol>
      </div>
    </section>
  );
}

interface ReadinessItemProps {
  icon: typeof MapIcon;
  label: string;
  value: number;
  total: number;
  suffix: string;
}

function ReadinessItem({ icon: Icon, label, value, total, suffix }: ReadinessItemProps) {
  const progress = total === 0 ? 0 : Math.round((value / total) * 100);
  return (
    <article className="readiness-item">
      <Icon />
      <div>
        <span>{label}</span>
        <strong>{value}<small> / {total}</small></strong>
        <p>{suffix}</p>
      </div>
      <div className="readiness-bar" aria-label={`${label}完成${progress}%`}>
        <span style={{ width: `${progress}%` }} />
      </div>
    </article>
  );
}
