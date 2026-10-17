import { describe, it, expect } from "vitest";
import { evaluateDrawdown, type AccountState } from "@/lib/drawdown";
import { getProgram } from "@/lib/pricing";
import type { Program } from "@/types/program";

const base = (p: Program): Program => p;
const spot10k = () => {
  const p = getProgram("spot-10k");
  if (!p) throw new Error("missing spot-10k");
  return p; // daily 4%, max 8%, static, equity
};

const state = (over: Partial<AccountState> = {}): AccountState => ({
  startingBalanceUsd: 10_000,
  dayStart: { balanceUsd: 10_000, equityUsd: 10_000 },
  peak: { balanceUsd: 10_000, equityUsd: 10_000 },
  current: { balanceUsd: 10_000, equityUsd: 10_000 },
  ...over,
});

describe("evaluateDrawdown", () => {
  it("computes daily and static floors from the starting balance", () => {
    const r = evaluateDrawdown(spot10k(), state());
    expect(r.dailyFloorUsd).toBe(9_600); // 10,000 - 4% of 10,000
    expect(r.maxFloorUsd).toBe(9_200); // 10,000 - 8% of 10,000
    expect(r.dailyBreached).toBe(false);
    expect(r.maxBreached).toBe(false);
  });

  it("breaches the daily limit exactly at the floor", () => {
    const r = evaluateDrawdown(spot10k(), state({ current: { balanceUsd: 10_000, equityUsd: 9_600 } }));
    expect(r.dailyBreached).toBe(true);
    expect(r.maxBreached).toBe(false);
    expect(r.dailyUsedRatio).toBe(1);
  });

  it("reports partial usage of the limit", () => {
    const r = evaluateDrawdown(spot10k(), state({ current: { balanceUsd: 10_000, equityUsd: 9_800 } }));
    expect(r.dailyUsedRatio).toBeCloseTo(0.5);
    expect(r.maxUsedRatio).toBeCloseTo(0.25);
  });

  it("uses equity or balance according to the program basis", () => {
    const p = base({ ...spot10k(), drawdownBasis: { status: "set", value: "balance" } });
    const r = evaluateDrawdown(p, state({ current: { balanceUsd: 10_000, equityUsd: 9_000 } }));
    expect(r.dailyBreached).toBe(false); // floating loss ignored on balance basis
  });

  it("trailing drawdown follows the peak", () => {
    const p = base({ ...spot10k(), drawdownType: { status: "set", value: "trailing" } });
    const r = evaluateDrawdown(
      p,
      state({ peak: { balanceUsd: 11_000, equityUsd: 11_000 }, current: { balanceUsd: 10_000, equityUsd: 10_200 } }),
    );
    expect(r.maxFloorUsd).toBe(10_200); // 11,000 - 800
    expect(r.maxBreached).toBe(true);
  });

  it("returns nulls when rules are not set", () => {
    const p = base({ ...spot10k(), dailyDrawdownPct: { status: "tbd" }, maxDrawdownPct: { status: "tbd" } });
    const r = evaluateDrawdown(p, state());
    expect(r).toMatchObject({ dailyFloorUsd: null, maxFloorUsd: null, dailyBreached: false, maxBreached: false });
  });
});
