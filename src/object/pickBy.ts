/**
 * Creates a new object composed of properties that satisfy the predicate.
 *
 * @example
 * pickBy({ a: 1, b: null, c: 3, d: undefined }, value => value != null)
 * // { a: 1, c: 3 }
 *
 * @example
 * pickBy({ x: 0, y: 1, z: 2 }, value => value > 0)
 * // { y: 1, z: 2 }
 *
 * @param obj - Source object
 * @param predicate - Function to test each value (receives value and key)
 * @returns New object with only properties that pass the predicate
 */
export function pickBy<T extends Record<string, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: string) => boolean
): Partial<T> {
  const result: Partial<T> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && predicate(obj[key], key)) {
      (result as any)[key] = obj[key];
    }
  }
  return result;
}
