/** Organization + WebSite structured data. Contains only facts that exist: name, URL and logo. No ratings, addresses or profiles. */
export function siteJsonLd(siteUrl: string, name: string) {
  const base = siteUrl.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${base}/#organization`, name, url: base, logo: `${base}/brand/logo-mark.png` },
      { "@type": "WebSite", "@id": `${base}/#website`, name, url: base, publisher: { "@id": `${base}/#organization` } },
    ],
  };
}

/** Safe to place inside a <script> tag: "<" is escaped so the data can never close the tag early. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
