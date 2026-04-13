/**
 * Executes a function and returns a `[error, result]` tuple.
 * Eliminates try/catch boilerplate (Go-style error handling).
 *
 * @example
 * const [err, result] = attempt(() => JSON.parse('{"a":1}'));
 * // [null, { a: 1 }]
 *
 * const [err, result] = attempt(() => JSON.parse('bad'));
 * // [SyntaxError, null]
 *
 * @param fn - Function to execute
 * @returns Tuple of [null, result] on success, or [error, null] on failure
 */
export function attempt<T>(fn: () => T): [null, T] | [Error, null] {
  try {
    return [null, fn()];
  } catch (error) {
    return [error instanceof Error ? error : new Error(String(error)), null];
  }
}

/**
 * Async version of `attempt`. Executes an async function and returns a `[error, result]` tuple.
 *
 * @example
 * const [err, data] = await attemptAsync(() => fetch('/api').then(r => r.json()));
 * if (err) console.error(err);
 * else console.log(data);
 *
 * @param fn - Async function to execute
 * @returns Promise of tuple [null, result] on success, or [error, null] on failure
 */
export async function attemptAsync<T>(fn: () => Promise<T>): Promise<[null, T] | [Error, null]> {
  try {
    return [null, await fn()];
  } catch (error) {
    return [error instanceof Error ? error : new Error(String(error)), null];
  }
}
