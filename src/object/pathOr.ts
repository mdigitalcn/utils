import { path } from './path.js';

/**
 * Safely retrieves a value at a given path in an object, with a default value.
 *
 * @example
 * pathOr('default', ['a', 'b'], { a: { b: 1 } }) // 1
 * pathOr('default', ['a', 'c'], { a: { b: 1 } }) // 'default'
 *
 * @param defaultValue - Default value if path doesn't exist
 * @param pathArray - Array of keys representing the path
 * @param obj - Object to retrieve from
 * @returns Value at path or default value
 */
export function pathOr<T>(defaultValue: T, pathArray: string[], obj: any): T {
  const result = path<T>(pathArray, obj);
  return result === undefined ? defaultValue : result;
}
