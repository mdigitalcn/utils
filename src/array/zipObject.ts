/**
 * Creates an object from arrays of keys and values.
 *
 * @example
 * zipObject(['a', 'b', 'c'], [1, 2, 3]) // { a: 1, b: 2, c: 3 }
 * zipObject(['x', 'y'], [10]) // { x: 10, y: undefined }
 *
 * @param keys - Array of keys
 * @param values - Array of values
 * @returns Object with keys mapped to values
 */
export function zipObject<K extends string | number, V>(
  keys: readonly K[],
  values: readonly V[]
): Record<K, V | undefined> {
  const result = {} as Record<K, V | undefined>;
  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = values[i];
  }
  return result;
}
