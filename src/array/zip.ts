/**
 * Combines two arrays into an array of tuples, pairing elements by index.
 * The result length is the shorter of the two arrays.
 *
 * @example
 * zip([1, 2, 3], ['a', 'b', 'c']) // [[1, 'a'], [2, 'b'], [3, 'c']]
 * zip([1, 2], ['a']) // [[1, 'a']]
 * zip([], [1, 2]) // []
 *
 * @param a - First array
 * @param b - Second array
 * @returns Array of tuples
 */
export function zip<A, B>(a: readonly A[], b: readonly B[]): [A, B][] {
  const length = Math.min(a.length, b.length);
  const result: [A, B][] = [];
  for (let i = 0; i < length; i++) {
    result.push([a[i], b[i]]);
  }
  return result;
}
