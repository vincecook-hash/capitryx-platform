import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { siteJsonLd, serializeJsonLd } from "@/lib/jsonld";
import { isProductionSite } from "@/lib/seo";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Self-hosted variable fonts (Latin subset). next/font preloads them and adds a size-matched fallback, so text
// does not jump when the font arrives.
const inter = localFont({ src: "./fonts/inter-latin-wght-normal.woff2", variable: "--font-inter", display: "swap", weight: "100 900" });
const mono = localFont({ src: "./fonts/jetbrains-mono-latin-wght-normal.woff2", variable: "--font-jetbrains", display: "swap", weight: "100 800" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: "Crypto spot and futures trader evaluations built around transparent rules and risk management.",
  // Keep unfinished staging copies out of search results until a production URL is configured.
  ...(isProductionSite ? {} : { robots: { index: false, follow: false } }),
  twitter: { card: "summary_large_image" },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.tagline,
    type: "website",
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630, alt: `${siteConfig.name} logo` }],
  },
};
export const viewport: Viewport = { themeColor: "#060b16" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        {isProductionSite && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteJsonLd(siteConfig.url, siteConfig.name)) }} />
        )}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
        >
          Skip to main content
        </a>
        <AnnouncementBar />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
