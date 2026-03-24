/**
 * Checks if a nested path exists in an object.
 *
 * @example
 * has({ a: { b: { c: 1 } } }, 'a.b.c') // true
 * has({ a: { b: 1 } }, 'a.c') // false
 * has({ a: { b: undefined } }, 'a.b') // true (key exists)
 * has({}, 'a.b') // false
 *
 * @param obj - Object to check
 * @param path - Dot-separated string or array of keys
 * @returns true if the path exists
 */
export function has(obj: unknown, path: string | string[]): boolean {
  if (obj == null || typeof obj !== 'object') return false;

  const keys = Array.isArray(path) ? path : path.split('.');
  let current: any = obj;

  for (const key of keys) {
    if (current == null || typeof current !== 'object') return false;
    if (!Object.prototype.hasOwnProperty.call(current, key)) return false;
    current = current[key];
  }

  return true;
}
