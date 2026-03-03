/**
 * Sums an array of numbers.
 *
 * @example
 * sum([1, 2, 3, 4]) // 10
 *
 * @param numbers - Array of numbers to sum
 * @returns Sum of all numbers
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}
