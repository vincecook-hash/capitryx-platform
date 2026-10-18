export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role?: string;
  /** True only for statements the owner has verified came from a real customer. */
  verified: boolean;
  /** Placeholder content for design work. Never shown in production. */
  sample?: boolean;
}

/** Add REAL, verified customer reviews here. Leave empty until you have them: the section stays hidden. */
export const verifiedTestimonials: Testimonial[] = [];

const sampleTestimonials: Testimonial[] = [
  { id: "sample-1", quote: "Sample text used only to check the layout. Not a real customer.", name: "Sample Trader", role: "Layout example", verified: false, sample: true },
  { id: "sample-2", quote: "Another placeholder so you can see how several reviews sit together.", name: "Sample Trader", role: "Layout example", verified: false, sample: true },
];

type Env = Record<string, string | undefined>;

/** Samples appear only outside production AND when SHOW_SAMPLE_TESTIMONIALS=true. */
export function getTestimonials(env: Env = process.env): Testimonial[] {
  const showSamples = env.NODE_ENV !== "production" && env.SHOW_SAMPLE_TESTIMONIALS === "true";
  return showSamples ? [...verifiedTestimonials, ...sampleTestimonials] : verifiedTestimonials.filter((t) => t.verified);
}
