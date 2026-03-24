/**
 * Splits a list into sub-lists based on a key returned from each item.
 *
 * @example
 * const result = collectBy(
 *   [
 *     { type: 'breakfast', item: '☕️' },
 *     { type: 'lunch', item: '🌯' },
 *     { type: 'dinner', item: '🍝' },
 *     { type: 'breakfast', item: '🥐' },
 *     { type: 'lunch', item: '🍕' }
 *   ],
 *   (item) => item.type
 * );
 *
 * @param list Array of items
 * @param fn Function that extracts a key from each item
 * @returns Array of groups, each group containing items with same key
 */
export function collectBy<T, K extends string | number | symbol>(
  list: T[],
  fn: (item: T) => K
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
