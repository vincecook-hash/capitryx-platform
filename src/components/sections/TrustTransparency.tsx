import Link from "next/link";
import { Eye, FileText, Scale, ShieldCheck, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

const items: Array<{ icon: LucideIcon; title: string; text: string; link?: { label: string; href: string } }> = [
  { icon: Eye, title: "Rules before you pay", text: "Every program lists its targets, limits, fees and policies up front, including the ones still undecided.", link: { label: "See the programs", href: "/programs" } },
  { icon: Scale, title: "Calculations you can check", text: "Drawdown limits use stated formulas with worked examples, so you can work out when a limit would be breached.", link: { label: "See how it works", href: "/trading-rules#how-violations-are-determined" } },
  { icon: FileText, title: "Risk stated plainly", text: "A Risk Disclosure page is linked from every footer. It is currently a draft awaiting legal review.", link: { label: "Open the draft", href: "/legal/risk-disclosure" } },
  { icon: ShieldCheck, title: "Honest numbers", text: "Anything illustrative is labeled illustrative. Market data is marked Live only when it comes from a data provider." },
];

/** Product-transparency section. Deliberately has no invented statistics, ratings or regulatory claims. */
export function TrustTransparency() {
  return (
    <section aria-labelledby="trust-title" className="pt-16 sm:pt-24">
      <Container>
        <SectionHeader id="trust-title" title="Transparency by design" intro="Trust is earned with clear terms and honest reporting, so that is what we put first." />

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text, link }) => (
            <li key={title} className="flex min-w-0 flex-col rounded-lg border border-line bg-bg-raised p-5">
              <Icon aria-hidden size={22} className="text-accent-text" />
              <h3 className="mt-4 text-base font-semibold">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{text}</p>
              {link && (
                <Link href={link.href} className="mt-4 inline-block py-1 text-sm font-medium text-accent-text underline-offset-4 hover:underline">
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-lg border border-line-strong bg-bg-sunken p-5 text-sm leading-relaxed text-fg-muted">
          <p className="font-medium text-fg">What you won&rsquo;t find here</p>
          <p className="mt-2">
            Invented customer counts, payout totals, ratings or regulatory claims. Verified trust indicators belong in this space once they
            exist and can be checked.
          </p>
        </div>
      </Container>
    </section>
  );
}
