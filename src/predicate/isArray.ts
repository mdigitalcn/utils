/**
 * Type guard that checks if a value is an array.
 *
 * @example
 * isArray([1, 2, 3]) // true
 * isArray([]) // true
 * isArray('hello') // false
 * isArray({ length: 0 }) // false
 *
 * @param value - Value to check
 * @returns true if value is an array
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}
