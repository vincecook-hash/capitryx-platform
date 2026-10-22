/**
 * Accessibility audit: runs axe-core (WCAG 2.0, 2.1, 2.2 level A and AA, plus best practices) on every page at phone and desktop size. Fails on any violation.
 *
 * One-time setup (not project dependencies):  npm i --no-save puppeteer-core @sparticuz/chromium axe-core
 * Run with the site running (for example: npm run build && npx next start -p 3100 -H 127.0.0.1):
 *   BASE=http://127.0.0.1:3100 node tests/e2e/axe-check.mjs
 */
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire(import.meta.url);
const axeSource = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const base = process.env.BASE ?? "http://127.0.0.1:3100";
const routes = (process.env.ROUTES ?? "/,/programs,/programs?category=futures&size=50000,/spot-trading,/futures-trading,/how-it-works,/trading-rules,/trading-rules?category=futures,/faq,/about,/contact,/login,/checkout?program=spot-5k,/checkout,/checkout/success,/checkout/pending,/checkout/cancelled,/legal/terms,/legal/privacy,/legal/refund-policy,/legal/risk-disclosure,/abc").split(",");
const browser = await puppeteer.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: "shell" });
const seen = new Map(); let pages = 0;
for (const [w, mobile] of [[390, true], [1280, false]]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: 900, isMobile: mobile, hasTouch: mobile });
  for (const r of routes) {
    await page.goto(base + r, { waitUntil: "load" }); await page.evaluate(() => document.fonts.ready); await new Promise((x) => setTimeout(x, 300));
    await page.evaluate(axeSource);
    // open every collapsed region so hidden content is audited too
    await page.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true)));
    const res = await page.evaluate(() => axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } }));
    pages++;
    for (const v of res.violations) {
      const key = `${v.id}|${v.impact}`;
      const e = seen.get(key) ?? { help: v.help, impact: v.impact, where: new Set(), nodes: [] };
      e.where.add(`${w}:${r}`);
      for (const n of v.nodes.slice(0, 2)) if (e.nodes.length < 3) e.nodes.push(`${n.target.join(" ")} :: ${(n.failureSummary ?? "").split("\n").slice(1, 3).join(" ").slice(0, 160)}`);
      seen.set(key, e);
    }
  }
  await page.close();
}
await browser.close();
console.log(`axe scanned ${pages} page views (WCAG 2.0/2.1/2.2 A+AA + best practices)`);
if (seen.size === 0) console.log("NO VIOLATIONS");
for (const [k, e] of seen) console.log(`\n[${e.impact}] ${k.split("|")[0]}: ${e.help}\n  pages: ${[...e.where].slice(0, 6).join(", ")}${e.where.size > 6 ? ` (+${e.where.size - 6})` : ""}\n  e.g. ${e.nodes.join("\n       ")}`);
process.exit(seen.size ? 1 : 0);
