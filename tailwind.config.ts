import type { Config } from "tailwindcss";

// Design tokens live in src/styles/tokens.css (CSS variables); Tailwind maps to them.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "var(--cx-bg)", raised: "var(--cx-bg-raised)", sunken: "var(--cx-bg-sunken)" },
        fg: { DEFAULT: "var(--cx-fg)", muted: "var(--cx-fg-muted)" },
        line: { DEFAULT: "var(--cx-line)", strong: "var(--cx-line-strong)" },
        accent: {
          DEFAULT: "var(--cx-accent)",
          hover: "var(--cx-accent-hover)",
          fg: "var(--cx-accent-fg)",
          text: "var(--cx-accent-text)",
        },
        silver: "var(--cx-silver)",
        gain: "var(--cx-gain)",
        loss: "var(--cx-loss)",
      },
      fontFamily: { sans: ["var(--font-sans)"], mono: ["var(--font-mono)"] },
      borderRadius: { DEFAULT: "var(--cx-radius)", lg: "var(--cx-radius-lg)" },
      boxShadow: { card: "var(--cx-shadow-card)", pop: "var(--cx-shadow-pop)" },
      transitionTimingFunction: { cx: "var(--cx-ease)" },
      transitionDuration: { DEFAULT: "var(--cx-duration)" },
    },
  },
  plugins: [],
};
export default config;
