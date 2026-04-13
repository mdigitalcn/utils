import { words } from './words.js';

/**
 * Converts a string to PascalCase.
 *
 * @example
 * pascalCase('hello world') // 'HelloWorld'
 * pascalCase('foo-bar-baz') // 'FooBarBaz'
 * pascalCase('some_snake_case') // 'SomeSnakeCase'
 * pascalCase('') // ''
 *
 * @param str - String to convert
 * @returns PascalCase string
 */
export function pascalCase(str: string): string {
  return words(str)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}
