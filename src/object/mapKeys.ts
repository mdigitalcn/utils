/**
 * Creates a new object with the same values but transformed keys.
 *
 * @example
 * mapKeys({ a: 1, b: 2 }, key => key.toUpperCase())
 * // { A: 1, B: 2 }
 *
 * @example
 * mapKeys({ name: 'Alice', age: 30 }, (key) => `user_${key}`)
 * // { user_name: 'Alice', user_age: 30 }
 *
 * @param obj - Source object
 * @param fn - Function to transform each key (receives key and value)
 * @returns New object with transformed keys
 */
export function mapKeys<T extends Record<string, any>>(
  obj: T,
  fn: (key: string, value: T[keyof T]) => string
): Record<string, T[keyof T]> {
  const result: Record<string, T[keyof T]> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[fn(key, obj[key])] = obj[key];
    }
  }
  return result;
}
