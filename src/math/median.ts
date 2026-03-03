/**
 * Calculates the median of an array of numbers.
 * Returns the middle value for odd-length arrays, or the average of two middle values for even-length.
 *
 * @example
 * median([1, 2, 3]) // 2
 * median([1, 2, 3, 4]) // 2.5
 * median([5, 1, 3]) // 3
 * median([]) // 0
 *
 * @param numbers - Array of numbers
 * @returns Median value
 */
export function median(numbers: readonly number[]): number {
  if (numbers.length === 0) return 0;

  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}
