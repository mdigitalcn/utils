/**
 * Converts a File or any value to a string suitable for usage in `src` or `href`.
 *
 * - If a `File` object is passed, it creates a temporary object URL using `URL.createObjectURL`.
 * - If a string or any other type is passed, it returns the value as-is.
 *
 * @example
 * // With a File object
 * const file = new File(["Hello"], "hello.txt");
 * const url = convertAnyToString(file);
 * console.log(url);
 * // -> "blob:http://localhost/..." (temporary URL)
 *
 * @example
 * // With a string URL
 * const imageUrl = "https://example.com/image.png";
 * console.log(convertAnyToString(imageUrl));
 * // -> "https://example.com/image.png"
 *
 * @param {File | string | any} file - The value to convert to string
 * @returns {string} A string representation or object URL for the file
 */
export const anyToString = (file: File | string | any): string => {
  if (file instanceof File) {
    return URL.createObjectURL(file);
  }
  return file;
};
