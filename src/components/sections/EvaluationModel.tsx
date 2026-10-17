import { Container } from "@/components/ui/Container";

const steps = [
  { n: "1", title: "Choose a program", text: "Pick a spot or futures evaluation and review its price and rules." },
  { n: "2", title: "Trade to the criteria", text: "Work toward the published profit target while staying inside the loss limits." },
  { n: "3", title: "Complete the checks", text: "Finish any required verification and eligibility checks before a reward or later stage." },
] as const;

export function EvaluationModel() {
  return (
    <section aria-labelledby="model-title" className="py-16 sm:py-20">
      <Container>
        <h2 id="model-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          How the evaluation model works
        </h2>
        <p className="mt-3 max-w-2xl text-fg-muted">
          You purchase an evaluation attempt. Passing means meeting the published criteria for that program.
        </p>

        <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-lg border border-line bg-bg-raised p-5">
              <span className="tabular font-mono text-sm text-accent-text">{s.n}</span>
              <h3 className="mt-3 text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-lg border border-line-strong bg-bg-sunken p-5 text-sm leading-relaxed text-fg-muted">
          <p className="font-medium text-fg">What this is not</p>
          <p className="mt-2">
            Buying an evaluation does not give you a funded live account, and passing one does not by itself guarantee any reward,
            payout or capital allocation. The evaluation size shown on a program is a notional figure, not money deposited into your
            personal account. Exact mechanics depend on the program you select.
          </p>
        </div>
      </Container>
    </section>
  );
}
