/**
 * Returns all but the first n elements of an array.
 *
 * @example
 * drop([1, 2, 3, 4, 5], 2) // [3, 4, 5]
 * drop([1, 2], 5) // []
 * drop([], 3) // []
 *
 * @param arr - Source array
 * @param n - Number of elements to drop
 * @returns New array without the first n elements
 */
export function drop<T>(arr: readonly T[], n: number): T[] {
  return arr.slice(Math.max(0, n));
}
