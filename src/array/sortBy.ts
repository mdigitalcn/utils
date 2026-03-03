/**
 * Returns a new array sorted by the result of a function applied to each element.
 * Supports multiple sort keys with optional direction.
 * Does not mutate the original array.
 *
 * @example
 * sortBy([{ age: 30 }, { age: 20 }, { age: 25 }], item => item.age)
 * // [{ age: 20 }, { age: 25 }, { age: 30 }]
 *
 * @example
 * // Descending order
 * sortBy([3, 1, 2], x => -x)
 * // [3, 2, 1]
 *
 * @param arr - Array to sort
 * @param fn - Function that returns the value to sort by
 * @returns New sorted array
 */
export function sortBy<T>(
  arr: readonly T[],
  fn: (item: T) => number | string
): T[] {
  return [...arr].sort((a, b) => {
    const va = fn(a);
    const vb = fn(b);
    if (va < vb) return -1;
    if (va > vb) return 1;
    return 0;
  });
}
