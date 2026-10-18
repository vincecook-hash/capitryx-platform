import type { Metadata } from "next";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about Capitryx crypto spot and futures evaluations: what you purchase, drawdown rules, fees, leverage and more.",
};

export default function FaqPage() {
  return (
    <main id="main">
      <FaqAccordion asPage />
      <FinalCta />
    </main>
  );
}
