/**
 * Converts an object of query parameters into a URL query string.
 *
 * Useful for constructing URLs with GET parameters for fetch requests,
 * axios, navigation, or any situation where query strings are needed.
 *
 * Accepts strings, numbers, booleans, null, and undefined values.
 * Numbers and booleans are automatically converted to strings.
 * Null and undefined values are converted to empty strings.
 *
 * @interface QueryParams
 * @property {string | number | boolean | null | undefined} [key: string] - A mapping of parameter names to values.
 *
 * @param {QueryParams} queryParams - An object representing the query parameters.
 * @returns {string} The URL-encoded query string.
 *
 * @example
 * const params = { search: "apple", page: 2, active: true };
 * const queryString = createQueryString(params);
 * console.log(queryString);
 * // Output: "search=apple&page=2&active=true"
 *
 * @example
 * // Using with fetch
 * const apiUrl = `https://example.com/products?${createQueryString({ category: "fruits", limit: 10 })}`;
 * fetch(apiUrl)
 *   .then(res => res.json())
 *   .then(data => console.log(data));
 *
 * @example
 * // Handling empty objects
 * const queryStringEmpty = createQueryString({});
 * console.log(queryStringEmpty); // ""
 *
 * @example
 * // Mixed types
 * createQueryString({ name: "John", age: 30, verified: true })
 * // "name=John&age=30&verified=true"
 */
export interface QueryParams {
  [key: string]: string | number | boolean | null | undefined;
}

export const createQueryString = (queryParams: QueryParams): string => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== null && value !== undefined) {
      params.append(key, String(value));
    }
  }

  return params.toString();
};
