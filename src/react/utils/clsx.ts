/**
 * Combines class names into a single string.
 *
 * Accepts strings, numbers, arrays, objects, booleans, null, or undefined.
 * - Strings and numbers are included as-is.
 * - Arrays are recursively flattened.
 * - Objects include keys whose values are truthy.
 *
 * This is useful for dynamically constructing class names in React or any JS/TS project.
 *
 * @example
 * clsx('btn', 'btn-primary')
 * // Returns: "btn btn-primary"
 *
 * @example
 * clsx('btn', { 'btn-disabled': false, 'btn-active': true })
 * // Returns: "btn btn-active"
 *
 * @example
 * clsx(['btn', ['btn-large', { 'btn-disabled': false }]])
 * // Returns: "btn btn-large"
 *
 * @param {...ClassValue[]} args - List of class values to combine
 * @returns {string} A single string of class names, separated by spaces
 */

export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassDictionary
  | ClassArray;
export type ClassDictionary = Record<string, boolean | undefined | null>;
export type ClassArray = ClassValue[];

export function clsx(...args: ClassValue[]): string {
  let str = "";

  for (const arg of args) {
    const val = toVal(arg);
    if (val) {
      str && (str += " ");
      str += val;
    }
  }

  return str;
}

/**
 * Internal helper function that converts a ClassValue to string.
 *
 * @param {ClassValue} mix - Value to convert
 * @returns {string} The string representation of the value
 */
function toVal(mix: ClassValue): string {
  let str = "";

  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object" && mix) {
    if (Array.isArray(mix)) {
      for (const item of mix) {
        const val = toVal(item);
        if (val) {
          str && (str += " ");
          str += val;
        }
      }
    } else {
      for (const key in mix) {
        if (mix[key]) {
          str && (str += " ");
          str += key;
        }
      }
    }
  }

  return str;
}

export default clsx;
