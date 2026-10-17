export const siteConfig = {
  name: "Capitryx",
  tagline: "Trade Crypto. Prove Your Edge.",
  brandTagline: "Capital Meets Capability.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  supportEmail: "support@example.com", // TODO(owner): confirm
  primaryCta: { label: "Get Started", href: "/programs" },
  nav: [
    { label: "Trading Programs", href: "/programs" },
    { label: "Spot Trading", href: "/spot-trading" },
    { label: "Futures Trading", href: "/futures-trading" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Trading Rules", href: "/trading-rules" },
    { label: "FAQ", href: "/faq" },
  ],
  footerColumns: [
    {
      title: "Company",
      links: [
        { label: "About Capitryx", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Programs",
      links: [
        { label: "Trading Programs", href: "/programs" },
        { label: "Spot Trading", href: "/spot-trading" },
        { label: "Futures Trading", href: "/futures-trading" },
        { label: "How It Works", href: "/how-it-works" },
        { label: "Trading Rules", href: "/trading-rules" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms and Conditions", href: "/legal/terms" },
        { label: "Privacy Policy", href: "/legal/privacy" },
        { label: "Refund Policy", href: "/legal/refund-policy" },
        { label: "Risk Disclosure", href: "/legal/risk-disclosure" },
      ],
    },
  ],
  riskNotice:
    "Trading cryptocurrencies and derivatives involves a high risk of loss. Nothing on this site is financial advice. " +
    "Programs, prices, rules and market figures shown are illustrative demonstration content and may change before launch.",
} as const;
