'use client';

import { useEffect, useState } from 'react';

/**
 * Debounces a value, delaying updates until the specified delay has passed since the last change.
 * Useful for expensive operations like API calls, search filtering, or form validation.
 *
 * @template T - The type of the value to debounce
 * @param {T} value - The value to debounce
 * @param {number} delay - The debounce delay in milliseconds
 * @returns {T} The debounced value
 *
 * @example
 * ```tsx
 * function SearchInput() {
 *   const [searchTerm, setSearchTerm] = useState('');
 *   const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 *   useEffect(() => {
 *     if (debouncedSearchTerm) {
 *       // API call will only trigger 500ms after user stops typing
 *       fetchSearchResults(debouncedSearchTerm);
 *     }
 *   }, [debouncedSearchTerm]);
 *
 *   return (
 *     <input
 *       value={searchTerm}
 *       onChange={(e) => setSearchTerm(e.target.value)}
 *       placeholder="Search..."
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Debouncing complex objects
 * function FilterPanel() {
 *   const [filters, setFilters] = useState({ price: 0, category: '' });
 *   const debouncedFilters = useDebounce(filters, 300);
 *
 *   useEffect(() => {
 *     applyFilters(debouncedFilters);
 *   }, [debouncedFilters]);
 *
 *   return (
 *     <div>
 *       <input
 *         type="number"
 *         value={filters.price}
 *         onChange={(e) => setFilters({ ...filters, price: Number(e.target.value) })}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
