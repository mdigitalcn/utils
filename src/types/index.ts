/**
 * Core TypeScript utility types
 */

/** A predicate function that returns a boolean */
export type Predicate<T> = (value: T) => boolean;

/** A function that transforms a value from type T to type U */
export type Transformer<T, U> = (value: T) => U;

/** A comparator function for sorting */
export type Comparator<T> = (a: T, b: T) => number;

/** A reducer function that accumulates a value */
export type Reducer<T, U> = (accumulator: U, value: T) => U;

/** Curried function with 2 parameters */
export type Curried2<A, B, R> = {
  (a: A): (b: B) => R;
  (a: A, b: B): R;
};

/** Curried function with 3 parameters */
export type Curried3<A, B, C, R> = {
  (a: A): Curried2<B, C, R>;
  (a: A, b: B): (c: C) => R;
  (a: A, b: B, c: C): R;
};

/** Curried function with 4 parameters */
export type Curried4<A, B, C, D, R> = {
  (a: A): Curried3<B, C, D, R>;
  (a: A, b: B): Curried2<C, D, R>;
  (a: A, b: B, c: C): (d: D) => R;
  (a: A, b: B, c: C, d: D): R;
};

/** Deep readonly type — makes all nested properties readonly */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/** Deep partial type — makes all nested properties optional */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** Nullish type helper */
export type Nullish = null | undefined;

/** Make specific keys required */
export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Make specific keys optional */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
