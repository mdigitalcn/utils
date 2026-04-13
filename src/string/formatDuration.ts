/**
 * Formats milliseconds into a human-readable duration string.
 *
 * @example
 * formatDuration(0) // '0s'
 * formatDuration(5000) // '5s'
 * formatDuration(65000) // '1m 5s'
 * formatDuration(3661000) // '1h 1m 1s'
 * formatDuration(90061000) // '1d 1h 1m 1s'
 *
 * @param ms - Duration in milliseconds
 * @returns Human-readable duration string
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) return ms > 0 ? `${ms}ms` : '0s';

  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / 60000) % 60;
  const hours = Math.floor(ms / 3600000) % 24;
  const days = Math.floor(ms / 86400000);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);

  return parts.join(' ');
}
