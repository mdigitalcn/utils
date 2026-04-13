/**
 * Formats a byte count into a human-readable string.
 *
 * @example
 * formatBytes(0) // '0 B'
 * formatBytes(1024) // '1 KB'
 * formatBytes(1536, 1) // '1.5 KB'
 * formatBytes(1073741824) // '1 GB'
 * formatBytes(1234567890, 2) // '1.15 GB'
 *
 * @param bytes - Number of bytes
 * @param decimals - Decimal places (default: 2)
 * @returns Formatted string (e.g., '1.5 MB')
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = Math.max(0, decimals);
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
