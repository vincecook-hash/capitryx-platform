/**
 * Lighthouse scores (performance, accessibility, best practices, SEO) and Core Web Vitals for key pages. Use a production build. Numbers from a small machine are indicative: run it against your real deployment too. FORM=desktop for desktop, ROUTES=/,/faq to choose pages.
 *
 * One-time setup (not project dependencies):  npm i --no-save puppeteer-core @sparticuz/chromium lighthouse
 * Run with the site running (for example: npm run build && npx next start -p 3100 -H 127.0.0.1):
 *   BASE=http://127.0.0.1:3100 node tests/e2e/lighthouse-check.mjs
 */
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import lighthouse from "lighthouse";
const base = process.env.BASE ?? "http://127.0.0.1:3100";
const routes = (process.env.ROUTES ?? "/,/programs,/trading-rules,/faq").split(",");
const factor = process.env.FORM ?? "mobile";
const browser = await puppeteer.launch({ args: [...chromium.args, "--remote-debugging-port=9333"], executablePath: await chromium.executablePath(), headless: "shell" });
const port = 9333;
const cfg = factor === "desktop" ? { extends: "lighthouse:default", settings: { formFactor: "desktop", screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false }, throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 } } } : undefined;
for (const r of routes) {
  const res = await lighthouse(base + r, { port, output: "json", logLevel: "error", onlyCategories: ["performance", "accessibility", "best-practices", "seo"] }, cfg);
  const lhr = res.lhr; const c = lhr.categories; const a = lhr.audits;
  const sc = (k) => Math.round((c[k].score ?? 0) * 100);
  const ms = (id) => Math.round(a[id]?.numericValue ?? 0);
  console.log(`\n${factor} ${r}\n  Performance ${sc("performance")} | Accessibility ${sc("accessibility")} | Best practices ${sc("best-practices")} | SEO ${sc("seo")}`);
  console.log(`  FCP ${ms("first-contentful-paint")}ms | LCP ${ms("largest-contentful-paint")}ms | TBT ${ms("total-blocking-time")}ms | CLS ${(a["cumulative-layout-shift"]?.numericValue ?? 0).toFixed(3)} | Speed Index ${ms("speed-index")}ms`);
  const fails = Object.values(a).filter((x) => x.score !== null && x.score < 0.9 && x.scoreDisplayMode !== "informative" && x.scoreDisplayMode !== "notApplicable" && x.scoreDisplayMode !== "manual").sort((x, y) => x.score - y.score).slice(0, 8);
  for (const f of fails) console.log(`   - [${Math.round(f.score * 100)}] ${f.id}: ${f.title}${f.displayValue ? " (" + f.displayValue + ")" : ""}`);
}
await browser.close();
