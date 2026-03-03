'use client';

import { useEffect, useRef } from 'react';

/**
 * Runs an effect only on updates (skips the initial mount), similar to componentDidUpdate.
 * Useful when you want to react to prop or state changes but not on the initial render.
 *
 * @param {() => void | (() => void)} effect - The effect function to run on updates. Can return a cleanup function.
 * @param {any[]} deps - Dependency array, same as useEffect
 *
 * @example
 * ```tsx
 * function AutoSaveForm({ formData }: { formData: FormData }) {
 *   useUpdateEffect(() => {
 *     // Only auto-save when formData changes, not on initial load
 *     saveToServer(formData);
 *   }, [formData]);
 *
 *   return <form>...</form>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Notification on prop change
 * function UserProfile({ userId }: { userId: string }) {
 *   const [user, setUser] = useState(null);
 *
 *   useEffect(() => {
 *     fetchUser(userId).then(setUser);
 *   }, [userId]);
 *
 *   useUpdateEffect(() => {
 *     // Show notification only when userId changes, not on mount
 *     toast.info('Loading new user profile...');
 *   }, [userId]);
 *
 *   return <div>{user?.name}</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Scroll to top on page change (but not initial load)
 * function PageContent({ pageId }: { pageId: number }) {
 *   useUpdateEffect(() => {
 *     window.scrollTo(0, 0);
 *   }, [pageId]);
 *
 *   return <div>Page {pageId} content</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Analytics tracking for filter changes (excluding initial state)
 * function ProductList() {
 *   const [filters, setFilters] = useState({ category: 'all', price: 'any' });
 *
 *   useUpdateEffect(() => {
 *     // Track filter changes but not the initial default filters
 *     analytics.track('filters_changed', filters);
 *   }, [filters]);
 *
 *   return <div>...</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Debounced search that doesn't trigger on mount
 * function SearchResults() {
 *   const [query, setQuery] = useState('');
 *   const debouncedQuery = useDebounce(query, 500);
 *
 *   useUpdateEffect(() => {
 *     // Only search when user types, not on initial empty query
 *     if (debouncedQuery) {
 *       performSearch(debouncedQuery);
 *     }
 *   }, [debouncedQuery]);
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
 */
export function useUpdateEffect(
  effect: () => void | (() => void),
  deps: React.DependencyList
): void {
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
