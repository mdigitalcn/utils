import type { Predicate } from '../types/index.js';

/**
 * Partitions an array into two arrays based on a predicate.
 *
 * @example
 * partition([1, 2, 3, 4], x => x > 2) // [[3, 4], [1, 2]]
 *
 * @param list - Array to partition
 * @param predicate - Function to test each element
 * @returns Tuple of [passed, failed] arrays
 */
export function partition<T>(list: T[], predicate: Predicate<T>): [T[], T[]] {
  const passed: T[] = [];
  const failed: T[] = [];

  for (const item of list) {
    if (predicate(item)) {
      passed.push(item);
    } else {
      failed.push(item);
    }
  }

  return [passed, failed];
}
