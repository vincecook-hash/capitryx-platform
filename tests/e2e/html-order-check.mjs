/**
 * Raw-HTML check (no browser, no JavaScript): what crawlers, screen readers and slow connections receive.
 * Fails if a page has no single <h1>, if the footer comes before the h1, or if content is held back in a
 * hidden streaming placeholder (which happens when a loading.tsx boundary wraps a page).
 *
 * Run with the site running:  BASE=http://127.0.0.1:3100 node tests/e2e/html-order-check.mjs
 */
const base = process.env.BASE ?? "http://127.0.0.1:3100";
const routes = (process.env.ROUTES ?? "/,/programs,/programs?category=futures&size=50000,/spot-trading,/futures-trading,/how-it-works,/trading-rules,/faq,/about,/contact,/login,/checkout?program=spot-5k,/checkout,/legal/terms,/legal/privacy,/legal/refund-policy,/legal/risk-disclosure").split(",");

let failures = 0;
for (const route of routes) {
  const res = await fetch(base + route);
  const html = await res.text();
  const problems = [];
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (res.status !== 200) problems.push(`status ${res.status}`);
  if (h1s !== 1) problems.push(`${h1s} h1 elements`);
  if (html.indexOf("<h1") > html.indexOf("<footer")) problems.push("footer comes before the h1");
  // Next.js leaves empty hidden blocks for page metadata; only blocks that hold page content are a problem.
  for (const m of html.matchAll(/<div hidden id="S:\d+">([\s\S]*?)<\/div><script>\$RC/g)) {
    if (/<h1|<main/.test(m[1] ?? "")) problems.push("page content held in a hidden streaming placeholder");
  }
  if (/Loading…/.test(html)) problems.push('visible "Loading…" placeholder');
  if (problems.length) { failures++; console.log(`FAIL ${route}: ${problems.join("; ")}`); }
}
console.log(failures === 0 ? `PASS: ${routes.length} routes send complete, correctly ordered HTML` : `${failures} route(s) failing`);
process.exit(failures ? 1 : 0);
