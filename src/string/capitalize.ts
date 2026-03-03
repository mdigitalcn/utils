/**
 * Capitalizes the first letter of a string.
 *
 * @example
 * capitalize('hello') // 'Hello'
 *
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
