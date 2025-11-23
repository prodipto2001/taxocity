import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GST_PERCENT } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number | string | null): string {
  if (num !== null) {
    return Number(num).toLocaleString("en-IN");
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

export function getGSTAmount(price: number): string {
  return (price * (GST_PERCENT / 100)).toFixed(2);
}

export function getGSTIncludedPrice(price: number) {
  const gstValue = getGSTAmount(price);
  return (price + Number(gstValue)).toFixed(2);
}
