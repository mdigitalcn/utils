/**
 * Escapes special regex characters in a string so it can be used in `new RegExp()`.
 *
 * @example
 * escapeRegExp('hello.world') // 'hello\\.world'
 * escapeRegExp('$100 (USD)') // '\\$100 \\(USD\\)'
 * new RegExp(escapeRegExp(userInput)) // safe to use
 *
 * @param str - String to escape
 * @returns Escaped string safe for RegExp construction
 */
export function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
