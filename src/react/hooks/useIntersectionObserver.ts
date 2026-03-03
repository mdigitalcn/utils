'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Observes when an element enters or leaves the viewport using the Intersection Observer API.
 * Useful for lazy loading, infinite scroll, animations on scroll, and tracking element visibility.
 * Uses React 19's ref pattern without forwardRef.
 *
 * @template T - The type of HTML element (extends HTMLElement)
 * @param {IntersectionObserverInit} [options] - Configuration options for the IntersectionObserver
 * @returns {[React.RefObject<T>, boolean]} A tuple containing the ref to attach and the visibility state
 *
 * @example
 * ```tsx
 * function LazyImage({ src, alt }: { src: string; alt: string }) {
 *   const [ref, isVisible] = useIntersectionObserver<HTMLImageElement>({
 *     threshold: 0.1,
 *     rootMargin: '50px',
 *   });
 *
 *   return (
 *     <img
 *       ref={ref}
 *       src={isVisible ? src : 'placeholder.jpg'}
 *       alt={alt}
 *       style={{ opacity: isVisible ? 1 : 0.5 }}
 *     />
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Fade in animation when element enters viewport
 * function FadeInSection({ children }: { children: React.ReactNode }) {
 *   const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
 *     threshold: 0.5,
 *     triggerOnce: true,
 *   });
 *
 *   return (
 *     <div
 *       ref={ref}
 *       className={`fade-in ${isVisible ? 'visible' : ''}`}
 *     >
 *       {children}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Infinite scroll implementation
 * function InfiniteList() {
 *   const [items, setItems] = useState<string[]>(initialItems);
 *   const [sentinelRef, isVisible] = useIntersectionObserver<HTMLDivElement>({
 *     threshold: 1.0,
 *   });
 *
 *   useEffect(() => {
 *     if (isVisible) {
 *       // Load more items when sentinel becomes visible
 *       loadMoreItems().then(newItems => {
 *         setItems(prev => [...prev, ...newItems]);
 *       });
 *     }
 *   }, [isVisible]);
 *
 *   return (
 *     <div>
 *       {items.map(item => <div key={item}>{item}</div>)}
 *       <div ref={sentinelRef}>Loading more...</div>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Analytics tracking for viewport visibility
 * function TrackableSection({ id, children }: { id: string; children: React.ReactNode }) {
 *   const [ref, isVisible] = useIntersectionObserver<HTMLElement>({
 *     threshold: 0.75,
 *   });
 *
 *   useEffect(() => {
 *     if (isVisible) {
 *       analytics.track('section_viewed', { sectionId: id });
 *     }
 *   }, [isVisible, id]);
 *
 *   return (
 *     <section ref={ref}>
 *       {children}
 *     </section>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Sticky header that changes on scroll
 * function Header() {
 *   const [triggerRef, hasScrolled] = useIntersectionObserver<HTMLDivElement>({
 *     threshold: 1.0,
 *   });
 *
 *   return (
 *     <>
 *       <div ref={triggerRef} style={{ height: 1 }} />
 *       <header className={hasScrolled ? 'sticky' : 'normal'}>
 *         Navigation
 *       </header>
 *     </>
 *   );
 * }
 * ```
 */
export function useIntersectionObserver<T extends HTMLElement>(
  options?: IntersectionObserverInit
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Destructure options for proper dependency tracking
  const { threshold = 0, root = null, rootMargin = '0px' } = options || {};

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === 'undefined') {
      console.warn('IntersectionObserver is not supported in this browser');
      // Default to visible if not supported
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin]);

  return [ref, isIntersecting];
}
