/**
 * Finds the first element that exists in all provided arrays.
 *
 * Works with any type (numbers, strings, booleans, etc.).
 *
 * @example
 * sameElementInMultipleArrays([1, 2, 3], [3, 4, 5], [3, 6]) // 3
 * sameElementInMultipleArrays(['a', 'b'], ['b', 'c'], ['b', 'd']) // 'b'
 * sameElementInMultipleArrays([1, 2], [3, 4]) // null
 *
 * @param {...T[][]} arrays - Two or more arrays to check
 * @returns {T | null} The first element found in all arrays, or `null` if none found
 */
export const sameElementsInArrays = <T>(...arrays: T[][]): T | null => {
  if (arrays.length === 0) return null;
  const [first, ...rest] = arrays;

  return first.find((item) => rest.every((arr) => arr.includes(item))) || null;
};
