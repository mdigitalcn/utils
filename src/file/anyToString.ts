/**
 * Converts a File or string value to a string suitable for usage in `src` or `href`.
 *
 * - If a `File` object is passed, it creates a temporary object URL using `URL.createObjectURL`.
 * - If a string is passed, it returns the value as-is.
 *
 * @example
 * // With a File object
 * const file = new File(["Hello"], "hello.txt");
 * const url = anyToString(file);
 * console.log(url);
 * // -> "blob:http://localhost/..." (temporary URL)
 *
 * @example
 * // With a string URL
 * const imageUrl = "https://example.com/image.png";
 * console.log(anyToString(imageUrl));
 * // -> "https://example.com/image.png"
 *
 * @param {File | string} value - The File or string to convert
 * @returns {string} A string representation or object URL for the file
 */
export const anyToString = (value: File | string): string => {
  if (value instanceof File) {
    return URL.createObjectURL(value);
  }
  return value;
};
