/**
 * Type guard that checks if a value is a finite number.
 * Returns false for NaN and Infinity.
 *
 * @example
 * isNumber(42) // true
 * isNumber(3.14) // true
 * isNumber(NaN) // false
 * isNumber(Infinity) // false
 * isNumber('42') // false
 * isNumber(null) // false
 *
 * @param value - Value to check
 * @returns true if value is a finite number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value);
}
