import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const withTimeout = <T,>(p: Promise<T>, ms = 30000): Promise<T> =>
  Promise.race([
    p,
    new Promise<T>((_, reject) => // Changed <never> to <T> to match Promise<T> return type
      setTimeout(() => reject(new Error('timeout')), ms)
    ),
  ]);
