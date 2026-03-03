/**
 * Type guard that checks if a value is a string.
 *
 * @example
 * isString('hello') // true
 * isString(123) // false
 * isString(null) // false
 * isString(new String('test')) // false — only primitives
 *
 * @param value - Value to check
 * @returns true if value is a string primitive
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}
