import { describe, it, expect } from "vitest";
import { getTestimonials } from "@/lib/testimonials";

describe("getTestimonials", () => {
  it("is empty by default: no fabricated reviews", () => {
    expect(getTestimonials({ NODE_ENV: "development" })).toEqual([]);
    expect(getTestimonials({ NODE_ENV: "production" })).toEqual([]);
  });

  it("shows labeled samples only outside production with the flag on", () => {
    const dev = getTestimonials({ NODE_ENV: "development", SHOW_SAMPLE_TESTIMONIALS: "true" });
    expect(dev.length).toBeGreaterThan(0);
    expect(dev.every((t) => t.sample === true && t.verified === false)).toBe(true);
  });

  it("never shows samples in production, even if the flag is set", () => {
    expect(getTestimonials({ NODE_ENV: "production", SHOW_SAMPLE_TESTIMONIALS: "true" })).toEqual([]);
  });
});
