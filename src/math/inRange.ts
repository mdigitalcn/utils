/**
 * Checks if a number is within a given range (inclusive of start, exclusive of end).
 * If only two arguments are provided, the range is 0 to end.
 *
 * @example
 * inRange(3, 1, 5) // true
 * inRange(5, 1, 5) // false (end is exclusive)
 * inRange(1, 1, 5) // true (start is inclusive)
 * inRange(3, 5) // true (same as inRange(3, 0, 5))
 * inRange(-1, 5) // false
 *
 * @param value - Number to check
 * @param start - Start of range (or end if end is omitted)
 * @param end - End of range (exclusive)
 * @returns true if value is in range
 */
export function inRange(value: number, start: number, end?: number): boolean {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  // Handle inverted ranges
  if (start > end) {
    [start, end] = [end, start];
  }

  return value >= start && value < end;
}
