/**
 * Splits a string into an array of words.
 * Handles spaces, hyphens, underscores, camelCase, and PascalCase boundaries.
 *
 * @example
 * words('helloWorld') // ['hello', 'world']
 * words('foo-bar_baz') // ['foo', 'bar', 'baz']
 * words('FOO_BAR') // ['foo', 'bar']
 * words('PascalCase') // ['pascal', 'case']
 * words('') // []
 *
 * @param str - String to split
 * @returns Array of lowercase words
 */
export function words(str: string): string[] {
  if (!str) return [];

  return str
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .trim()
    .toLowerCase()
    .split(/\s+/);
}
