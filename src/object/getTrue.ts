/**
 * Returns a new object containing only the truthy values of the input object.
 *
 * @example
 * getTrues({ a: 1, b: 0, c: null, d: 'hello' })
 * // Returns: { a: 1, d: 'hello' }
 *
 * @param obj - The object to filter
 * @returns A new object with only truthy values
 */
export function getTrues<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => Boolean(value))
  ) as Partial<T>;
}
