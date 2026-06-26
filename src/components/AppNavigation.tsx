import type { AppView } from "../types/site";
import { InfoIcon, ListIcon, MapIcon, TimelineIcon } from "./Icons";

interface AppNavigationProps {
  activeView: AppView;
  onChange: (view: AppView) => void;
  siteCount: number;
}

const items: Array<{
  id: AppView;
  label: string;
  eyebrow: string;
  icon: typeof MapIcon;
}> = [
  { id: "map", label: "地图探索", eyebrow: "MAP", icon: MapIcon },
  { id: "timeline", label: "战役脉络", eyebrow: "TIMELINE", icon: TimelineIcon },
  { id: "directory", label: "遗址名录", eyebrow: "SITES", icon: ListIcon },
  { id: "about", label: "项目说明", eyebrow: "ABOUT", icon: InfoIcon },
];

export function AppNavigation({ activeView, onChange, siteCount }: AppNavigationProps) {
  return (
    <>
      <nav className="desktop-nav" aria-label="主要导航">
        <div className="desktop-nav__brand">
          <span className="desktop-nav__seal" aria-hidden="true">淮</span>
          <div>
            <p>红色文化数字化传播实践</p>
            <strong>淮海战役遗址地图</strong>
          </div>
        </div>
        <div className="desktop-nav__items">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                className={`desktop-nav__item ${activeView === item.id ? "is-active" : ""}`}
                onClick={() => onChange(item.id)}
                aria-current={activeView === item.id ? "page" : undefined}
              >
                <Icon />
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
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              className={`mobile-nav__item ${activeView === item.id ? "is-active" : ""}`}
              onClick={() => onChange(item.id)}
              aria-current={activeView === item.id ? "page" : undefined}
            >
              <Icon />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
