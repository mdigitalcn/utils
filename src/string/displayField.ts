import { ReactNode } from "react";

/**
 * Возвращает значение для отображения в интерфейсе с учетом пустых или неопределенных данных.
 *
 * Используется для того, чтобы поля с `null`, `undefined` или пустой строкой показывали
 * плейсхолдер вместо пустого значения, а числа отображались корректно.
 *
 * @example
 * displayField(42)
 * // → 42
 *
 * @example
 * displayField(null)
 * // → '-'
 *
 * @example
 * displayField(undefined, 'N/A')
 * // → 'N/A'
 *
 * @example
 * displayField('Hello')
 * // → 'Hello'
 *
 * @example
 * displayField(<strong>Hi</strong>)
 * // → <strong>Hi</strong>
 *
 * @param {string | number | ReactNode | null | undefined} field - Значение для отображения
 * @param {string | number} [placeholder='-'] - Значение, показываемое при пустом поле
 * @returns {string | number | ReactNode} Возвращает поле, если оно есть, или плейсхолдер
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
