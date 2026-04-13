/**
 * Type guard that checks if a value is a Promise (or thenable).
 *
 * @example
 * isPromise(Promise.resolve(1)) // true
 * isPromise(new Promise(() => {})) // true
 * isPromise({ then: () => {} }) // true (thenable)
 * isPromise(42) // false
 *
 * @param value - Value to check
 * @returns true if value is a Promise-like
 */
export function isPromise(value: unknown): value is Promise<unknown> {
  return (
    value != null &&
    typeof value === 'object' &&
    typeof (value as any).then === 'function'
  );
}
