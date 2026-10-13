import { Logo } from "@/components/brand/Logo";

export function PagePlaceholder({ title }: { title: string }) {
  return (
    <main id="main" className="mx-auto max-w-5xl px-4 py-24">
      <Logo variant="horizontal" height={40} priority />
      <h1 className="mt-10 text-3xl font-semibold">{title}</h1>
      <p className="mt-4 text-fg-muted">Page scaffold. Content is built in a later step.</p>
    </main>
  );
}
