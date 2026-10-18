import { describe, it, expect, vi } from "vitest";
import fixture from "../fixtures/cmc-quotes.json";
import { assets, type CatalogAsset } from "@/config/assets";
import { createCoinMarketCapProvider, parseCmcQuotes } from "@/server/market-data/coinmarketcap";
import { buildDemoSnapshot } from "@/server/market-data/demo";
import { formatCompactUsd, formatQuotePrice } from "@/lib/utils";

const pick = (...symbols: string[]): CatalogAsset[] => assets.filter((a) => symbols.includes(a.symbol));

describe("parseCmcQuotes", () => {
  const quotes = parseCmcQuotes(fixture, pick("BTC", "WIF", "ETH", "SOL", "XRP", "DOGE"));

  it("maps price, 24h change, market cap and rank", () => {
    expect(quotes.BTC).toMatchObject({ symbol: "BTC", rank: 1, priceUsd: 70123.45, change24hPct: -1.25, marketCapUsd: 1.38e12 });
  });

  it("chooses the best-ranked token when a ticker is shared", () => {
    expect(quotes.WIF?.priceUsd).toBe(1.9);
    expect(quotes.WIF?.rank).toBe(140);
  });

  it("honours a pinned cmcId", () => {
    const pinned: CatalogAsset[] = pick("WIF").map((a) => ({ ...a, cmcId: 99999 }));
    expect(parseCmcQuotes(fixture, pinned).WIF?.priceUsd).toBe(0.0001);
  });

  it("accepts the older single-object shape and null change values", () => {
    expect(quotes.ETH).toMatchObject({ priceUsd: 3500, change24hPct: null });
  });

  it("skips entries with no price, malformed entries and missing symbols", () => {
    expect(quotes.SOL).toBeUndefined();
    expect(quotes.XRP).toBeUndefined();
    expect(quotes.DOGE).toBeUndefined();
  });

  it("returns nothing for an unusable response", () => {
    expect(parseCmcQuotes(null, pick("BTC"))).toEqual({});
    expect(parseCmcQuotes({ data: 5 }, pick("BTC"))).toEqual({});
  });
});

describe("createCoinMarketCapProvider", () => {
  it("calls the quotes endpoint with the key in a header only", async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify(fixture), { status: 200 })) as unknown as typeof fetch;
    const quotes = await createCoinMarketCapProvider("SECRET-KEY", { fetchImpl }).fetchQuotes(pick("BTC", "ETH"));
    const [url, init] = (fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/v2/cryptocurrency/quotes/latest?symbol=BTC,ETH");
    expect(url).not.toContain("SECRET-KEY");
    expect((init.headers as Record<string, string>)["X-CMC_PRO_API_KEY"]).toBe("SECRET-KEY");
    expect(quotes.BTC?.priceUsd).toBe(70123.45);
  });

  it("throws on a failed request without leaking the key", async () => {
    const fetchImpl = vi.fn(async () => new Response("nope", { status: 401 })) as unknown as typeof fetch;
    await expect(createCoinMarketCapProvider("SECRET-KEY", { fetchImpl }).fetchQuotes(pick("BTC"))).rejects.toThrow(/status 401/);
    await createCoinMarketCapProvider("SECRET-KEY", { fetchImpl }).fetchQuotes(pick("BTC")).catch((e: Error) => {
      expect(e.message).not.toContain("SECRET-KEY");
    });
  });
});

describe("demo snapshot", () => {
  it("is labeled illustrative, never live", () => {
    const s = buildDemoSnapshot();
    expect(s.mode).toBe("illustrative");
    expect(s.source).toBe("Illustrative");
  });
  it("ranks demo assets by market cap and carries a notice when given", () => {
    const s = buildDemoSnapshot("down");
    expect(s.quotes.BTC?.rank).toBe(1);
    expect(s.notice).toBe("down");
  });
});

describe("price formatting", () => {
  it("scales precision to the price", () => {
    expect(formatQuotePrice(64943.5)).toBe("64,943.50");
    expect(formatQuotePrice(0.52)).toBe("0.5200");
    expect(formatQuotePrice(0.0000175)).toBe("0.0000175");
  });
  it("compacts market caps", () => {
    expect(formatCompactUsd(1.28e12)).toBe("$1.28T");
  });
});
