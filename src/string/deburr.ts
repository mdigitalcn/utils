/**
 * Removes diacritical marks (accents) from a string by converting to ASCII equivalents.
 *
 * @example
 * deburr('café') // 'cafe'
 * deburr('Crème brûlée') // 'Creme brulee'
 * deburr('München') // 'Munchen'
 * deburr('hello') // 'hello'
 *
 * @param str - String to deburr
 * @returns ASCII-safe string
 */
export function deburr(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
