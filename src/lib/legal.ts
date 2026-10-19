/** Splits text into plain parts and [PLACEHOLDER] parts so unfinished wording can be highlighted. */
export function splitPlaceholders(text: string): Array<{ text: string; placeholder: boolean }> {
  return text
    .split(/(\[[^\]]+\])/)
    .filter((part) => part !== "")
    .map((part) => ({ text: part, placeholder: /^\[[^\]]+\]$/.test(part) }));
}
