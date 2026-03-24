/**
 * Returns the first n elements of an array.
 *
 * @example
 * take([1, 2, 3, 4, 5], 3) // [1, 2, 3]
 * take([1, 2], 5) // [1, 2]
 * take([], 3) // []
 *
 * @param arr - Source array
 * @param n - Number of elements to take
 * @returns New array with first n elements
 */
export function take<T>(arr: readonly T[], n: number): T[] {
  return arr.slice(0, Math.max(0, n));
}
