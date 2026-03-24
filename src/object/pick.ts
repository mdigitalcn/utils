/**
 * Creates a new object with only the specified keys.
 * Optimized: Uses hasOwnProperty check instead of 'in' operator to avoid prototype chain lookups.
 *
 * @example
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { a: 1, c: 3 }
 *
 * @param obj - Source object
 * @param keys - Keys to pick
 * @returns New object with only picked keys
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
