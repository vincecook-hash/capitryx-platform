import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqItems } from "@/config/faq";

export function FaqAccordion({ limit, asPage = false }: { limit?: number; asPage?: boolean }) {
  const shown = limit ? faqItems.slice(0, limit) : faqItems;
  const pending = faqItems.filter((f) => f.needsOwnerReview).length;

  const items: AccordionItem[] = shown.map((f) => ({
    id: f.id,
    title: f.question,
    content: (
      <div className="space-y-3 text-sm leading-relaxed text-fg-muted">
        <p>{f.answer}</p>
        {f.needsOwnerReview && <Badge tone="demo">Pending owner review</Badge>}
        {f.link && (
          <p>
            <Link href={f.link.href} className="font-medium text-accent-text underline-offset-4 hover:underline">
              {f.link.label}
            </Link>
          </p>
        )}
      </div>
    ),
  }));

  return (
    <section aria-labelledby="faq-title" id="faq" className={asPage ? "pt-10 sm:pt-14" : "pt-16 sm:pt-24"}>
      <Container>
        <SectionHeader
          id="faq-title"
          level={asPage ? 1 : 2}
          title="Frequently asked questions"
          intro={
            asPage
              ? `Answers reflect the current demonstration setup. ${pending} of ${faqItems.length} depend on business decisions that are not final, and are marked "Pending owner review".`
              : "Straight answers about how evaluations work, including what is not decided yet."
          }
        />
        <div className="mt-8 max-w-3xl">
          <Accordion items={items} idPrefix={asPage ? "faq-page" : "faq-home"} headingLevel={asPage ? 2 : 3} />
          {limit && faqItems.length > limit && (
            <p className="mt-5">
              <Link href="/faq" className="font-medium text-accent-text underline-offset-4 hover:underline">
                View all {faqItems.length} questions
              </Link>
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
