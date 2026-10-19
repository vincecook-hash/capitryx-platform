import type { RuleValue, TradingCategory } from "@/types/program";
import { NOT_APPLICABLE, TBD, set } from "@/lib/rule-value";

/**
 * Conduct and policy rules that are not numbers (numbers live in programs.ts).
 *
 * DRAFT WORDING for owner and legal review. Where Capitryx has not decided a rule it is TBD: the page shows
 * "To be confirmed" plus a note on what the rule will cover. Never fill a TBD with another company's rule.
 */
export interface PolicyRule {
  id: string;
  title: string;
  rules: Record<TradingCategory, RuleValue<string>>;
  /** Shown while the rule is TBD, so traders know what the final rule will answer. */
  willCover?: string;
}

const both = (v: RuleValue<string>): Record<TradingCategory, RuleValue<string>> => ({ spot: v, futures: v });

export const policyRules: PolicyRule[] = [
  {
    id: "margin",
    title: "Margin mode",
    rules: { spot: NOT_APPLICABLE, futures: TBD },
    willCover: "Whether futures positions use isolated or cross margin, and how margin is allocated between positions.",
  },
  {
    id: "news",
    title: "News-event restrictions",
    rules: both(TBD),
    willCover: "Whether trading around scheduled news events is limited, and for how long before and after.",
  },
  {
    id: "bots",
    title: "Automated trading and bots",
    rules: both(TBD),
    willCover: "Whether bots and automated strategies are allowed, and any limits that apply.",
  },
  {
    id: "api",
    title: "API trading permissions",
    rules: both(TBD),
    willCover: "Whether API access is available during an evaluation and what it may be used for.",
  },
  {
    id: "restricted",
    title: "Restricted strategies",
    rules: both(TBD),
    willCover: "Any strategies that are not allowed in an evaluation, with a clear definition of each.",
  },
  {
    id: "manipulation",
    title: "Market manipulation",
    rules: both(set("Trading meant to mislead other market participants or distort prices, such as wash trading or spoofing, is prohibited.")),
  },
  {
    id: "conduct",
    title: "Prohibited conduct",
    rules: both(set("Sharing accounts, giving false identity information, or deliberately exploiting platform errors is prohibited.")),
  },
  {
    id: "progression",
    title: "Program progression",
    rules: both(
      set(
        "Phases run in order. To move on you must meet the current phase's profit target and minimum trading days without breaching a loss limit. Verification and eligibility checks come before any reward or later stage.",
      ),
    ),
  },
  {
    id: "reward-eligibility",
    title: "Reward eligibility",
    rules: both(TBD),
    willCover: "Which checks and conditions must be met before any reward is available, and how it is paid.",
  },
];
