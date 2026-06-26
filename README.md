# 淮海战役红色遗址交互地图

> 淮海战役红色文化数字化传播实践成果
> 面向手机、平板和电脑的 H5 红色遗址数字展示平台

项目以“泛黄历史地图 + 红色地标事件”为核心视觉，通过地图探索、战役时间线、遗址档案和图文资料传播淮海战役红色文化。它是社会实践成果展示平台，不是专业旅游导航或历史数据库。

![桌面端地图展示](docs/qa/qa-desktop-map.png)

## 项目状态

页面、交互、多端适配、离线外壳和部署配置均已完成。目前只需补充并核验正式历史资料、图片、视频和作战底图。

| 模块 | 状态 |
|---|---|
| React H5 基础工程 | 已完成 |
| 手机、平板、电脑适配 | 已完成 |
| 16 处地标事件结构 | 已完成 |
| 三阶段战役时间线 | 已完成 |
| 地图拖拽、滚轮和双指缩放 | 已完成 |
| 遗址搜索与地区筛选 | 已完成 |
| 遗址图文档案和媒体槽位 | 已完成 |
| B站视频和高德地图跳转 | 已完成 |
| PWA 离线应用外壳 | 已完成 |
| Azure Static Web Apps 配置 | 已完成 |
| 原创战役态势底图 | 已完成 |
| 权威遗址史料 | 待核实 |
| 历史照片和专题视频 | 待提供 |

完整资料需求见 [资料收集清单](docs/material-checklist.md)。

## 核心功能

- 旧纸档案风格的淮海战役区域地图
- 三阶段战役时间线与关键事件叙事
- 16 个地标事件节点，覆盖战场、指挥旧址、起义事件和纪念设施
- 第一、第二、第三阶段及纪念传承筛选
- 单指拖拽、双指缩放、鼠标滚轮缩放和重置
- 点击节点自动聚焦并打开遗址档案
- 遗址名称、地区和类型搜索
- 江苏、安徽、河南地区筛选
- 封面、历史正文、图集、来源和视频内容槽位
- B站或权威平台视频外链
- 高德地图地点检索
- 手机底部导航、平板网格、桌面档案侧栏
- Web App Manifest、Service Worker 和离线应用外壳

## 多端展示

| 手机端 | 桌面端 |
|---|---|
| ![手机端遗址名录](docs/qa/qa-mobile-directory.png) | ![桌面端遗址名录](docs/qa/qa-desktop-directory.png) |

已自动验证以下代表视口：

- 320 × 700
- 375 × 812
- 768 × 1024
- 1024 × 768
- 1440 × 900
- 812 × 375 横屏

上述视口均无页面级水平溢出。详细结果见 [QA 报告](docs/qa-report.md)。

## 技术栈

- React 18
- Vite 8
- TypeScript
- Tailwind CSS
- react-zoom-pan-pinch
- PWA Service Worker
- Azure Static Web Apps

项目为纯静态前端，不使用数据库、后台、用户系统或权限系统。

## 本地部署与预览

### 环境要求

- Node.js 20.19 或更高版本
- npm 10 或更高版本

确认环境：

```bash
node --version
npm --version
```

### 1. 安装依赖

在项目根目录执行：

```bash
npm install
```

### 2. 电脑本地开发预览

```bash
npm run dev
```

终端显示类似以下地址后，在浏览器打开：

```text
http://localhost:5173/
```

开发服务器支持热更新，修改代码后页面会自动刷新。

### 3. 手机或其他设备局域网预览

电脑和手机需要连接同一个 Wi‑Fi，然后执行：

```bash
npm run dev -- --host 0.0.0.0
```

终端会显示 `Network` 地址，例如：

```text
http://192.168.1.100:5173/
```

在手机浏览器输入该地址即可查看。也可以用 PowerShell 查询电脑局域网 IP：

```powershell
Get-NetIPAddress -AddressFamily IPv4 |
  Where-Object { $_.IPAddress -notlike "127.*" } |
  Select-Object InterfaceAlias, IPAddress
```

如果手机无法访问：

1. 确认手机和电脑位于同一局域网；
2. 确认使用的是 WLAN 地址，不是 `127.0.0.1`；
3. 允许 Node.js 通过 Windows 防火墙；
4. 检查路由器是否开启了设备隔离；
5. 确认端口 `5173` 未被其他程序占用。

### 4. 生产构建

```bash
npm run validate:content
npm run build
```

构建结果输出至 `dist/`。生产包包含：

- 压缩后的 HTML、CSS 和 JavaScript
- 原创 SVG 地图
- Web App Manifest
- Service Worker 离线外壳
- Azure Static Web Apps 配置

### 5. 本地预览生产包

```bash
npm run preview -- --host 0.0.0.0
```

电脑浏览器访问：

```text
http://localhost:4173/
```

手机访问终端显示的 `Network` 地址，例如：

```text
http://192.168.1.100:4173/
```

开发预览和生产预览的区别：

| 命令 | 用途 | 默认端口 |
|---|---|---:|
| `npm run dev` | 日常开发、热更新 | 5173 |
| `npm run preview` | 验证最终 `dist/` 构建结果 | 4173 |

停止本地服务器时，在运行服务器的终端按 `Ctrl + C`。

检查遗址数据结构：

```bash
npm run validate:content
```

资料全部补齐后的严格检查：

```bash
npm run validate:content -- --strict
```

## 项目结构

```text
HuaiHai-h5-map/
├── public/
│   ├── archive-map.svg              # 原创战役态势底图
│   ├── site-placeholder.svg         # 待替换的遗址封面
│   ├── manifest.webmanifest
│   ├── sw.js
│   └── staticwebapp.config.json     # Azure 静态站点配置
├── src/
│   ├── components/                  # 导航、地图、时间线、名录、详情等组件
│   ├── data/sites.json              # 遗址数据唯一入口
│   ├── styles/                      # 设计令牌和全局样式
│   └── types/
├── docs/
│   ├── material-checklist.md        # 资料收集清单
│   ├── content-guide.md             # 内容替换说明
│   ├── qa-report.md                 # 多端验收结果
│   └── qa/                          # 多端截图
├── scripts/validate-content.mjs
└── design-system/MASTER.md
```

## 内容维护

遗址数据集中保存在 [`src/data/sites.json`](src/data/sites.json)。其中：

- `x`、`y` 是相对于底图的百分比坐标，不是经纬度。
- `history` 用于正式历史正文。
- `gallery` 用于历史照片和现场照片。
- `videoUrl` 用于专题视频链接。
- `sources` 用于权威资料来源。
- `contentStatus` 控制页面上的资料准备状态。

拿到正式资料后的替换步骤见 [内容替换指南](docs/content-guide.md)。

## 上线部署

### Azure Static Web Apps

仓库已经包含 `public/staticwebapp.config.json`。推荐直接连接 GitHub 仓库，让 Azure 在每次推送 `main` 后自动构建和发布。

#### Azure Portal 操作

1. 登录 [Azure Portal](https://portal.azure.com/)。
2. 搜索并创建 `Static Web App`。
3. 订阅选择 Azure for Students。
4. 部署来源选择 GitHub。
5. 授权 GitHub，并选择：
   - Organization：`ZhouYinLong-lab`
   - Repository：`HuaiHai-h5-map`
   - Branch：`main`
6. Build Presets 选择 `React` 或 `Custom`。
7. 填写以下构建配置：

| 配置项 | 值 |
|---|---|
| App location | `/` |
| API location | 留空 |
| Output location | `dist` |
| Build command | `npm run build` |

8. 创建资源并等待 GitHub Actions 完成。
9. 在 Azure 资源概览页打开自动生成的站点地址。

Azure 会在仓库中自动创建 `.github/workflows/` 工作流。以后执行：

```bash
git push origin main
```

即可触发自动部署。

#### Azure 构建失败排查

- Node 版本应满足 20.19 或更高版本。
- Output location 必须是 `dist`。
- API location 应保持为空。
- 检查 GitHub 仓库 Actions 页面中的失败日志。
- 确认 `npm run build` 在本地能够通过。

### 其他静态托管

运行 `npm run build` 后，将 `dist/` 目录上传至任意静态网站服务即可。服务器需要将未知前端路径回退到 `index.html`。

常见平台包括：

- Cloudflare Pages
- Vercel
- Netlify
- GitHub Pages
- Nginx 静态服务器

通用构建配置：

```text
Build command: npm run build
Output directory: dist
```

## 史料与版权原则

- 不编造遗址名称、战役经过、人物、日期和伤亡数据。
- 历史资料应优先采用纪念馆、政府、党史部门和正式出版物。
- 所有图片应记录来源、作者或收藏单位、版权状态和图注。
- 当前底图为依据公开资料重新绘制的原创示意图，不直接复制第三方作战图。
- 视频不在本站自托管，优先使用权威平台或 B站链接。

## 相关文档

- [资料收集清单](docs/material-checklist.md)
- [地标事件调研与来源说明](docs/research-sources.md)
- [内容替换指南](docs/content-guide.md)
- [完整 QA 报告](docs/qa-report.md)
- [设计系统](design-system/MASTER.md)
- [需求卡片](docs/requirements-card.md)

## 设计与实现说明

前端设计采用 Dog-Frontier 工作流，参考其 `frontend-design` 设计哲学、设计令牌方法与 QA 检查标准。
