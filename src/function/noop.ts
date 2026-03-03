/**
 * A no-operation function that does nothing. Useful as a default callback,
 * placeholder, or when a function reference is required but no action is needed.
 *
 * @example
 * const onClick = config.handler ?? noop;
 *
 * @example
 * // Default prop value
 * function Button({ onClick = noop }: { onClick?: () => void }) {
 *   return <button onClick={onClick}>Click</button>;
 * }
 *
 * @example
 * // Silencing callbacks
 * emitter.on('event', noop);
 */
export function noop(): void {
  // intentionally empty
}

/**
 * An async no-operation function. Returns a resolved promise.
 *
 * @example
 * const onSave = config.save ?? asyncNoop;
 * await onSave();
 */
export async function asyncNoop(): Promise<void> {
  // intentionally empty
}
