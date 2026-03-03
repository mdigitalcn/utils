/**
 * Converts a `File` object to a Base64-encoded string.
 *
 * Uses the FileReader API to read the file as a Data URL.
 * Returns a promise that resolves with the Base64 string when the file is successfully read,
 * or rejects with an error if reading fails.
 *
 * @example
 * const fileInput = document.querySelector('input[type="file"]')!;
 * fileInput.addEventListener('change', async (event) => {
 *   const file = (event.target as HTMLInputElement).files![0];
 *   const base64 = await getBase64(file);
 *   console.log(base64); // "data:image/png;base64,iVBORw0KG..."
 * });
 *
 * @param {File} file - The file to convert to Base64
 * @returns {Promise<string>} A promise that resolves with the Base64 string
 */
export const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
