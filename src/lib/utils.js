import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isJsonValid(json){
  try{ JSON.stringify(json); return true; } catch {}
}