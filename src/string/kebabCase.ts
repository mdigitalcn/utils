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
  if (!str) return '';

  return str
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .join('-');
}
