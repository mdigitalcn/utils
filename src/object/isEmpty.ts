/**
 * Checks if a value is empty. Works with objects, arrays, strings, Maps, and Sets.
 *
 * - Objects are empty if they have no own enumerable properties
 * - Arrays/strings are empty if they have length 0
 * - Maps/Sets are empty if they have size 0
 * - null/undefined are considered empty
 *
 * @example
 * isEmpty({}) // true
 * isEmpty({ a: 1 }) // false
 * isEmpty([]) // true
 * isEmpty([1]) // false
 * isEmpty('') // true
 * isEmpty('hello') // false
 * isEmpty(null) // true
 * isEmpty(new Map()) // true
 *
 * @param value - Value to check
 * @returns true if value is empty
 */
export function isEmpty(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === 'string' || Array.isArray(value)) return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}
