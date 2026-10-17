import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-bg-sunken">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <Link href="/" aria-label={`${siteConfig.name} home`}>
              <Logo variant="horizontal" height={30} />
            </Link>
            <p className="mt-4 text-sm font-medium text-silver">{siteConfig.brandTagline}</p>
          </div>

          {siteConfig.footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-semibold text-fg">{col.title}</h2>
              <ul className="mt-4 space-y-1">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-block py-1.5 text-sm text-fg-muted transition-colors ease-cx hover:text-fg">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="max-w-4xl text-xs leading-relaxed text-fg-muted">{siteConfig.riskNotice}</p>
          <p className="mt-4 text-xs text-fg-muted">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
