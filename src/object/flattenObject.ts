/**
 * Flattens a nested object into a single-level object with dot-separated keys.
 *
 * @example
 * flattenObject({ a: { b: { c: 1 } }, d: 2 })
 * // { 'a.b.c': 1, d: 2 }
 *
 * flattenObject({ a: { b: 1 } }, '_')
 * // { a_b: 1 }
 *
 * @param obj - Object to flatten
 * @param delimiter - Separator between keys (default: '.')
 * @returns Flattened object
 */
export function flattenObject(
  obj: Record<string, any>,
  delimiter: string = '.'
): Record<string, any> {
  const result: Record<string, any> = {};

  function recurse(current: any, prefix: string): void {
    if (
      current !== null &&
      typeof current === 'object' &&
      !Array.isArray(current) &&
      !(current instanceof Date) &&
      !(current instanceof RegExp)
    ) {
      for (const key in current) {
        if (Object.prototype.hasOwnProperty.call(current, key)) {
          const newKey = prefix ? `${prefix}${delimiter}${key}` : key;
          recurse(current[key], newKey);
        }
      }
    } else {
      result[prefix] = current;
    }
  }

  recurse(obj, '');
  return result;
}
