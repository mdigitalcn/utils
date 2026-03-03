/**
 * Creates a new object with only the specified keys.
 * Optimized: Uses hasOwnProperty check instead of 'in' operator to avoid prototype chain lookups.
 *
 * @example
 * pick(['a', 'c'], { a: 1, b: 2, c: 3 }) // { a: 1, c: 3 }
 *
 * @param keys - Keys to pick
 * @param obj - Source object
 * @returns New object with only picked keys
 */
export function pick<T extends object, K extends keyof T>(
  keys: K[],
  obj: T
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
