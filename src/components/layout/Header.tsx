import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label={`${siteConfig.name} home`} className="shrink-0">
          <Logo variant="horizontal" height={30} priority />
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/login" variant="ghost" className="hidden xl:inline-flex">
            Login
          </ButtonLink>
          <ButtonLink href={siteConfig.primaryCta.href} size="sm">
            {siteConfig.primaryCta.label}
          </ButtonLink>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
