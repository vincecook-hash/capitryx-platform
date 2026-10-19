import type { TradingCategory } from "@/types/program";

/** Words for the Spot and Futures landing pages. Every number on those pages comes from the program config. */
export interface CategoryPageContent {
  title: string;
  metaDescription: string;
  intro: string;
  suits: string[];
  watch: string[];
}

export const categoryPages: Record<TradingCategory, CategoryPageContent> = {
  spot: {
    title: "Spot trading evaluations",
    metaDescription: "Capitryx spot evaluations: trade supported crypto pairs with no derivatives leverage, no funding payments and clear loss limits.",
    intro:
      "Trade supported crypto pairs without derivatives leverage. Spot evaluations measure how well you manage risk when buying and selling, with no funding payments and no liquidation.",
    suits: [
      "Traders who prefer buying and selling pairs without leverage",
      "Traders who want simpler risk mechanics",
      "Traders focused on majors, large-caps or higher-volatility coins",
    ],
    watch: [
      "Loss limits still apply: daily and maximum drawdown can end an attempt even without leverage.",
      "Higher-volatility coins, including meme coins, can move sharply and often have thinner liquidity.",
      "Whether trading is simulated or live is not confirmed yet.",
    ],
  },
  futures: {
    title: "Futures trading evaluations",
    metaDescription: "Capitryx futures evaluations: trade perpetual contracts with leverage limits, funding costs and liquidation rules, plus clear loss limits.",
    intro:
      "Trade perpetual contracts with leverage limits, funding costs and liquidation rules. Futures evaluations test how you manage leveraged risk, not just how you pick direction.",
    suits: [
      "Traders who use leverage and trade both long and short",
      "Traders comfortable with funding costs and liquidation risk",
      "Traders who want perpetual contracts on majors and large-caps",
    ],
    watch: [
      "Leverage magnifies losses as well as gains, and a position can be liquidated.",
      "Funding costs on perpetual contracts apply while you hold a position.",
      "Lower leverage caps apply to higher-risk coins.",
      "Whether trading is simulated or live is not confirmed yet.",
    ],
  },
};
