import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Login", robots: { index: false } };

export default function LoginPage() {
  return (
    <main id="main">
      <Container className="py-10 sm:py-14">
        <div className="max-w-xl">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Trader login</h1>
          <div className="mt-6 rounded-lg border border-line bg-bg-raised p-6">
            <h2 className="text-base font-semibold">Accounts are not open yet</h2>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              There is nothing to sign in to at the moment. Once accounts launch, you will sign in here to follow your evaluation. Until
              then, you can explore the programs and read every rule.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/programs">Explore Trading Programs</ButtonLink>
              <ButtonLink href="/trading-rules" variant="secondary">Read the rules</ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
