/**
 * Creates a deep clone of an object.
 * Handles circular references, Maps, Sets, Dates, RegExps, and preserves prototypes.
 *
 * @example
 * cloneDeep({ a: { b: 1 } }) // { a: { b: 1 } }
 *
 * @example
 * // Handles circular references
 * const obj: any = { a: 1 };
 * obj.self = obj;
 * const cloned = cloneDeep(obj); // Works without stack overflow
 *
 * @param obj - Object to deep clone
 * @returns Deep clone of the object
 */
export function cloneDeep<T>(obj: T, seen?: WeakMap<any, any>): T {
  // Create WeakMap only when needed (on first call)
  if (!seen) {
    seen = new WeakMap();
  }
  // Handle primitives and null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Handle circular references
  if (seen.has(obj as any)) {
    return seen.get(obj as any);
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  // Handle RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as T;
  }

  // Handle Map
  if (obj instanceof Map) {
    const clonedMap = new Map();
    seen.set(obj as any, clonedMap as any);
    obj.forEach((value, key) => {
      clonedMap.set(cloneDeep(key, seen), cloneDeep(value, seen));
    });
    return clonedMap as T;
  }

  // Handle Set
  if (obj instanceof Set) {
    const clonedSet = new Set();
    seen.set(obj as any, clonedSet as any);
    obj.forEach((value) => {
      clonedSet.add(cloneDeep(value, seen));
    });
    return clonedSet as T;
  }

  // Handle Array
  if (Array.isArray(obj)) {
    const clonedArray: any[] = [];
    seen.set(obj as any, clonedArray as any);
    obj.forEach((item, index) => {
      clonedArray[index] = cloneDeep(item, seen);
    });
    return clonedArray as T;
  }

  // Handle plain objects and class instances
  const cloned = Object.create(Object.getPrototypeOf(obj));
  seen.set(obj as any, cloned);

  // Clone all own properties including symbols
  const allKeys = [
    ...Object.keys(obj),
    ...Object.getOwnPropertySymbols(obj)
  ];

  for (const key of allKeys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = cloneDeep((obj as any)[key], seen);
    }
  }

  return cloned;
}
