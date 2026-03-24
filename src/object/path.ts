/**
 * Safely retrieves a value at a given path in an object.
 *
 * @example
 * path({ a: { b: 1 } }, ['a', 'b']) // 1
 * path({ a: { b: 1 } }, ['a', 'c']) // undefined
 *
 * @param obj - Object to retrieve from
 * @param pathArray - Array of keys representing the path
 * @returns Value at path or undefined
 */
export function path<T>(obj: any, pathArray: string[]): T | undefined {
  let current = obj;
  for (const key of pathArray) {
    if (current == null || typeof current !== 'object') {
      return undefined;
    }
    current = current[key];
  }
  return current;
}
