import type { Metadata } from "next";
import { CategoryPage } from "@/components/sections/CategoryPage";
import { categoryPages } from "@/config/category-pages";

export const metadata: Metadata = { title: "Spot Trading", description: categoryPages.spot.metaDescription };

export default function SpotTradingPage() {
  return <CategoryPage category="spot" />;
}
