/**
 * Returns a new array with specified values removed.
 *
 * @example
 * without([1, 2, 3, 4, 5], 2, 4) // [1, 3, 5]
 * without(['a', 'b', 'c'], 'b') // ['a', 'c']
 *
 * @param arr - Source array
 * @param values - Values to exclude
 * @returns New array without the specified values
 */
export function without<T>(arr: readonly T[], ...values: T[]): T[] {
  const set = new Set(values);
  return arr.filter(x => !set.has(x));
}
