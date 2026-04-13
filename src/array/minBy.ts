/**
 * Returns the element with the minimum value as determined by a function.
 *
 * @example
 * minBy([{ age: 30 }, { age: 20 }, { age: 25 }], x => x.age) // { age: 20 }
 * minBy([], x => x) // undefined
 *
 * @param arr - Array to search
 * @param fn - Function that returns a numeric value for comparison
 * @returns Element with the minimum value, or undefined if empty
 */
export function minBy<T>(arr: readonly T[], fn: (item: T) => number): T | undefined {
  if (arr.length === 0) return undefined;
  let min = arr[0];
  let minVal = fn(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    const val = fn(arr[i]);
    if (val < minVal) {
      min = arr[i];
      minVal = val;
    }
  }
  return min;
}
