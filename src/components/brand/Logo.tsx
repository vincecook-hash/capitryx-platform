import Image from "next/image";
import { siteConfig } from "@/config/site";

type Variant = "horizontal" | "mark" | "full";

const assets = {
  horizontal: { src: "/brand/logo-horizontal.png", width: 900, height: 224 },
  mark: { src: "/brand/logo-mark.png", width: 483, height: 505 },
  full: { src: "/brand/logo-full.png", width: 900, height: 668 },
} as const;

/** Official Capitryx logo. Use `horizontal` in the header, `mark` for compact spots. */
export function Logo({ variant = "horizontal", height = 36, priority = false }: { variant?: Variant; height?: number; priority?: boolean }) {
  const a = assets[variant];
  return (
    <Image
      src={a.src}
      alt={`${siteConfig.name} logo`}
      width={Math.round((a.width / a.height) * height)}
      height={height}
      priority={priority}
      style={{ height, width: "auto" }}
    />
  );
}
