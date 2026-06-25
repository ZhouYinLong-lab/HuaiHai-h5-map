# 内容替换指南

当前页面、交互、响应式布局和部署配置已经完成。后续拿到资料时，主要修改
`src/data/sites.json` 和 `public/` 中的媒体文件。

## 每个遗址的数据字段

| 字段 | 应填写内容 |
|---|---|
| `name` / `shortName` | 权威正式名称、地图短标签 |
| `region` / `address` | 行政区划和详细地址 |
| `x` / `y` | 节点在底图上的百分比坐标，不是经纬度 |
| `summary` | 80–150 字摘要 |
| `history` | 300–600 字历史说明 |
| `image` / `imageAlt` | 封面图路径和无障碍说明 |
| `gallery` | 图集；每张图包含路径、替代文本和图注 |
| `videoUrl` | B站或权威平台视频链接；无视频时保留 `null` |
| `sources` | 权威来源标题及链接 |
| `contentStatus` | 史实、图片、视频的准备状态 |

## 图片目录建议

```text
public/
└── media/
    └── sites/
        └── site-id/
            ├── cover.webp
            ├── history-01.webp
            └── history-02.webp
```

- 封面建议 1600×1000，WebP，控制在 300KB 内。
- 图集建议长边 1600px，单张控制在 400KB 内。
- 每张图片必须记录来源、版权状态和图注。

## 正式底图

当前使用 `public/archive-map.svg` 中的原创战役态势示意图。若后续更换为已授权的
历史作战图，请修改 `src/components/MapStage.tsx` 中的图片路径，并重新微调各节点
的 `x`、`y`。

## 视频

视频不在本站自托管。填写 `videoUrl` 后，详情按钮会自动从“检索相关视频”
变为“播放专题视频”。

## 发布前核对

1. 所有 `contentStatus.history` 均为“已核实”。
2. 所有图片有来源、版权说明和替代文本。
3. 所有视频链接可在手机浏览器正常打开。
4. 高德地图检索结果指向正确地点。
5. 运行 `npm run build` 并检查 `docs/qa-report.md` 所列视口。

日常检查使用：

```bash
npm run validate:content
```

所有资料补齐后，执行严格发布检查：

```bash
npm run validate:content -- --strict
```
