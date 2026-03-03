/**
 * Validates the size of a file based on its type/category.
 * Returns an object indicating whether the file is valid and an optional error message.
 *
 * By default, supports three categories: 'image', 'video', 'document'.
 * You can provide a custom category resolver to extend support for other types.
 *
 * @param {File} file - The file to validate.
 * @param {Record<string, number>} sizeLimits - Maximum allowed sizes for each category in MB.
 * @param {(file: File) => string} [resolveCategory] - Optional function to determine the file's category.
 * @returns {{ isValid: boolean; errorMessage?: string }} Result of the validation.
 *
 * @example
 * const sizeLimits = { image: 5, video: 50, document: 10 };
 * const result = validateFileSize(fileInput.files[0], sizeLimits);
 * if (!result.isValid) {
 *   console.error(result.errorMessage);
 * }
 *
 * @example
 * // Custom category resolver
 * const result = validateFileSize(file, { audio: 10, other: 5 }, file => {
 *   if (file.type.startsWith('audio/')) return 'audio';
 *   return 'other';
 * });
 */
export function validateFileSize(
  file: File,
  sizeLimits: Record<string, number>,
  resolveCategory?: (file: File) => string,
  error?: string
): { isValid: boolean; errorMessage?: string; size?: string } {
  const categoryResolver =
    resolveCategory ??
    ((file: File) => {
      if (file.type.startsWith("image/")) return "image";
      if (file.type.startsWith("video/")) return "video";
      return "document";
    });

  const category = categoryResolver(file);
  const limitMB = sizeLimits[category];
  const fileSizeMB = file.size / (1024 * 1024);

  if (limitMB !== undefined && fileSizeMB > limitMB) {
    const formatSize = (size: number) => size.toFixed(2);
    return {
      isValid: false,
      errorMessage:
        error ?? `File exceeds the limit of ${limitMB} MB for ${category}.`,
      size: formatSize(fileSizeMB),
    };
  }

  return { isValid: true };
}
