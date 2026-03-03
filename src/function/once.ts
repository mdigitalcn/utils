/**
 * Creates a function that is only called once. Subsequent calls return
 * the result of the first invocation.
 *
 * @example
 * const initialize = once(() => {
 *   console.log('initialized');
 *   return { ready: true };
 * });
 *
 * initialize() // logs 'initialized', returns { ready: true }
 * initialize() // returns { ready: true } — no log
 *
 * @example
 * // Singleton pattern
 * const getDB = once(() => createDatabaseConnection());
 *
 * @param fn - Function to execute only once
 * @returns Wrapped function that returns the first result on subsequent calls
 */
export function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;

  return ((...args: Parameters<T>): ReturnType<T> => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  }) as T;
}
