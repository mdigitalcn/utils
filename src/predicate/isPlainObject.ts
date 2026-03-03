/**
 * Checks if a value is a plain object (created by {} or Object.create(null)).
 * Returns false for arrays, class instances, Date, Map, Set, etc.
 *
 * @example
 * isPlainObject({}) // true
 * isPlainObject({ key: 'value' }) // true
 * isPlainObject(Object.create(null)) // true
 * isPlainObject([]) // false
 * isPlainObject(new Date()) // false
 * isPlainObject(new Map()) // false
 * isPlainObject(null) // false
 *
 * @param value - Value to check
 * @returns true if value is a plain object
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') return false;
  if (Array.isArray(value)) return false;

  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}
