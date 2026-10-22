import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CategoryPage } from "@/components/sections/CategoryPage";
import { categoryPages } from "@/config/category-pages";

export const metadata: Metadata = pageMetadata({ title: "Spot Trading", description: categoryPages.spot.metaDescription, path: "/spot-trading" });

export default function SpotTradingPage() {
  return <CategoryPage category="spot" />;
}
