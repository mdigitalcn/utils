/**
 * Creates an object composed of keys generated from the results of running
 * each element through the iteratee. The value of each key is the last
 * element responsible for generating the key.
 *
 * @example
 * keyBy([{ id: 'a1', name: 'Alice' }, { id: 'b2', name: 'Bob' }], item => item.id)
 * // { a1: { id: 'a1', name: 'Alice' }, b2: { id: 'b2', name: 'Bob' } }
 *
 * @param arr - Array to index
 * @param fn - Function that returns the key for each element
 * @returns Object indexed by the generated keys
 */
export function keyBy<T>(
  arr: readonly T[],
  fn: (item: T) => string | number
): Record<string | number, T> {
  const result: Record<string | number, T> = {};
  for (const item of arr) {
    result[fn(item)] = item;
  }
  return result;
}
