/**
 * Swaps keys and values of an object. Values must be strings or numbers.
 * If duplicate values exist, the last key wins.
 *
 * @example
 * invert({ a: '1', b: '2', c: '3' }) // { '1': 'a', '2': 'b', '3': 'c' }
 * invert({ x: 1, y: 2 }) // { '1': 'x', '2': 'y' }
 *
 * @param obj - Object to invert
 * @returns New object with swapped keys and values
 */
export function invert<T extends Record<string, string | number>>(
  obj: T
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[String(obj[key])] = key;
    }
  }
  return result;
}
