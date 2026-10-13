export function PagePlaceholder({ title }: { title: string }) {
  return (
    <main id="main" className="mx-auto max-w-5xl px-4 py-24">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="mt-4 text-fg-muted">Page scaffold. Content is built in a later step.</p>
    </main>
  );
}
