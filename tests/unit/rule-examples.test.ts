import { describe, it, expect } from "vitest";
import { balanceVsEquityExample, staticVsTrailingExample } from "@/lib/rule-examples";
import { getProgram } from "@/lib/pricing";
import type { Program } from "@/types/program";

const prog = (id: string): Program => {
  const p = getProgram(id);
  if (!p) throw new Error(`missing ${id}`);
  return p;
};

describe("staticVsTrailingExample", () => {
  it("spot $25K (8% max): trailing catches the fall, static does not", () => {
    const e = staticVsTrailingExample(prog("spot-25k"));
    expect(e).toMatchObject({ sizeUsd: 25_000, maxPct: 8, peakUsd: 27_000, currentUsd: 24_750 });
    expect(e?.static).toEqual({ floorUsd: 23_000, breached: false });
    expect(e?.trailing).toEqual({ floorUsd: 25_000, breached: true });
  });

  it("futures $25K (6% max) works the same way with its own numbers", () => {
    const e = staticVsTrailingExample(prog("futures-25k"));
    expect(e?.peakUsd).toBe(26_500);
    expect(e?.static).toEqual({ floorUsd: 23_500, breached: false });
    expect(e?.trailing).toEqual({ floorUsd: 25_000, breached: true });
  });

  it("returns null when the rule is not set", () => {
    expect(staticVsTrailingExample({ ...prog("spot-5k"), maxDrawdownPct: { status: "tbd" } })).toBeNull();
  });
});

describe("balanceVsEquityExample", () => {
  it("open losses breach an equity-based daily limit but not a balance-based one", () => {
    const e = balanceVsEquityExample(prog("spot-25k"));
    expect(e).toMatchObject({ dailyAmountUsd: 1_000, balanceUsd: 25_000, equityUsd: 23_750 });
    expect(e?.equityBasis).toEqual({ floorUsd: 24_000, breached: true });
    expect(e?.balanceBasis).toEqual({ floorUsd: 24_000, breached: false });
  });

  it("returns null when the rule is not set", () => {
    expect(balanceVsEquityExample({ ...prog("spot-5k"), dailyDrawdownPct: { status: "tbd" } })).toBeNull();
  });
});
