/**
 * Creates a function that negates the result of a predicate.
 *
 * @example
 * const isEven = (n: number) => n % 2 === 0;
 * [1, 2, 3, 4, 5].filter(negate(isEven)) // [1, 3, 5]
 *
 * @param fn - Predicate function to negate
 * @returns New function that returns the opposite boolean
 */
export function negate<T extends (...args: any[]) => boolean>(fn: T): T {
  return ((...args: any[]) => !fn(...args)) as T;
}
