import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          style={{
            display: "grid",
            height: "100svh",
            placeItems: "center",
            alignContent: "center",
            gap: "1rem",
            padding: "2rem",
            background: "#2b2119",
            color: "#f8ebcc",
            textAlign: "center",
            fontFamily: '"Noto Serif SC", "Songti SC", SimSun, serif',
          }}
        >
          <h1 style={{ fontFamily: "STKaiti, KaiTi, serif", fontSize: "1.5rem", fontWeight: 700 }}>
            页面加载异常
          </h1>
          <p style={{ color: "#bda982", fontSize: "0.88rem", lineHeight: 1.8 }}>
            请刷新页面重试。如问题持续存在，可检查网络连接后重新打开。
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              minHeight: 44,
              padding: "0 1.5rem",
              border: "1px solid #9f1d20",
              borderRadius: 3,
              background: "#9f1d20",
              color: "#fff4dc",
              fontSize: "0.88rem",
              cursor: "pointer",
            }}
          >
            刷新页面
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}
