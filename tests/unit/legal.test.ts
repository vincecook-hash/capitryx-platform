import { describe, it, expect } from "vitest";
import { LEGAL_STATUS, legalDocs } from "@/config/legal";
import { splitPlaceholders } from "@/lib/legal";

const docs = Object.values(legalDocs);

describe("legal drafts", () => {
  it("has all four documents, still marked as drafts needing review", () => {
    expect(docs.map((d) => d.slug).sort()).toEqual(["privacy", "refund-policy", "risk-disclosure", "terms"]);
    expect(LEGAL_STATUS).toBe("draft_requires_legal_review");
  });

  it("has unique section ids and real content in every document", () => {
    for (const d of docs) {
      expect(new Set(d.sections.map((s) => s.id)).size, d.slug).toBe(d.sections.length);
      expect(d.sections.length, d.slug).toBeGreaterThanOrEqual(6);
      for (const s of d.sections) expect(s.paragraphs.length, `${d.slug}/${s.id}`).toBeGreaterThan(0);
    }
  });

  it("keeps unfinished wording in [placeholders] in terms, privacy and refund policy", () => {
    for (const slug of ["terms", "privacy", "refund-policy"] as const) {
      const text = legalDocs[slug].sections.flatMap((s) => s.paragraphs).join(" ");
      expect((text.match(/\[[^\]]+\]/g) ?? []).length, slug).toBeGreaterThanOrEqual(5);
    }
  });

  it("makes no guarantees and no regulatory, licence, insurance or audit claims", () => {
    const text = docs.flatMap((d) => d.sections.flatMap((s) => s.paragraphs)).join(" ").toLowerCase();
    for (const bad of ["guaranteed profit", "guarantees profit", "is regulated", "is licensed", "is licenced", "fully insured", "audited by", "risk-free", "risk free"]) {
      expect(text, bad).not.toContain(bad);
    }
    expect(text).toContain("does not guarantee any reward, payout or capital allocation");
    expect(text).toContain("does not give you a funded live account");
  });

  it("the risk disclosure covers the required crypto and derivatives risks", () => {
    const text = legalDocs["risk-disclosure"].sections.map((s) => s.title + " " + s.paragraphs.join(" ")).join(" ").toLowerCase();
    for (const topic of ["volatility", "leverage", "liquidation", "funding", "meme", "fees", "no advice", "past performance"]) expect(text, topic).toContain(topic);
  });
});

describe("splitPlaceholders", () => {
  it("separates plain text from [placeholders]", () => {
    expect(splitPlaceholders("Run by [Company legal name] in [Country].")).toEqual([
      { text: "Run by ", placeholder: false },
      { text: "[Company legal name]", placeholder: true },
      { text: " in ", placeholder: false },
      { text: "[Country]", placeholder: true },
      { text: ".", placeholder: false },
    ]);
  });
  it("leaves text without placeholders alone", () => {
    expect(splitPlaceholders("Plain text.")).toEqual([{ text: "Plain text.", placeholder: false }]);
  });
});
