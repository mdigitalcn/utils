'use client';

import { useCallback, useEffect, useRef } from 'react';

/**
 * Creates a throttled version of a callback function that only executes at most once per specified delay period.
 * Useful for rate-limiting expensive operations like scroll handlers, resize handlers, or API calls.
 *
 * @template T - The type of arguments passed to the callback
 * @param {(...args: T[]) => void} callback - The function to throttle
 * @param {number} delay - The minimum time between executions in milliseconds
 * @returns {(...args: T[]) => void} A throttled version of the callback
 *
 * @example
 * ```tsx
 * function ScrollTracker() {
 *   const [scrollPosition, setScrollPosition] = useState(0);
 *
 *   const handleScroll = useThrottle(() => {
 *     setScrollPosition(window.scrollY);
 *     console.log('Scroll position updated:', window.scrollY);
 *   }, 200);
 *
 *   useEffect(() => {
 *     window.addEventListener('scroll', handleScroll);
 *     return () => window.removeEventListener('scroll', handleScroll);
 *   }, [handleScroll]);
 *
 *   return <div>Current scroll: {scrollPosition}px</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Throttling with arguments
 * function ResizeHandler() {
 *   const handleResize = useThrottle((width: number, height: number) => {
 *     console.log('Window resized to:', width, height);
 *     // Expensive layout calculations here
 *   }, 500);
 *
 *   useEffect(() => {
 *     const listener = () => handleResize(window.innerWidth, window.innerHeight);
 *     window.addEventListener('resize', listener);
 *     return () => window.removeEventListener('resize', listener);
 *   }, [handleResize]);
 *
 *   return <div>Resize the window</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Throttling button clicks
 * function SaveButton() {
 *   const handleSave = useThrottle(() => {
 *     saveData();
 *     console.log('Data saved');
 *   }, 1000);
 *
 *   return <button onClick={handleSave}>Save (max once per second)</button>;
 * }
 * ```
 */
export function useThrottle<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
): (...args: T) => void {
  const lastRan = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);

  // Keep callback ref up to date
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: T) => {
      const now = Date.now();
      const timeSinceLastRan = now - lastRan.current;

      if (timeSinceLastRan >= delay) {
        callbackRef.current(...args);
        lastRan.current = now;
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(
          () => {
            callbackRef.current(...args);
            lastRan.current = Date.now();
          },
          delay - timeSinceLastRan
        );
      }
    },
    [delay]
  );
}
