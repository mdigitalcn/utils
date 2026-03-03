/**
 * Type guard that checks if a value is null or undefined.
 *
 * @example
 * isNil(null) // true
 * isNil(undefined) // true
 * isNil(0) // false
 * isNil('') // false
 * isNil(false) // false
 *
 * @param value - Value to check
 * @returns true if value is null or undefined
 */
export function isNil(value: unknown): value is null | undefined {
  return value == null;
}

/**
 * Type guard that checks if a value is NOT null or undefined.
 * Narrows the type by excluding null and undefined.
 *
 * @example
 * isNotNil(0) // true
 * isNotNil('') // true
 * isNotNil(null) // false
 * isNotNil(undefined) // false
 *
 * @example
 * const items = [1, null, 2, undefined, 3];
 * items.filter(isNotNil) // [1, 2, 3] — type is number[]
 *
 * @param value - Value to check
 * @returns true if value is not null or undefined
 */
export function isNotNil<T>(value: T | null | undefined): value is T {
  return value != null;
}
