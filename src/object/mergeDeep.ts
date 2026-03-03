/**
 * Merges two objects deeply, with the second object taking precedence.
 * Handles circular references and preserves special object types (Date, RegExp, Map, Set).
 *
 * @example
 * mergeDeep({ a: { b: 1 } }, { a: { c: 2 } }) // { a: { b: 1, c: 2 } }
 *
 * @example
 * // Preserves Date objects
 * mergeDeep(
 *   { created: new Date('2020-01-01') },
 *   { updated: new Date('2021-01-01') }
 * ) // { created: Date(2020-01-01), updated: Date(2021-01-01) }
 *
 * @param obj1 - First object
 * @param obj2 - Second object (takes precedence)
 * @returns New deeply merged object
 */
export function mergeDeep<T extends object, U extends object>(
  obj1: T,
  obj2: U,
  seen?: WeakMap<any, any>
): T & U {
  // Create WeakMap only when needed (on first call)
  if (!seen) {
    seen = new WeakMap();
  }

  const result = { ...obj1 } as any;

  // Track circular references
  if (seen.has(obj2)) {
    return seen.get(obj2);
  }
  seen.set(obj2, result);

  for (const key in obj2) {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      const value = obj2[key];

      // Check if value is a special object type that shouldn't be merged
      const isSpecialType =
        value instanceof Date ||
        value instanceof RegExp ||
        value instanceof Map ||
        value instanceof Set ||
        Array.isArray(value);

      if (
        value &&
        typeof value === 'object' &&
        !isSpecialType &&
        result[key] &&
        typeof result[key] === 'object' &&
        !Array.isArray(result[key]) &&
        !(result[key] instanceof Date) &&
        !(result[key] instanceof RegExp) &&
        !(result[key] instanceof Map) &&
        !(result[key] instanceof Set)
      ) {
        result[key] = mergeDeep(result[key], value, seen);
      } else {
        result[key] = value;
      }
    }
  }

  return result;
}
