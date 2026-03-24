/**
 * Type guard that checks if a value is a function.
 *
 * @example
 * isFunction(() => {}) // true
 * isFunction(Math.round) // true
 * isFunction(class Foo {}) // true
 * isFunction('hello') // false
 *
 * @param value - Value to check
 * @returns true if value is a function
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}
