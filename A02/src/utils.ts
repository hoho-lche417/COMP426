/** 
 * DO NOT MODIFY THIS FILE!
 * This file contains helper functions that can be used in the
 * calculator implementation.
 */

/**
 * Converts the display text to a number object.
 * @param s: The display text.
 * @returns Number from the display text.
 */
export const displayTextToNumber = (s: string): number => {
    return parseFloat(s.replace(",", ""));
}

/**
 * Converts and formats a number to display text.
 * @param n: Number to convert.
 * @returns Formatted display text for the given number.
 */
export const numberToDisplayText = (n: number): string => {
    if (Number.isInteger(n)) {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(n);
    }
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 10,
    }).format(n);
}

/**
 * Reformat the display text by converting it to a number
 * and then back to display text.
 * @param s: Display text to reformat.
 * @returns Reformatted display text.
 */
export const reformatDisplayText = (s: string): string => {
    return numberToDisplayText(displayTextToNumber(s));
}
