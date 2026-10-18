import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummaryCard } from "@/components/checkout/OrderSummaryCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { buildOrderSummary, getProgram } from "@/lib/pricing";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { program: raw } = await searchParams;
  const programId = typeof raw === "string" ? raw : "";
  // Price comes from server config, never from the URL or the browser.
  const order = buildOrderSummary(programId);
  const program = getProgram(programId);

  return (
    <main id="main">
      <Container className="py-10 sm:py-14">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Checkout</h1>

        {!order || !program ? (
          <div className="mt-8 max-w-xl rounded-lg border border-line bg-bg-raised p-6">
            <p className="text-fg-muted">No program selected. Choose a program to see its summary and continue.</p>
            <ButtonLink href="/programs" className="mt-5">Choose a program</ButtonLink>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
            <section aria-labelledby="details-title" className="min-w-0 rounded-lg border border-line bg-bg-raised p-5 sm:p-6">
              <h2 id="details-title" className="text-lg font-semibold">Your details</h2>
              <p className="mt-2 mb-5 text-sm text-fg-muted">We only ask for what is needed to process this order.</p>
              <CheckoutForm programId={program.id} />
            </section>
            <div className="min-w-0 lg:sticky lg:top-24">
              <OrderSummaryCard order={order} demo={program.dataStatus === "demo"}>
                <ButtonLink href={`/programs?category=${program.category}&size=${program.accountSizeUsd}`} variant="secondary" className="w-full">
                  Change program
                </ButtonLink>
              </OrderSummaryCard>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
