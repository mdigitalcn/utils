/**
 * Creates a new object without the specified keys.
 * Optimized: Only copies keys that aren't omitted (O(n) where n = kept keys, not all keys).
 *
 * @example
 * omit(['b'], { a: 1, b: 2, c: 3 }) // { a: 1, c: 3 }
 *
 * @param keys - Keys to omit
 * @param obj - Source object
 * @returns New object without omitted keys
 */
export function omit<T extends object, K extends keyof T>(
  keys: K[],
  obj: T
): Omit<T, K> {
  const keysToOmit = new Set(keys);
  const result = {} as any;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !keysToOmit.has(key as any)) {
      result[key] = obj[key];
    }
  }

  return result;
}
