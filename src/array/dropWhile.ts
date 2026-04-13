/**
 * Drops leading elements while predicate returns true, returns the rest.
 *
 * @example
 * dropWhile([1, 2, 3, 4, 1], x => x < 3) // [3, 4, 1]
 * dropWhile([5, 4, 3], x => x > 3) // [3]
 *
 * @param arr - Source array
 * @param fn - Predicate function
 * @returns New array without leading elements that pass the predicate
 */
export function dropWhile<T>(arr: readonly T[], fn: (item: T, index: number) => boolean): T[] {
  const idx = arr.findIndex((item, i) => !fn(item, i));
  return idx === -1 ? [] : arr.slice(idx);
}
