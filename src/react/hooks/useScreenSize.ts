"use client";

import { useEffect, useState } from "react";

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

/**
 * React hook to track the current window size and determine
 * if the width is less than or equal to a given threshold (e.g., 768px).
 *
 * Useful for responsive rendering or logic that depends on device width.
 *
 * @param {number} [threshold=768] - Width threshold in pixels.
 * @returns {boolean} `true` if the window width is less than or equal to `threshold`, otherwise `false`.
 *
 * @example
 * ```tsx
 * function ResponsiveComponent() {
 *   const isMobile = useScreenSize(768);
 *
 *   return (
 *     <div>
 *       {isMobile ? <MobileMenu /> : <DesktopNavigation />}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * function Layout() {
 *   const isTablet = useScreenSize(1024);
 *
 *   return (
 *     <div className={isTablet ? 'compact-layout' : 'wide-layout'}>
 *       <MainContent />
 *     </div>
 *   );
 * }
 * ```
 */
export function useScreenSize(threshold: number = 768): boolean {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Prevent SSR issues
    if (typeof window === 'undefined') {
      return;
    }

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // set initial size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (windowSize.width ?? 0) <= threshold;
}
