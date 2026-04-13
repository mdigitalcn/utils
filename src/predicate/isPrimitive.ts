/**
 * Type guard that checks if a value is a primitive type.
 * Primitives: string, number, boolean, symbol, bigint, undefined, null.
 *
 * @example
 * isPrimitive('hello') // true
 * isPrimitive(42) // true
 * isPrimitive(null) // true
 * isPrimitive(undefined) // true
 * isPrimitive({}) // false
 * isPrimitive([]) // false
 * isPrimitive(new Date()) // false
 *
 * @param value - Value to check
 * @returns true if value is a primitive
 */
export function isPrimitive(value: unknown): value is string | number | boolean | symbol | bigint | undefined | null {
  return value === null || (typeof value !== 'object' && typeof value !== 'function');
}
