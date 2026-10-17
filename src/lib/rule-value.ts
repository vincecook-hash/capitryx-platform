import type { RuleValue } from "@/types/program";

export function set<T>(value: T): RuleValue<T> {
  return { status: "set", value };
}
export const NOT_APPLICABLE = { status: "not_applicable" } as const;
export const TBD = { status: "tbd" } as const;

/** Human-readable text for a rule, including the not-applicable and undecided states. */
export function formatRule<T>(rule: RuleValue<T>, fmt: (value: T) => string = String): string {
  switch (rule.status) {
    case "set":
      return fmt(rule.value);
    case "not_applicable":
      return "Not applicable";
    case "tbd":
      return "To be confirmed";
  }
}
