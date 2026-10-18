import type { Metadata } from "next";
import { EvaluationModel } from "@/components/sections/EvaluationModel";
import { FinalCta } from "@/components/sections/FinalCta";
import { HowItWorks } from "@/components/sections/HowItWorks";

export const metadata: Metadata = {
  title: "How It Works",
  description: "How a Capitryx evaluation works in four steps, what you purchase, and what passing does and does not mean.",
};

export default function HowItWorksPage() {
  return (
    <main id="main">
      <HowItWorks asPage />
      <EvaluationModel />
      <FinalCta />
    </main>
  );
}
