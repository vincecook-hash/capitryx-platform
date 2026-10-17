"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main id="main" className="mx-auto max-w-xl px-4 py-24">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <button onClick={reset} className="mt-6 rounded bg-accent px-4 py-2 text-accent-fg">Try again</button>
    </main>
  );
}
