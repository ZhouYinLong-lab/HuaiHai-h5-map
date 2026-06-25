import type { Site } from "../types/site";
import { MapIcon } from "./Icons";

interface CampaignTimelineProps {
  sites: Site[];
  onShowOnMap: (site: Site) => void;
}

const phases = [
  {
    stage: "第一阶段",
    index: "01",
    date: "1948.11.06 — 11.22",
    title: "围歼黄百韬兵团",
    area: "徐州以东 · 碾庄圩方向",
    summary: "华东野战军在徐州以东展开作战，完成对黄百韬兵团的围歼。贾汪起义、窑湾战斗与徐东阻击共同改变战场态势。",
    result: "第一阶段结束后，东部战场主动权进一步转向人民解放军。",
  },
  {
    stage: "第二阶段",
    index: "02",
    date: "1948.11.23 — 12.15",
    title: "围歼黄维兵团",
    area: "宿县以南 · 双堆集方向",
    summary: "中原野战军和华东野战军协同作战，在双堆集地区围歼黄维兵团。临涣、小李家等指挥旧址串联起总前委与前线指挥体系。",
    result: "黄维兵团被歼，战役总体胜局进一步奠定。",
  },
  {
    stage: "第三阶段",
    index: "03",
    date: "1948.12.16 — 1949.01.10",
    title: "围歼杜聿明集团",
    area: "永城东北 · 陈官庄方向",
    summary: "人民解放军转入战役决胜阶段，在陈官庄地区完成对杜聿明集团的围歼。蔡洼、张菜园等旧址见证战役后期的指挥活动。",
    result: "1949年1月10日，历时66天的淮海战役胜利结束。",
  },
] as const;

export function CampaignTimeline({ sites, onShowOnMap }: CampaignTimelineProps) {
  return (
    <section className="timeline-page" aria-labelledby="timeline-title">
      <header className="timeline-hero">
        <div>
          <p className="section-eyebrow">CAMPAIGN TIMELINE / 战役脉络</p>
          <h2 id="timeline-title">六十六天，三个阶段</h2>
          <p>从徐州以东到双堆集，再到陈官庄。沿时间线理解地图上的地标、事件与指挥关系。</p>
        </div>
        <div className="timeline-hero__date">
          <span>1948.11.06</span>
          <i />
          <span>1949.01.10</span>
        </div>
      </header>

      <div className="timeline-track">
        {phases.map((phase) => {
          const phaseSites = sites.filter((site) => site.stage === phase.stage);
          return (
            <article className="phase-section" key={phase.stage}>
              <div className="phase-section__rail">
                <span>{phase.index}</span>
                <i />
              </div>
              <div className="phase-section__content">
                <div className="phase-section__heading">
                  <div>
                    <p>{phase.stage} · {phase.date}</p>
                    <h3>{phase.title}</h3>
                    <strong>{phase.area}</strong>
                  </div>
                  <span className="phase-section__count">{phaseSites.length}<small>处地标</small></span>
                </div>
                <p className="phase-section__summary">{phase.summary}</p>
                <blockquote>{phase.result}</blockquote>
                <div className="phase-sites">
                  {phaseSites.map((site) => (
                    <button type="button" key={site.id} onClick={() => onShowOnMap(site)}>
                      <span className={`phase-sites__symbol phase-sites__symbol--${site.kind}`} aria-hidden="true" />
                      <span>
                        <small>{site.eventDate}</small>
                        <strong>{site.shortName}</strong>
                        <em>{site.eventTitle}</em>
                      </span>
                      <MapIcon />
                    </button>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <footer className="timeline-footnote">
        <strong>说明</strong>
        <p>阶段日期和核心作战依据公开党史资料整理；地标的具体地址、建筑沿革和展陈内容仍按档案中的核验状态管理。</p>
      </footer>
    </section>
  );
}
