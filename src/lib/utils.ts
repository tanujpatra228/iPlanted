import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mediaQuery(query: string): boolean {
  const media = window.matchMedia(query);
  return media?.matches ?? false;
}
