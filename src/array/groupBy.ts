/**
 * Groups array elements by the result of a function.
 * Curried for composition (Ramda-style).
 *
 * @example
 * groupBy(x => x % 2 === 0 ? 'even' : 'odd', [1, 2, 3, 4])
 * // { odd: [1, 3], even: [2, 4] }
 *
 * @example
 * // Curried usage
 * const groupByType = groupBy((x: { type: string }) => x.type)
 * groupByType([{ type: 'a' }, { type: 'b' }, { type: 'a' }])
 * // { a: [{ type: 'a' }, { type: 'a' }], b: [{ type: 'b' }] }
 *
 * @param fn - Function to determine group key
 * @param list - Array to group (optional for currying)
 * @returns Object with grouped arrays, or curried function
 */
export function groupBy<T>(
  fn: (item: T) => string
): (list: T[]) => Record<string, T[]>;
export function groupBy<T>(
  fn: (item: T) => string,
  list: T[]
): Record<string, T[]>;
export function groupBy<T>(
  fn: (item: T) => string,
  list?: T[]
): Record<string, T[]> | ((list: T[]) => Record<string, T[]>) {
  if (list === undefined) {
    return (list: T[]) => groupBy(fn, list);
  }

  return list.reduce(
    (acc, item) => {
      const key = fn(item);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}
