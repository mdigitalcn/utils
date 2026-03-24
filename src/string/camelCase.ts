import { words } from './words.js';

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
  const w = words(str);
  if (w.length === 0) return '';

  return w
    .map((word, i) =>
      i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');
}
