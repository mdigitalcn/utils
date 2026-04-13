import { describe, it, expect } from 'vitest';
import { attempt, attemptAsync, invariant } from './index';

describe('attempt', () => {
  it('success returns [null, result]', () => {
    const [err, result] = attempt(() => JSON.parse('{"a":1}'));
    expect(err).toBeNull();
    expect(result).toEqual({ a: 1 });
  });
  it('failure returns [error, null]', () => {
    const [err, result] = attempt(() => JSON.parse('bad'));
    expect(err).toBeInstanceOf(Error);
    expect(result).toBeNull();
  });
  it('wraps non-Error throws', () => {
    const [err] = attempt(() => { throw 'string error'; });
    expect(err).toBeInstanceOf(Error);
    expect(err!.message).toBe('string error');
  });
});

describe('attemptAsync', () => {
  it('success', async () => {
    const [err, result] = await attemptAsync(async () => 42);
    expect(err).toBeNull();
    expect(result).toBe(42);
  });
  it('failure', async () => {
    const [err, result] = await attemptAsync(async () => { throw new Error('fail'); });
    expect(err).toBeInstanceOf(Error);
    expect(err!.message).toBe('fail');
    expect(result).toBeNull();
  });
});

describe('invariant', () => {
  it('does nothing on truthy', () => {
    expect(() => invariant(true, 'ok')).not.toThrow();
    expect(() => invariant(1, 'ok')).not.toThrow();
    expect(() => invariant('nonempty', 'ok')).not.toThrow();
  });
  it('throws on falsy', () => {
    expect(() => invariant(false, 'Expected true')).toThrow('Expected true');
    expect(() => invariant(null, 'not null')).toThrow('not null');
    expect(() => invariant(undefined, 'defined')).toThrow('defined');
    expect(() => invariant(0, 'nonzero')).toThrow('nonzero');
    expect(() => invariant('', 'nonempty')).toThrow('nonempty');
  });
});
