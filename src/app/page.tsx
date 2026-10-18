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
import { getTestimonials } from "@/lib/testimonials";

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
