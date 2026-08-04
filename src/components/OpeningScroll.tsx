import { useEffect, useState } from "react";

const SPLASH_KEY = "huaihai-opening-archive-seen-v2";

function hasSeenSplash() {
  try {
    return window.sessionStorage.getItem(SPLASH_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberSplashSeen() {
  try {
    window.sessionStorage.setItem(SPLASH_KEY, "1");
  } catch {
    // 某些浏览器隐私模式或 WebView 会禁用 sessionStorage；
    // 开场动画只是增强项，存储失败不应阻断主页面渲染。
  }
}

export function OpeningScroll() {
  const [visible, setVisible] = useState(() => !hasSeenSplash());
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const close = () => {
      setLeaving(true);
      rememberSplashSeen();
      window.setTimeout(() => setVisible(false), 520);
    };

    const timer = window.setTimeout(close, 3200);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [visible]);

  if (!visible) return null;

  const close = () => {
    setLeaving(true);
    rememberSplashSeen();
    window.setTimeout(() => setVisible(false), 520);
  };

  return (
    <section
      className={`opening-scroll ${leaving ? "is-leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="淮海战役红色文化开场动画"
    >
      <div className="opening-scroll__ambient" aria-hidden="true" />
      <div className="opening-scroll__film" aria-hidden="true" />

      <div className="opening-scroll__case" aria-hidden="true">
        <div className="opening-scroll__tab">1948—1949 · 作战档案</div>
        <div className="opening-scroll__classified">内部传阅</div>

        <svg
          className="opening-scroll__map"
          viewBox="0 0 360 230"
          focusable="false"
          aria-hidden="true"
        >
          <defs>
            <filter id="openingInkBleed" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="2"
                seed="7"
                result="noise"
              />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.9" />
            </filter>
            <linearGradient id="openingRoute" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6d1514" stopOpacity="0.15" />
              <stop offset="42%" stopColor="#a31f1d" />
              <stop offset="100%" stopColor="#e6b45c" />
            </linearGradient>
          </defs>

          <path
            className="opening-scroll__province opening-scroll__province--one"
            d="M40 94 C76 43 124 42 154 69 C178 91 209 62 240 79 C284 103 315 139 292 176 C266 219 196 201 161 185 C121 167 103 195 70 171 C40 149 19 124 40 94Z"
          />
          <path
            className="opening-scroll__province opening-scroll__province--two"
            d="M63 122 C92 104 117 113 141 132 C164 151 185 129 211 136 C249 146 264 177 241 196 C215 217 176 197 148 187 C117 175 88 191 66 169 C47 151 44 136 63 122Z"
          />

          <g className="opening-scroll__grid">
            <path d="M32 74H323" />
            <path d="M31 121H329" />
            <path d="M46 169H307" />
            <path d="M93 42V200" />
            <path d="M174 49V207" />
            <path d="M255 65V194" />
          </g>

          <path
            className="opening-scroll__route-path opening-scroll__route-path--main"
            d="M70 151 C102 105 139 127 159 94 C185 52 231 74 256 107 C281 139 274 166 306 177"
            pathLength={1}
          />
          <path
            className="opening-scroll__route-path opening-scroll__route-path--second"
            d="M58 111 C91 132 119 157 157 150 C201 141 218 117 257 125 C284 131 300 144 318 158"
            pathLength={1}
          />

          <g className="opening-scroll__pin opening-scroll__pin--xuzhou">
            <circle cx="158" cy="96" r="9" />
            <path d="M158 102 L151 119 L166 119Z" />
          </g>
          <g className="opening-scroll__pin opening-scroll__pin--nianzhuang">
            <circle cx="257" cy="108" r="8" />
            <path d="M257 113 L251 128 L263 128Z" />
          </g>
          <g className="opening-scroll__pin opening-scroll__pin--shuangduiji">
            <circle cx="207" cy="143" r="8" />
            <path d="M207 148 L201 164 L214 164Z" />
          </g>
          <g className="opening-scroll__pin opening-scroll__pin--linhuan">
            <circle cx="92" cy="130" r="8" />
            <path d="M92 135 L86 151 L99 151Z" />
          </g>

          <text className="opening-scroll__map-label opening-scroll__map-label--one" x="128" y="88">
            徐州
          </text>
          <text className="opening-scroll__map-label opening-scroll__map-label--two" x="232" y="101">
            碾庄
          </text>
          <text className="opening-scroll__map-label opening-scroll__map-label--three" x="175" y="137">
            双堆集
          </text>
        </svg>

        <div className="opening-scroll__stamp">
          <span>淮海</span>
          <span>档案</span>
        </div>
      </div>

      <div className="opening-scroll__copy">
        <p>红色文化数字化传播实践</p>
        <h2>淮海战役遗址交互地图</h2>
        <span>档案启封 · 路线浮现 · 走近战役现场</span>
      </div>

      <button type="button" className="opening-scroll__skip" onClick={close}>
        跳过
      </button>
    </section>
  );
}
