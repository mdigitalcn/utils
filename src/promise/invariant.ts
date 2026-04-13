/**
 * Asserts a condition is truthy, throws if not. Useful for type narrowing and runtime assertions.
 *
 * @example
 * const user: User | null = getUser();
 * invariant(user, 'User not found');
 * // TypeScript now knows `user` is `User` (not null)
 * console.log(user.name);
 *
 * @example
 * invariant(items.length > 0, 'Items array must not be empty');
 *
 * @param condition - Condition to assert
 * @param message - Error message if condition is falsy
 * @throws Error if condition is falsy
 */
export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
