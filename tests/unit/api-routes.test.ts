import { describe, it, expect } from "vitest";
import { POST as checkout } from "@/app/api/checkout/route";
import { POST as contact } from "@/app/api/contact/route";

let n = 0;
const req = (path: string, body: unknown, ip = `10.0.0.${++n}`) =>
  new Request(`http://localhost${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

describe("POST /api/checkout", () => {
  const ok = { programId: "spot-5k", email: "a@b.co", acceptedTerms: true };

  it("fails closed with 503 while no payment provider exists", async () => {
    expect((await checkout(req("/api/checkout", ok))).status).toBe(503);
  });
  it("rejects invalid input with 400", async () => {
    expect((await checkout(req("/api/checkout", { ...ok, email: "nope" }))).status).toBe(400);
    expect((await checkout(req("/api/checkout", { ...ok, acceptedTerms: false }))).status).toBe(400);
    expect((await checkout(req("/api/checkout", "not json"))).status).toBe(400);
  });
  it("rejects unknown programs with 404", async () => {
    expect((await checkout(req("/api/checkout", { ...ok, programId: "hacked" }))).status).toBe(404);
  });
  it("ignores a client-supplied price (no price field is ever read)", async () => {
    expect((await checkout(req("/api/checkout", { ...ok, price: 1, totalUsd: 1 }))).status).toBe(503);
  });
  it("rate limits repeated requests from one address", async () => {
    const ip = "203.0.113.9";
    const statuses: number[] = [];
    for (let i = 0; i < 12; i++) statuses.push((await checkout(req("/api/checkout", ok, ip))).status);
    expect(statuses.slice(0, 10).every((s) => s === 503)).toBe(true);
    expect(statuses[11]).toBe(429);
  });
});

describe("POST /api/contact", () => {
  const ok = { name: "Sam", email: "sam@example.com", message: "Hello, I have a question.", acceptedPrivacy: true };

  it("returns 503 while no message destination is configured", async () => {
    expect((await contact(req("/api/contact", ok))).status).toBe(503);
  });
  it("validates every field", async () => {
    for (const bad of [{ ...ok, name: "" }, { ...ok, email: "x" }, { ...ok, message: "short" }, { ...ok, acceptedPrivacy: false }, { ...ok, message: "x".repeat(2001) }]) {
      expect((await contact(req("/api/contact", bad))).status).toBe(400);
    }
  });
  it("silently drops honeypot submissions without delivering anything", async () => {
    const res = await contact(req("/api/contact", { ...ok, company: "Acme Bots" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
  it("rate limits at 5 requests per window", async () => {
    const ip = "198.51.100.7";
    const statuses: number[] = [];
    for (let i = 0; i < 7; i++) statuses.push((await contact(req("/api/contact", ok, ip))).status);
    expect(statuses[5]).toBe(429);
  });
});
