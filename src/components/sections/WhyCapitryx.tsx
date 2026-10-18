import { Activity, BarChart3, Coins, Gauge, GraduationCap, Headset, ListChecks, Scale, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { features, type FeatureIcon } from "@/config/features";

const icons: Record<FeatureIcon, LucideIcon> = {
  requirements: ListChecks,
  rules: Scale,
  tracking: Activity,
  markets: Coins,
  risk: Gauge,
  reporting: BarChart3,
  education: GraduationCap,
  support: Headset,
};

export function WhyCapitryx() {
  return (
    <section aria-labelledby="why-title" className="pt-16 sm:pt-24">
      <Container>
        <SectionHeader
          id="why-title"
          title="Built around clarity"
          intro="What Capitryx is designed to offer, and how far along each piece is. We label every feature honestly rather than promise what isn't ready."
        />

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = icons[f.icon];
            return (
              <li key={f.id} className="flex min-w-0 flex-col rounded-lg border border-line bg-bg-raised p-5">
                <div className="flex items-start justify-between gap-3">
                  <Icon aria-hidden size={22} className="text-accent-text" />
                  <Badge tone={f.status === "preview" ? "accent" : "neutral"}>{f.status === "preview" ? "Preview" : "Planned"}</Badge>
                </div>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{f.text}</p>
              </li>
            );
          })}
        </ul>

        <p className="mt-5 text-xs text-fg-muted">
          <span className="font-medium text-fg">Preview</span>: demonstrated on this site with sample data, not a live service.{" "}
          <span className="font-medium text-fg">Planned</span>: on the roadmap, not available yet.
        </p>
      </Container>
    </section>
  );
}
