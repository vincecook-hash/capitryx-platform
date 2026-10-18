import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Testimonial } from "@/lib/testimonials";

/**
 * Reusable review section. Renders nothing when there are no items, so the page never shows an empty
 * or invented section. Sample items carry a visible "Sample content" label and never reach production.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="reviews-title" className="pt-16 sm:pt-24">
      <Container>
        <SectionHeader id="reviews-title" title="What traders say" />
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <li key={t.id} className="min-w-0 rounded-lg border border-line bg-bg-raised p-5">
              <figure>
                {t.sample && <Badge tone="demo" className="mb-3">Sample content, not a real customer</Badge>}
                <blockquote className="text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-medium">{t.name}</span>
                  {t.role && <span className="text-fg-muted">, {t.role}</span>}
                  {t.verified && <Badge tone="gain" className="ml-2">Verified</Badge>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
