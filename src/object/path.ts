/**
 * Safely retrieves a value at a given path in an object.
 *
 * @example
 * path(['a', 'b'], { a: { b: 1 } }) // 1
 * path(['a', 'c'], { a: { b: 1 } }) // undefined
 *
 * @param pathArray - Array of keys representing the path
 * @param obj - Object to retrieve from
 * @returns Value at path or undefined
 */
export function path<T>(pathArray: string[], obj: any): T | undefined {
  let current = obj;
  for (const key of pathArray) {
    if (current == null || typeof current !== 'object') {
      return undefined;
    }
    current = current[key];
  }
  return current;
}
