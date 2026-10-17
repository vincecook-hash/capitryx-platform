import { describe, it, expect } from "vitest";
import { demoFuturesDashboard } from "@/config/demo-dashboard";
import { buildDashboardView, positionPnl } from "@/lib/dashboard";

describe("buildDashboardView", () => {
  const v = buildDashboardView(demoFuturesDashboard);

  it("derives equity from balance plus unrealized P&L", () => {
    expect(v.equityUsd).toBeCloseTo(demoFuturesDashboard.balanceUsd + v.unrealizedPnlUsd, 6);
    expect(v.unrealizedPnlUsd).toBeCloseTo(v.positions.reduce((s, p) => s + p.pnlUsd, 0), 6);
  });

  it("computes realized P&L against the starting balance", () => {
    expect(v.realizedPnlUsd).toBe(980);
  });

  it("keeps profit progress and drawdown usage within 0..1", () => {
    for (const r of [v.profitProgressRatio, v.drawdown.dailyUsedRatio, v.drawdown.maxUsedRatio]) {
      expect(r).not.toBeNull();
      expect(r as number).toBeGreaterThanOrEqual(0);
      expect(r as number).toBeLessThanOrEqual(1);
    }
    expect(v.drawdown.dailyBreached).toBe(false);
    expect(v.drawdown.maxBreached).toBe(false);
  });

  it("uses the real program rules (futures-25k: 3% daily, 6% max, 10% target)", () => {
    expect(v.drawdown.dailyFloorUsd).toBe(26_400 - 750);
    expect(v.drawdown.maxFloorUsd).toBe(25_000 - 1_500);
    expect(v.profitTargetUsd).toBe(2_500);
  });
});

describe("positionPnl", () => {
  const base = { id: "x", pair: "P", quantity: 2, unit: "U", entry: 100, mark: 110, leverage: null };
  it("longs gain when price rises", () => expect(positionPnl({ ...base, side: "long" })).toBe(20));
  it("shorts gain when price falls", () => expect(positionPnl({ ...base, side: "short", mark: 90 })).toBe(20));
  it("shorts lose when price rises", () => expect(positionPnl({ ...base, side: "short" })).toBe(-20));
});
