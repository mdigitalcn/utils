'use client';

import { useCallback, useEffect, useRef } from 'react';

/**
 * Returns a function that reports whether the component is still mounted.
 * Useful for avoiding state updates on unmounted components in async operations.
 *
 * @example
 * ```tsx
 * function AsyncComponent() {
 *   const isMounted = useIsMounted();
 *   const [data, setData] = useState(null);
 *
 *   useEffect(() => {
 *     fetchData().then((result) => {
 *       if (isMounted()) {
 *         setData(result);
 *       }
 *     });
 *   }, []);
 *
 *   return <div>{data}</div>;
 * }
 * ```
 *
 * @returns A function that returns true if the component is mounted
 */
export function useIsMounted(): () => boolean {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(() => mountedRef.current, []);
}
