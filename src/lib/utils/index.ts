import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number | null): string {
  if (num !== null) {
    return num.toLocaleString("en-IN");
  }
  console.error("Failed to format number with commas");
  return "0";
}

export function getInitials(name: string): string {
  const nameParts = name.trim().split(/\s+/).filter(Boolean);

  if (nameParts.length === 0) return "";
  if (nameParts.length === 1) return nameParts[0][0].toUpperCase();

  return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
}
