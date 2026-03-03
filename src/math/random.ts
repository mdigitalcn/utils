/**
 * Generates a random number between min and max (inclusive).
 * If only one argument is provided, generates between 0 and that number.
 *
 * @example
 * random(1, 10) // random number between 1 and 10
 * random(100) // random number between 0 and 100
 * random(1.5, 5.5) // random float between 1.5 and 5.5
 *
 * @param min - Minimum value (or maximum if max is omitted)
 * @param max - Maximum value (optional)
 * @returns Random number in the specified range
 */
export function random(min: number, max?: number): number {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return min + Math.random() * (max - min);
}

/**
 * Generates a random integer between min and max (inclusive).
 *
 * @example
 * randomInt(1, 10) // random integer 1-10
 * randomInt(100) // random integer 0-100
 *
 * @param min - Minimum value (or maximum if max is omitted)
 * @param max - Maximum value (optional)
 * @returns Random integer in the specified range
 */
export function randomInt(min: number, max?: number): number {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
