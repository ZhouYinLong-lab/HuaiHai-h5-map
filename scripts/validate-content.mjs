import { readFileSync } from "node:fs";

const sites = JSON.parse(readFileSync(new URL("../src/data/sites.json", import.meta.url), "utf8"));
const requiredFields = [
  "id", "name", "shortName", "region", "address", "x", "y", "category",
  "stage", "summary", "history", "image", "imageAlt", "navigationQuery",
  "videoSearchUrl", "gallery", "sources", "contentStatus",
];

const errors = [];
for (const [index, site] of sites.entries()) {
  for (const field of requiredFields) {
    if (!(field in site) || site[field] === "") errors.push(`节点 ${index + 1} 缺少字段：${field}`);
  }
  if (typeof site.x !== "number" || site.x < 0 || site.x > 100) errors.push(`${site.name}: x 必须为 0–100`);
  if (typeof site.y !== "number" || site.y < 0 || site.y > 100) errors.push(`${site.name}: y 必须为 0–100`);
  if (!Array.isArray(site.gallery) || !Array.isArray(site.sources)) errors.push(`${site.name}: gallery/sources 必须为数组`);
}

if (sites.length < 8) errors.push(`遗址数量不足：当前 ${sites.length}，至少需要 8`);

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const readiness = {
  history: sites.filter((site) => site.contentStatus.history === "已核实").length,
  images: sites.filter((site) => site.contentStatus.images === "已补充").length,
  video: sites.filter((site) => site.contentStatus.video === "已补充").length,
};

console.log(`结构校验通过：${sites.length} 处遗址`);
console.log(`史实已核实：${readiness.history}/${sites.length}`);
console.log(`图片已补充：${readiness.images}/${sites.length}`);
console.log(`视频已补充：${readiness.video}/${sites.length}`);

if (process.argv.includes("--strict") && Object.values(readiness).some((count) => count !== sites.length)) {
  console.error("内容尚未全部就绪；资料补齐后再使用 --strict 执行发布前检查。");
  process.exit(2);
}
