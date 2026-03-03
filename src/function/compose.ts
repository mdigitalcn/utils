/**
 * Composes functions from right to left.
 * Optimized: Handles edge cases and uses efficient iteration.
 *
 * @example
 * const double = (x: number) => x * 2
 * const add1 = (x: number) => x + 1
 * compose(double, add1)(3) // 8 (double(add1(3)))
 *
 * @param fns - Functions to compose
 * @returns Composed function
 */
export function compose<T>(...fns: Array<(arg: any) => any>): (arg: T) => any {
  if (fns.length === 0) {
    return (arg: T) => arg;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return (arg: T) => fns.reduceRight((acc, fn) => fn(acc), arg);
}
