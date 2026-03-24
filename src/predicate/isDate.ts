/**
 * Type guard that checks if a value is a valid Date instance.
 * Returns false for invalid dates (e.g., `new Date('invalid')`).
 *
 * @example
 * isDate(new Date()) // true
 * isDate(new Date('2024-01-01')) // true
 * isDate(new Date('invalid')) // false
 * isDate('2024-01-01') // false
 * isDate(Date.now()) // false (number)
 *
 * @param value - Value to check
 * @returns true if value is a valid Date
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}
