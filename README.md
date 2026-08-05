# 淮海战役红色遗址交互地图

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/PWA-ready-5A0FC8?style=flat-square&logo=pwa" alt="PWA">
</p>

> 淮海战役红色文化数字化传播实践成果
> 面向手机、平板和电脑的 H5 红色遗址数字展示平台

项目以“泛黄历史地图＋红色地标事件”为核心视觉，通过地图探索、战役脉络、遗址档案和图文资料传播淮海战役红色文化。项目定位为社会实践成果展示平台，不是专业旅游导航或历史数据库。

![桌面端地图展示](docs/qa/qa-desktop-map.png)

## 当前内容

- 收录 16 处淮海战役相关地标事件。
- 覆盖第一阶段、第二阶段、第三阶段和纪念传承四类内容。
- 战役脉络按“东线合围—双堆集攻坚—陈官庄决胜—纪念传承”展开。
- 各阶段包含关键时间节点、战局转折、官方来源和可返回地图的像素态势卡片。
- 遗址档案包含历史正文、图片、图集、资料来源、视频入口和地图定位。

## 核心功能

- 泛黄档案风格的淮海战役区域地图。
- 像素风河流、山地、区域边界、路线箭头、地图节点和导航图标。
- 地图边界内拖拽、双指缩放、滚轮缩放和视角重置。
- 地图节点点击、自动聚焦和遗址档案侧栏。
- 遗址名称、地区、类型搜索与筛选。
- 战役脉络时间线和关键事件叙事。
- 遗址名录、分类卡片和详情档案。
- 高德地图 URI 检索与导航跳转。
- 高德地图辅助核验页面，项目配置完成后用户无需填写 Key。
- B 站或其他权威平台视频外链。
- 手机底部导航、平板网格布局和桌面档案侧栏。
- PWA Manifest、Service Worker 和离线应用外壳。

## 页面结构

| 页面 | 内容 |
|---|---|
| 地图探索 | 交互式历史地图、阶段筛选和遗址节点 |
| 战役脉络 | 三个战役阶段、关键转折、态势卡片和纪念传承尾声 |
| 遗址名录 | 16 处地标的搜索、筛选和档案入口 |
| 高德辅助 | 高德地图检索、位置核验和导航跳转 |
| 项目说明 | 项目定位、内容范围和制作说明 |

## 技术栈

- React 18
- Vite 8
- TypeScript
- Tailwind CSS
- react-zoom-pan-pinch
- 高德开放平台 JS API
- PWA Service Worker

项目为纯静态前端，不使用数据库、后台、用户系统或权限系统。

## 本地运行

环境要求：Node.js 20.19 或更高版本，npm 10 或更高版本。

```bash
npm install
npm run dev
```

浏览器打开：

```text
http://localhost:5173/
```

校验内容并构建：

```bash
npm run validate:content
npm run build
```

## 项目结构

```text
HuaiHai-h5-map/
├── public/
│   ├── archive-map.svg              # 历史地图与像素装饰图层
│   ├── favicon-pixel.png            # 像素风浏览器图标
│   ├── manifest.webmanifest         # PWA 配置
│   ├── media/                       # 页面背景、地图和遗址媒体资源
│   │   └── pixel/                   # 像素图标、节点图集与地图底稿
│   └── sw.js                        # 离线缓存脚本
├── src/
│   ├── components/                  # 导航、地图、时间线、名录和详情组件
│   ├── data/sites.json              # 遗址数据唯一入口
│   ├── styles/                      # 全局样式与设计令牌
│   └── types/                       # TypeScript 类型定义
├── scripts/validate-content.mjs     # 内容结构校验
├── design-system/MASTER.md          # 视觉设计系统
└── package.json
```

## 数据维护

遗址数据统一保存在 [`src/data/sites.json`](src/data/sites.json) 中：

- `x`、`y` 是相对于底图的百分比坐标，不是经纬度。
- `history` 是遗址档案中的历史正文。
- `gallery` 保存遗址图片及图片说明。
- `videoUrl` 保存专题视频链接。
- `sources` 保存资料来源链接。
- `stage`、`kind` 用于阶段筛选和地图图例。

## 设计说明

整体采用泛黄历史档案、像素画和红色战役标记的视觉语言。地图是用于历史文化展示的互动示意图，不用于精确导航或专业军事制图；高德地图仅承担第三方位置检索和导航辅助功能。
