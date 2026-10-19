import type { Metadata } from "next";
import { CategoryPage } from "@/components/sections/CategoryPage";
import { categoryPages } from "@/config/category-pages";

export const metadata: Metadata = { title: "Futures Trading", description: categoryPages.futures.metaDescription };

export default function FuturesTradingPage() {
  return <CategoryPage category="futures" />;
}
