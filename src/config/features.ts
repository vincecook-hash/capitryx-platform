/**
 * "Why Capitryx" cards. Honest status labels:
 *  - "preview": demonstrated on this site with sample data, not a live service
 *  - "planned": on the roadmap, not available yet
 * Change a status only when the feature actually exists and has been verified.
 */
export type FeatureStatus = "preview" | "planned";
export type FeatureIcon = "requirements" | "rules" | "tracking" | "markets" | "risk" | "reporting" | "education" | "support";

export interface Feature {
  id: string;
  icon: FeatureIcon;
  title: string;
  text: string;
  status: FeatureStatus;
}

export const features: Feature[] = [
  { id: "requirements", icon: "requirements", status: "preview", title: "Clear evaluation requirements", text: "Each program lists its profit targets, minimum trading days and time limits before you pay." },
  { id: "rules", icon: "rules", status: "preview", title: "Transparent trading rules", text: "Spot and futures have separate rule sets, with every limit and fee written out in plain language." },
  { id: "risk", icon: "risk", status: "preview", title: "Risk-management analytics", text: "Daily and maximum drawdown are calculated from stated formulas and shown as usage against each limit." },
  { id: "tracking", icon: "tracking", status: "planned", title: "Structured performance tracking", text: "A dashboard for balance, equity, open positions and progress toward your target." },
  { id: "markets", icon: "markets", status: "planned", title: "Crypto-native market support", text: "A broad pair list from majors to higher-volatility coins, with perpetual contracts where offered." },
  { id: "reporting", icon: "reporting", status: "planned", title: "Detailed progress reporting", text: "Clear records of what counted toward your targets and limits, trade by trade." },
  { id: "education", icon: "education", status: "planned", title: "Accessible educational resources", text: "Guides that explain the rules, the drawdown maths and the risks of each market." },
  { id: "support", icon: "support", status: "planned", title: "Professional customer support", text: "A real way to ask questions about your evaluation and get an answer." },
];
