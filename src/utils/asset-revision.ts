/**
 * 静态资源版本号 —— 缓存失效的单一来源。
 *
 * 用法：需要"换资源后立即生效"的静态文件（如手绘标注层 SVG），
 * 在 URL 后附加 `?rev=${ASSET_REVISION}`，避免 Service Worker
 * cache-first 策略长期服务旧版本。
 *
 * 注意：public/sw.js 是纯静态文件，无法 import 本模块，
 * 请同步更新 sw.js 顶部的 ASSET_REVISION 常量（APP_SHELL 中的 ?rev）。
 */
export const ASSET_REVISION = "9";
