import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
const paths = ["", "/programs", "/spot-trading", "/futures-trading", "/how-it-works", "/trading-rules", "/faq", "/about", "/contact"];
export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${siteConfig.url}${p}` }));
}
