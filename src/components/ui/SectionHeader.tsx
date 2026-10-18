import { cn } from "@/lib/utils";

/** Consistent section title block. Use level 1 only on the page's main heading. */
export function SectionHeader({ id, title, intro, level = 2, className }: { id: string; title: string; intro?: React.ReactNode; level?: 1 | 2; className?: string }) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className={cn("max-w-3xl", className)}>
      <Heading id={id} className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </Heading>
      {intro && <p className="mt-3 leading-relaxed text-fg-muted">{intro}</p>}
    </div>
  );
}
