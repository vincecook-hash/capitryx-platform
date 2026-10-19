import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { LegalDoc } from "@/config/legal";
import { splitPlaceholders } from "@/lib/legal";
import { LegalDraftBanner } from "./LegalDraftBanner";

function Paragraph({ text }: { text: string }) {
  return (
    <p className="mt-3 leading-relaxed text-fg-muted">
      {splitPlaceholders(text).map((part, i) =>
        part.placeholder ? (
          <mark key={i} className="rounded bg-amber-400/20 px-1 text-amber-200">
            {part.text}
          </mark>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </p>
  );
}

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <main id="main">
      <Container className="py-10 sm:py-14">
        <article className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{doc.title}</h1>
          <LegalDraftBanner />

          <nav aria-label="Contents" className="mt-8">
            <p className="text-xs font-medium uppercase tracking-wide text-fg-muted">Contents</p>
            <ol className="mt-3 space-y-1 text-sm">
              {doc.sections.map((s, i) => (
                <li key={s.id}>
                  <Link href={`#${s.id}`} className="inline-flex min-h-9 items-center text-accent-text underline-offset-4 hover:underline">
                    {i + 1}. {s.title}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          {doc.sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="mt-10 scroll-mt-24">
              <h2 id={`${s.id}-title`} className="text-xl font-semibold tracking-tight">
                {i + 1}. {s.title}
              </h2>
              {s.paragraphs.map((p, j) => (
                <Paragraph key={j} text={p} />
              ))}
            </section>
          ))}
        </article>
      </Container>
    </main>
  );
}
