import { describe, it, expect } from "vitest";
import { resolveSelection } from "@/lib/selection";

describe("resolveSelection", () => {
  it("accepts a valid category and size", () => {
    expect(resolveSelection("futures", "50000")).toEqual({ category: "futures", sizeUsd: 50_000 });
  });
  it("falls back to spot and the default size for junk input", () => {
    expect(resolveSelection("hacker", "abc")).toEqual({ category: "spot", sizeUsd: 25_000 });
    expect(resolveSelection(undefined, undefined)).toEqual({ category: "spot", sizeUsd: 25_000 });
    expect(resolveSelection(["futures"], 123)).toEqual({ category: "spot", sizeUsd: 25_000 });
  });
  it("rejects sizes that are not offered", () => {
    expect(resolveSelection("spot", "7777").sizeUsd).toBe(25_000);
  });
});
