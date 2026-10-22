import type { MetadataRoute } from "next";
import { buildRobots, isProductionSite } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return buildRobots(isProductionSite);
}
