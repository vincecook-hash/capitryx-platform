export const siteConfig = {
  name: "Capitryx",
  tagline: "Trade Crypto. Prove Your Edge.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  supportEmail: "support@example.com", // TODO(owner): confirm
  nav: [
    { label: "Trading Programs", href: "/programs" },
    { label: "Spot Trading", href: "/spot-trading" },
    { label: "Futures Trading", href: "/futures-trading" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Trading Rules", href: "/trading-rules" },
    { label: "FAQ", href: "/faq" },
  ],
  footerLegal: [
    { label: "Terms and Conditions", href: "/legal/terms" },
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Refund Policy", href: "/legal/refund-policy" },
    { label: "Risk Disclosure", href: "/legal/risk-disclosure" },
  ],
} as const;
