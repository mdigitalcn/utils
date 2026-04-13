/**
 * Creates an array of unique values from two arrays.
 *
 * @example
 * union([1, 2, 3], [3, 4, 5]) // [1, 2, 3, 4, 5]
 * union(['a'], ['a', 'b']) // ['a', 'b']
 *
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns Array of unique values from both
 */
export function union<T>(arr1: readonly T[], arr2: readonly T[]): T[] {
  return [...new Set([...arr1, ...arr2])];
}
