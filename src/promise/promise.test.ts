import { describe, it, expect, vi } from 'vitest';
import { delay, retry, timeout } from './index';

describe('delay', () => {
  it('resolves after specified time', async () => {
    vi.useFakeTimers();

    let resolved = false;
    const p = delay(100).then(() => { resolved = true; });

    expect(resolved).toBe(false);
    await vi.advanceTimersByTimeAsync(100);
    await p;
    expect(resolved).toBe(true);

    vi.useRealTimers();
  });
});

describe('retry', () => {
  it('returns result on success', async () => {
    const fn = vi.fn().mockResolvedValue('ok');
    const result = await retry(fn);
    expect(result).toBe('ok');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries on failure and succeeds', async () => {
    const fn = vi.fn()
      .mockRejectedValueOnce(new Error('fail1'))
      .mockRejectedValueOnce(new Error('fail2'))
      .mockResolvedValueOnce('ok');

    const result = await retry(fn, { retries: 3, delay: 1, backoff: 'fixed' });
    expect(result).toBe('ok');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('throws after all retries exhausted', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('always fail'));

    await expect(retry(fn, { retries: 2, delay: 1, backoff: 'fixed' }))
      .rejects.toThrow('always fail');
    expect(fn).toHaveBeenCalledTimes(3); // initial + 2 retries
  });

  it('stops early with shouldRetry', async () => {
    const fn = vi.fn().mockRejectedValue(new Error('not retryable'));

    await expect(retry(fn, {
      retries: 5,
      delay: 1,
      backoff: 'fixed',
      shouldRetry: () => false,
    })).rejects.toThrow('not retryable');
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('timeout', () => {
  it('returns result if promise resolves in time', async () => {
    const result = await timeout(Promise.resolve('ok'), 1000);
    expect(result).toBe('ok');
  });

  it('rejects if promise takes too long', async () => {
    const neverResolve = new Promise<string>(() => {}); // never resolves
    const p = timeout(neverResolve, 10);
    await expect(p).rejects.toThrow('Operation timed out after 10ms');
  });

  it('uses custom error message', async () => {
    const neverResolve = new Promise<string>(() => {});
    const p = timeout(neverResolve, 10, 'Custom timeout');
    await expect(p).rejects.toThrow('Custom timeout');
  });

  it('timeout error has correct name', async () => {
    const neverResolve = new Promise<string>(() => {});
    try {
      await timeout(neverResolve, 10);
    } catch (e: any) {
      expect(e.name).toBe('TimeoutError');
    }
  });
});
