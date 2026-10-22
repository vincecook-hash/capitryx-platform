import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main id="main">
      <Container className="py-24">
        <div className="max-w-xl">
          <p className="tabular font-mono text-sm text-accent-text">404</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Page not found</h1>
          <p className="mt-3 text-fg-muted">That page does not exist or has moved. Here are some useful places to start.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/">Go to the home page</ButtonLink>
            <ButtonLink href="/programs" variant="secondary">Explore Trading Programs</ButtonLink>
          </div>
        </div>
      </Container>
    </main>
  );
}
