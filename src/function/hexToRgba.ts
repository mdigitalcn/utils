/**
 * Regular expression to validate HEX color strings.
 *
 * Matches both short and full HEX color formats:
 * - Short format: `#RGB` (e.g., `#f0a`)
 * - Full format: `#RRGGBB` (e.g., `#ff00aa`)
 *
 * @example
 * HEX_COLOR_REGEX.test('#fff')      // true
 * HEX_COLOR_REGEX.test('#123456')   // true
 * HEX_COLOR_REGEX.test('123456')    // false (missing #)
 * HEX_COLOR_REGEX.test('#abcd')     // false (invalid length)
 * HEX_COLOR_REGEX.test('#GGGGGG')   // false (invalid characters)
 */
const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;

/**
 * Converts a HEX color to an RGBA hex string with an alpha channel.
 *
 * The output format is `#RRGGBBAA` where `AA` represents the alpha (opacity) in hex.
 *
 * @param {string} hex - The HEX color string. Must be in the format `#RRGGBB` or `#RGB`.
 * @param {number} [opacity=1] - The opacity value between 0 (fully transparent) and 1 (fully opaque).
 * @returns {string} The RGBA hex color string with alpha channel.
 *
 * @example
 * hexToRgba('#ff0000', 0.5) // "#ff000080" (semi-transparent red)
 * hexToRgba('#00ff00')      // "#00ff00ff" (fully opaque green)
 * hexToRgba('#0000ff', 0)   // "#0000ff00" (fully transparent blue)
 *
 * @throws Will throw an error if the `hex` format is invalid.
 * @throws Will throw an error if `opacity` is not between 0 and 1.
 */
export function hexToRgba(hex: string, opacity: number = 1): string {
  if (!HEX_COLOR_REGEX.test(hex)) {
    throw new Error("Invalid HEX color format");
  }
  if (opacity < 0 || opacity > 1) {
    throw new Error("Opacity must be between 0 and 1");
  }

  // Expand short hex format (#RGB) to full format (#RRGGBB)
  let fullHex = hex;
  if (hex.length === 4) {
    fullHex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }

  const bigint = parseInt(fullHex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Convert opacity to a 2-digit hexadecimal value
  const alphaHex = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");

  // Return the RGBA hex color
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}${alphaHex}`;
}
