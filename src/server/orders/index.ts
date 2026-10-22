import type { OrderStatus } from "@/types/order";

/**
 * Order records (written only after the payment provider's verified webhook). No store is configured yet,
 * so every order is "unknown": the site can never show a payment as confirmed. Implement this interface
 * (database of your choice) and return it from getOrderStore() together with the webhook's status updates.
 */
export interface OrderStore {
  getStatus(orderRef: string): Promise<OrderStatus | null>;
}

export function getOrderStore(): OrderStore | null {
  return null;
}
