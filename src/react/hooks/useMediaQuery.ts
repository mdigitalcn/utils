'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks whether a CSS media query matches the current viewport.
 * Automatically updates when the viewport changes. Handles SSR safely.
 *
 * @param {string} query - The media query string to evaluate (e.g., '(min-width: 768px)')
 * @returns {boolean} True if the media query matches, false otherwise
 *
 * @example
 * ```tsx
 * function ResponsiveLayout() {
 *   const isMobile = useMediaQuery('(max-width: 768px)');
 *   const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
 *   const isDesktop = useMediaQuery('(min-width: 1025px)');
 *
 *   return (
 *     <div>
 *       {isMobile && <MobileNav />}
 *       {isTablet && <TabletNav />}
 *       {isDesktop && <DesktopNav />}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Dark mode detection
 * function ThemeAwareComponent() {
 *   const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 *
 *   return (
 *     <div className={prefersDark ? 'dark-theme' : 'light-theme'}>
 *       System theme: {prefersDark ? 'Dark' : 'Light'}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Reduced motion preference
 * function AnimatedComponent() {
 *   const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
 *
 *   return (
 *     <div
 *       className={prefersReducedMotion ? 'no-animation' : 'with-animation'}
 *     >
 *       Content
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Portrait/landscape detection
 * function OrientationAwareComponent() {
 *   const isPortrait = useMediaQuery('(orientation: portrait)');
 *
 *   return (
 *     <div>
 *       <p>Device orientation: {isPortrait ? 'Portrait' : 'Landscape'}</p>
 *       {isPortrait ? <PortraitLayout /> : <LandscapeLayout />}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Conditional rendering based on screen size
 * function DataTable() {
 *   const isLargeScreen = useMediaQuery('(min-width: 1200px)');
 *
 *   return isLargeScreen ? (
 *     <DetailedTable columns={allColumns} />
 *   ) : (
 *     <CompactTable columns={essentialColumns} />
 *   );
 * }
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevent SSR issues
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => getMatches(query));

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);

    // Update state with current value
    setMatches(mediaQuery.matches);

    // Define the event handler
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers support addEventListener
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
