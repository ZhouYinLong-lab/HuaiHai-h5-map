import type { Site } from "../types/site";
import { MapIcon } from "./Icons";

interface CampaignTimelineProps {
  sites: Site[];
  onShowOnMap: (site: Site) => void;
}

interface TimelineBeat {
  date: string;
  title: string;
  body: string;
}

interface TimelineMap {
  label: string;
  caption: string;
  path: string;
  markers: Array<{ x: number; y: number; label: string }>;
}

interface TimelineSection {
  stage: string;
  index: string;
  date: string;
  title: string;
  area: string;
  summary: string;
  beats: TimelineBeat[];
  result: string;
  sourceUrl: string;
  sourceLabel: string;
  map: TimelineMap;
}

const sections: TimelineSection[] = [
  {
    stage: "第一阶段",
    index: "01",
    date: "1948.11.06 — 11.22",
    title: "东线合围：碾庄圩的第一声炮响",
    area: "徐州以东 · 贾汪—窑湾—碾庄圩",
    summary:
      "战役从徐州以东撕开缺口。黄百韬兵团西撤途中被华东野战军追上，人民解放军一面切断退路，一面顶住徐州方向的增援，把一场追击战逐步推成了合围战。",
    beats: [
      {
        date: "11月6日",
        title: "沿陇海线展开追击",
        body: "华东野战军向徐州以东发起进攻，战场重心迅速从局部阻击转向对黄百韬兵团的连续追击。",
      },
      {
        date: "11月8日",
        title: "贾汪起义，徐州东门洞开",
        body: "第三绥靖区副司令官张克侠、何基沣率部在贾汪、台儿庄地区起义，改变了徐州以东的通道条件，也为后续合围争取了时间。",
      },
      {
        date: "11月16—22日",
        title: "碾庄圩完成围歼",
        body: "解放军在碾庄地区连续攻坚，同时抗击徐州方向援军，最终歼灭黄百韬兵团，首阶段由险转胜。",
      },
    ],
    result: "第一阶段的意义，不只是歼灭一个兵团，更是把战场主动权从“追赶”推向了“围歼”。",
    sourceUrl: "https://cpc.people.com.cn/n1/2023/0213/c443712-32622466.html",
    sourceLabel: "中国共产党新闻网：淮海战役胜利的基石",
    map: {
      label: "东线态势",
      caption: "追击、阻援与合围在碾庄圩交汇",
      path: "M38 168 C78 124 126 134 166 106 S260 91 360 48",
      markers: [
        { x: 72, y: 137, label: "贾汪" },
        { x: 186, y: 101, label: "窑湾" },
        { x: 333, y: 58, label: "碾庄圩" },
      ],
    },
  },
  {
    stage: "第二阶段",
    index: "02",
    date: "1948.11.23 — 12.15",
    title: "南线转折：双堆集的硬仗",
    area: "宿县以南 · 濉溪—双堆集",
    summary:
      "东线胜利后，战场没有停下来。黄维兵团向宿县方向推进，成为新的主要目标。中原野战军与华东野战军在总前委统一指挥下调整兵力，把南线从快速穿插变成纵深围歼。",
    beats: [
      {
        date: "11月23日",
        title: "战役目标转向黄维兵团",
        body: "第一阶段结束后，人民解放军抓住敌军分散、孤军推进的态势，将黄维兵团作为第二阶段的主要歼击对象。",
      },
      {
        date: "11月下旬",
        title: "双堆集形成包围圈",
        body: "黄维兵团进入以双堆集为中心的地区后，解放军从多方向压缩其活动空间，临涣、双堆集一线的指挥与支前网络持续运转。",
      },
      {
        date: "12月15日",
        title: "南线攻坚完成",
        body: "经过持续攻坚，黄维兵团被歼。第二阶段以一场艰苦的阵地战落幕，淮海战役的胜负天平进一步倾斜。",
      },
    ],
    result: "第二阶段像一段突然收紧的弦：推进越深，退路越窄；双堆集的突破，让战役进入决胜区间。",
    sourceUrl: "https://cpc.people.com.cn/GB/64176/64180/2533593.html",
    sourceLabel: "中国共产党新闻网：双堆烈士陵园战史介绍",
    map: {
      label: "南线态势",
      caption: "黄维兵团深入后，包围圈在双堆集收紧",
      path: "M42 52 C102 73 144 76 178 109 S268 147 356 177",
      markers: [
        { x: 76, y: 63, label: "宿县" },
        { x: 188, y: 112, label: "临涣" },
        { x: 330, y: 167, label: "双堆集" },
      ],
    },
  },
  {
    stage: "第三阶段",
    index: "03",
    date: "1948.12.16 — 1949.01.10",
    title: "决胜陈官庄：等待与总攻",
    area: "永城东北 · 陈官庄—青龙集",
    summary:
      "两大兵团相继被歼后，杜聿明集团从徐州突围，却在陈官庄、青龙集一带陷入包围。第三阶段并非一路猛攻：围困、政治攻势、局部战斗与最后总攻交替推进，战场节奏在漫长等待中不断蓄力。",
    beats: [
      {
        date: "12月16日",
        title: "杜聿明集团被围",
        body: "徐州守军南撤后，华东野战军在陈官庄地区完成包围，淮海战役进入持续时间最长、规模最大的决胜阶段。",
      },
      {
        date: "12月下旬",
        title: "围困与政治攻势并行",
        body: "为减少伤亡并配合全国战局，前线一度采取围而不打、开展政治攻势的办法，陈官庄成为耐力与意志的较量。",
      },
      {
        date: "1949年1月10日",
        title: "最后总攻，战役落幕",
        body: "解放军发起总攻，杜聿明集团被全歼。历时66天的淮海战役结束，长江中下游以北的战略格局由此改写。",
      },
    ],
    result: "最后的胜利不是突然降临的，它由一次次稳住阵脚、压缩空间和等待时机累积而成。",
    sourceUrl: "https://dangshi.people.com.cn/n1/2021/0514/c436975-32102882.html",
    sourceLabel: "人民网党史频道：淮海战役第三阶段",
    map: {
      label: "决胜态势",
      caption: "突围路线被截断，陈官庄成为最后决战场",
      path: "M355 48 C301 66 282 104 236 127 S130 148 48 181",
      markers: [
        { x: 328, y: 58, label: "徐州" },
        { x: 244, y: 125, label: "青龙集" },
        { x: 69, y: 174, label: "陈官庄" },
      ],
    },
  },
  {
    stage: "纪念传承",
    index: "04",
    date: "战后至今",
    title: "战火之后，记忆留下",
    area: "徐州 · 淮北 · 商丘",
    summary:
      "战役结束后，旧址没有从地方生活中消失。纪念碑、烈士陵园、战地旧址与红色博物馆把战场上的选择、牺牲和人民支前的记忆保存下来，也让今天的参观者可以沿着地图重新走近那段历史。",
    beats: [
      {
        date: "从战场到纪念地",
        title: "空间被重新命名",
        body: "曾经的指挥所、战场和交通线，逐渐成为纪念设施、展陈空间与地方教育基地，地图上的坐标也因此拥有了新的叙事层。",
      },
      {
        date: "今天",
        title: "在地方记忆中继续讲述",
        body: "小朱庄战场、钟源阁等地通过纪念、展览和主题教育，把战役记忆连接到当代公共文化生活。",
      },
    ],
    result: "战役脉络在胜利处结束，红色记忆却从这里继续向今天延伸。",
    sourceUrl: "https://wlt.huaibei.gov.cn/gzdt/bmdt/56275111.html",
    sourceLabel: "淮北市文化旅游体育局：钟源阁红色文化博物馆",
    map: {
      label: "记忆地图",
      caption: "旧址、纪念设施与博物馆共同接续战役叙事",
      path: "M55 163 C108 127 155 131 202 106 S292 83 349 48",
      markers: [
        { x: 84, y: 147, label: "旧址" },
        { x: 204, y: 105, label: "纪念地" },
        { x: 330, y: 60, label: "博物馆" },
      ],
    },
  },
];

function TimelineMapCard({ map, site, onShowOnMap }: { map: TimelineMap; site?: Site; onShowOnMap: (site: Site) => void }) {
  return (
    <button
      type="button"
      className="timeline-map-card"
      onClick={() => site && onShowOnMap(site)}
      aria-label={site ? `在地图上查看${site.shortName}` : map.label}
      disabled={!site}
    >
      <span className="timeline-map-card__frame">
        <img src="/media/pixel/map-base-v2.png" alt="泛黄像素战役地图局部" />
        <span className="timeline-map-card__wash" aria-hidden="true" />
        <svg className="timeline-map-card__route" viewBox="0 0 400 220" aria-hidden="true">
          <path d={map.path} />
          {map.markers.map((marker) => (
            <g key={marker.label} transform={`translate(${marker.x} ${marker.y})`}>
              <circle r="6" />
              <circle className="timeline-map-card__marker-core" r="2" />
              <text x="9" y="4">{marker.label}</text>
            </g>
          ))}
        </svg>
        <span className="timeline-map-card__label">{map.label}</span>
      </span>
      <span className="timeline-map-card__caption">{map.caption}</span>
      {site && <span className="timeline-map-card__action"><MapIcon /> 点击回到地图</span>}
    </button>
  );
}

export function CampaignTimeline({ sites, onShowOnMap }: CampaignTimelineProps) {
  return (
    <section className="timeline-page" aria-labelledby="timeline-title">
      <header className="timeline-hero">
        <div>
          <p className="section-eyebrow">CAMPAIGN TIMELINE / 战役脉络</p>
          <h2 id="timeline-title">六十六天，三个阶段</h2>
          <p>从徐州以东到双堆集，再到陈官庄。沿时间线理解地图上的地标、事件与指挥关系，看见一场战役如何在转折、坚守与决胜中推进。</p>
        </div>
        <div className="timeline-hero__date">
          <span>1948.11.06</span>
          <i />
          <span>1949.01.10</span>
        </div>
      </header>

      <div className="timeline-track">
        {sections.map((section) => {
          const sectionSites = sites.filter((site) => site.stage === section.stage);
          return (
            <article className="phase-section" key={section.stage}>
              <div className="phase-section__rail">
                <span>{section.index}</span>
                <i />
              </div>
              <div className="phase-section__content">
                <div className="phase-section__heading">
                  <div>
                    <p>{section.stage} · {section.date}</p>
                    <h3>{section.title}</h3>
                    <strong>{section.area}</strong>
                  </div>
                  <span className="phase-section__count">{sectionSites.length}<small>处地标</small></span>
                </div>

                <div className="phase-story">
                  <div className="phase-story__copy">
                    <p className="phase-section__summary">{section.summary}</p>
                    <div className="phase-beats">
                      {section.beats.map((beat) => (
                        <div className="phase-beat" key={beat.title}>
                          <span>{beat.date}</span>
                          <div>
                            <h4>{beat.title}</h4>
                            <p>{beat.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <a className="phase-source" href={section.sourceUrl} target="_blank" rel="noreferrer">
                      <span>史料来源</span>
                      <strong>{section.sourceLabel}</strong>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                  <TimelineMapCard map={section.map} site={sectionSites[0]} onShowOnMap={onShowOnMap} />
                </div>

                <blockquote>{section.result}</blockquote>
                <div className="phase-sites">
                  {sectionSites.map((site) => (
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
        <strong>读图方式</strong>
        <p>地图卡片用于提示阶段性的空间变化，点击卡片或地标即可回到交互地图；战役叙事依据公开党史资料与官方纪念地介绍整理。</p>
      </footer>
    </section>
  );
}
