import type { Site } from "../types/site";

export type ContentStatusKey = keyof Site["contentStatus"];

const statusLabels: Record<ContentStatusKey, { ready: string; neutral: string }> = {
  history: { ready: "史实有来源", neutral: "史实来源" },
  images: { ready: "图片已收录", neutral: "图片资料" },
  video: { ready: "视频已接入", neutral: "视频检索" },
};

export function isContentReady(site: Site, key: ContentStatusKey) {
  return site.contentStatus[key] === (key === "history" ? "已核实" : "已补充");
}

export function getContentStatusLabel(site: Site, key: ContentStatusKey) {
  return isContentReady(site, key) ? statusLabels[key].ready : statusLabels[key].neutral;
}
