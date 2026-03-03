/**
 * Escapes HTML special characters to prevent XSS attacks.
 * Converts &, <, >, ", ' to their HTML entity equivalents.
 *
 * @example
 * escapeHtml('<script>alert("xss")</script>')
 * // '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 *
 * @example
 * escapeHtml("it's a <b>test</b> & more")
 * // "it&#39;s a &lt;b&gt;test&lt;/b&gt; &amp; more"
 *
 * @param str - String to escape
 * @returns Escaped string safe for HTML insertion
 */
export function escapeHtml(str: string): string {
  if (!str) return '';

  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return str.replace(/[&<>"']/g, (char) => escapeMap[char]);
}
