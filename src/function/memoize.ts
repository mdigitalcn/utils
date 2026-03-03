/**
 * Memoizes a function, caching its results based on arguments.
 * Uses LRU (Least Recently Used) cache with a default limit of 500 entries to prevent memory leaks.
 *
 * @example
 * const expensive = (n: number) => { ... }
 * const memoized = memoize(expensive)
 * memoized(5) // Computes
 * memoized(5) // Returns cached result
 *
 * @example
 * // Custom cache size
 * const memoized = memoize(expensiveFn, 1000)
 *
 * @param fn - Function to memoize
 * @param maxSize - Maximum cache size (default: 500)
 * @returns Memoized function
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  maxSize = 500
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    let key: string;
    try {
      // Create a stable key by sorting object keys
      key = JSON.stringify(args, (_, value) => {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          return Object.keys(value)
            .sort()
            .reduce((sorted: any, k) => {
              sorted[k] = value[k];
              return sorted;
            }, {});
        }
        return value;
      });
    } catch (error) {
      // If JSON.stringify fails (circular reference, etc.), compute without caching
      console.warn('Memoize: Failed to create cache key, executing without cache:', error);
      return fn(...args);
    }

    if (cache.has(key)) {
      // Move to end (most recently used) by deleting and re-adding
      const value = cache.get(key)!;
      cache.delete(key);
      cache.set(key, value);
      return value;
    }

    const result = fn(...args);

    // LRU: Remove oldest entry if cache is full
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      if (firstKey !== undefined) {
        cache.delete(firstKey);
      }
    }

    cache.set(key, result);
    return result;
  }) as T;
}
