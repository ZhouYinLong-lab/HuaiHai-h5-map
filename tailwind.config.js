/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        archive: {
          paper: "var(--color-paper)",
          ink: "var(--color-ink)",
          muted: "var(--color-ink-muted)",
          red: "var(--color-red)",
          gold: "var(--color-gold)",
          dark: "var(--color-night)",
        },
      },
      fontFamily: {
        display: ["STKaiti", "KaiTi", "serif"],
        body: ["Noto Serif SC", "Songti SC", "SimSun", "serif"],
      },
      boxShadow: {
        archive: "var(--shadow-archive)",
        panel: "var(--shadow-panel)",
      },
      animation: {
        pulseFlag: "pulseFlag 2.2s ease-in-out infinite",
        rise: "rise .32s ease-out both",
      },
      keyframes: {
        pulseFlag: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-2px) scale(1.04)" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
