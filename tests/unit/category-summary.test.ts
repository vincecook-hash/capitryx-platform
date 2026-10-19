import { describe, it, expect } from "vitest";
import { summarizeCategory } from "@/lib/category-summary";
import { categoryPages } from "@/config/category-pages";

describe("summarizeCategory", () => {
  const spot = summarizeCategory("spot");
  const fut = summarizeCategory("futures");

  it("reads size and price ranges from config", () => {
    expect(spot).toMatchObject({ sizeMinUsd: 5_000, sizeMaxUsd: 100_000, priceMinUsd: 49, priceMaxUsd: 599 });
    expect(fut).toMatchObject({ sizeMinUsd: 5_000, sizeMaxUsd: 100_000, priceMinUsd: 59, priceMaxUsd: 649 });
  });

  it("reads each category's own rules", () => {
    expect(spot).toMatchObject({ dailyPct: 4, maxPct: 8, phase1TargetPct: 8, maxLeverage: null, funding: null });
    expect(fut).toMatchObject({ dailyPct: 3, maxPct: 6, phase1TargetPct: 10, maxLeverage: 5 });
    expect(fut.funding).toContain("8 hours");
  });

  it("counts pairs per category and lists tiers with example coins", () => {
    expect(spot.pairCount).toBeGreaterThan(fut.pairCount);
    expect(spot.tiers.map((t) => t.tier)).toEqual(["major", "large_cap", "mid_cap", "high_volatility"]);
    expect(spot.tiers.reduce((n, t) => n + t.count, 0)).toBe(spot.pairCount);
    expect(spot.tiers[0]?.examples).toEqual(["BTC", "ETH"]);
  });
});

describe("category page content", () => {
  it("states risks honestly for each category", () => {
    expect(categoryPages.futures.watch.join(" ")).toMatch(/liquidated/);
    expect(categoryPages.futures.watch.join(" ")).toMatch(/Funding costs/);
    expect(categoryPages.spot.watch.join(" ")).toMatch(/meme coins/);
    for (const c of Object.values(categoryPages)) expect(c.watch.join(" ")).toMatch(/not confirmed yet/);
  });
});
