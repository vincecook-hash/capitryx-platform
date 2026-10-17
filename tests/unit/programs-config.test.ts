import { describe, it, expect } from "vitest";
import { programs } from "@/config/programs";
import { getProgramsByCategory } from "@/lib/pricing";

describe("programs config integrity", () => {
  it("has 10 programs with unique ids", () => {
    expect(programs).toHaveLength(10);
    expect(new Set(programs.map((p) => p.id)).size).toBe(10);
  });

  it("marks every program as demo until the owner confirms terms", () => {
    expect(programs.every((p) => p.dataStatus === "demo")).toBe(true);
  });

  it("has positive prices and valid phases", () => {
    for (const p of programs) {
      expect(p.priceUsd).toBeGreaterThan(0);
      expect(p.phases.length).toBeGreaterThan(0);
      expect(p.assets.length).toBeGreaterThan(0);
    }
  });

  it("spot programs have no leverage, funding or liquidation", () => {
    for (const p of getProgramsByCategory("spot")) {
      expect(p.maxLeverage.status).toBe("not_applicable");
      expect(p.fundingCosts.status).toBe("not_applicable");
      expect(p.liquidationRule.status).toBe("not_applicable");
      expect(p.contractTypes.status).toBe("not_applicable");
    }
  });

  it("futures programs define leverage, funding, liquidation and contract types", () => {
    for (const p of getProgramsByCategory("futures")) {
      expect(p.maxLeverage.status).toBe("set");
      expect(p.fundingCosts.status).toBe("set");
      expect(p.liquidationRule.status).toBe("set");
      expect(p.contractTypes.status).toBe("set");
    }
  });

  it("does not invent policies: payout and refund stay undecided", () => {
    for (const p of programs) {
      expect(p.payoutSchedule.status).toBe("tbd");
      expect(p.refundPolicy.status).toBe("tbd");
    }
  });
});
