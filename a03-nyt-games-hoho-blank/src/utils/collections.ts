/**
 * DO NOT MODIFY
 * Convenience helper functions relating to collections (sets and arrays).
 */
import { arrayShuffle } from "array-shuffle";

/**
 * Counts the number of overlapping items between two input sets.
 * - If set1.size === set2.size === countSetOverlap(set1, set2), then
 *   the sets are equal.
 * - If countSetOverlap(set1, set2) === 0, then the sets are disjoint.
 */
export const countSetOverlap = (
  set1: Set<string>,
  set2: Set<string>
): number => {
  let count = 0;
  for (const item of set1) {
    if (set2.has(item)) {
      count++;
    }
  }
  return count;
};

/** Creates an empty set. */
export const emptySet = <T>(): Set<T> => {
  return new Set();
};

/** Adds an item to the input set and returns a new set (new reference). */
export const addToSet = <T>(set: Set<T>, item: T): Set<T> => {
  const newSet = new Set([...set]);
  newSet.add(item);
  return newSet;
};

/** Deletes an item from the input set and returns a new set (new reference). */
export const deleteFromSet = <T>(set: Set<T>, item: T): Set<T> => {
  const newSet = new Set([...set]);
  newSet.delete(item);
  return newSet;
};

/** Shuffles an input array and returns shuffled output as a new array (new reference). */
export const shuffleArray = <T>(array: T[]): T[] => {
  return [...arrayShuffle(array)];
};
