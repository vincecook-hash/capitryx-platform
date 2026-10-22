import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  { title: "Choose a program", text: "Pick a spot or a futures evaluation program and an evaluation size." },
  { title: "Review the terms", text: "Read the price, the conditions and the full trading rules before you commit to anything." },
  { title: "Complete the evaluation", text: "Trade to the published criteria: reach the profit target while staying inside the loss limits." },
  { title: "Finish the checks", text: "Complete any required verification and eligibility checks before moving to any reward or later program stage." },
] as const;

export function HowItWorks({ asPage = false }: { asPage?: boolean }) {
  // On the standalone page the section title is the h1, so the step titles are h2; on the home page they are h3 under an h2.
  const StepHeading = asPage ? "h2" : "h3";
  return (
    <section aria-labelledby="how-title" id="how-it-works" className={asPage ? "pt-10 sm:pt-14" : "pt-16 sm:pt-24"}>
      <Container>
        <SectionHeader
          id="how-title"
          level={asPage ? 1 : 2}
          title="How it works"
          intro="Four steps from choosing a program to the end of an evaluation."
        />

        <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="min-w-0 rounded-lg border border-line bg-bg-raised p-5">
              <span aria-hidden className="tabular inline-flex h-8 w-8 items-center justify-center rounded-full border border-line-strong font-mono text-sm text-accent-text">
                {i + 1}
              </span>
              <StepHeading className="mt-4 text-base font-semibold">
                <span className="sr-only">Step {i + 1}: </span>
                {s.title}
              </StepHeading>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8">
          <ButtonLink href="/programs" size="lg">
            Explore Trading Programs
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
