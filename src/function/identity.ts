/**
 * Returns the value passed to it. The identity function.
 * Useful as a default transformer in pipelines, or when a function is
 * required but no transformation is needed.
 *
 * @example
 * identity(5) // 5
 * identity({ a: 1 }) // { a: 1 }
 *
 * @example
 * // Default transformer
 * function transform<T>(items: T[], fn: (item: T) => T = identity) {
 *   return items.map(fn);
 * }
 *
 * @example
 * // Filter truthy with type narrowing
 * [0, 1, null, 2, undefined, 3].filter(identity as any) // runtime truthy filter
 *
 * @param value - Any value
 * @returns The same value
 */
export function identity<T>(value: T): T {
  return value;
}
