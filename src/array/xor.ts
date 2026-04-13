/**
 * Computes the symmetric difference — elements in either array but not both.
 *
 * @example
 * xor([1, 2, 3, 4], [3, 4, 5, 6]) // [1, 2, 5, 6]
 * xor(['a', 'b'], ['b', 'c']) // ['a', 'c']
 *
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns Elements present in one array but not both
 */
export function xor<T>(arr1: readonly T[], arr2: readonly T[]): T[] {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return [
    ...arr1.filter(x => !set2.has(x)),
    ...arr2.filter(x => !set1.has(x)),
  ];
}
