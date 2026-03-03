/**
 * Clamps a number between min and max values.
 *
 * @example
 * clamp(0, 10, 15) // 10
 * clamp(0, 10, 5) // 5
 * clamp(0, 10, -5) // 0
 *
 * @param min - Minimum value
 * @param max - Maximum value
 * @param value - Value to clamp
 * @returns Clamped value
 */
export function clamp(min: number, max: number, value: number): number {
  return Math.min(max, Math.max(min, value));
}
