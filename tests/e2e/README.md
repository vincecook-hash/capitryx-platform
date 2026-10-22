# End-to-end checks

These scripts test the running site in a real browser or on its raw HTML. They do not depend on demo prices or rules, so they keep
working when you replace the demo values with real ones.

| Script | What it checks | Needs |
|---|---|---|
| `html-order-check.mjs` | Every page sends complete, correctly ordered HTML (one h1, footer after content, no loading placeholder) | Node only |
| `overflow-check.mjs` | No sideways scrolling at 8 screen widths (320 to 1536 px) | browser tools |
| `axe-check.mjs` | WCAG 2.2 AA accessibility audit with axe-core on every page | browser tools + `axe-core` |
| `csp-check.mjs` | No Content-Security-Policy violations or console errors (production build) | browser tools |
| `lighthouse-check.mjs` | Lighthouse scores and Core Web Vitals | browser tools + `lighthouse` |

Browser tools setup (once): `npm i --no-save puppeteer-core @sparticuz/chromium` (add `axe-core` / `lighthouse` for those scripts).
Unit tests (`npm test`) cover the business logic and API routes and need no browser.
