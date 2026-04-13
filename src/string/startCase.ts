import { words } from './words.js';

/**
 * Converts a string to Start Case (each word capitalized, separated by spaces).
 *
 * @example
 * startCase('hello world') // 'Hello World'
 * startCase('fooBarBaz') // 'Foo Bar Baz'
 * startCase('some_snake_case') // 'Some Snake Case'
 * startCase('') // ''
 *
 * @param str - String to convert
 * @returns Start Case string
 */
export function startCase(str: string): string {
  return words(str)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}
