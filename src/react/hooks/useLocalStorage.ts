'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Manages state that persists to localStorage with automatic synchronization across tabs.
 * Handles SSR safely and provides type-safe storage operations with JSON serialization.
 *
 * @template T - The type of the stored value
 * @param {string} key - The localStorage key to store the value under
 * @param {T} initialValue - The default value if no stored value exists
 * @returns {[T, (value: T | ((prev: T) => T)) => void]} A stateful value and setter function
 *
 * @example
 * ```tsx
 * function ThemeSelector() {
 *   const [theme, setTheme] = useLocalStorage('theme', 'light');
 *
 *   return (
 *     <div>
 *       <p>Current theme: {theme}</p>
 *       <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
 *         Toggle Theme
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Storing complex objects
 * interface UserPreferences {
 *   notifications: boolean;
 *   language: string;
 *   fontSize: number;
 * }
 *
 * function UserSettings() {
 *   const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
 *     'user-preferences',
 *     { notifications: true, language: 'en', fontSize: 16 }
 *   );
 *
 *   return (
 *     <div>
 *       <label>
 *         <input
 *           type="checkbox"
 *           checked={preferences.notifications}
 *           onChange={(e) =>
 *             setPreferences({ ...preferences, notifications: e.target.checked })
 *           }
 *         />
 *         Enable notifications
 *       </label>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Using functional updates
 * function ShoppingCart() {
 *   const [cart, setCart] = useLocalStorage<string[]>('cart', []);
 *
 *   const addItem = (item: string) => {
 *     setCart((prev) => [...prev, item]);
 *   };
 *
 *   return (
 *     <div>
 *       <p>Items in cart: {cart.length}</p>
 *       <button onClick={() => addItem('Product')}>Add Item</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue((prevValue) => {
          // Allow value to be a function so we have same API as useState
          const valueToStore = value instanceof Function ? value(prevValue) : value;

          // Save to localStorage
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            // Dispatch storage event for cross-tab synchronization
            window.dispatchEvent(
              new StorageEvent('storage', {
                key,
                newValue: JSON.stringify(valueToStore),
                storageArea: window.localStorage,
              })
            );
          }

          return valueToStore;
        });
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  // Listen for changes in other tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        if (e.newValue !== null) {
          try {
            setStoredValue(JSON.parse(e.newValue) as T);
          } catch (error) {
            console.warn(`Error parsing localStorage change for key "${key}":`, error);
          }
        } else {
          // Key was removed or storage was cleared
          setStoredValue(initialValue);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue];
}
