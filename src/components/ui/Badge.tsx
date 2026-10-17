import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "demo" | "gain" | "loss";

const tones: Record<Tone, string> = {
  neutral: "border-line-strong text-fg-muted",
  accent: "border-accent/50 text-accent-text",
  demo: "border-amber-400/40 text-amber-300",
  gain: "border-gain/40 text-gain",
  loss: "border-loss/40 text-loss",
};

/** Always carries a text label, so meaning never depends on color alone. */
export function Badge({ tone = "neutral", className, children }: { tone?: Tone; className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", tones[tone], className)}>
      {children}
    </span>
  );
}
