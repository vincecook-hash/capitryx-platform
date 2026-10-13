import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: "Crypto spot and futures trader evaluations built around transparent rules and risk management.",
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
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
