/**
 * Removes all falsy values (false, null, 0, '', undefined, NaN) from an array.
 * Returns a properly narrowed type excluding falsy values.
 *
 * @example
 * compact([0, 1, false, 2, '', 3, null, undefined, NaN])
 * // [1, 2, 3]
 *
 * @example
 * compact(['hello', '', 'world', null])
 * // ['hello', 'world']
 *
 * @param arr - Array to compact
 * @returns New array without falsy values
 */
export function compact<T>(arr: readonly (T | null | undefined | false | 0 | '')[]): T[] {
  return arr.filter(Boolean) as T[];
}
