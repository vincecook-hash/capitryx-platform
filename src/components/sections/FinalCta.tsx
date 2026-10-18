import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="pt-16 sm:pt-24">
      <Container>
        <div className="rounded-lg border border-line-strong bg-bg-raised p-6 shadow-card sm:p-10">
          <h2 id="cta-title" className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
            Pick a program, read every rule, then decide.
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-fg-muted">
            Compare spot and futures side by side, check the limits against your own strategy, and move on only when it makes sense for you.
            There is no countdown and no pressure.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/programs" size="lg">Explore Trading Programs</ButtonLink>
            <ButtonLink href="/faq" size="lg" variant="secondary">Read the FAQ</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
