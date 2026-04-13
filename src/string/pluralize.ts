/**
 * Returns singular or plural form based on count.
 *
 * @example
 * pluralize(0, 'item') // '0 items'
 * pluralize(1, 'item') // '1 item'
 * pluralize(5, 'item') // '5 items'
 * pluralize(2, 'child', 'children') // '2 children'
 * pluralize(1, 'person', 'people') // '1 person'
 *
 * @param count - The number
 * @param singular - Singular form
 * @param plural - Plural form (default: singular + 's')
 * @returns Formatted count + word
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  const word = count === 1 ? singular : (plural ?? `${singular}s`);
  return `${count} ${word}`;
}
