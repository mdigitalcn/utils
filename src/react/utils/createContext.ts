'use client';

import { createContext as reactCreateContext, useContext } from 'react';

/**
 * Creates a type-safe React context with a custom hook.
 *
 * @example
 * const [ThemeProvider, useTheme] = createContext<{ theme: string }>('Theme');
 *
 * function App() {
 *   return (
 *     <ThemeProvider value={{ theme: 'dark' }}>
 *       <Child />
 *     </ThemeProvider>
 *   );
 * }
 *
 * function Child() {
 *   const { theme } = useTheme(); // Type-safe!
 *   return <div>{theme}</div>;
 * }
 *
 * @param displayName - Display name for debugging
 * @returns Tuple of [Provider, useContext hook]
 */
export function createContext<T>(
  displayName: string
): [
  React.Provider<T | undefined>,
  () => T
] {
  const Context = reactCreateContext<T | undefined>(undefined);
  Context.displayName = displayName;

  function useContextHook(): T {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error(
        `use${displayName} must be used within a ${displayName}Provider`
      );
    }
    return context;
  }

  return [Context.Provider, useContextHook];
}
