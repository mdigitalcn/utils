import type { Predicate } from '../types/index.js';

/**
 * Partitions an array into two arrays based on a predicate.
 *
 * @example
 * partition(x => x > 2, [1, 2, 3, 4]) // [[3, 4], [1, 2]]
 *
 * @param predicate - Function to test each element
 * @param list - Array to partition
 * @returns Tuple of [passed, failed] arrays
 */
export function partition<T>(predicate: Predicate<T>, list: T[]): [T[], T[]] {
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
