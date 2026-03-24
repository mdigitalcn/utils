/**
 * Returns a new array with duplicate values removed based on a function.
 *
 * @example
 * uniqBy([{id: 1}, {id: 1}, {id: 2}], x => x.id) // [{id: 1}, {id: 2}]
 *
 * @param list - Array to deduplicate
 * @param fn - Function to determine uniqueness
 * @returns New array with unique values
 */
export function uniqBy<T>(list: T[], fn: (item: T) => unknown): T[] {
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
