/**
 * Returns leading elements while predicate returns true.
 *
 * @example
 * takeWhile([1, 2, 3, 4, 1], x => x < 3) // [1, 2]
 * takeWhile([5, 4, 3], x => x > 3) // [5, 4]
 *
 * @param arr - Source array
 * @param fn - Predicate function
 * @returns New array of leading elements passing the predicate
 */
export function takeWhile<T>(arr: readonly T[], fn: (item: T, index: number) => boolean): T[] {
  const result: T[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (!fn(arr[i], i)) break;
    result.push(arr[i]);
  }
  return result;
}
