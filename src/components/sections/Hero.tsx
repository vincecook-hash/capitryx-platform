import { Gauge, Layers, ListChecks } from "lucide-react";
import { MarketPanel } from "@/components/charts/MarketPanel";
import { DashboardPreview } from "@/components/dashboard/DashboardPreview";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const benefits = [
  { icon: ListChecks, title: "Rules stated up front", text: "Targets, loss limits and fees shown before you commit." },
  { icon: Layers, title: "Spot and futures programs", text: "Separate rules for each, never one set copied across both." },
  { icon: Gauge, title: "Risk-first measurement", text: "Drawdown is calculated and explained in plain terms." },
] as const;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-grid border-b border-line">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            <Badge tone="accent">Crypto spot and futures evaluations</Badge>
            <h1 id="hero-title" className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Prove your edge across crypto markets.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
              Put your strategy through a structured evaluation built on discipline, transparency and risk management. Choose a spot or
              futures program, trade to the published criteria, and see exactly where you stand.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/programs" size="lg">
                Explore Trading Programs
              </ButtonLink>
              <ButtonLink href="/how-it-works" size="lg" variant="secondary">
                How It Works
              </ButtonLink>
            </div>

            <ul className="mt-10 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {benefits.map(({ icon: Icon, title, text }) => (
                <li key={title}>
                  <Icon aria-hidden size={20} className="text-accent-text" />
                  <p className="mt-2 text-sm font-semibold">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          <MarketPanel />
        </div>

        <div className="mt-12 lg:mt-16">
          <DashboardPreview />
        </div>
      </Container>
    </section>
  );
}
