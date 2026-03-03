/**
 * Returns a function that retrieves a given property from an object,
 * returning a default value if the property doesn't exist or is undefined.
 * Curried for composition (Ramda-style).
 *
 * This is essential for safe property access with fallback values,
 * commonly used in data transformation pipelines.
 *
 * @example
 * const getNameOrUnknown = propOr('Unknown', 'name')
 * getNameOrUnknown({ name: 'Alice' }) // 'Alice'
 * getNameOrUnknown({}) // 'Unknown'
 * getNameOrUnknown({ name: undefined }) // 'Unknown'
 *
 * @example
 * // With default values for missing data
 * const users = [
 *   { name: 'Alice', age: 30 },
 *   { name: 'Bob' }, // missing age
 *   { age: 25 } // missing name
 * ]
 * users.map(propOr('Anonymous', 'name'))
 * // ['Alice', 'Bob', 'Anonymous']
 *
 * @example
 * // In composition
 * pipe(
 *   prop('settings'),
 *   propOr('light', 'theme')
 * )(data) // Get theme with 'light' as default
 *
 * @param defaultValue - Value to return if property is missing/undefined
 * @param key - Property key to access
 * @param obj - Object to access (optional for currying)
 * @returns Property value or default value, or curried function
 */
export function propOr<V, K extends string>(
  defaultValue: V,
  key: K
): <T extends Record<K, any>>(obj: T) => T[K] | V;
export function propOr<V, K extends string, T extends Record<K, any>>(
  defaultValue: V,
  key: K,
  obj: T
): T[K] | V;
export function propOr<V, K extends string>(
  defaultValue: V,
  key: K,
  obj?: any
): any {
  // Curry with 2 arguments
  if (obj === undefined) {
    return (obj: any) => {
      const value = obj[key];
      return value !== undefined ? value : defaultValue;
    };
  }

  // Full application
  const value = obj[key];
  return value !== undefined ? value : defaultValue;
}
