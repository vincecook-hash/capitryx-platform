/**
 * Responsive regression check: fails if any page scrolls sideways or has an element
 * sticking out of the viewport (elements inside their own scroll box are allowed).
 *
 * One-time setup (not a project dependency):
 *   npm i --no-save puppeteer-core @sparticuz/chromium
 * Run (site must be running, e.g. `npm run build && npx next start -p 3100 -H 127.0.0.1`):
 *   BASE=http://127.0.0.1:3100 node tests/e2e/overflow-check.mjs
 * Optional: ROUTES=/,/faq WIDTHS=320,390,1280
 */
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

const base = process.env.BASE ?? "http://127.0.0.1:3100";
const routes = (process.env.ROUTES ?? "/,/programs,/spot-trading,/futures-trading,/how-it-works,/trading-rules,/faq,/about,/contact,/login,/checkout,/legal/terms,/legal/privacy,/legal/refund-policy,/legal/risk-disclosure,/abc").split(",");
const widths = (process.env.WIDTHS ?? "320,360,390,430,768,1024,1280,1536").split(",").map(Number);

const browser = await puppeteer.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: "shell" });
let failures = 0;
for (const w of widths) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: 900, deviceScaleFactor: 1, isMobile: w < 800, hasTouch: w < 800 });
  for (const r of routes) {
    await page.goto(base + r, { waitUntil: "load", timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise((res) => setTimeout(res, 600));
    const res = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const scrollW = document.documentElement.scrollWidth;
      const clipped = (el) => { for (let p = el.parentElement; p; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if (o !== "visible") return true; } return false; };
      const bad = [];
      for (const el of document.body.querySelectorAll("*")) {
        const b = el.getBoundingClientRect();
        if (b.width === 0 || b.height === 0) continue;
        if ((b.right > vw + 1 || b.left < -1) && !clipped(el)) bad.push(`${el.tagName.toLowerCase()}.${String(el.className).split(" ").slice(0,3).join(".")} [${Math.round(b.left)}..${Math.round(b.right)}]`);
      }
      return { vw, scrollW, bad: bad.slice(0, 4), badCount: bad.length };
    });
    const ok = res.scrollW <= res.vw && res.badCount === 0;
    if (!ok) { failures++; console.log(`FAIL w=${w} ${r}: scrollWidth=${res.scrollW} vw=${res.vw} offenders=${res.badCount}`, res.bad); }
  }
  await page.close();
}
await browser.close();
console.log(failures === 0 ? `PASS: no horizontal overflow on ${routes.length} routes x ${widths.length} widths` : `${failures} failing page/width combos`);
process.exit(failures ? 1 : 0);
