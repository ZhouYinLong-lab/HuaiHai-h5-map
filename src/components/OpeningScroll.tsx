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
          shapeRendering="crispEdges"
          style={{ imageRendering: "pixelated" }}
        >
          <defs>
            <linearGradient id="openingRoute" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6d1514" stopOpacity="0.15" />
              <stop offset="42%" stopColor="#a31f1d" />
              <stop offset="100%" stopColor="#e6b45c" />
            </linearGradient>
          </defs>

          <path
            className="opening-scroll__province opening-scroll__province--one"
            d="M40 94H52V75H70V62H94V50H124V55H146V68H159V82H180V76H205V68H230V77H250V86H272V101H292V118H306V139H315V160H303V178H286V192H265V207H236V216H205V208H180V195H158V185H135V178H112V186H88V178H70V170H53V156H39V142H28V122H22V107H30V98H40Z"
          />
          <path
            className="opening-scroll__province opening-scroll__province--two"
            d="M63 122H80V113H102V118H122V129H141V141H160V151H179V145H197V136H215V140H235V148H250V160H261V175H255V190H242V200H223V208H201V205H177V198H151V188H130V180H112V175H93V184H76V176H62V168H51V153H45V140H51V130H63Z"
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
            d="M70 151H84V136H98V122H113V116H129V124H143V112H151V96H159V83H172V70H188V64H207V70H224V78H239V89H249V103H258V116H270V130H280V146H288V162H298V170H306V177"
            pathLength={1}
          />
          <path
            className="opening-scroll__route-path opening-scroll__route-path--second"
            d="M58 111H74V119H89V130H103V141H119V151H138V154H157V149H176V143H195V135H214V124H235V122H257V126H276V132H291V141H303V150H318V158"
            pathLength={1}
          />

          <g className="opening-scroll__pin opening-scroll__pin--xuzhou">
            <rect x="151" y="89" width="14" height="14" />
            <path d="M151 103H165V109H162V119H154V109H151Z" />
          </g>
          <g className="opening-scroll__pin opening-scroll__pin--nianzhuang">
            <rect x="250" y="101" width="14" height="14" />
            <path d="M250 115H264V120H261V128H253V120H250Z" />
          </g>
          <g className="opening-scroll__pin opening-scroll__pin--shuangduiji">
            <rect x="200" y="136" width="14" height="14" />
            <path d="M200 150H214V155H211V164H203V155H200Z" />
          </g>
          <g className="opening-scroll__pin opening-scroll__pin--linhuan">
            <rect x="85" y="123" width="14" height="14" />
            <path d="M85 137H99V142H96V151H88V142H85Z" />
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

        <div className="opening-scroll__pixel-sites" aria-hidden="true">
          <span className="opening-scroll__pixel-site opening-scroll__pixel-site--battlefield" />
          <span className="opening-scroll__pixel-site opening-scroll__pixel-site--command" />
          <span className="opening-scroll__pixel-site opening-scroll__pixel-site--uprising" />
          <span className="opening-scroll__pixel-site opening-scroll__pixel-site--memorial" />
        </div>

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
