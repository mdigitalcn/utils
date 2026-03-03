/**
 * Creates an array of numbers from start to end (exclusive) with an optional step.
 * If only one argument is provided, creates a range from 0 to that number.
 *
 * @example
 * range(5) // [0, 1, 2, 3, 4]
 * range(1, 5) // [1, 2, 3, 4]
 * range(0, 10, 2) // [0, 2, 4, 6, 8]
 * range(5, 0, -1) // [5, 4, 3, 2, 1]
 * range(0) // []
 *
 * @param start - Start of range (or end if only arg)
 * @param end - End of range (exclusive)
 * @param step - Step increment (default: 1 or -1 based on direction)
 * @returns Array of numbers
 */
export function range(start: number, end?: number, step?: number): number[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  if (step === undefined) {
    step = start <= end ? 1 : -1;
  }

  if (step === 0) {
    throw new Error('range: step must not be zero');
  }

  const result: number[] = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }

  return result;
}
