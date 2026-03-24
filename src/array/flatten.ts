/**
 * Flattens a nested array by one level.
 *
 * @example
 * flatten([[1, 2], [3, 4], [5]]) // [1, 2, 3, 4, 5]
 * flatten([[1, [2]], [3]]) // [1, [2], 3]
 * flatten([]) // []
 *
 * @param arr - Nested array to flatten
 * @returns Flattened array (one level)
 */
export function flatten<T>(arr: readonly (T | readonly T[])[]): T[] {
  return arr.flat() as T[];
}
