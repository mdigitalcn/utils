/**
 * Calculates the arithmetic mean of an array of numbers.
 *
 * @example
 * mean([1, 2, 3, 4]) // 2.5
 *
 * @param numbers - Array of numbers
 * @returns Mean of all numbers
 */
export function mean(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((acc, n) => acc + n, 0) / numbers.length;
}
