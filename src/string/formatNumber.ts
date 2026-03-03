"use client";

/**
 * Formats a number or numeric string by adding thousands separators
 * according to the specified locale.
 *
 * If the value is not a number, returns the original string.
 *
 * @param {number | string} number - Number or string to format.
 * @param {string} [locale='en-US'] - Locale for formatting (e.g., 'en-US', 'ru-RU').
 * @returns {string} Formatted string with thousands separators or original value if not a number.
 *
 * @example
 * ```ts
 * formatNumber(1234567); // "1,234,567"
 * formatNumber(1234567, 'ru-RU'); // "1 234 567"
 * formatNumber("987654321"); // "987,654,321"
 * formatNumber("abc"); // "abc"
 * ```
 */
export const formatNumber = (
  number: number | string,
  locale: string = "en-US"
): string => {
  const value = Number(number);

  if (!isNaN(value)) {
    return new Intl.NumberFormat(locale).format(value);
  }

  return String(number);
};
