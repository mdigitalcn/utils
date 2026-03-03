'use client';

import { useEffect, useRef } from 'react';

/**
 * Detects clicks outside of a specified element and triggers a callback.
 * Useful for dropdowns, modals, popovers, and menus that should close when clicking outside.
 * Uses React 19's ref pattern without forwardRef.
 *
 * @template T - The type of HTML element (extends HTMLElement)
 * @param {() => void} callback - Function to call when a click outside is detected
 * @returns {React.RefObject<T>} A ref object to attach to the target element
 *
 * @example
 * ```tsx
 * function Dropdown() {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const dropdownRef = useClickOutside<HTMLDivElement>(() => {
 *     setIsOpen(false);
 *   });
 *
 *   return (
 *     <div ref={dropdownRef}>
 *       <button onClick={() => setIsOpen(!isOpen)}>Toggle Menu</button>
 *       {isOpen && (
 *         <ul className="dropdown-menu">
 *           <li>Option 1</li>
 *           <li>Option 2</li>
 *           <li>Option 3</li>
 *         </ul>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Modal that closes on outside click
 * function Modal({ onClose }: { onClose: () => void }) {
 *   const modalRef = useClickOutside<HTMLDivElement>(onClose);
 *
 *   return (
 *     <div className="modal-overlay">
 *       <div ref={modalRef} className="modal-content">
 *         <h2>Modal Title</h2>
 *         <p>Click outside to close</p>
 *         <button onClick={onClose}>Close</button>
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Search suggestions that close on outside click
 * function SearchWithSuggestions() {
 *   const [query, setQuery] = useState('');
 *   const [showSuggestions, setShowSuggestions] = useState(false);
 *   const searchRef = useClickOutside<HTMLDivElement>(() => {
 *     setShowSuggestions(false);
 *   });
 *
 *   return (
 *     <div ref={searchRef}>
 *       <input
 *         value={query}
 *         onChange={(e) => {
 *           setQuery(e.target.value);
 *           setShowSuggestions(true);
 *         }}
 *         placeholder="Search..."
 *       />
 *       {showSuggestions && query && (
 *         <ul className="suggestions">
 *           <li>Suggestion 1</li>
 *           <li>Suggestion 2</li>
 *         </ul>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Context menu (right-click menu)
 * function ContextMenu() {
 *   const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
 *   const menuRef = useClickOutside<HTMLDivElement>(() => {
 *     setPosition(null);
 *   });
 *
 *   const handleContextMenu = (e: React.MouseEvent) => {
 *     e.preventDefault();
 *     setPosition({ x: e.clientX, y: e.clientY });
 *   };
 *
 *   return (
 *     <div onContextMenu={handleContextMenu}>
 *       Right-click me
 *       {position && (
 *         <div
 *           ref={menuRef}
 *           style={{ position: 'fixed', top: position.y, left: position.x }}
 *           className="context-menu"
 *         >
 *           <button>Copy</button>
 *           <button>Paste</button>
 *           <button>Delete</button>
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function useClickOutside<T extends HTMLElement>(
  callback: () => void
): React.RefObject<T | null> {
  const ref = useRef<T>(null);
  const callbackRef = useRef(callback);

  // Keep callback ref up to date
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callbackRef.current();
      }
    };

    // Add event listeners for both mouse and touch events
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []); // Empty deps - event listeners only set up once

  return ref;
}
