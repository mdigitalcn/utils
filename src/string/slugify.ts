/**
 * Converts a string to a URL-friendly slug.
 * Lowercases, replaces non-alphanumeric chars with hyphens, trims hyphens.
 *
 * @example
 * slugify('Hello World!') // 'hello-world'
 * slugify('  Crème Brûlée ') // 'cr-me-br-l-e'
 * slugify('foo---bar') // 'foo-bar'
 * slugify('') // ''
 *
 * @param str - String to slugify
 * @returns URL-safe slug
 */
export function slugify(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
