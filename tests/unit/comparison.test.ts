import { describe, it, expect } from "vitest";
import { buildComparison } from "@/lib/comparison";

describe("buildComparison", () => {
  const rows = buildComparison();
  const row = (label: string) => rows.find((r) => r.label === label);

  it("covers the required spot vs futures distinctions", () => {
    for (const l of ["What you trade", "Contract types", "Leverage", "Funding payments", "Liquidation risk", "Trading fees", "Daily / maximum drawdown", "Position sizing", "Supported pairs"]) {
      expect(row(l), l).toBeDefined();
    }
  });

  it("pulls leverage, funding and liquidation from the program rules", () => {
    expect(row("Leverage")?.spot).toBe("Not applicable");
    expect(row("Leverage")?.futures).toContain("5x");
    expect(row("Funding payments")?.spot).toBe("Not applicable");
    expect(row("Funding payments")?.futures).not.toBe("Not applicable");
    expect(row("Liquidation risk")?.spot).toBe("Not applicable");
  });

  it("shows different drawdown limits for spot and futures", () => {
    expect(row("Daily / maximum drawdown")).toMatchObject({ spot: "4% / 8%", futures: "3% / 6%" });
  });

  it("counts spot pairs above futures pairs (some coins are spot-only)", () => {
    const n = (s?: string) => Number(s?.split(" ")[0]);
    expect(n(row("Supported pairs")?.spot)).toBeGreaterThan(n(row("Supported pairs")?.futures));
  });
});
