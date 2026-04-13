import { isFileArray } from './isFileArray.js';

/**
 * Converts a plain object to FormData.
 * Supports string, number, boolean, File, Blob, or arrays of File/Blob.
 *
 * NOTE: Browser-only — requires FormData, File, Blob APIs.
 *
 * @example
 * const data = {
 *   name: "John",
 *   avatar: file,           // single File
 *   gallery: [file1, file2] // array of Files
 * };
 * const formData = convertToFormData(data);
 *
 * @param {Record<string, any>} data - The object to convert
 * @returns {FormData} FormData object ready for submission
 */
export const convertToFormData = <T extends Record<string, any>>(
  data: T
): FormData => {
  const formData = new FormData();

  for (const key in data) {
    const value = data[key];

    if (value !== undefined && value !== null) {
      if (isFileArray(value)) {
        value.forEach((file: File | Blob) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, value as string | Blob);
      }
    }
  }

  return formData;
};
