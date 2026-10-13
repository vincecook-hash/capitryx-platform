export type OrderStatus = "created" | "pending_payment" | "paid" | "failed" | "cancelled" | "expired";

export interface OrderSummary {
  programId: string;
  programName: string;
  category: "spot" | "futures";
  accountSizeUsd: number;
  subtotalUsd: number;
  discountUsd: number;
  feesUsd: number;
  totalUsd: number;
}
