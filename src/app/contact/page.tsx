import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/checkout/ContactForm";
import { Container } from "@/components/ui/Container";
import { getContactSink } from "@/server/contact";

export const metadata: Metadata = pageMetadata({ title: "Contact", description: "Contact Capitryx with a question about evaluation programs.", path: "/contact" });

export default function ContactPage() {
  const enabled = getContactSink() !== null;
  return (
    <main id="main">
      <Container className="py-10 sm:py-14">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Contact</h1>
        <p className="mt-3 max-w-2xl text-fg-muted">Have a question about a program or how an evaluation works? Send us a message.</p>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <section aria-labelledby="form-title" className="min-w-0 rounded-lg border border-line bg-bg-raised p-5 sm:p-6">
            <h2 id="form-title" className="text-lg font-semibold">Send a message</h2>
            <div className="mt-5">
              <ContactForm enabled={enabled} />
            </div>
          </section>

          <aside aria-labelledby="support-title" className="min-w-0 rounded-lg border border-line bg-bg-raised p-5">
            <h2 id="support-title" className="text-base font-semibold">Support channels</h2>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              Email, chat and any other support channels have not been set up yet. They will be listed here once they are confirmed.
            </p>
          </aside>
        </div>
      </Container>
    </main>
  );
}
