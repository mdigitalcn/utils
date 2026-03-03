'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Manages state that persists to sessionStorage with automatic synchronization.
 * Similar to useLocalStorage but data is cleared when the page session ends (tab/window closes).
 * Handles SSR safely and provides type-safe storage operations with JSON serialization.
 *
 * @template T - The type of the stored value
 * @param {string} key - The sessionStorage key to store the value under
 * @param {T} initialValue - The default value if no stored value exists
 * @returns {[T, (value: T | ((prev: T) => T)) => void]} A stateful value and setter function
 *
 * @example
 * function WizardForm() {
 *   const [step, setStep] = useSessionStorage('wizard-step', 1);
 *   const [formData, setFormData] = useSessionStorage('wizard-data', {});
 *
 *   return (
 *     <div>
 *       <p>Step {step} of 3</p>
 *       <button onClick={() => setStep(step + 1)}>Next</button>
 *     </div>
 *   );
 * }
 *
 * @example
 * interface FilterState {
 *   search: string;
 *   category: string;
 *   sortBy: string;
 * }
 *
 * function ProductList() {
 *   const [filters, setFilters] = useSessionStorage<FilterState>(
 *     'product-filters',
 *     { search: '', category: 'all', sortBy: 'name' }
 *   );
 *
 *   return (
 *     <div>
 *       <input
 *         value={filters.search}
 *         onChange={(e) => setFilters({ ...filters, search: e.target.value })}
 *         placeholder="Search products..."
 *       />
 *     </div>
 *   );
 * }
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue((prevValue) => {
          const valueToStore = value instanceof Function ? value(prevValue) : value;

          if (typeof window !== 'undefined') {
            window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
            // Note: Storage events don't fire for sessionStorage in other tabs
            // since sessionStorage is tab-specific. This event dispatch is removed
            // as it serves no practical purpose for sessionStorage.
          }

          return valueToStore;
        });
      } catch (error) {
        console.warn(`Error setting sessionStorage key "${key}":`, error);
      }
    },
    [key]
  );

  // Note: Storage event listener removed for sessionStorage
  // SessionStorage is tab-specific and doesn't sync across tabs like localStorage

  return [storedValue, setValue];
}
