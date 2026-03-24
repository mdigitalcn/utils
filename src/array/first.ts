/**
 * Returns the first element of an array, or undefined if empty.
 *
 * @example
 * first([1, 2, 3]) // 1
 * first([]) // undefined
 * first(['a', 'b']) // 'a'
 *
 * @param arr - Source array
 * @returns First element or undefined
 */
export function first<T>(arr: readonly T[]): T | undefined {
  return arr[0];
}
