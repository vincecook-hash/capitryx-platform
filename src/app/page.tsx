import { EvaluationModel } from "@/components/sections/EvaluationModel";
import { Hero } from "@/components/sections/Hero";
import { MarketSnapshot } from "@/components/sections/MarketSnapshot";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <MarketSnapshot />
      <EvaluationModel />
    </main>
  );
}
