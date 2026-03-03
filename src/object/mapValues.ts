/**
 * Creates a new object with the same keys but transformed values.
 *
 * @example
 * mapValues({ a: 1, b: 2, c: 3 }, value => value * 2)
 * // { a: 2, b: 4, c: 6 }
 *
 * @example
 * mapValues({ name: 'alice', city: 'nyc' }, value => value.toUpperCase())
 * // { name: 'ALICE', city: 'NYC' }
 *
 * @param obj - Source object
 * @param fn - Function to transform each value (receives value and key)
 * @returns New object with transformed values
 */
export function mapValues<T extends Record<string, any>, U>(
  obj: T,
  fn: (value: T[keyof T], key: string) => U
): Record<keyof T, U> {
  const result = {} as Record<keyof T, U>;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key as keyof T] = fn(obj[key], key);
    }
  }
  return result;
}
