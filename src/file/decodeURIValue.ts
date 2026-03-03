/**
 * Extracts the file name from a URI or URL string.
 * Decodes the URI first, so escape sequences like `%20` become normal characters.
 * Returns an empty string if decoding fails or the path is invalid.
 *
 * @example
 * decodeURIValue('https://example.com/files/%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80.pdf')
 * // → 'пример.pdf'
 *
 * @example
 * decodeURIValue('file:///C:/Users/John/Documents/file.txt')
 * // → 'file.txt'
 *
 * @example
 * decodeURIValue('invalid%URI')
 * // → ''
 *
 * @param {string} file - The URI or URL string to decode and extract the file name from
 * @returns {string} The decoded file name, or an empty string if decoding fails
 */
export const decodeURIValue = (file: string): string => {
  try {
    return decodeURI(file).split("/").pop() || "";
  } catch {
    return "";
  }
};
