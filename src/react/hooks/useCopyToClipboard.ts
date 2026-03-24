'use client';

import { useCallback, useState } from 'react';

/**
 * Copies text to the clipboard and tracks the copied state.
 * Resets the copied state after the specified timeout.
 *
 * @example
 * ```tsx
 * function CopyButton({ text }: { text: string }) {
 *   const [copiedText, copy] = useCopyToClipboard();
 *
 *   return (
 *     <button onClick={() => copy(text)}>
 *       {copiedText ? 'Copied!' : 'Copy'}
 *     </button>
 *   );
 * }
 * ```
 *
 * @param resetDelay - Time in ms before the copied state resets (default: 2000)
 * @returns Tuple of [copiedText, copyFn]
 */
export function useCopyToClipboard(
  resetDelay = 2000
): [string | null, (text: string) => Promise<boolean>] {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (!navigator?.clipboard) {
        console.warn('Clipboard API not available');
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);

        if (resetDelay > 0) {
          setTimeout(() => setCopiedText(null), resetDelay);
        }

        return true;
      } catch (error) {
        console.warn('Copy to clipboard failed:', error);
        setCopiedText(null);
        return false;
      }
    },
    [resetDelay]
  );

  return [copiedText, copy];
}
