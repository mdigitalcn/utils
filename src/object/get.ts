/**
 * Safely accesses a nested property in an object using a string or array path.
 * Returns a default value if the property does not exist or object is undefined/null.
 *
 * @template T - The expected return type
 * @param {Record<string, any> | undefined} obj - The object to access
 * @param {string | string[]} path - Dot-separated string path or array of keys
 * @param {T} [defaultValue] - The value to return if the path is not found
 * @returns {T} The value at the given path or the default value
 *
 * @example
 * const data = { user: { profile: { name: 'Alice' } } }
 * get(data, 'user.profile.name') // 'Alice'
 * get(data, 'user.profile.age', 30) // 30
 * get(data, ['user', 'profile', 'city'], 'Unknown') // 'Unknown'
 *
 * @example
 * const obj = undefined
 * get(obj, 'any.path', 'default') // 'default'
 */
export function get<T = unknown>(
  obj: Record<string, any> | undefined,
  path: string | string[],
  defaultValue?: T
): T {
  if (!obj || typeof obj !== "object") return defaultValue as T;

  const keys = Array.isArray(path) ? path : path.split(".");

  let result: any = obj;
  for (const key of keys) {
    if (result == null) return defaultValue as T;
    result = result[key];
  }

  return result !== undefined ? result : (defaultValue as T);
}
