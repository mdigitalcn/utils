/**
 * Creates a debounced version of a function that delays execution until
 * after the specified wait time has elapsed since the last invocation.
 *
 * Returns a debounced function with `.cancel()` and `.flush()` methods.
 *
 * @example
 * const debouncedSearch = debounce((query: string) => {
 *   fetchResults(query);
 * }, 300);
 *
 * input.addEventListener('input', (e) => debouncedSearch(e.target.value));
 *
 * @example
 * // Cancel pending execution
 * const debounced = debounce(save, 1000);
 * debounced();
 * debounced.cancel(); // won't execute
 *
 * @example
 * // Flush (execute immediately)
 * const debounced = debounce(save, 1000);
 * debounced();
 * debounced.flush(); // executes now
 *
 * @param fn - Function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced function with cancel and flush methods
 */
export interface DebouncedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;

  const debounced = (...args: Parameters<T>) => {
    lastArgs = args;
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
      lastArgs = null;
      fn(...args);
    }, wait);
  };

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
      lastArgs = null;
    }
  };

  debounced.flush = () => {
    if (timeoutId !== null && lastArgs !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
      const args = lastArgs;
      lastArgs = null;
      fn(...args);
    }
  };

  return debounced as DebouncedFunction<T>;
}
