/**
 * Wraps a promise with a timeout. If the promise doesn't resolve within
 * the specified time, it rejects with a TimeoutError.
 *
 * @example
 * // Timeout after 5 seconds
 * const data = await timeout(fetch('/api/slow'), 5000)
 *
 * @example
 * // With custom error message
 * const data = await timeout(fetchUser(id), 3000, 'User fetch timed out')
 *
 * @example
 * // Catch timeout specifically
 * try {
 *   await timeout(longOperation(), 1000)
 * } catch (error) {
 *   if (error instanceof Error && error.name === 'TimeoutError') {
 *     console.log('Operation timed out');
 *   }
 * }
 *
 * @param promise - Promise to wrap
 * @param ms - Timeout in milliseconds
 * @param message - Optional custom error message
 * @returns The resolved value from the promise
 * @throws TimeoutError if the promise doesn't resolve in time
 */
export async function timeout<T>(
  promise: Promise<T>,
  ms: number,
  message?: string
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout>;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      const error = new Error(message ?? `Operation timed out after ${ms}ms`);
      error.name = 'TimeoutError';
      reject(error);
    }, ms);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutId!);
  }
}
