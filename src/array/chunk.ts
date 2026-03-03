/**
 * Splits an array into groups of the specified size.
 *
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * chunk([1, 2, 3], 1) // [[1], [2], [3]]
 * chunk([], 3) // []
 *
 * @param arr - Array to split
 * @param size - Size of each chunk (must be > 0)
 * @returns Array of chunks
 * @throws {Error} If size is less than 1
 */
export function chunk<T>(arr: readonly T[], size: number): T[][] {
  if (size < 1) {
    throw new Error('chunk: size must be at least 1');
  }

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
