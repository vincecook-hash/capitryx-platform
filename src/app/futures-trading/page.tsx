import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CategoryPage } from "@/components/sections/CategoryPage";
import { categoryPages } from "@/config/category-pages";

export const metadata: Metadata = pageMetadata({ title: "Futures Trading", description: categoryPages.futures.metaDescription, path: "/futures-trading" });

export default function FuturesTradingPage() {
  return <CategoryPage category="futures" />;
}
