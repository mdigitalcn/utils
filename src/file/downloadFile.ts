/**
 * Asynchronous utility to download a file in the browser.
 *
 * @param getData A function that returns a Promise resolving to a Blob object.
 *                For example, this can be an API call using fetch or RTK Query.
 * @param fileName The name of the file that will be suggested to the user when downloading.
 *
 * @example
 * // Downloading a file from a server
 * downloadFile(() => fetch('/api/report').then(res => res.blob()), 'report.xlsx');
 *
 * @example
 * // Using with RTK Query
 * downloadFile(() => api.endpoints.getReport.initiate(params).unwrap(), 'report.xlsx');
 *
 * @example
 * // Generating a text file on the fly
 * downloadFile(
 *   () => Promise.resolve(new Blob(['Hello World!'], { type: 'text/plain' })),
 *   'hello.txt'
 * );
 *
 * @remarks
 * The object URL is automatically revoked after downloading.
 * In case of an error, an error message is logged to the console.
 */

export const downloadFile = async (
  getData: () => Promise<Blob>,
  fileName: string
) => {
  try {
    const blob = await getData();

    const anchor = document.createElement("a");
    const objectUrl = window.URL.createObjectURL(blob);

    anchor.href = objectUrl;
    anchor.download = fileName;
    anchor.click();

    window.URL.revokeObjectURL(objectUrl);
    console.log("File downloaded successfully!");
  } catch (err) {
    console.error("Error downloading file!", err);
  }
};
