import { describe, it, expect } from "vitest";
import { assets, TIER_ORDER } from "@/config/assets";
import { effectiveMaxLeverage, getListedAssets, groupByTier, pairLabel } from "@/lib/assets";
import { programs } from "@/config/programs";
import { getProgram } from "@/lib/pricing";

describe("asset catalog", () => {
  it("has plenty of assets including meme coins", () => {
    expect(assets.length).toBeGreaterThanOrEqual(45);
    expect(assets.filter((a) => a.tags.includes("meme")).length).toBeGreaterThanOrEqual(10);
  });

  it("has unique symbols and valid tiers", () => {
    expect(new Set(assets.map((a) => a.symbol)).size).toBe(assets.length);
    for (const a of assets) expect(TIER_ORDER).toContain(a.tier);
  });

  it("gives riskier tiers lower leverage caps", () => {
    const cap = (s: string) => assets.find((a) => a.symbol === s)?.maxLeverage ?? 0;
    expect(cap("BTC")).toBeGreaterThan(cap("PEPE"));
    expect(cap("APT")).toBeGreaterThan(cap("PEPE"));
  });

  it("lists spot-only assets in spot but not futures", () => {
    expect(getListedAssets("spot").some((a) => a.symbol === "MEW")).toBe(true);
    expect(getListedAssets("futures").some((a) => a.symbol === "MEW")).toBe(false);
  });

  it("excludes coming_soon and delisted assets until listed", () => {
    expect(getListedAssets().every((a) => a.status === "listed")).toBe(true);
  });

  it("builds pair labels per category", () => {
    const btc = assets.find((a) => a.symbol === "BTC");
    if (!btc) throw new Error("BTC missing");
    expect(pairLabel(btc, "spot")).toBe("BTC/USDT");
    expect(pairLabel(btc, "futures")).toBe("BTC/USDT Perpetual");
  });

  it("uses the lower of the program cap and the asset cap", () => {
    const fut = getProgram("futures-10k");
    const spot = getProgram("spot-10k");
    const pepe = assets.find((a) => a.symbol === "PEPE");
    const btc = assets.find((a) => a.symbol === "BTC");
    if (!fut || !spot || !pepe || !btc) throw new Error("missing fixtures");
    expect(effectiveMaxLeverage(btc, fut)).toBe(5);
    expect(effectiveMaxLeverage(pepe, fut)).toBe(2);
    expect(effectiveMaxLeverage(btc, spot)).toBeNull();
  });

  it("groups by tier in display order", () => {
    expect(groupByTier(getListedAssets()).map((g) => g.tier)).toEqual(TIER_ORDER);
  });

  it("feeds program pair lists from the catalog", () => {
    for (const p of programs) {
      const expected = getListedAssets(p.category).length;
      expect(p.assets).toHaveLength(expected);
    }
  });
});
