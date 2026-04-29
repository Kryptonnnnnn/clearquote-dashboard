export function initials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export function formatMrr(mrr: number): string {
  return `$${(mrr / 1000).toFixed(1)}k`;
}