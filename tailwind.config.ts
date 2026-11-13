import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px" },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      navy: { DEFAULT: "#07324F", deep: "#052640" },
      bronze: { DEFAULT: "#756B48", dark: "#635A3A", light: "#C4B992" },
      ivory: "#FAF8F4",
      white: "#FFFFFF",
      sand: "#F1EDE5",
      stone: "#5B6570",
      line: "#DDD7CB",
    },
    fontFamily: {
      serif: ["var(--font-serif)", "Georgia", "serif"],
      sans: ["var(--font-sans)", "system-ui", "sans-serif"],
    },
    borderRadius: { none: "0", DEFAULT: "2px", full: "9999px" },
    extend: {
      maxWidth: { container: "1280px" },
      fontSize: {
        eyebrow: ["12.5px", { lineHeight: "1.4", letterSpacing: "0.2em" }],
        body: ["17px", { lineHeight: "1.6" }],
      },
      transitionTimingFunction: { idear: "cubic-bezier(0.22, 1, 0.36, 1)" },
    },
  },
  plugins: [],
};

export default config;
