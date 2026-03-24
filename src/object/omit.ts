/**
 * Creates a new object without the specified keys.
 * Optimized: Only copies keys that aren't omitted (O(n) where n = kept keys, not all keys).
 *
 * @example
 * omit({ a: 1, b: 2, c: 3 }, ['b']) // { a: 1, c: 3 }
 *
 * @param obj - Source object
 * @param keys - Keys to omit
 * @returns New object without omitted keys
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
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
