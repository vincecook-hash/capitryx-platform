import type { Metadata } from "next";
import { PaymentStatus } from "@/components/checkout/PaymentStatus";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Checkout cancelled", robots: { index: false } };

export default function Page() {
  return (
    <main id="main">
      <Container className="py-10 sm:py-14">
        <PaymentStatus state="cancelled" />
      </Container>
    </main>
  );
}
