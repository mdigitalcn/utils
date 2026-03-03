/**
 * Returns a function that retrieves a given property from an object.
 * Curried for composition (Ramda-style).
 *
 * This is one of the most commonly used functions in functional programming
 * for safely accessing object properties in a composable way.
 *
 * @example
 * const getName = prop('name')
 * getName({ name: 'Alice', age: 30 }) // 'Alice'
 *
 * @example
 * // Use in composition
 * const users = [{ name: 'Alice' }, { name: 'Bob' }]
 * users.map(prop('name')) // ['Alice', 'Bob']
 *
 * @example
 * // With pipe
 * pipe(
 *   prop('user'),
 *   prop('profile'),
 *   prop('email')
 * )(data) // Safely access nested properties
 *
 * @param key - Property key to access
 * @param obj - Object to access (optional for currying)
 * @returns Property value, or curried function
 */
export function prop<K extends PropertyKey>(
  key: K
): <T extends Record<K, any>>(obj: T) => T[K];
export function prop<K extends PropertyKey, T extends Record<K, any>>(
  key: K,
  obj: T
): T[K];
export function prop<K extends PropertyKey, T extends Record<K, any>>(
  key: K,
  obj?: T
): T[K] | ((obj: T) => T[K]) {
  if (obj === undefined) {
    return (obj: T) => obj[key];
  }
  return obj[key];
}
