/**
 * Masks a portion of a string, revealing only start and end characters.
 * Useful for credit cards, phone numbers, emails, API keys.
 *
 * @example
 * maskString('1234567890', 4, 2) // '1234****90'
 * maskString('hello@example.com', 2, 4) // 'he***********e.com'
 * maskString('secret', 0, 0) // '******'
 * maskString('ab', 1, 1, '#') // 'ab' (nothing to mask)
 *
 * @param str - String to mask
 * @param visibleStart - Number of visible chars at start
 * @param visibleEnd - Number of visible chars at end
 * @param maskChar - Character used for masking (default: '*')
 * @returns Masked string
 */
export function maskString(
  str: string,
  visibleStart: number,
  visibleEnd: number,
  maskChar: string = '*'
): string {
  if (str.length <= visibleStart + visibleEnd) return str;
  const start = str.slice(0, visibleStart);
  const end = visibleEnd > 0 ? str.slice(-visibleEnd) : '';
  const maskLen = str.length - visibleStart - visibleEnd;
  return start + maskChar.repeat(maskLen) + end;
}
