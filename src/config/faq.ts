import { getListedAssets } from "@/lib/assets";
import { getProgram } from "@/lib/pricing";
import { formatUsd } from "@/lib/utils";
import type { Program } from "@/types/program";

/**
 * FAQ content. Numbers are read from the program config so answers cannot disagree with the Programs page.
 * `needsOwnerReview: true` means the business policy behind the answer is not decided yet: the answer says so
 * plainly and the page shows a "Pending owner review" label. Never invent a policy to fill a gap.
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  needsOwnerReview: boolean;
  link?: { label: string; href: string };
}

const spot = getProgram("spot-10k");
const futures = getProgram("futures-10k");
if (!spot || !futures) throw new Error("FAQ programs missing from config");

const num = (rule: Program["dailyDrawdownPct"] | Program["maxLeverage"] | Program["maxDrawdownPct"]): number | null =>
  rule.status === "set" ? rule.value : null;
const phaseDays = (p: Program) => {
  const d = p.phases[0]?.minTradingDays;
  return d && d.status === "set" ? d.value : null;
};
const fee = (p: Program) => (p.tradingFees.status === "set" ? p.tradingFees.value : "to be confirmed");

const spotDaily = num(spot.dailyDrawdownPct);
const spotMax = num(spot.maxDrawdownPct);
const spotPairs = getListedAssets("spot").length;
const futuresPairs = getListedAssets("futures").length;

const dailyFloor = spotDaily === null ? null : spot.accountSizeUsd - (spotDaily / 100) * spot.accountSizeUsd;
const maxFloor = spotMax === null ? null : spot.accountSizeUsd - (spotMax / 100) * spot.accountSizeUsd;

export const faqItems: FaqItem[] = [
  {
    id: "what-is-capitryx",
    question: "What is Capitryx?",
    answer: "Capitryx is a crypto trader-evaluation platform concept covering spot and futures markets, built around published rules, clear risk limits and progress tracking. This site currently shows demonstration programs while the real terms are finalised.",
    needsOwnerReview: false,
  },
  {
    id: "spot-and-futures",
    question: "Does Capitryx support spot and futures trading?",
    answer: "Yes. There are two program categories, spot and futures, and each has its own rules. Futures programs are designed around perpetual contracts, subject to the final product configuration.",
    needsOwnerReview: false,
  },
  {
    id: "difference",
    question: "What is the difference between the two programs?",
    answer: "Spot programs cover buying and selling supported pairs with no derivatives leverage and no funding payments. Futures programs cover perpetual contracts, so they add leverage limits, funding costs and liquidation rules. The exact mechanics depend on the program you select.",
    needsOwnerReview: false,
    link: { label: "See the side-by-side comparison", href: "/#compare" },
  },
  {
    id: "what-you-purchase",
    question: "What exactly am I purchasing?",
    answer: "You purchase an evaluation attempt for the program you choose, measured against that program's published criteria. The evaluation size is a notional figure, not money deposited into your account, and buying an evaluation does not give you a funded live account. Details such as how long access lasts are still to be confirmed.",
    needsOwnerReview: true,
  },
  {
    id: "simulated-or-live",
    question: "Are evaluations simulated or live?",
    answer: "This has not been decided yet. The trading environment, simulated or live, is shown as \"To be confirmed\" on every program until Capitryx confirms it.",
    needsOwnerReview: true,
  },
  {
    id: "which-cryptocurrencies",
    question: "Which cryptocurrencies can I trade?",
    answer: `The current demonstration list has ${spotPairs} spot pairs and ${futuresPairs} perpetual pairs, from majors such as BTC and ETH to higher-volatility coins, including meme coins. Prices are quoted in USDT. The final list is set by Capitryx and can change as new coins are approved.`,
    needsOwnerReview: true,
    link: { label: "Browse the pair list", href: "/programs" },
  },
  {
    id: "perpetual-futures",
    question: "Are perpetual futures available?",
    answer: "Futures programs are designed around perpetual contracts, subject to the final product configuration. Spot programs have no perpetual contracts.",
    needsOwnerReview: true,
  },
  {
    id: "leverage",
    question: "What leverage is supported?",
    answer: `Spot programs have no derivatives leverage. The demonstration futures programs allow up to ${num(futures.maxLeverage) ?? "?"}x, with lower caps on higher-risk coins (down to 2x on the most volatile). Final limits are to be confirmed.`,
    needsOwnerReview: true,
  },
  {
    id: "drawdown",
    question: "How is drawdown calculated?",
    answer:
      `In the demonstration rules, limits are a percentage of your starting evaluation size and are measured on equity, so open losses count. ` +
      (dailyFloor !== null && maxFloor !== null
        ? `Example for a ${formatUsd(spot.accountSizeUsd)} spot program (${spotDaily}% daily, ${spotMax}% maximum, static): if the day starts at ${formatUsd(spot.accountSizeUsd)} equity, the daily limit is breached at ${formatUsd(dailyFloor)}, and the maximum limit at ${formatUsd(maxFloor)}. `
        : "") +
      "Details such as when a trading day starts are still to be confirmed.",
    needsOwnerReview: true,
    link: { label: "Read the trading rules", href: "/trading-rules" },
  },
  {
    id: "minimum-days",
    question: "Are there minimum trading days?",
    answer: `In the demonstration programs, each phase needs at least ${phaseDays(spot) ?? "?"} trading days for spot and ${phaseDays(futures) ?? "?"} for futures. These numbers are placeholders until confirmed.`,
    needsOwnerReview: true,
  },
  {
    id: "if-i-fail",
    question: "What happens if I fail?",
    answer: "This has not been decided yet. Whether a failed attempt can be retried, and on what terms, is to be confirmed.",
    needsOwnerReview: true,
  },
  {
    id: "if-i-pass",
    question: "What happens after I pass?",
    answer: "Passing means meeting the published criteria for your program. Required verification and eligibility checks come before any reward or later stage. Passing does not by itself give you a funded live account or guarantee any reward, payout or capital allocation.",
    needsOwnerReview: true,
  },
  {
    id: "rewards",
    question: "How do performance rewards work?",
    answer: "The demonstration programs show a reward share, but the payout schedule and the conditions for receiving anything are not set. No reward or payout is guaranteed.",
    needsOwnerReview: true,
  },
  {
    id: "fees",
    question: "Are there trading fees or funding fees?",
    answer: `The demonstration rules apply ${fee(spot)} on spot and ${fee(futures)} on futures. Futures also carry funding costs on perpetual contracts: ${futures.fundingCosts.status === "set" ? futures.fundingCosts.value.toLowerCase() : "to be confirmed"}. Spot programs have no funding payments. All figures are placeholders until confirmed.`,
    needsOwnerReview: true,
  },
  {
    id: "recurring",
    question: "Are there recurring charges?",
    answer: "The demonstration programs are priced as a one-time fee. Subscription billing is not set up.",
    needsOwnerReview: true,
  },
  {
    id: "refunds",
    question: "What is the refund policy?",
    answer: "A refund policy has not been defined yet. The Refund Policy page is a draft and will be completed before launch.",
    needsOwnerReview: true,
    link: { label: "View the draft Refund Policy", href: "/legal/refund-policy" },
  },
  {
    id: "payments",
    question: "Which payment methods are supported?",
    answer: "Online payments are not enabled yet, and no payment is taken today. Supported methods will be shown at checkout once a payment provider is set up. Cryptocurrency payments are offered only if the business owner enables them.",
    needsOwnerReview: true,
  },
  {
    id: "identity",
    question: "Is identity verification required?",
    answer: "Verification and eligibility checks are expected before any reward or later stage. The exact requirements are to be confirmed.",
    needsOwnerReview: true,
  },
  {
    id: "countries",
    question: "Which countries are eligible?",
    answer: "Eligible countries have not been defined yet. This depends on legal and compliance advice and must be settled before launch.",
    needsOwnerReview: true,
  },
  {
    id: "support",
    question: "How do I contact support?",
    answer: "Support channels are not set up yet. They will be listed on the Contact page once confirmed.",
    needsOwnerReview: true,
    link: { label: "Go to the Contact page", href: "/contact" },
  },
];
