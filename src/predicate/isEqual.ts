/**
 * Performs a deep equality check between two values.
 * Handles primitives, objects, arrays, Date, RegExp, Map, Set, and nested structures.
 *
 * @example
 * isEqual(1, 1) // true
 * isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }) // true
 * isEqual([1, [2, 3]], [1, [2, 3]]) // true
 * isEqual({ a: 1 }, { a: 2 }) // false
 * isEqual(new Date('2024-01-01'), new Date('2024-01-01')) // true
 * isEqual(new Set([1, 2]), new Set([1, 2])) // true
 *
 * @param a - First value
 * @param b - Second value
 * @returns true if values are deeply equal
 */
export function isEqual(a: unknown, b: unknown): boolean {
  // Same reference or both primitives with same value
  if (Object.is(a, b)) return true;

  // Different types
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  // Date comparison
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // RegExp comparison
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }

  // Map comparison
  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [key, val] of a) {
      if (!b.has(key) || !isEqual(val, b.get(key))) return false;
    }
    return true;
  }

  // Set comparison (deep equality for members)
  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) return false;
    const bArr = Array.from(b);
    for (const val of a) {
      const found = bArr.some((bVal) => isEqual(val, bVal));
      if (!found) return false;
    }
    return true;
  }

  // Array comparison
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) return false;
    }
    return true;
  }

  // One is array, other isn't
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  // Object comparison
  const keysA = Object.keys(a as object);
  const keysB = Object.keys(b as object);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!isEqual((a as any)[key], (b as any)[key])) return false;
  }

  return true;
}
