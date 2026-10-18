"use client";

import { useEffect, useState } from "react";
import type { MarketSnapshot } from "@/types/market";

/**
 * Keeps market data fresh: refreshes once on load (so a page built earlier never shows stale numbers),
 * then every minute while open, and again when the tab becomes visible. It calls our own /api/market,
 * which is cached server-side, so this does not multiply provider API calls. Starts from the
 * server-rendered snapshot.
 */
export function useMarketSnapshot(initial: MarketSnapshot, intervalMs = 60_000): MarketSnapshot {
  const [snapshot, setSnapshot] = useState(initial);

  useEffect(() => {
    let cancelled = false;
    const refresh = async () => {
      if (document.visibilityState !== "visible") return;
      try {
        const res = await fetch("/api/market", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as MarketSnapshot;
        if (!cancelled) setSnapshot(data);
      } catch {
        /* keep showing the last good snapshot */
      }
    };
    void refresh();
    const timer = setInterval(refresh, intervalMs);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      cancelled = true;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [intervalMs]);

  return snapshot;
}
