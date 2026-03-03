import type { Curried2, Curried3, Curried4 } from '../types/index.js';

/**
 * Curries a function with 2 parameters.
 *
 * @example
 * const add = curry2((a, b) => a + b)
 * add(1)(2) // 3
 * add(1, 2) // 3
 *
 * @param fn - Function to curry
 * @returns Curried function
 */
export function curry2<A, B, R>(
  fn: (a: A, b: B) => R
): Curried2<A, B, R> {
  return function curried(a: A, b?: B): any {
    if (arguments.length >= 2) {
      return fn(a, b!);
    }
    return (b: B) => fn(a, b);
  } as Curried2<A, B, R>;
}

/**
 * Curries a function with 3 parameters.
 *
 * @example
 * const add3 = curry3((a, b, c) => a + b + c)
 * add3(1)(2)(3) // 6
 * add3(1, 2)(3) // 6
 * add3(1, 2, 3) // 6
 *
 * @param fn - Function to curry
 * @returns Curried function
 */
export function curry3<A, B, C, R>(
  fn: (a: A, b: B, c: C) => R
): Curried3<A, B, C, R> {
  return function curried(a: A, b?: B, c?: C): any {
    if (arguments.length >= 3) {
      return fn(a, b!, c!);
    }
    if (arguments.length === 2) {
      return (c: C) => fn(a, b!, c);
    }
    return curry2((b: B, c: C) => fn(a, b, c));
  } as Curried3<A, B, C, R>;
}

/**
 * Curries a function with 4 parameters.
 *
 * @example
 * const add4 = curry4((a, b, c, d) => a + b + c + d)
 * add4(1)(2)(3)(4) // 10
 * add4(1, 2, 3, 4) // 10
 *
 * @param fn - Function to curry
 * @returns Curried function
 */
export function curry4<A, B, C, D, R>(
  fn: (a: A, b: B, c: C, d: D) => R
): Curried4<A, B, C, D, R> {
  return function curried(a: A, b?: B, c?: C, d?: D): any {
    if (arguments.length >= 4) {
      return fn(a, b!, c!, d!);
    }
    if (arguments.length === 3) {
      return (d: D) => fn(a, b!, c!, d);
    }
    if (arguments.length === 2) {
      return curry2((c: C, d: D) => fn(a, b!, c, d));
    }
    return curry3((b: B, c: C, d: D) => fn(a, b, c, d));
  } as Curried4<A, B, C, D, R>;
}
