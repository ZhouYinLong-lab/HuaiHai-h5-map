import { useEffect, useState } from "react";

const SPLASH_KEY = "huaihai-opening-scroll-seen";

export function OpeningScroll() {
  const [visible, setVisible] = useState(() => sessionStorage.getItem(SPLASH_KEY) !== "1");
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const close = () => {
      setLeaving(true);
      sessionStorage.setItem(SPLASH_KEY, "1");
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
    sessionStorage.setItem(SPLASH_KEY, "1");
    window.setTimeout(() => setVisible(false), 520);
  };

  return (
    <section
      className={`opening-scroll ${leaving ? "is-leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="淮海战役红色文化开场动画"
    >
      <div className="opening-scroll__glow" aria-hidden="true" />
      <div className="opening-scroll__stage" aria-hidden="true">
        <span className="opening-scroll__rod opening-scroll__rod--left" />
        <span className="opening-scroll__rod opening-scroll__rod--right" />
        <div className="opening-scroll__paper">
          <span className="opening-scroll__route opening-scroll__route--one" />
          <span className="opening-scroll__route opening-scroll__route--two" />
          <span className="opening-scroll__node opening-scroll__node--one" />
          <span className="opening-scroll__node opening-scroll__node--two" />
          <span className="opening-scroll__node opening-scroll__node--three" />
        </div>
      </div>
      <div className="opening-scroll__copy">
        <p>红色文化数字化传播实践</p>
        <h2>淮海战役遗址交互地图</h2>
        <span>卷开历史档案 · 走近战役现场</span>
      </div>
      <button type="button" className="opening-scroll__skip" onClick={close}>
        跳过
      </button>
    </section>
  );
}
