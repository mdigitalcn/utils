/**
 * Counts occurrences of each item based on a transformation function.
 *
 * @example
 * countBy(['a', 'b', 'a', 'c', 'b', 'a'], x => x) // { a: 3, b: 2, c: 1 }
 * countBy([1, 2, 3, 4, 5], x => x % 2 === 0 ? 'even' : 'odd') // { odd: 3, even: 2 }
 *
 * @param arr - Array to count
 * @param fn - Function that returns the group key for each item
 * @returns Object with keys and their counts
 */
export function countBy<T>(
  arr: readonly T[],
  fn: (item: T) => string | number
): Record<string, number> {
  const result: Record<string, number> = {};
  for (const item of arr) {
    const key = String(fn(item));
    result[key] = (result[key] || 0) + 1;
  }
  return result;
}
