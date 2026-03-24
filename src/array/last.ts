/**
 * Returns the last element of an array, or undefined if empty.
 *
 * @example
 * last([1, 2, 3]) // 3
 * last([]) // undefined
 * last(['a', 'b']) // 'b'
 *
 * @param arr - Source array
 * @returns Last element or undefined
 */
export function last<T>(arr: readonly T[]): T | undefined {
  return arr[arr.length - 1];
}
