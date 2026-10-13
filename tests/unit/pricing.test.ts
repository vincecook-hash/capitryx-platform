import { describe, it, expect } from "vitest";
import { buildOrderSummary } from "@/lib/pricing";

describe("buildOrderSummary", () => {
  it("returns null for an unknown program", () => {
    expect(buildOrderSummary("does-not-exist")).toBeNull();
  });
});
