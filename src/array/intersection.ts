/**
 * Returns elements that exist in both arrays.
 *
 * @example
 * intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
 * intersection(['a', 'b'], ['b', 'c']) // ['b']
 * intersection([1, 2], [3, 4]) // []
 *
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns Array of common elements
 */
export function intersection<T>(arr1: readonly T[], arr2: readonly T[]): T[] {
  const set = new Set(arr2);
  return arr1.filter((item) => set.has(item));
}
