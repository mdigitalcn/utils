'use client';

import { useEffect, useRef } from 'react';

/**
 * Tracks the previous value of a variable across renders.
 * Useful for comparing current and previous values, animations, or detecting changes.
 *
 * @template T - The type of the value to track
 * @param {T} value - The current value to track
 * @returns {T | undefined} The previous value (undefined on first render)
 *
 * @example
 * ```tsx
 * function Counter() {
 *   const [count, setCount] = useState(0);
 *   const previousCount = usePrevious(count);
 *
 *   return (
 *     <div>
 *       <p>Current: {count}</p>
 *       <p>Previous: {previousCount ?? 'N/A'}</p>
 *       <button onClick={() => setCount(count + 1)}>Increment</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Detecting changes for animations
 * function AnimatedValue({ value }: { value: number }) {
 *   const previousValue = usePrevious(value);
 *   const isIncreasing = previousValue !== undefined && value > previousValue;
 *
 *   return (
 *     <div className={isIncreasing ? 'animate-increase' : 'animate-decrease'}>
 *       {value}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Tracking user input changes
 * function SearchInput() {
 *   const [query, setQuery] = useState('');
 *   const previousQuery = usePrevious(query);
 *
 *   useEffect(() => {
 *     if (previousQuery !== undefined && query !== previousQuery) {
 *       console.log(`Search changed from "${previousQuery}" to "${query}"`);
 *       // Trigger search only on actual changes
 *       performSearch(query);
 *     }
 *   }, [query, previousQuery]);
 *
 *   return (
 *     <input
 *       value={query}
 *       onChange={(e) => setQuery(e.target.value)}
 *       placeholder="Search..."
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Comparing object changes
 * interface User {
 *   id: string;
 *   name: string;
 * }
 *
 * function UserProfile({ user }: { user: User }) {
 *   const previousUser = usePrevious(user);
 *
 *   useEffect(() => {
 *     if (previousUser && previousUser.id !== user.id) {
 *       console.log('User changed!');
 *       fetchUserData(user.id);
 *     }
 *   }, [user, previousUser]);
 *
 *   return <div>{user.name}</div>;
 * }
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
