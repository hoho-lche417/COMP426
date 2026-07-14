import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * DO NOT MODIFY
 * Helper function that is used to concatenate Tailwind styles.
 * Great for applying conditional styling.
 *
 * EXAMPLE USAGE:
 * ```typescript
 * <p className={cn("text-sm", isSelected ? "text-blue-500" : "text-gray-500")}>
 *  ...
 * </p>
 * ```
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
