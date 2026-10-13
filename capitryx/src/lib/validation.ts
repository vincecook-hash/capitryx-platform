import { z } from "zod";
export const checkoutRequestSchema = z.object({
  programId: z.string().min(1).max(64),
  email: z.string().email().max(254),
  acceptedTerms: z.literal(true),
});
export type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;
