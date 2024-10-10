import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const checkSpecialKey = (data: string): boolean => {
  return data.startsWith("\x1B") || data === '\t';
};



