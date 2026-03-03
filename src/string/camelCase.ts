/**
 * Converts a string to camelCase.
 * Handles spaces, hyphens, underscores, and mixed casing.
 *
 * @example
 * camelCase('hello world') // 'helloWorld'
 * camelCase('foo-bar-baz') // 'fooBarBaz'
 * camelCase('FOO_BAR') // 'fooBar'
 * camelCase('some-Mixed_string') // 'someMixedString'
 * camelCase('') // ''
 *
 * @param str - String to convert
 * @returns camelCase string
 */
export function camelCase(str: string): string {
  if (!str) return '';

  const words = str
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .trim()
    .toLowerCase()
    .split(/\s+/);

  return words
    .map((word, i) =>
      i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');
}
