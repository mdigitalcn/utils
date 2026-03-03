/**
 * Returns a new array with elements in random order using Fisher-Yates algorithm.
 * Does not mutate the original array.
 *
 * @example
 * shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4] (random)
 *
 * @param arr - Array to shuffle
 * @returns New shuffled array
 */
export function shuffle<T>(arr: readonly T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
