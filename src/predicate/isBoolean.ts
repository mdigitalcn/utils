/**
 * Type guard that checks if a value is a boolean.
 *
 * @example
 * isBoolean(true) // true
 * isBoolean(false) // true
 * isBoolean(0) // false
 * isBoolean('true') // false
 *
 * @param value - Value to check
 * @returns true if value is a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}
