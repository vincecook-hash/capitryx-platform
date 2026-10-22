import type { OrderStatus } from "@/types/order";

export type PaymentState = "confirmed" | "pending" | "cancelled" | "failed" | "unknown";

/**
 * Maps a server-verified order status to what the visitor sees.
 * SAFETY RULE: only the status "paid" (set after the payment provider's verified confirmation) can ever
 * produce "confirmed". Anything else, including a missing or unknown order, is never shown as a success.
 */
export function resolvePaymentState(status: OrderStatus | null | undefined): PaymentState {
  switch (status) {
    case "paid":
      return "confirmed";
    case "created":
    case "pending_payment":
      return "pending";
    case "cancelled":
      return "cancelled";
    case "failed":
    case "expired":
      return "failed";
    default:
      return "unknown";
  }
}
