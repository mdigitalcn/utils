/**
 * Returns a new array with duplicate values removed based on a function.
 *
 * @example
 * uniqBy(x => x.id, [{id: 1}, {id: 1}, {id: 2}]) // [{id: 1}, {id: 2}]
 *
 * @param fn - Function to determine uniqueness
 * @param list - Array to deduplicate
 * @returns New array with unique values
 */
export function uniqBy<T>(fn: (item: T) => any, list: T[]): T[] {
  const seen = new Set();
  return list.filter((item) => {
    const key = fn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
