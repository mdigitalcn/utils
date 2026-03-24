/**
 * Checks if a value exists for a given key in any object within an array.
 *
 * Iterates over the array of objects and returns `true` if **any** object
 * has the specified key and its value strictly equals the provided value.
 *
 * @example
 * const users = [
 *   { id: '1', name: 'Alice' },
 *   { id: '2', name: 'Bob' }
 * ];
 *
 * checkValueInArray(users, 'name', 'Alice') // true
 * checkValueInArray(users, 'id', '3') // false
 *
 * @template T - The type of objects in the array
 * @param {T[]} array - Array of objects to check
 * @param {keyof T} key - Key to check in each object
 * @param {T[keyof T]} value - Value to compare against
 * @returns {boolean} `true` if at least one object has the key with the given value, otherwise `false`
 */
export function checkValueInArray<T>(
  array: T[],
  key: keyof T,
  value: T[keyof T]
): boolean {
  for (const obj of array) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] === value) {
      return true;
    }
  }
  return false;
}
