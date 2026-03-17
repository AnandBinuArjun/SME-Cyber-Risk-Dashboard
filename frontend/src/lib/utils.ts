import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatScore(score: number): string {
  return score.toFixed(1);
}

export function getSeverityColor(severity: string): string {
  const s = severity.toLowerCase();
  if (s === "critical") return "text-red-500 bg-red-500/10 border-red-500/20";
  if (s === "high") return "text-orange-500 bg-orange-500/10 border-orange-500/20";
  if (s === "medium") return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
  return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
}
