import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const cards = [
  {
    title: "What you purchase",
    text: "An evaluation attempt for the program you choose, measured against that program's published criteria. The evaluation size is a notional figure, not money deposited into your account.",
  },
  {
    title: "What passing means",
    text: "You met the published criteria for that program. Verification and eligibility checks still come before any reward or later stage.",
  },
  {
    title: "What this is not",
    text: "Buying an evaluation does not give you a funded live account. Passing does not by itself guarantee any reward, payout or capital allocation.",
  },
] as const;

export function EvaluationModel() {
  return (
    <section aria-labelledby="model-title" className="pt-16 sm:pt-24">
      <Container>
        <SectionHeader id="model-title" title="The evaluation model, in plain terms" intro="Exact mechanics depend on the program you select." />
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((c, i) => (
            <div key={c.title} className={i === 2 ? "min-w-0 rounded-lg border border-line-strong bg-bg-sunken p-5" : "min-w-0 rounded-lg border border-line bg-bg-raised p-5"}>
              <h3 className="text-base font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{c.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
