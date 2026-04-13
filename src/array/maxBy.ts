/**
 * Returns the element with the maximum value as determined by a function.
 *
 * @example
 * maxBy([{ age: 30 }, { age: 20 }, { age: 25 }], x => x.age) // { age: 30 }
 * maxBy([], x => x) // undefined
 *
 * @param arr - Array to search
 * @param fn - Function that returns a numeric value for comparison
 * @returns Element with the maximum value, or undefined if empty
 */
export function maxBy<T>(arr: readonly T[], fn: (item: T) => number): T | undefined {
  if (arr.length === 0) return undefined;
  let max = arr[0];
  let maxVal = fn(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    const val = fn(arr[i]);
    if (val > maxVal) {
      max = arr[i];
      maxVal = val;
    }
  }
  return max;
}
