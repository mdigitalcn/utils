/**
 * Partially applies arguments to a function.
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
export function partial<T extends any[], R>(
  fn: (...args: T) => R,
  ...args: any[]
): (...rest: any[]) => R {
  return (...rest: any[]) => fn(...([...args, ...rest] as T));
}
