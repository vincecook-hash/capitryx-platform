import { z } from "zod";
export const checkoutRequestSchema = z.object({
  programId: z.string().min(1).max(64),
  email: z.string().email().max(254),
  acceptedTerms: z.literal(true),
});
export type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;

export const contactRequestSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(2000),
  acceptedPrivacy: z.literal(true),
});
export type ContactRequest = z.infer<typeof contactRequestSchema>;
