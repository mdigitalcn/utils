/**
 * Composes functions from right to left with full type inference.
 *
 * @example
 * const double = (x: number) => x * 2
 * const add1 = (x: number) => x + 1
 * const toString = (x: number) => String(x)
 * compose(double, add1)(3) // 8 — inferred as (arg: number) => number
 * compose(toString, double, add1)(3) // '8' — inferred as (arg: number) => string
 *
 * @param fns - Functions to compose
 * @returns Composed function
 */
export function compose<A, B>(f1: (a: A) => B): (a: A) => B;
export function compose<A, B, C>(f2: (b: B) => C, f1: (a: A) => B): (a: A) => C;
export function compose<A, B, C, D>(f3: (c: C) => D, f2: (b: B) => C, f1: (a: A) => B): (a: A) => D;
export function compose<A, B, C, D, E>(f4: (d: D) => E, f3: (c: C) => D, f2: (b: B) => C, f1: (a: A) => B): (a: A) => E;
export function compose<A, B, C, D, E, F>(f5: (e: E) => F, f4: (d: D) => E, f3: (c: C) => D, f2: (b: B) => C, f1: (a: A) => B): (a: A) => F;
export function compose<A, B, C, D, E, F, G>(f6: (f: F) => G, f5: (e: E) => F, f4: (d: D) => E, f3: (c: C) => D, f2: (b: B) => C, f1: (a: A) => B): (a: A) => G;
export function compose<A, B, C, D, E, F, G, H>(f7: (g: G) => H, f6: (f: F) => G, f5: (e: E) => F, f4: (d: D) => E, f3: (c: C) => D, f2: (b: B) => C, f1: (a: A) => B): (a: A) => H;
export function compose<A, B, C, D, E, F, G, H, I>(f8: (h: H) => I, f7: (g: G) => H, f6: (f: F) => G, f5: (e: E) => F, f4: (d: D) => E, f3: (c: C) => D, f2: (b: B) => C, f1: (a: A) => B): (a: A) => I;
export function compose<A, B, C, D, E, F, G, H, I, J>(f9: (i: I) => J, f8: (h: H) => I, f7: (g: G) => H, f6: (f: F) => G, f5: (e: E) => F, f4: (d: D) => E, f3: (c: C) => D, f2: (b: B) => C, f1: (a: A) => B): (a: A) => J;
export function compose(...fns: Array<(arg: any) => any>): (arg: any) => any;
export function compose(...fns: Array<(arg: any) => any>): (arg: any) => any {
  if (fns.length === 0) {
    return (arg: any) => arg;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return (arg: any) => fns.reduceRight((acc, fn) => fn(acc), arg);
}
