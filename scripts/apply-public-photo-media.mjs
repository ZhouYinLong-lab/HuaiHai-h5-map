import { readFileSync, writeFileSync } from "node:fs";

const sitesPath = new URL("../src/data/sites.json", import.meta.url);

const publicPhotoNote =
  "中期审查图片已替换为公开资料照片并在图注标注来源；正式上线前仍建议补充实拍或授权文件。";
const generatedImageNote =
  "中期审查图片为项目原创档案风格资料图，非历史照片；正式上线前仍需替换为实拍或授权图片。";

const updates = {
  "huaihai-campaign-museum": {
    image: "/media/sites/huaihai-campaign-museum/cover.jpg",
    imageAlt: "淮海战役纪念馆公开资料照片",
    gallery: [
      {
        src: "/media/sites/huaihai-campaign-museum/gallery-01.jpg",
        alt: "淮海战役纪念馆展陈或馆区公开资料照片",
        caption: "公开资料照片，来源：China Services Info 淮海战役纪念馆相关页面。",
      },
    ],
  },
  "xuzhou-memorial-tower": {
    image: "/media/sites/xuzhou-memorial-tower/cover.png",
    imageAlt: "淮海战役烈士纪念塔园林公开资料照片",
    gallery: [
      {
        src: "/media/sites/xuzhou-memorial-tower/cover.png",
        alt: "淮海战役烈士纪念塔园林公开资料照片",
        caption: "公开资料照片，来源：《群众》杂志徐州淮海战役烈士纪念塔园林页面。",
      },
    ],
  },
  "nianzhuang-memorial": {
    image: "/media/sites/nianzhuang-memorial/cover.jpg",
    imageAlt: "碾庄圩战斗纪念馆公开资料照片",
    gallery: [
      {
        src: "/media/sites/nianzhuang-memorial/gallery-01.jpg",
        alt: "碾庄圩战斗纪念馆公开资料照片",
        caption: "公开资料照片，来源：江苏文明网“淮海战役碾庄圩战斗纪念馆”页面。",
      },
      {
        src: "/media/sites/nianzhuang-memorial/gallery-02.jpg",
        alt: "碾庄圩战斗纪念馆展陈公开资料照片",
        caption: "公开资料照片，来源：江苏文明网“淮海战役碾庄圩战斗纪念馆”页面。",
      },
    ],
  },
  "linhuan-wenchang-palace": {
    image: "/media/sites/linhuan-wenchang-palace/cover.jpg",
    imageAlt: "临涣文昌宫淮海战役总前委旧址公开资料照片",
    gallery: [
      {
        src: "/media/sites/linhuan-wenchang-palace/gallery-01.jpg",
        alt: "临涣文昌宫总前委旧址公开资料照片",
        caption: "公开资料照片，来源：濉溪县人民政府相关红色资源页面。",
      },
    ],
  },
  "xiaolijia-front-committee": {
    image: "/media/sites/xiaolijia-front-committee/cover.jpg",
    imageAlt: "小李家淮海战役总前委旧址公开资料照片",
    gallery: [
      {
        src: "/media/sites/xiaolijia-front-committee/gallery-01.jpg",
        alt: "小李家总前委旧址相关公开资料照片",
        caption: "公开资料照片，来源：人民网相关报道。",
      },
    ],
  },
  "shuangduiji-memorial": {
    image: "/media/sites/shuangduiji-memorial/cover.jpg",
    imageAlt: "淮海战役双堆集烈士陵园公开资料照片",
    gallery: [
      {
        src: "/media/sites/shuangduiji-memorial/gallery-01.jpg",
        alt: "双堆集烈士陵园公开资料照片",
        caption: "公开资料照片，来源：濉溪县人民政府“双堆集烈士陵园简介”页面。",
      },
      {
        src: "/media/sites/shuangduiji-memorial/gallery-02.jpg",
        alt: "双堆集烈士陵园纪念设施公开资料照片",
        caption: "公开资料照片，来源：濉溪县人民政府“双堆集烈士陵园简介”页面。",
      },
    ],
  },
};

const sites = JSON.parse(readFileSync(sitesPath, "utf8"));
let updated = 0;

for (const site of sites) {
  const media = updates[site.id];
  if (!media) continue;

  site.image = media.image;
  site.imageAlt = media.imageAlt;
  site.gallery = media.gallery;
  site.contentStatus.images = "已补充";

  if (site.verificationNote.includes(generatedImageNote)) {
    site.verificationNote = site.verificationNote.replace(generatedImageNote, publicPhotoNote);
  } else if (!site.verificationNote.includes(publicPhotoNote)) {
    site.verificationNote = `${site.verificationNote}${site.verificationNote.endsWith("。") ? "" : "。"}${publicPhotoNote}`;
  }

  updated += 1;
}

writeFileSync(sitesPath, `${JSON.stringify(sites, null, 2)}\n`);
console.log(`已切换 ${updated} 处点位为公开资料照片`);
