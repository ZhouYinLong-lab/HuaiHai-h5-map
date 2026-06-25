<!-- @source: dog-frontier/phase-2 -->
<!-- @phase: design-system -->
<!-- @date: 2026-06-25 -->
<!-- @based_on: docs/requirements-card.md -->
<!-- @design_system_version: 1.0.0 -->

# 淮海战役红色遗址交互地图设计系统

## 1. 风格方案

- 主风格：泛黄历史档案
- 辅风格：战役态势图、印刷标注
- 模式：深色环境框架 + 亮色旧纸地图
- 来源：[Dog-Frontier / frontend-design 设计哲学]

## 2. 配色方案

| Token | Hex | 用途 |
|---|---:|---|
| `--color-paper` | `#EAD8AD` | 地图旧纸底色 |
| `--color-paper-light` | `#F7EBCE` | 详情面板 |
| `--color-ink` | `#34261C` | 主文字、线条 |
| `--color-ink-muted` | `#665445` | 正文、说明 |
| `--color-red` | `#9F1D20` | 红旗、主行动 |
| `--color-gold` | `#AD7C2F` | 档案提示 |
| `--color-night` | `#2B2119` | 应用外框 |

## 3. 字体搭配

| 角色 | 字体 | 权重 | 用途 |
|---|---|---:|---|
| Display | STKaiti / KaiTi | 700 | 标题、地图标注 |
| Body | Noto Serif SC / Songti SC | 400–700 | 正文、按钮 |
| Numeric | system-ui | 700 | 节点序号 |

MVP 优先使用系统中文字体以减少首屏阻塞；后续可自托管已获许可的字体，并设置 `font-display: swap`。

## 4. 效果系统

- 阴影：纸张采用暖黑色扩散阴影，详情采用向上浮层阴影。
- 圆角：纸张与按钮使用 2–4px 小圆角；移动端底部抽屉使用 18px 顶部圆角。
- 纹理：CSS 渐变与 SVG 噪点模拟旧纸，不使用大体积纹理图片。
- 动画：仅使用 `transform` 与 `opacity`，支持 `prefers-reduced-motion`。

## 5. 反模式警告

- 避免普通电子地图蓝色底图与通用 Marker。
- 避免未经核验的精确路线、时间、伤亡数字与引文。
- 避免为了“复古”牺牲正文对比度和触控可用性。
- 避免把视频与历史照片直接打包进站点，优先外链与压缩素材。

## 6. 组件令牌映射

- Marker：红旗图形 + 旧纸标签，触控目标不小于 44px。
- Map controls：46px 方形按钮，右下固定。
- Detail panel：移动端底部抽屉，桌面端右下档案卡片。
- Primary action：暗红背景、浅纸色文字。

## 预交付清单

- [x] 文字颜色满足可读性基线
- [x] 交互元素具有键盘焦点
- [x] 支持减少动态效果
- [x] 375px 视口不产生页面级横向滚动
