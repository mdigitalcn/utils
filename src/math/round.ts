/**
 * Rounds a number to a specified number of decimal places.
 * Uses the "round half away from zero" method to avoid floating-point issues.
 *
 * @example
 * round(1.2345, 2) // 1.23
 * round(1.235, 2) // 1.24
 * round(1234, -2) // 1200
 * round(1.5) // 2
 *
 * @param value - Number to round
 * @param precision - Number of decimal places (default: 0, negative rounds to tens/hundreds/etc)
 * @returns Rounded number
 */
export function round(value: number, precision: number = 0): number {
  const multiplier = Math.pow(10, precision);
  return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
}
