import { describe, it, expect } from "vitest";
import { getProgram } from "@/lib/pricing";
import { getRuleRows } from "@/lib/rules";
import { formatRule, NOT_APPLICABLE, TBD, set } from "@/lib/rule-value";

describe("formatRule", () => {
  it("formats each state", () => {
    expect(formatRule(set(5), (v) => `${v}x`)).toBe("5x");
    expect(formatRule(NOT_APPLICABLE)).toBe("Not applicable");
    expect(formatRule(TBD)).toBe("To be confirmed");
  });
});

describe("getRuleRows", () => {
  const row = (id: string, programId: string) => {
    const p = getProgram(programId);
    if (!p) throw new Error(`missing ${programId}`);
    return getRuleRows(p).find((r) => r.id === id);
  };

  it("shows leverage only for futures", () => {
    expect(row("leverage", "futures-10k")).toMatchObject({ value: "5x (lower on higher-risk coins)", status: "set" });
    expect(row("leverage", "spot-10k")).toMatchObject({ value: "Not applicable", status: "not_applicable" });
  });

  it("flags undecided policies instead of inventing them", () => {
    expect(row("refund", "spot-5k")).toMatchObject({ value: "To be confirmed", status: "tbd" });
  });

  it("assigns every row to a group", () => {
    const p = getProgram("futures-5k");
    if (!p) throw new Error("missing");
    const rows = getRuleRows(p);
    expect(rows.every((r) => ["program", "risk", "trading", "rewards"].includes(r.group))).toBe(true);
    expect(rows.find((r) => r.id === "daily")?.group).toBe("risk");
    expect(rows.find((r) => r.id === "refund")?.group).toBe("rewards");
    expect(rows.find((r) => r.id === "phase0-target")?.group).toBe("program");
  });

  it("uses different rules for spot and futures", () => {
    expect(row("daily", "spot-5k")?.value).toBe("4%");
    expect(row("daily", "futures-5k")?.value).toBe("3%");
  });
});
