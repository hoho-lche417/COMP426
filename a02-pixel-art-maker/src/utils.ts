/** 
 * DO NOT MODIFY THIS FILE!
 * This file contains helper functions that can be used in the
 * calculator implementation.
 */

/** Object representation of a color denoted by RGB. */
export interface RgbColor {
    r: number;
    g: number;
    b: number;
    a: number;
}

/**
 * Converts a hex code into RGB.
 * (Adapted from: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb)
 * @param hex: Hex code to convert
 * @returns RBG color object
 */
export const hexToRgb = (hex: string): RgbColor => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a: 255,
    } : {
        r: 0,
        g: 0,
        b: 0,
        a: 255,
      };
  }