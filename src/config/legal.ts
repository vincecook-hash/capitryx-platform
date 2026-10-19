/**
 * DRAFT legal documents. NOT reviewed by a lawyer and NOT in force.
 * Anything in [square brackets] is a placeholder that must be completed or replaced before launch.
 * Jurisdiction-specific points (eligible countries, consumer rights, data-protection law) need qualified review.
 */
export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface LegalDoc {
  slug: "terms" | "privacy" | "refund-policy" | "risk-disclosure";
  title: string;
  description: string;
  sections: LegalSection[];
}

export const LEGAL_STATUS = "draft_requires_legal_review" as const;

export const legalDocs: Record<LegalDoc["slug"], LegalDoc> = {
  terms: {
    slug: "terms",
    title: "Terms and Conditions",
    description: "Draft terms for Capitryx evaluation programs. Not yet reviewed or in force.",
    sections: [
      { id: "about", title: "About these terms", paragraphs: [
        "These draft terms would govern the use of the Capitryx website and evaluation programs, operated by [Company legal name] ('Capitryx', 'we', 'us').",
        "They are a starting template for legal review and are not in force.",
      ] },
      { id: "services", title: "What we offer", paragraphs: [
        "Capitryx offers evaluation programs that measure a trader's results against published criteria. Buying an evaluation gives you an evaluation attempt for the program you chose.",
        "It does not give you a funded live account. The evaluation size shown on a program is a notional figure, not money deposited into your account.",
      ] },
      { id: "environment", title: "Trading environment", paragraphs: ["Evaluations take place in a [simulated or live: to be confirmed] trading environment."] },
      { id: "eligibility", title: "Eligibility", paragraphs: [
        "You must be at least [minimum age] years old and live in a country where we offer programs: [list of eligible countries].",
        "We may ask you to verify your identity before any reward or later program stage: [verification requirements].",
      ] },
      { id: "fees", title: "Prices and payment", paragraphs: [
        "Evaluation prices are shown before you pay. Payments are processed by [payment provider].",
        "An order is confirmed only after the payment provider confirms the payment to us.",
      ] },
      { id: "rules", title: "Evaluation rules and conduct", paragraphs: [
        "The trading rules for your program apply to your evaluation, including loss limits, fees and prohibited conduct, as published on the Trading Rules page when you buy.",
      ] },
      { id: "rewards", title: "Results, rewards and payouts", paragraphs: [
        "Passing an evaluation does not guarantee any reward, payout or capital allocation.",
        "[Reward and payout terms: eligibility, schedule and conditions to be confirmed.]",
      ] },
      { id: "risk", title: "Risk", paragraphs: [
        "Trading cryptocurrencies and derivatives involves a high risk of loss. Please read the Risk Disclosure. Nothing on our site is financial, investment or legal advice.",
      ] },
      { id: "refunds", title: "Refunds", paragraphs: ["Refunds are covered by the Refund Policy: [to be completed]."] },
      { id: "termination", title: "Suspension and termination", paragraphs: [
        "We may suspend or end access if these terms or the trading rules are broken: [process and notice terms to be drafted by counsel].",
      ] },
      { id: "liability", title: "Limits on liability", paragraphs: ["[Limitation of liability wording to be drafted by qualified counsel.]"] },
      { id: "changes", title: "Changes to these terms", paragraphs: ["[How and when these terms can change, and how you will be told.]"] },
      { id: "law", title: "Governing law", paragraphs: ["[Governing law and where disputes are heard.]"] },
      { id: "contact", title: "Contact", paragraphs: ["[Company legal name, registered address and contact details.]"] },
    ],
  },

  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    description: "Draft privacy policy for the Capitryx website. Not yet reviewed or in force.",
    sections: [
      { id: "who", title: "Who we are", paragraphs: ["[Company legal name], [registered address], is responsible for your personal data. Contact: [privacy contact]."] },
      { id: "collect", title: "What we collect", paragraphs: [
        "At checkout: your email address and details of your order.",
        "When you contact us: your name, email address and message.",
        "Technical data created when you visit, such as your IP address and browser type, which our hosting provider may log for security and reliability.",
        "We do not ask for more than we need. [Confirm against the final product before launch.]",
      ] },
      { id: "cookies", title: "Cookies and analytics", paragraphs: [
        "At the time of drafting, this site does not set analytics or advertising cookies. [Verify before launch and update if that changes.]",
      ] },
      { id: "use", title: "How we use your data", paragraphs: [
        "To process your order, run your evaluation, answer your messages, keep the service secure and meet legal obligations. [Add any other purposes.]",
      ] },
      { id: "basis", title: "Legal basis", paragraphs: ["[Legal bases for each purpose, as required in the countries we serve.]"] },
      { id: "sharing", title: "Who we share it with", paragraphs: [
        "Service providers that help us operate: payment provider [name], hosting provider [name], [email or support provider].",
        "Market data providers do not receive your personal data.",
      ] },
      { id: "payments", title: "Payment details", paragraphs: ["Payment details are handled by the payment provider and are not collected by this site."] },
      { id: "transfers", title: "International transfers", paragraphs: ["[Where data is processed and the safeguards used.]"] },
      { id: "retention", title: "How long we keep it", paragraphs: ["[Retention periods for each type of data.]"] },
      { id: "rights", title: "Your rights", paragraphs: ["[Your rights to access, correct, delete and object, and how to use them, as required by local law.]"] },
      { id: "children", title: "Children", paragraphs: ["Our services are not for anyone under [minimum age]."] },
      { id: "changes", title: "Changes", paragraphs: ["[How we will tell you about changes to this policy.]"] },
    ],
  },

  "refund-policy": {
    slug: "refund-policy",
    title: "Refund Policy",
    description: "Draft refund policy outline for Capitryx. The policy has not been decided yet.",
    sections: [
      { id: "status", title: "Status", paragraphs: [
        "A refund policy has not been decided yet. This page lists what the final policy needs to state so it can be completed before launch.",
      ] },
      { id: "window", title: "Eligibility window", paragraphs: ["[How long after purchase a refund can be requested, if at all.]"] },
      { id: "conditions", title: "Conditions", paragraphs: [
        "[Conditions that must be met, for example whether any trading has started or any rule has been breached.]",
      ] },
      { id: "how", title: "How to ask for a refund", paragraphs: ["[Where to send a request and what information to include.]"] },
      { id: "payment", title: "How refunds are paid", paragraphs: [
        "[Method, timing and currency, including how refunds work for each supported payment method and for cryptocurrency payments if enabled.]",
      ] },
      { id: "exclusions", title: "Exclusions and abuse", paragraphs: ["[Cases where a refund is not available, such as fraud or breaches of the terms.]"] },
      { id: "disputes", title: "Chargebacks and disputes", paragraphs: ["[What happens if a payment is disputed with the card issuer or payment provider.]"] },
      { id: "retries", title: "Retries and discounts", paragraphs: ["[How refunds interact with any retry discount or repeat purchase.]"] },
      { id: "law", title: "Your legal rights", paragraphs: ["[Statutory consumer rights in the countries we serve, which this policy does not limit.]"] },
    ],
  },

  "risk-disclosure": {
    slug: "risk-disclosure",
    title: "Risk Disclosure",
    description: "Draft risk disclosure for crypto and derivatives trading evaluations. Not yet reviewed by counsel.",
    sections: [
      { id: "general", title: "Trading carries a high risk of loss", paragraphs: [
        "Trading cryptocurrencies and derivatives involves a high risk of loss. Prices can fall as quickly as they rise, and you can lose everything you put at risk. Only take part if you understand these risks.",
      ] },
      { id: "volatility", title: "Volatility and liquidity", paragraphs: [
        "Crypto prices can move sharply in minutes. In fast markets, prices you see may not be the prices you get, and it may be hard to enter or exit a position.",
      ] },
      { id: "leverage", title: "Leverage and liquidation (futures)", paragraphs: [
        "Leverage magnifies losses as well as gains. A small move against a leveraged position can lose most or all of its value, and the position can be closed automatically at its liquidation price.",
      ] },
      { id: "funding", title: "Funding costs (perpetual contracts)", paragraphs: [
        "Perpetual contracts can carry funding payments that you may have to pay while you hold a position. They can change and they reduce your results.",
      ] },
      { id: "volatile-coins", title: "High-volatility and meme coins", paragraphs: [
        "Smaller and meme coins can fall to a fraction of their price very quickly, often with thin liquidity. Listing a coin on Capitryx is not a recommendation to trade it.",
      ] },
      { id: "fees", title: "Fees", paragraphs: ["Trading fees and funding costs reduce your results and count toward your loss limits."] },
      { id: "technology", title: "Technology and data", paragraphs: [
        "Outages, delays and errors can happen in trading platforms and market data. Figures labeled illustrative on this site are not real prices.",
      ] },
      { id: "evaluation", title: "Risks specific to evaluations", paragraphs: [
        "Loss limits are measured on the basis stated for your program, which may include open losses you have not closed. A breach can end an attempt.",
        "Evaluation results may not reflect real trading conditions. Passing an evaluation does not guarantee any reward, payout or capital allocation.",
        "[If trading is simulated, add the standard limitations of simulated results. To be confirmed.]",
      ] },
      { id: "advice", title: "No advice", paragraphs: ["Nothing on this site is financial, investment, tax or legal advice. Decide for yourself, and take independent advice where needed."] },
      { id: "past", title: "Past performance", paragraphs: ["Past results, including any shown as examples, do not predict future results."] },
      { id: "jurisdiction", title: "Where you live", paragraphs: ["[Jurisdiction-specific risk and eligibility statements to be added after legal review.]"] },
    ],
  },
};
