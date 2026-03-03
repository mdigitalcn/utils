'use client';

import { useCallback, useState } from 'react';

/**
 * Manages a boolean state with a toggle function for convenient on/off switching.
 * Useful for modals, menus, visibility states, and any binary UI states.
 *
 * @param {boolean} [initialValue=false] - The initial boolean state
 * @returns {[boolean, () => void, (value: boolean) => void]} A tuple containing the current state, toggle function, and setter function
 *
 * @example
 * ```tsx
 * function Modal() {
 *   const [isOpen, toggle, setIsOpen] = useToggle(false);
 *
 *   return (
 *     <div>
 *       <button onClick={toggle}>Toggle Modal</button>
 *       <button onClick={() => setIsOpen(true)}>Open Modal</button>
 *       <button onClick={() => setIsOpen(false)}>Close Modal</button>
 *       {isOpen && (
 *         <div className="modal">
 *           <h2>Modal Content</h2>
 *           <button onClick={toggle}>Close</button>
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Sidebar menu toggle
 * function Layout() {
 *   const [isSidebarOpen, toggleSidebar] = useToggle(true);
 *
 *   return (
 *     <div>
 *       <button onClick={toggleSidebar}>
 *         {isSidebarOpen ? 'Hide' : 'Show'} Sidebar
 *       </button>
 *       <aside className={isSidebarOpen ? 'visible' : 'hidden'}>
 *         Sidebar content
 *       </aside>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Dark mode toggle
 * function ThemeToggle() {
 *   const [isDark, toggleTheme] = useToggle(false);
 *
 *   useEffect(() => {
 *     document.body.classList.toggle('dark-mode', isDark);
 *   }, [isDark]);
 *
 *   return (
 *     <button onClick={toggleTheme}>
 *       {isDark ? '🌙' : '☀️'} {isDark ? 'Dark' : 'Light'} Mode
 *     </button>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Password visibility toggle
 * function PasswordInput() {
 *   const [showPassword, toggleShowPassword] = useToggle(false);
 *   const [password, setPassword] = useState('');
 *
 *   return (
 *     <div>
 *       <input
 *         type={showPassword ? 'text' : 'password'}
 *         value={password}
 *         onChange={(e) => setPassword(e.target.value)}
 *       />
 *       <button onClick={toggleShowPassword}>
 *         {showPassword ? 'Hide' : 'Show'} Password
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useToggle(
  initialValue: boolean = false
): [boolean, () => void, (value: boolean) => void] {
  const [state, setState] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return [state, toggle, setState];
}
