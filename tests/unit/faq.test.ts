import { describe, it, expect } from "vitest";
import { faqItems } from "@/config/faq";
import { features } from "@/config/features";

describe("FAQ content", () => {
  it("covers all 20 required questions with unique ids", () => {
    expect(faqItems).toHaveLength(20);
    expect(new Set(faqItems.map((f) => f.id)).size).toBe(20);
    for (const f of faqItems) {
      expect(f.question.endsWith("?")).toBe(true);
      expect(f.answer.length).toBeGreaterThan(30);
    }
  });

  it("flags undecided business policies for owner review", () => {
    const flagged = (id: string) => faqItems.find((f) => f.id === id)?.needsOwnerReview;
    for (const id of ["simulated-or-live", "if-i-fail", "refunds", "payments", "countries", "identity", "support", "rewards", "recurring"]) {
      expect(flagged(id), id).toBe(true);
    }
  });

  it("states real numbers from the config", () => {
    const text = (id: string) => faqItems.find((f) => f.id === id)?.answer ?? "";
    expect(text("leverage")).toContain("5x");
    expect(text("drawdown")).toContain("$9,600");
    expect(text("drawdown")).toContain("$9,200");
    expect(text("minimum-days")).toContain("3 trading days");
  });

  it("makes no guarantees or regulatory claims", () => {
    const all = faqItems.map((f) => f.answer.toLowerCase()).join(" ");
    for (const bad of ["guaranteed profit", "guarantees profit", "regulated by", "licensed by", "insured by", "audited by", "100% safe"]) {
      expect(all).not.toContain(bad);
    }
    expect(all).toContain("not by itself give you a funded live account");
  });
});

describe("feature cards", () => {
  it("only marks demonstrated features as preview and the rest as planned", () => {
    expect(features).toHaveLength(8);
    expect(features.every((f) => f.status === "preview" || f.status === "planned")).toBe(true);
    expect(features.find((f) => f.id === "support")?.status).toBe("planned");
    expect(features.find((f) => f.id === "education")?.status).toBe("planned");
  });
});
