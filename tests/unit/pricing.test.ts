import { describe, it, expect } from "vitest";
import { buildOrderSummary, findProgram, getAccountSizes, getProgramsByCategory } from "@/lib/pricing";

describe("pricing", () => {
  it("returns null for an unknown program", () => {
    expect(buildOrderSummary("does-not-exist")).toBeNull();
  });

  it("builds the order from config, never from client input", () => {
    const order = buildOrderSummary("futures-25k");
    expect(order).toMatchObject({ programId: "futures-25k", category: "futures", accountSizeUsd: 25_000, totalUsd: 219 });
  });

  it("finds the right program for category + size", () => {
    expect(findProgram("spot", 10_000)?.id).toBe("spot-10k");
    expect(findProgram("futures", 10_000)?.id).toBe("futures-10k");
    expect(findProgram("spot", 7)).toBeUndefined();
  });

  it("lists the same 5 sizes in ascending order for both categories", () => {
    const sizes = [5_000, 10_000, 25_000, 50_000, 100_000];
    expect(getAccountSizes("spot")).toEqual(sizes);
    expect(getAccountSizes("futures")).toEqual(sizes);
  });

  it("prices rise with account size", () => {
    for (const cat of ["spot", "futures"] as const) {
      const prices = getProgramsByCategory(cat).map((p) => p.priceUsd);
      expect([...prices].sort((a, b) => a - b)).toEqual(prices);
    }
  });
});
