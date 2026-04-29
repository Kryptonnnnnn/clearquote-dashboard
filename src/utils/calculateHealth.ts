import type { Usage, Ticket } from "../types";

export function calculateHealth(
  usage: Partial<Usage>,
  ticket: Partial<Ticket>
): "Healthy" | "Warning" | "At Risk" {
  let score = 100;
  if (usage?.trend === "down") score -= 30;
  if ((ticket as any)?.open > 3) score -= 25;
  if ((ticket as any)?.csat !== undefined && (ticket as any).csat < 3) score -= 20;
  if (score > 70) return "Healthy";
  if (score > 40) return "Warning";
  return "At Risk";
}