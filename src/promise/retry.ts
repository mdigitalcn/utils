/**
 * Retries an async function with exponential backoff.
 * Useful for unreliable network requests, flaky APIs, or transient errors.
 *
 * @example
 * const data = await retry(() => fetch('/api/data').then(r => r.json()), {
 *   retries: 3,
 *   delay: 1000,
 * })
 *
 * @example
 * // With custom backoff and error filter
 * const result = await retry(fetchUser, {
 *   retries: 5,
 *   delay: 500,
 *   backoff: 'exponential',
 *   shouldRetry: (error) => error.status !== 404,
 * })
 *
 * @param fn - Async function to retry
 * @param options - Retry configuration
 * @returns The resolved value from the function
 * @throws The last error if all retries fail
 */
export interface RetryOptions {
  /** Number of retry attempts (default: 3) */
  retries?: number;
  /** Initial delay between retries in ms (default: 1000) */
  delay?: number;
  /** Backoff strategy (default: 'exponential') */
  backoff?: 'fixed' | 'exponential';
  /** Optional filter — return false to stop retrying early */
  shouldRetry?: (error: unknown) => boolean;
}

export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    retries = 3,
    delay = 1000,
    backoff = 'exponential',
    shouldRetry,
  } = options;

  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === retries) break;
      if (shouldRetry && !shouldRetry(error)) break;

      const waitTime = backoff === 'exponential'
        ? delay * Math.pow(2, attempt)
        : delay;

      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }

  throw lastError;
}
