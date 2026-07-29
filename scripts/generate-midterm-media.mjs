import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const sitesPath = join(root, "src", "data", "sites.json");
const publicRoot = join(root, "public");

const selected = new Set([
  "huaihai-campaign-museum",
  "xuzhou-memorial-tower",
  "nianzhuang-memorial",
  "linhuan-wenchang-palace",
  "xiaolijia-front-committee",
  "shuangduiji-memorial",
]);

const palette = {
  paper: "#ead8ad",
  paperLight: "#f7ebce",
  ink: "#34261c",
  muted: "#665445",
  red: "#9f1d20",
  dark: "#2b2119",
  gold: "#ad7c2f",
};

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function splitTitle(title) {
  const clean = title.replace(/（.*?）/g, "");
  if (clean.length <= 12) return [clean];
  return [clean.slice(0, 12), clean.slice(12, 24)];
}

function makeCover(site, index) {
  const [lineOne, lineTwo = ""] = splitTitle(site.name);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(site.name)}中期审查档案风格资料图</title>
  <desc id="desc">项目原创档案风格示意图，不是历史照片，正式上线前需替换为实拍或授权图片。</desc>
  <defs>
    <filter id="paperNoise">
      <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="${index + 9}" />
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.13" />
      </feComponentTransfer>
      <feBlend mode="multiply" in2="SourceGraphic" />
    </filter>
    <linearGradient id="fade" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${palette.paperLight}" />
      <stop offset="0.62" stop-color="${palette.paper}" />
      <stop offset="1" stop-color="#d1b678" />
    </linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="${palette.dark}" />
  <rect x="86" y="74" width="1428" height="852" rx="18" fill="url(#fade)" filter="url(#paperNoise)" />
  <path d="M160 235 C360 150 470 315 650 250 S980 118 1190 250 S1380 345 1455 274" fill="none" stroke="${palette.red}" stroke-width="18" stroke-linecap="round" stroke-dasharray="34 26" opacity="0.78" />
  <path d="M190 680 C390 525 548 735 760 610 S1108 442 1415 612" fill="none" stroke="${palette.gold}" stroke-width="10" stroke-linecap="round" stroke-dasharray="24 22" opacity="0.66" />
  <g opacity="0.18" stroke="${palette.ink}" stroke-width="2">
    <path d="M185 172H1405M185 828H1405M250 128V870M1350 128V870" />
    <path d="M180 355H1420M180 510H1420M180 665H1420" stroke-dasharray="14 18" />
  </g>
  <g transform="translate(232 188)">
    <rect width="176" height="58" fill="${palette.red}" />
    <text x="88" y="38" text-anchor="middle" font-family="Georgia, serif" font-size="28" font-weight="700" fill="${palette.paperLight}">MIDTERM</text>
  </g>
  <g transform="translate(250 360)">
    <text font-family="STKaiti, KaiTi, SimSun, serif" font-size="98" font-weight="700" fill="${palette.ink}">${escapeXml(lineOne)}</text>
    ${lineTwo ? `<text y="112" font-family="STKaiti, KaiTi, SimSun, serif" font-size="78" font-weight="700" fill="${palette.ink}">${escapeXml(lineTwo)}</text>` : ""}
    <rect y="${lineTwo ? 158 : 122}" width="520" height="7" fill="${palette.red}" />
    <text y="${lineTwo ? 225 : 190}" font-family="Noto Serif SC, SimSun, serif" font-size="34" fill="${palette.muted}">${escapeXml(site.region)} · ${escapeXml(site.stage)} · ${escapeXml(site.category)}</text>
  </g>
  <g transform="translate(1120 605)">
    <path d="M0 0 92 28 0 56Z" fill="${palette.red}" />
    <rect x="-8" y="0" width="8" height="180" fill="${palette.ink}" />
    <circle cx="-4" cy="186" r="14" fill="${palette.red}" />
  </g>
  <g transform="translate(1125 214)" opacity="0.78">
    <circle cx="0" cy="0" r="58" fill="none" stroke="${palette.red}" stroke-width="8" />
    <text x="0" y="15" text-anchor="middle" font-family="STKaiti, KaiTi, serif" font-size="54" fill="${palette.red}">淮</text>
  </g>
  <text x="250" y="842" font-family="Noto Serif SC, SimSun, serif" font-size="28" fill="${palette.muted}">项目原创资料图｜非历史照片｜正式上线前替换为实拍或授权图片</text>
</svg>`;
}

function makeRoute(site, index) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(site.name)}战役脉络示意图</title>
  <desc id="desc">中期审查用原创战役脉络示意图，不是历史地图。</desc>
  <rect width="1600" height="1000" fill="${palette.paper}" />
  <rect x="84" y="82" width="1432" height="836" fill="none" stroke="${palette.ink}" stroke-width="4" opacity="0.28" />
  <g opacity="0.12" stroke="${palette.ink}">
    ${Array.from({ length: 10 }, (_, i) => `<path d="M${160 + i * 140} 130V870" />`).join("")}
    ${Array.from({ length: 6 }, (_, i) => `<path d="M140 ${190 + i * 120}H1460" />`).join("")}
  </g>
  <path d="M210 720 C420 ${260 + index * 12} 620 610 815 430 S1200 275 1390 395" fill="none" stroke="${palette.red}" stroke-width="22" stroke-linecap="round" stroke-dasharray="44 30" />
  <path d="M1390 395 l-92 -32 28 88z" fill="${palette.red}" />
  <g fill="${palette.red}" stroke="${palette.paperLight}" stroke-width="8">
    <circle cx="315" cy="640" r="34" />
    <circle cx="720" cy="470" r="34" />
    <circle cx="1080" cy="365" r="34" />
  </g>
  <text x="160" y="170" font-family="STKaiti, KaiTi, serif" font-size="74" font-weight="700" fill="${palette.ink}">战役脉络</text>
  <text x="160" y="232" font-family="Noto Serif SC, SimSun, serif" font-size="32" fill="${palette.muted}">${escapeXml(site.eventDate)} · ${escapeXml(site.eventTitle)}</text>
  <text x="160" y="842" font-family="Noto Serif SC, SimSun, serif" font-size="28" fill="${palette.muted}">依据公开资料整理的中期展示示意图，坐标和路线不作精确制图用途。</text>
</svg>`;
}

function makeSourceCard(site) {
  const titles = site.sources.slice(0, 3).map((source) => source.title);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(site.name)}资料来源卡片</title>
  <desc id="desc">中期审查用资料来源卡片。</desc>
  <rect width="1600" height="1000" fill="${palette.dark}" />
  <rect x="112" y="96" width="1376" height="808" rx="10" fill="${palette.paperLight}" />
  <rect x="168" y="150" width="1264" height="700" fill="none" stroke="${palette.red}" stroke-width="5" />
  <text x="220" y="250" font-family="STKaiti, KaiTi, serif" font-size="78" font-weight="700" fill="${palette.ink}">资料来源摘记</text>
  <text x="220" y="318" font-family="Noto Serif SC, SimSun, serif" font-size="32" fill="${palette.muted}">${escapeXml(site.name)}</text>
  ${titles.map((title, index) => `
  <g transform="translate(230 ${430 + index * 112})">
    <circle cx="0" cy="-10" r="13" fill="${palette.red}" />
    <text x="34" y="0" font-family="Noto Serif SC, SimSun, serif" font-size="34" fill="${palette.ink}">${escapeXml(title)}</text>
  </g>`).join("")}
  <text x="220" y="790" font-family="Noto Serif SC, SimSun, serif" font-size="26" fill="${palette.muted}">页面“资料来源”区域保留可点击原始链接；本图仅作中期审查视觉补充。</text>
</svg>`;
}

const sites = JSON.parse(readFileSync(sitesPath, "utf8"));
let count = 0;

for (const [index, site] of sites.entries()) {
  if (!selected.has(site.id)) continue;

  const mediaDir = join(publicRoot, "media", "sites", site.id);
  mkdirSync(mediaDir, { recursive: true });

  writeFileSync(join(mediaDir, "cover.svg"), makeCover(site, index), "utf8");
  writeFileSync(join(mediaDir, "gallery-route.svg"), makeRoute(site, index), "utf8");
  writeFileSync(join(mediaDir, "gallery-sources.svg"), makeSourceCard(site), "utf8");

  site.image = `/media/sites/${site.id}/cover.svg`;
  site.imageAlt = `${site.name}中期审查用档案风格资料图，非历史照片`;
  site.gallery = [
    {
      src: `/media/sites/${site.id}/gallery-route.svg`,
      alt: `${site.name}战役脉络示意图`,
      caption: "中期审查原创示意图：用于表现战役脉络，不作精确历史地图。",
    },
    {
      src: `/media/sites/${site.id}/gallery-sources.svg`,
      alt: `${site.name}资料来源摘记卡片`,
      caption: "中期审查资料来源卡：正式上线前仍需补充实拍或授权历史照片。",
    },
  ];
  site.contentStatus.images = "已补充";

  const note = "中期审查图片为项目原创档案风格资料图，非历史照片；正式上线前仍需替换为实拍或授权图片。";
  if (!site.verificationNote.includes("中期审查图片")) {
    site.verificationNote = `${site.verificationNote}${site.verificationNote.endsWith("。") ? "" : "。"}${note}`;
  }

  count += 1;
}

writeFileSync(sitesPath, `${JSON.stringify(sites, null, 2)}\n`, "utf8");
console.log(`已生成 ${count} 处中期审查媒体资源`);
