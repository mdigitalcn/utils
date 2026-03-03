/**
 * Returns a new array with duplicate values removed.
 * Optimized: Uses spread operator instead of Array.from to avoid extra iteration.
 *
 * @example
 * uniq([1, 2, 2, 3, 3, 4]) // [1, 2, 3, 4]
 *
 * @param list - Array to deduplicate
 * @returns New array with unique values
 */
export function uniq<T>(list: T[]): T[] {
  return [...new Set(list)];
}
