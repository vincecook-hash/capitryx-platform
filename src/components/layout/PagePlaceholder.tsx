import { Container } from "@/components/ui/Container";

export function PagePlaceholder({ title }: { title: string }) {
  return (
    <main id="main">
      <Container className="py-24">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-4 text-fg-muted">Page scaffold. Content is built in a later step.</p>
      </Container>
    </main>
  );
}
