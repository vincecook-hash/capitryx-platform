import type { Config } from "tailwindcss";

// Design tokens live in src/styles/tokens.css (CSS variables); Tailwind maps to them.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "var(--cx-bg)", raised: "var(--cx-bg-raised)", sunken: "var(--cx-bg-sunken)" },
        fg: { DEFAULT: "var(--cx-fg)", muted: "var(--cx-fg-muted)" },
        line: "var(--cx-line)",
        accent: { DEFAULT: "var(--cx-accent)", hover: "var(--cx-accent-hover)", fg: "var(--cx-accent-fg)", text: "var(--cx-accent-text)" },
        silver: "var(--cx-silver)",
        gain: "var(--cx-gain)",
        loss: "var(--cx-loss)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
