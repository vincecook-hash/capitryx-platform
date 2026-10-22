import type { Metadata } from "next";
import { PaymentStatus } from "@/components/checkout/PaymentStatus";
import { Container } from "@/components/ui/Container";
import { resolvePaymentState } from "@/lib/order-status";
import { getOrderStore } from "@/server/orders";

export const metadata: Metadata = { title: "Payment status", robots: { index: false } };

/** Where the payment provider sends the buyer back. The URL alone proves nothing: status is read from the server's order record. */
export default async function CheckoutSuccessPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { order } = await searchParams;
  const orderRef = typeof order === "string" && /^[\w-]{1,64}$/.test(order) ? order : undefined;
  const store = getOrderStore();
  const status = store && orderRef ? await store.getStatus(orderRef) : null;
  return (
    <main id="main">
      <Container className="py-10 sm:py-14">
        <PaymentStatus state={resolvePaymentState(status)} orderRef={orderRef} />
      </Container>
    </main>
  );
}
