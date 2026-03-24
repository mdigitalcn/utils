/**
 * Safely parses a JSON string.
 *
 * Returns the parsed value if the string is valid.
 * If the input is empty, null, undefined, or invalid JSON, it returns the fallback value.
 *
 * @example
 * jsonParse('{"a": 1}')          // { a: 1 }
 * jsonParse('not json')          // "" (fallback)
 * jsonParse('')                  // "" (fallback)
 * jsonParse(null)                // "" (fallback)
 * jsonParse('true')              // true
 * jsonParse('{"a": 1}', null)    // { a: 1 }
 * jsonParse('bad', [])           // []
 *
 * @param value - The string to parse.
 * @param fallback - Value to return if parsing fails or value is empty (default is "").
 * @returns The parsed value or the fallback.
 */
export function jsonParse<T = any>(
  value: string | null | undefined,
  fallback: T = "" as unknown as T
): T {
  if (value == null || value === "") {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}
