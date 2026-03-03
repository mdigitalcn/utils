/**
 * Truncates a string to a specified maximum length and adds an ellipsis (`...`) if truncated.
 *
 * @example
 * truncateString("Hello, world!", 5) // "Hello..."
 * truncateString("Short", 10)        // "Short"
 *
 * @param str - The string to truncate
 * @param maxLength - Maximum length of the returned string
 * @returns The truncated string with ellipsis if needed, otherwise the original string
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str;
}
