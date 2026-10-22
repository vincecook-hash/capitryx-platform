const isProd = process.env.NODE_ENV === "production";

// Content Security Policy (production only; the dev server needs eval). 'unsafe-inline' is required for Next's
// inline bootstrap scripts and React inline styles; a nonce-based policy would force every page to render dynamically.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Always send title/description in <head> (instead of streaming them after the page), so crawlers,
  // link previews and Lighthouse see them on dynamic pages such as /programs and /trading-rules.
  htmlLimitedBots: /.*/,
  images: { formats: ["image/avif", "image/webp"] },
  // Inline the small stylesheet so first paint does not wait for a separate CSS request.
  experimental: { inlineCss: true },
  async headers() {
    const common = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    const prodOnly = isProd
      ? [
          { key: "Content-Security-Policy", value: csp },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ]
      : [];
    return [{ source: "/(.*)", headers: [...common, ...prodOnly] }];
  },
};
export default nextConfig;
