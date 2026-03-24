import { words } from './words.js';

/**
 * Converts a string to snake_case.
 * Handles spaces, hyphens, camelCase, and PascalCase.
 *
 * @example
 * snakeCase('helloWorld') // 'hello_world'
 * snakeCase('foo-bar-baz') // 'foo_bar_baz'
 * snakeCase('Some String Here') // 'some_string_here'
 * snakeCase('PascalCase') // 'pascal_case'
 * snakeCase('') // ''
 *
 * @param str - String to convert
 * @returns snake_case string
 */
export function snakeCase(str: string): string {
  return words(str).join('_');
}
