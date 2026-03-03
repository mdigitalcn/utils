/**
 * Type guard to check if a value is an array of File or Blob objects.
 *
 * @example
 * isFileArray([file1, file2]) // true
 * isFileArray("not an array") // false
 * isFileArray([file, "string"]) // false
 *
 * @param value - The value to check
 * @returns boolean - True if the value is an array of File or Blob
 */
export const isFileArray = (value: unknown): value is (File | Blob)[] => {
  return (
    Array.isArray(value) &&
    value.every((item) => item instanceof File || item instanceof Blob)
  );
};
