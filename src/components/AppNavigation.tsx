import type { AppView } from "../types/site";
import { PixelIcon, type PixelIconName } from "./Icons";

interface AppNavigationProps {
  activeView: AppView;
  onChange: (view: AppView) => void;
  siteCount: number;
}

const items: Array<{
  id: AppView;
  label: string;
  eyebrow: string;
  pixelIcon: PixelIconName;
}> = [
  { id: "map", label: "地图探索", eyebrow: "MAP", pixelIcon: "map" },
  { id: "timeline", label: "战役脉络", eyebrow: "TIMELINE", pixelIcon: "clock" },
  { id: "directory", label: "遗址名录", eyebrow: "SITES", pixelIcon: "folder" },
  { id: "amap", label: "高德辅助", eyebrow: "AMAP", pixelIcon: "compass" },
  { id: "about", label: "项目说明", eyebrow: "ABOUT", pixelIcon: "seal" },
];

export function AppNavigation({ activeView, onChange, siteCount }: AppNavigationProps) {
  return (
    <>
      <nav className="desktop-nav" aria-label="主要导航">
        <div className="desktop-nav__brand">
          <span className="desktop-nav__seal" aria-hidden="true">
            <PixelIcon name="seal" />
          </span>
          <div>
            <p>红色文化数字化传播实践</p>
            <strong>淮海战役遗址地图</strong>
          </div>
        </div>
        <div className="desktop-nav__items">
          {items.map((item) => {
            return (
              <button
                key={item.id}
                type="button"
                className={`desktop-nav__item ${activeView === item.id ? "is-active" : ""}`}
                onClick={() => onChange(item.id)}
                aria-current={activeView === item.id ? "page" : undefined}
              >
                <PixelIcon name={item.pixelIcon} />
                <span>
                  <small>{item.eyebrow}</small>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        <p className="desktop-nav__foot">{siteCount} 处地标事件 · 资料持续核验中</p>
      </nav>

      <nav className="mobile-nav" aria-label="主要导航">
        {items.map((item) => {
          return (
            <button
              key={item.id}
              type="button"
              className={`mobile-nav__item ${activeView === item.id ? "is-active" : ""}`}
              onClick={() => onChange(item.id)}
              aria-current={activeView === item.id ? "page" : undefined}
            >
              <PixelIcon name={item.pixelIcon} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
