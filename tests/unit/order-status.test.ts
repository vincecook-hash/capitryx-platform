import { describe, it, expect } from "vitest";
import { resolvePaymentState } from "@/lib/order-status";
import { getOrderStore } from "@/server/orders";
import type { OrderStatus } from "@/types/order";

describe("resolvePaymentState: a payment is only ever 'confirmed' when the server says it is paid", () => {
  it("maps every order status to the right screen", () => {
    const expected: Record<OrderStatus, string> = {
      created: "pending", pending_payment: "pending", paid: "confirmed", failed: "failed", cancelled: "cancelled", expired: "failed",
    };
    for (const [status, state] of Object.entries(expected)) expect(resolvePaymentState(status as OrderStatus), status).toBe(state);
  });

  it("never confirms a missing, unknown or malformed status", () => {
    for (const bad of [null, undefined, "", "PAID", "success", "confirmed", "paid ", "true"]) {
      expect(resolvePaymentState(bad as unknown as OrderStatus), String(bad)).not.toBe("confirmed");
    }
    expect(resolvePaymentState(null)).toBe("unknown");
  });

  it("has no order store configured yet, so nothing can be shown as paid", async () => {
    expect(getOrderStore()).toBeNull();
  });
});
