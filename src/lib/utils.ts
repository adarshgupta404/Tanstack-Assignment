import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function deepDiff<T extends Record<string, any>>(
  original: T,
  updated: T
): Partial<T> {
  const changed: Partial<T> = {};

  for (const key in updated) {
    const origValue = original[key];
    const newValue = updated[key];

    if (
      typeof origValue === "object" &&
      origValue !== null &&
      typeof newValue === "object" &&
      newValue !== null &&
      !Array.isArray(origValue) &&
      !Array.isArray(newValue)
    ) {
      const nestedChanges = deepDiff(origValue, newValue);
      if (Object.keys(nestedChanges).length > 0) {
        changed[key] = nestedChanges as any;
      }
    } else if (origValue !== newValue) {
      changed[key] = newValue;
    }
  }

  return changed;
}
