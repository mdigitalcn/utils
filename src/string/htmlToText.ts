/**
 * Converts an HTML string into plain text by removing all HTML tags,
 * normalizing whitespace, and trimming extra spaces.
 *
 * If the input is empty or falsy, returns an empty string.
 *
 * @param {string} html - The HTML string to convert.
 * @returns {string} The plain text result.
 *
 * @example
 * const html = `
 *   <h1>Добро пожаловать в <b>MBank</b></h1>
 *   <p>Первый цифровой <a href="https://mbank.example">банк</a> в стране.</p>
 *   <ul>
 *     <li>Онлайн-операции</li>
 *     <li>Мобильное приложение</li>
 *     <li>Безопасные переводы</li>
 *   </ul>
 * `;
 *
 * const text = htmlToText(html);
 * console.log(text);
 * // Output:
 * // "Добро пожаловать в MBank Первый цифровой банк в стране. Онлайн-операции Мобильное приложение Безопасные переводы"
 *

 */
export function htmlToText(html: string): string {
  if (!html) return "";

  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
