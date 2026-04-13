/**
 * Finds the first key in an object whose value satisfies the predicate.
 *
 * @example
 * findKey({ a: 1, b: 2, c: 3 }, v => v > 1) // 'b'
 * findKey({ x: 'hello', y: 'world' }, v => v === 'world') // 'y'
 * findKey({ a: 1 }, v => v > 5) // undefined
 *
 * @param obj - Object to search
 * @param fn - Predicate function receiving (value, key)
 * @returns The first matching key, or undefined
 */
export function findKey<T extends Record<string, any>>(
  obj: T,
  fn: (value: T[keyof T], key: string) => boolean
): string | undefined {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && fn(obj[key], key)) {
      return key;
    }
  }
  return undefined;
}
