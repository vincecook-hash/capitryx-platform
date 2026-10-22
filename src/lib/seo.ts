import type { Metadata, MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * True only when a real production URL is configured (NEXT_PUBLIC_SITE_URL).
 * Without it the site tells search engines to stay away, so a staging or preview copy is never indexed by accident.
 */
export const isProductionSite = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

const OG_IMAGE = { url: "/brand/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} logo` };

interface PageSeo {
  /** Page title, or `{ absolute }` to skip the "| Capitryx" suffix (used by the home page). */
  title: string | { absolute: string };
  description: string;
  /** Path of the page, e.g. "/programs". Used for the canonical URL and the share link. */
  path: string;
}

/** Title, description, canonical URL, Open Graph and Twitter card for one page. */
export function pageMetadata({ title, description, path }: PageSeo, prod: boolean = isProductionSite): Metadata {
  const shareTitle = typeof title === "string" ? `${title} | ${siteConfig.name}` : title.absolute;
  return {
    title,
    description,
    // A canonical URL is only meaningful once the production domain is known.
    ...(prod ? { alternates: { canonical: path } } : {}),
    openGraph: { title: shareTitle, description, url: path, type: "website", siteName: siteConfig.name, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [OG_IMAGE.url] },
  };
}

export function buildRobots(prod: boolean, siteUrl: string = siteConfig.url): MetadataRoute.Robots {
  if (!prod) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/checkout"] }, sitemap: `${siteUrl}/sitemap.xml` };
}
