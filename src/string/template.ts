/**
 * Simple string template interpolation using `{{key}}` placeholders.
 *
 * @example
 * template('Hello, {{name}}!', { name: 'World' }) // 'Hello, World!'
 * template('{{a}} + {{b}} = {{c}}', { a: 1, b: 2, c: 3 }) // '1 + 2 = 3'
 * template('Hi <name>', { name: 'Ray' }, /<(.+?)>/g) // 'Hi Ray'
 *
 * @param str - Template string
 * @param data - Object with replacement values
 * @param regex - Custom pattern (default: /\{\{(.+?)\}\}/g)
 * @returns Interpolated string
 */
export function template(
  str: string,
  data: Record<string, any>,
  regex: RegExp = /\{\{(.+?)\}\}/g
): string {
  return str.replace(regex, (_, key) => {
    const value = data[key.trim()];
    return value !== undefined && value !== null ? String(value) : '';
  });
}
