import { path } from './path.js';

/**
 * Safely retrieves a value at a given path in an object, with a default value.
 *
 * @example
 * pathOr('default', { a: { b: 1 } }, ['a', 'b']) // 1
 * pathOr('default', { a: { b: 1 } }, ['a', 'c']) // 'default'
 *
 * @param defaultValue - Default value if path doesn't exist
 * @param obj - Object to retrieve from
 * @param pathArray - Array of keys representing the path
 * @returns Value at path or default value
 */
export function pathOr<T>(defaultValue: T, obj: any, pathArray: string[]): T {
  const result = path<T>(obj, pathArray);
  return result === undefined ? defaultValue : result;
}
