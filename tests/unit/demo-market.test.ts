import { describe, it, expect } from "vitest";
import { demoMarkets, generateCandles } from "@/lib/demo-market";

describe("demo market data", () => {
  it("is deterministic", () => {
    expect(generateCandles(5, 100, 10, 0.01, 0)).toEqual(generateCandles(5, 100, 10, 0.01, 0));
  });

  it("produces valid candles (low <= open/close <= high)", () => {
    for (const m of demoMarkets) {
      expect(m.candles).toHaveLength(60);
      for (const c of m.candles) {
        expect(c.low).toBeLessThanOrEqual(Math.min(c.open, c.close));
        expect(c.high).toBeGreaterThanOrEqual(Math.max(c.open, c.close));
      }
    }
  });

  it("covers BTC/USDT and ETH/USDT", () => {
    expect(demoMarkets.map((m) => m.symbol)).toEqual(["BTC/USDT", "ETH/USDT"]);
  });
});
