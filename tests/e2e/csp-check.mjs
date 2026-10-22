/**
 * Security-policy check (use a production build): visits every page, exercises the menu, tabs and accordions, and fails on any Content-Security-Policy violation, console error, failed request or missing fonts/styles.
 *
 * One-time setup (not project dependencies):  npm i --no-save puppeteer-core @sparticuz/chromium 
 * Run with the site running (for example: npm run build && npx next start -p 3100 -H 127.0.0.1):
 *   BASE=http://127.0.0.1:3100 node tests/e2e/csp-check.mjs
 */
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
const base = process.env.BASE ?? "http://127.0.0.1:3100";
const routes = "/,/programs,/programs?category=futures&size=50000,/spot-trading,/futures-trading,/how-it-works,/trading-rules,/faq,/about,/contact,/login,/checkout?program=spot-5k,/legal/terms,/abc".split(",");
const browser = await puppeteer.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: "shell" });
let problems = 0; let checked = 0;
for (const [w, mobile] of [[390, true], [1280, false]]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: 900, isMobile: mobile, hasTouch: mobile });
  const issues = [];
  await page.evaluateOnNewDocument(() => { window.__csp = []; document.addEventListener("securitypolicyviolation", (e) => window.__csp.push(`${e.violatedDirective} blocked ${e.blockedURI}`)); });
  page.on("console", (m) => { if (m.text().includes("404 (Not Found)") && page.url().endsWith("/abc")) return; if (["error", "warning"].includes(m.type())) issues.push(`console ${m.type()}: ${m.text().slice(0, 160)}`); });
  page.on("pageerror", (e) => issues.push(`pageerror: ${String(e).slice(0, 160)}`));
  page.on("requestfailed", (r) => { if (r.failure()?.errorText === "net::ERR_ABORTED") return; /* prefetches cancelled by navigation */ issues.push(`request failed: ${r.url().replace(base, "")} ${r.failure()?.errorText}`); });
  page.on("response", (r) => { if (r.status() >= 400 && !r.url().endsWith("/abc")) issues.push(`HTTP ${r.status()}: ${r.url().replace(base, "")}`); });
  for (const r of routes) {
    issues.length = 0;
    await page.goto(base + r, { waitUntil: "load" }); await page.evaluate(() => document.fonts.ready); await new Promise((x) => setTimeout(x, 400));
    // exercise interactive code paths that could be affected by the policy
    await page.evaluate(() => {
      document.querySelector('button[aria-label="Open menu"]')?.click();
      document.querySelector('[role=tab]:not([aria-selected=true])')?.click();
      document.querySelector('button[aria-expanded="false"][aria-controls*="panel"]')?.click();
    });
    await new Promise((x) => setTimeout(x, 500));
    const csp = await page.evaluate(() => window.__csp);
    const fontsOk = await page.evaluate(() => [...document.fonts].some((f) => f.status === "loaded"));
    const styled = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    checked++;
    const all = [...csp.map((c) => `CSP ${c}`), ...issues];
    if (all.length || !fontsOk || styled === "rgba(0, 0, 0, 0)") { problems++; console.log(`FAIL ${w}px ${r}: fontsLoaded=${fontsOk} bg=${styled}`, all.slice(0, 4)); }
  }
  await page.close();
}
await browser.close();
console.log(problems ? `${problems} page view(s) with problems` : `PASS: ${checked} page views with the production security policy: no CSP violations, no console errors, no failed requests, fonts and styles applied`);
process.exit(problems ? 1 : 0);
