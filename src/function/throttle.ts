/**
 * Creates a throttled version of a function that executes at most once
 * per specified interval. Guarantees the last invocation is eventually called.
 *
 * Returns a throttled function with a `.cancel()` method.
 *
 * @example
 * const throttledScroll = throttle(() => {
 *   updatePosition(window.scrollY);
 * }, 200);
 *
 * window.addEventListener('scroll', throttledScroll);
 *
 * @example
 * // With arguments
 * const throttledResize = throttle((width: number, height: number) => {
 *   updateLayout(width, height);
 * }, 100);
 *
 * @example
 * // Cancel pending execution
 * const throttled = throttle(save, 1000);
 * throttled();
 * throttled.cancel();
 *
 * @param fn - Function to throttle
 * @param interval - Minimum time between executions in milliseconds
 * @returns Throttled function with cancel method
 */
export interface ThrottledFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  cancel: () => void;
}

export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  interval: number
): ThrottledFunction<T> {
  let lastRan = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now();
    const elapsed = now - lastRan;

    if (elapsed >= interval) {
      lastRan = now;
      fn(...args);
    } else {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        lastRan = Date.now();
        timeoutId = null;
        fn(...args);
      }, interval - elapsed);
    }
  };

  throttled.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return throttled as ThrottledFunction<T>;
}
