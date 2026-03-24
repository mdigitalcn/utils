/**
 * Groups array elements by the result of a function.
 *
 * @example
 * groupBy([1, 2, 3, 4], x => x % 2 === 0 ? 'even' : 'odd')
 * // { odd: [1, 3], even: [2, 4] }
 *
 * @example
 * groupBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], x => x.type)
 * // { a: [{ type: 'a' }, { type: 'a' }], b: [{ type: 'b' }] }
 *
 * @param list - Array to group
 * @param fn - Function to determine group key
 * @returns Object with grouped arrays
 */
export function groupBy<T>(
  list: T[],
  fn: (item: T) => string
): Record<string, T[]> {
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
