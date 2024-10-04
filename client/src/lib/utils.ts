import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const specialKeys: string[] = ["\x03"]

export const checkSpecialKey = (key: string): boolean => {
  if (specialKeys.includes(key)) {
    return true;
  } else {
    return false;
  }
}
