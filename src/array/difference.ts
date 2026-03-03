/**
 * Returns elements from the first array that are not in the second array.
 *
 * @example
 * difference([1, 2, 3, 4], [2, 4]) // [1, 3]
 * difference(['a', 'b', 'c'], ['b']) // ['a', 'c']
 * difference([1, 2], [1, 2]) // []
 *
 * @param arr1 - Source array
 * @param arr2 - Array of elements to exclude
 * @returns Array of elements only in arr1
 */
export function difference<T>(arr1: readonly T[], arr2: readonly T[]): T[] {
  const set = new Set(arr2);
  return arr1.filter((item) => !set.has(item));
}
