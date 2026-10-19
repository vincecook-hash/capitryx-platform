import { describe, it, expect } from "vitest";
import { policyRules } from "@/config/trading-rules";
import { getProgram } from "@/lib/pricing";
import { getRuleRows } from "@/lib/rules";

describe("policy rules config", () => {
  it("has unique ids and a rule for both categories", () => {
    expect(new Set(policyRules.map((r) => r.id)).size).toBe(policyRules.length);
    for (const r of policyRules) {
      expect(r.rules.spot).toBeDefined();
      expect(r.rules.futures).toBeDefined();
    }
  });

  it("explains what every undecided rule will cover instead of inventing it", () => {
    for (const r of policyRules) {
      const undecided = r.rules.spot.status === "tbd" || r.rules.futures.status === "tbd";
      if (undecided) expect(r.willCover?.length ?? 0, r.id).toBeGreaterThan(20);
    }
    for (const id of ["news", "bots", "api", "restricted"]) {
      const r = policyRules.find((x) => x.id === id);
      expect(r?.rules.spot.status, id).toBe("tbd");
      expect(r?.rules.futures.status, id).toBe("tbd");
    }
  });

  it("makes margin a futures-only rule", () => {
    const m = policyRules.find((r) => r.id === "margin");
    expect(m?.rules.spot.status).toBe("not_applicable");
    expect(m?.rules.futures.status).toBe("tbd");
  });
});

describe("coverage of the required rule topics", () => {
  // Every topic from the product brief must appear on the page: in the numeric rules or the policy rules.
  const required = [
    "pairs", "fees", "profit target", "daily drawdown", "maximum drawdown", "drawdown type", "drawdown basis",
    "position sizing", "leverage", "liquidation", "holding", "funding", "news", "automated trading", "api trading",
    "restricted strategies", "market manipulation", "prohibited conduct", "minimum trading days", "time limit",
    "program progression", "payout", "reward eligibility", "margin",
  ];

  for (const category of ["spot", "futures"] as const) {
    it(`${category} page covers every required topic`, () => {
      const p = getProgram(`${category}-25k`);
      if (!p) throw new Error("missing program");
      const labels = [...getRuleRows(p).map((r) => r.label), ...policyRules.map((r) => r.title)].join(" | ").toLowerCase();
      for (const topic of required) expect(labels, topic).toContain(topic);
    });
  }
});
