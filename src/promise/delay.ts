/**
 * Returns a promise that resolves after the specified number of milliseconds.
 * Useful for adding delays in async workflows, animations, or polling.
 *
 * @example
 * await delay(1000) // waits 1 second
 *
 * @example
 * // Delay with a value
 * const result = await delay(500).then(() => 'done')
 *
 * @example
 * // In async function
 * async function poll() {
 *   while (true) {
 *     const data = await fetchData();
 *     if (data.ready) return data;
 *     await delay(2000);
 *   }
 * }
 *
 * @param ms - Milliseconds to wait
 * @returns Promise that resolves after the delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
