/**
 * Pipes functions from left to right.
 * Optimized: Handles edge cases and uses efficient iteration.
 *
 * @example
 * const double = (x: number) => x * 2
 * const add1 = (x: number) => x + 1
 * pipe(add1, double)(3) // 8 (double(add1(3)))
 *
 * @param fns - Functions to pipe
 * @returns Piped function
 */
export function pipe<T>(...fns: Array<(arg: any) => any>): (arg: T) => any {
  if (fns.length === 0) {
    return (arg: T) => arg;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return (arg: T) => fns.reduce((acc, fn) => fn(acc), arg);
}
