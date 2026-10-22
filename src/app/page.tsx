import type { Metadata } from "next";
import { EvaluationModel } from "@/components/sections/EvaluationModel";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MarketSnapshot } from "@/components/sections/MarketSnapshot";
import { SpotFuturesComparison } from "@/components/sections/SpotFuturesComparison";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustTransparency } from "@/components/sections/TrustTransparency";
import { WhyCapitryx } from "@/components/sections/WhyCapitryx";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { getTestimonials } from "@/lib/testimonials";

export const metadata: Metadata = pageMetadata({
  title: { absolute: `${siteConfig.name} | ${siteConfig.tagline}` },
  description: "Crypto spot and futures trader evaluations built around transparent rules and risk management.",
  path: "/",
});

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <MarketSnapshot />
      <WhyCapitryx />
      <HowItWorks />
      <EvaluationModel />
      <SpotFuturesComparison />
      <TrustTransparency />
      <Testimonials items={getTestimonials()} />
      <FaqAccordion limit={6} />
      <FinalCta />
    </main>
  );
}
