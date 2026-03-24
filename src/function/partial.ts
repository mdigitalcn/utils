/**
 * Partially applies arguments to a function.
 * Supports up to 4 pre-applied arguments with full type inference.
 *
 * @example
 * const add = (a: number, b: number, c: number) => a + b + c
 * const add5 = partial(add, 5)
 * add5(10, 15) // 30
 *
 * @param fn - Function to partially apply
 * @param args - Arguments to pre-apply
 * @returns Partially applied function
 */
export function partial<A, B extends any[], R>(
  fn: (a: A, ...rest: B) => R,
  a: A
): (...rest: B) => R;
export function partial<A, B, C extends any[], R>(
  fn: (a: A, b: B, ...rest: C) => R,
  a: A,
  b: B
): (...rest: C) => R;
export function partial<A, B, C, D extends any[], R>(
  fn: (a: A, b: B, c: C, ...rest: D) => R,
  a: A,
  b: B,
  c: C
): (...rest: D) => R;
export function partial(
  fn: (...args: any[]) => any,
  ...args: any[]
): (...rest: any[]) => any {
  return (...rest: any[]) => fn(...args, ...rest);
}
