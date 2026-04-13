/**
 * Returns a random element from an array.
 *
 * @example
 * sample([1, 2, 3, 4, 5]) // random element
 * sample(['a', 'b', 'c']) // random element
 *
 * @param arr - Source array
 * @returns Random element, or undefined if empty
 */
export function sample<T>(arr: readonly T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}
