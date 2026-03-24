import { words } from './words.js';

/**
 * Converts a string to kebab-case.
 * Handles spaces, underscores, camelCase, and PascalCase.
 *
 * @example
 * kebabCase('helloWorld') // 'hello-world'
 * kebabCase('FOO_BAR') // 'foo-bar'
 * kebabCase('some string here') // 'some-string-here'
 * kebabCase('PascalCase') // 'pascal-case'
 * kebabCase('') // ''
 *
 * @param str - String to convert
 * @returns kebab-case string
 */
export function kebabCase(str: string): string {
  return words(str).join('-');
}
