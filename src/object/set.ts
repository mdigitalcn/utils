/**
 * Creates a shallow clone of an object with a value set at the given path.
 * Creates intermediate objects/arrays as needed. Does not mutate the original.
 *
 * @example
 * set({}, 'a.b.c', 42) // { a: { b: { c: 42 } } }
 * set({ a: { b: 1 } }, 'a.b', 2) // { a: { b: 2 } }
 * set({ x: 1 }, ['a', 'b'], 3) // { x: 1, a: { b: 3 } }
 *
 * @param obj - Source object
 * @param path - Dot-separated string or array of keys
 * @param value - Value to set
 * @returns New object with the value set at the path
 */
export function set<T extends Record<string, any>>(
  obj: T,
  path: string | string[],
  value: unknown
): T {
  const keys = Array.isArray(path) ? path : path.split('.');
  if (keys.length === 0) return obj;

  const result = { ...obj } as any;
  let current = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = current[key] != null && typeof current[key] === 'object'
      ? { ...current[key] }
      : {};
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return result;
}
