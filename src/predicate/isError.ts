/**
 * Type guard that checks if a value is an Error instance.
 *
 * @example
 * isError(new Error('fail')) // true
 * isError(new TypeError('bad')) // true
 * isError({ message: 'not an error' }) // false
 * isError('error string') // false
 *
 * @param value - Value to check
 * @returns true if value is an Error
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}
