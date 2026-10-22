import { describe, it, expect } from "vitest";
import { buildRobots, pageMetadata } from "@/lib/seo";
import { serializeJsonLd, siteJsonLd } from "@/lib/jsonld";

const page = { title: "Trading Programs", description: "Compare programs.", path: "/programs" };

describe("pageMetadata", () => {
  it("adds a canonical URL only when the production domain is known", () => {
    expect(pageMetadata(page, true).alternates).toEqual({ canonical: "/programs" });
    expect(pageMetadata(page, false).alternates).toBeUndefined();
  });

  it("builds matching Open Graph and Twitter data with the brand in the title", () => {
    const m = pageMetadata(page, true);
    expect(m.openGraph).toMatchObject({ title: "Trading Programs | Capitryx", url: "/programs", description: "Compare programs." });
    expect(m.twitter).toMatchObject({ card: "summary_large_image", title: "Trading Programs | Capitryx" });
  });

  it("supports an absolute title for the home page", () => {
    const m = pageMetadata({ ...page, title: { absolute: "Capitryx | Tagline" }, path: "/" }, true);
    expect(m.openGraph).toMatchObject({ title: "Capitryx | Tagline" });
  });
});

describe("buildRobots", () => {
  it("blocks everything until a production URL is configured", () => {
    expect(buildRobots(false)).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  });
  it("in production allows the site, hides API and checkout, and points to the sitemap", () => {
    const r = buildRobots(true, "https://example.com");
    expect(r.sitemap).toBe("https://example.com/sitemap.xml");
    expect(JSON.stringify(r.rules)).toContain("/api/");
    expect(JSON.stringify(r.rules)).toContain("/checkout");
  });
});

describe("structured data", () => {
  const data = siteJsonLd("https://example.com/", "Capitryx");
  it("contains only the name, URL and logo (no invented facts)", () => {
    const text = JSON.stringify(data);
    expect(text).toContain('"@type":"Organization"');
    expect(text).toContain("https://example.com/brand/logo-mark.png");
    for (const bad of ["aggregateRating", "review", "address", "sameAs", "telephone", "foundingDate", "award"]) expect(text).not.toContain(bad);
  });
  it("escapes < so data can never close the script tag", () => {
    expect(serializeJsonLd({ name: "</script><b>" })).not.toContain("<");
  });
});
