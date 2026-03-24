import { ReactNode } from "react";

/**
 * Returns a display-safe value for UI rendering, substituting a placeholder
 * for empty, null, or undefined fields. Numbers are always shown as-is.
 *
 * @example
 * displayField(42)          // 42
 * displayField(null)        // '-'
 * displayField(undefined, 'N/A') // 'N/A'
 * displayField('Hello')     // 'Hello'
 * displayField('')          // '-'
 *
 * @param {string | number | ReactNode | null | undefined} field - The value to display
 * @param {string | number} [placeholder='-'] - Fallback shown when field is empty/null/undefined
 * @returns {string | number | ReactNode} The field value or the placeholder
 */
export const displayField = (
  field: string | number | ReactNode | null | undefined,
  placeholder: string | number = "-"
): string | number | ReactNode => {
  if (typeof field === "number") {
    return field;
  }

  if (!field) {
    return placeholder;
  }

  return field;
};
