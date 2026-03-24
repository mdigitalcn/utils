/**
 * Pipes functions from left to right with full type inference.
 *
 * @example
 * const double = (x: number) => x * 2
 * const add1 = (x: number) => x + 1
 * const toString = (x: number) => String(x)
 * pipe(add1, double)(3) // 8 — inferred as (arg: number) => number
 * pipe(add1, double, toString)(3) // '8' — inferred as (arg: number) => string
 *
 * @param fns - Functions to pipe
 * @returns Piped function
 */
export function pipe<A, B>(f1: (a: A) => B): (a: A) => B;
export function pipe<A, B, C>(f1: (a: A) => B, f2: (b: B) => C): (a: A) => C;
export function pipe<A, B, C, D>(f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D): (a: A) => D;
export function pipe<A, B, C, D, E>(f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E): (a: A) => E;
export function pipe<A, B, C, D, E, F>(f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E, f5: (e: E) => F): (a: A) => F;
export function pipe<A, B, C, D, E, F, G>(f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E, f5: (e: E) => F, f6: (f: F) => G): (a: A) => G;
export function pipe<A, B, C, D, E, F, G, H>(f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E, f5: (e: E) => F, f6: (f: F) => G, f7: (g: G) => H): (a: A) => H;
export function pipe<A, B, C, D, E, F, G, H, I>(f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E, f5: (e: E) => F, f6: (f: F) => G, f7: (g: G) => H, f8: (h: H) => I): (a: A) => I;
export function pipe<A, B, C, D, E, F, G, H, I, J>(f1: (a: A) => B, f2: (b: B) => C, f3: (c: C) => D, f4: (d: D) => E, f5: (e: E) => F, f6: (f: F) => G, f7: (g: G) => H, f8: (h: H) => I, f9: (i: I) => J): (a: A) => J;
export function pipe(...fns: Array<(arg: any) => any>): (arg: any) => any;
export function pipe(...fns: Array<(arg: any) => any>): (arg: any) => any {
  if (fns.length === 0) {
    return (arg: any) => arg;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return (arg: any) => fns.reduce((acc, fn) => fn(acc), arg);
}
