import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Capitryx",
  description: "Capitryx is a crypto trader-evaluation platform in development, built around clear rules, honest numbers and risk-first design.",
};

const principles = [
  { title: "Clear terms", text: "Every program states its targets, limits, fees and open questions before you pay." },
  { title: "Honest numbers", text: "Illustrative figures are labeled illustrative. Market data is called live only when it is." },
  { title: "Risk first", text: "Loss limits come with stated formulas and worked examples, so you can check them yourself." },
  { title: "Built for crypto", text: "Spot and perpetual futures programs, from majors to higher-volatility coins, each with its own rules." },
] as const;

export default function AboutPage() {
  return (
    <main id="main">
      <Container className="py-10 sm:py-14">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">About Capitryx</h1>
          <p className="mt-2 text-lg font-medium text-silver">{siteConfig.brandTagline}</p>
          <p className="mt-4 leading-relaxed text-fg-muted">
            Capitryx is a crypto trader-evaluation platform in development. It is built around spot and futures programs with published
            rules, clear risk limits and honest reporting.
          </p>
        </header>

        <section aria-labelledby="principles-title" className="pt-14">
          <SectionHeader id="principles-title" title="What we stand for" />
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {principles.map((p) => (
              <li key={p.title} className="min-w-0 rounded-lg border border-line bg-bg-raised p-5">
                <h3 className="text-base font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="status-title" className="pt-14">
          <SectionHeader
            id="status-title"
            title="Where things stand"
            intro="This site is a pre-launch preview. Programs, prices and rules are demonstrations, and features marked Planned are not available yet. Details such as the company's legal name and address will be published once they are confirmed."
          />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/programs">Explore Trading Programs</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">Get in touch</ButtonLink>
          </div>
        </section>
      </Container>
    </main>
  );
}
