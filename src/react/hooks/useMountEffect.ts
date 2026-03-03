'use client';

import { useEffect } from 'react';

/**
 * Runs an effect only once when the component mounts, similar to componentDidMount.
 * This is a semantic wrapper around useEffect with an empty dependency array.
 * Supports cleanup functions that run on unmount.
 *
 * @param {() => void | (() => void)} effect - The effect function to run on mount. Can return a cleanup function.
 *
 * @example
 * ```tsx
 * function DataFetcher() {
 *   const [data, setData] = useState(null);
 *
 *   useMountEffect(() => {
 *     fetchData().then(setData);
 *   });
 *
 *   return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With cleanup function
 * function WebSocketConnection() {
 *   const [messages, setMessages] = useState<string[]>([]);
 *
 *   useMountEffect(() => {
 *     const ws = new WebSocket('ws://localhost:8080');
 *
 *     ws.onmessage = (event) => {
 *       setMessages(prev => [...prev, event.data]);
 *     };
 *
 *     // Cleanup: close connection on unmount
 *     return () => {
 *       ws.close();
 *     };
 *   });
 *
 *   return (
 *     <ul>
 *       {messages.map((msg, i) => <li key={i}>{msg}</li>)}
 *     </ul>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Analytics tracking
 * function PageView({ pageName }: { pageName: string }) {
 *   useMountEffect(() => {
 *     analytics.track('page_view', { page: pageName });
 *   });
 *
 *   return <div>Page content</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Event listener setup
 * function KeyboardShortcuts() {
 *   useMountEffect(() => {
 *     const handleKeyPress = (e: KeyboardEvent) => {
 *       if (e.ctrlKey && e.key === 's') {
 *         e.preventDefault();
 *         save();
 *       }
 *     };
 *
 *     window.addEventListener('keydown', handleKeyPress);
 *
 *     return () => {
 *       window.removeEventListener('keydown', handleKeyPress);
 *     };
 *   });
 *
 *   return <div>Press Ctrl+S to save</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Third-party library initialization
 * function ChartComponent() {
 *   const chartRef = useRef<HTMLDivElement>(null);
 *
 *   useMountEffect(() => {
 *     if (!chartRef.current) return;
 *
 *     const chart = new Chart(chartRef.current, {
 *       type: 'bar',
 *       data: chartData,
 *     });
 *
 *     return () => {
 *       chart.destroy();
 *     };
 *   });
 *
 *   return <div ref={chartRef} />;
 * }
 * ```
 */
export function useMountEffect(effect: () => void | (() => void)): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}
