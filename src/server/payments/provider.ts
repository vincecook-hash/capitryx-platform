import type { OrderSummary } from "@/types/order";

export interface PaymentProvider {
  createCheckoutSession(order: OrderSummary, customerEmail: string): Promise<{ redirectUrl: string; providerRef: string }>;
  /** Must verify the provider signature. Returns null if invalid. */
  verifyWebhook(rawBody: string, signature: string | null): Promise<{ providerRef: string; status: "paid" | "failed" | "cancelled" } | null>;
}
