/**
 * Splits a list into sub-lists based on a key returned from each item.
 *
 * @example
 * const result = collectBy(
 *   (item) => item.type,
 *   [
 *     { type: 'breakfast', item: '☕️' },
 *     { type: 'lunch', item: '🌯' },
 *     { type: 'dinner', item: '🍝' },
 *     { type: 'breakfast', item: '🥐' },
 *     { type: 'lunch', item: '🍕' }
 *   ]
 * );
 *
 * @param fn Function that extracts a key from each item
 * @param list Array of items
 * @returns Array of groups, each group containing items with same key
 */
export function collectBy<T, K extends string | number | symbol>(
  fn: (item: T) => K,
  list: T[]
): T[][] {
  const groups: Record<K, T[]> = {} as Record<K, T[]>;

  for (const item of list) {
    const key = fn(item);

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);
  }

  return Object.values(groups);
}

export default collectBy;
