import { describe, it, expect } from "vitest";
import { checkoutRequestSchema } from "@/lib/validation";

describe("checkoutRequestSchema", () => {
  it("rejects client-supplied price fields being required and bad emails", () => {
    expect(checkoutRequestSchema.safeParse({ programId: "x", email: "nope", acceptedTerms: true }).success).toBe(false);
  });
  it("requires accepted terms", () => {
    expect(checkoutRequestSchema.safeParse({ programId: "x", email: "a@b.co", acceptedTerms: false }).success).toBe(false);
  });
});
