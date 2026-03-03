import { describe, it, expect, vi } from 'vitest';
import {
  pipe,
  compose,
  curry2,
  curry3,
  curry4,
  partial,
  memoize,
  debounce,
  throttle,
  once,
  noop,
  asyncNoop,
  identity,
  hexToRgba,
  convertToFormData,
  createQueryString,
} from './index';

describe('pipe', () => {
  it('pipes left to right', () => {
    const add1 = (x: number) => x + 1;
    const double = (x: number) => x * 2;
    expect(pipe(add1, double)(3)).toBe(8);
  });
  it('single function', () => {
    const add1 = (x: number) => x + 1;
    expect(pipe(add1)(5)).toBe(6);
  });
  it('no functions returns identity', () => {
    expect(pipe()(42)).toBe(42);
  });
});

describe('compose', () => {
  it('composes right to left', () => {
    const add1 = (x: number) => x + 1;
    const double = (x: number) => x * 2;
    expect(compose(double, add1)(3)).toBe(8);
  });
});

describe('curry2', () => {
  it('curries 2-arg function', () => {
    const add = curry2((a: number, b: number) => a + b);
    expect(add(1)(2)).toBe(3);
    expect(add(1, 2)).toBe(3);
  });
});

describe('curry3', () => {
  it('curries 3-arg function', () => {
    const add3 = curry3((a: number, b: number, c: number) => a + b + c);
    expect(add3(1)(2)(3)).toBe(6);
    expect(add3(1, 2)(3)).toBe(6);
    expect(add3(1, 2, 3)).toBe(6);
  });
});

describe('curry4', () => {
  it('curries 4-arg function', () => {
    const add4 = curry4((a: number, b: number, c: number, d: number) => a + b + c + d);
    expect(add4(1)(2)(3)(4)).toBe(10);
    expect(add4(1, 2, 3, 4)).toBe(10);
  });
});

describe('partial', () => {
  it('partially applies arguments', () => {
    const add = (a: number, b: number, c: number) => a + b + c;
    const add5 = partial(add, 5);
    expect(add5(10, 15)).toBe(30);
  });
});

describe('memoize', () => {
  it('caches results', () => {
    let calls = 0;
    const fn = memoize((n: number) => { calls++; return n * 2; });
    expect(fn(5)).toBe(10);
    expect(fn(5)).toBe(10);
    expect(calls).toBe(1);
  });
  it('different args compute separately', () => {
    let calls = 0;
    const fn = memoize((n: number) => { calls++; return n * 2; });
    fn(1);
    fn(2);
    expect(calls).toBe(2);
  });
  it('respects max size (LRU)', () => {
    let calls = 0;
    const fn = memoize((n: number) => { calls++; return n; }, 2);
    fn(1); fn(2); fn(3); // evicts 1
    fn(1); // recomputes
    expect(calls).toBe(4);
  });
});

describe('debounce', () => {
  it('delays execution', async () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced();
    debounced();

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('cancel prevents execution', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced.cancel();

    vi.advanceTimersByTime(200);
    expect(fn).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('flush executes immediately', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced('arg1');
    debounced.flush();

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('arg1');

    vi.useRealTimers();
  });
});

describe('throttle', () => {
  it('executes immediately on first call', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('throttles subsequent calls', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled(); // executes
    throttled(); // queued
    throttled(); // replaces queue

    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });

  it('cancel stops pending execution', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    throttled();
    throttled.cancel();

    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1); // only first immediate call

    vi.useRealTimers();
  });
});

describe('once', () => {
  it('calls function only once', () => {
    let calls = 0;
    const fn = once(() => { calls++; return 'result'; });
    expect(fn()).toBe('result');
    expect(fn()).toBe('result');
    expect(calls).toBe(1);
  });
});

describe('noop', () => {
  it('does nothing', () => {
    expect(noop()).toBeUndefined();
  });
});

describe('asyncNoop', () => {
  it('returns resolved promise', async () => {
    expect(await asyncNoop()).toBeUndefined();
  });
});

describe('identity', () => {
  it('returns same value', () => {
    expect(identity(5)).toBe(5);
    expect(identity('hello')).toBe('hello');
    const obj = { a: 1 };
    expect(identity(obj)).toBe(obj);
  });
});

describe('hexToRgba', () => {
  it('converts hex to rgba', () => {
    expect(hexToRgba('#ff0000', 0.5)).toBe('#ff000080');
  });
  it('full opacity', () => {
    expect(hexToRgba('#00ff00')).toBe('#00ff00ff');
  });
  it('zero opacity', () => {
    expect(hexToRgba('#0000ff', 0)).toBe('#0000ff00');
  });
  it('short hex format', () => {
    expect(hexToRgba('#f00', 1)).toBe('#ff0000ff');
  });
  it('throws on invalid hex', () => {
    expect(() => hexToRgba('invalid')).toThrow();
  });
  it('throws on invalid opacity', () => {
    expect(() => hexToRgba('#ff0000', 2)).toThrow();
    expect(() => hexToRgba('#ff0000', -1)).toThrow();
  });
});

describe('convertToFormData', () => {
  it('converts object to FormData', () => {
    const fd = convertToFormData({ name: 'John', age: 30 });
    expect(fd.get('name')).toBe('John');
    expect(fd.get('age')).toBe('30');
  });
  it('skips null and undefined', () => {
    const fd = convertToFormData({ a: 'value', b: null, c: undefined });
    expect(fd.get('a')).toBe('value');
    expect(fd.get('b')).toBeNull();
    expect(fd.get('c')).toBeNull();
  });
});

describe('createQueryString', () => {
  it('creates query string from object', () => {
    const qs = createQueryString({ search: 'apple', page: 2, active: true });
    expect(qs).toBe('search=apple&page=2&active=true');
  });
  it('empty object returns empty string', () => {
    expect(createQueryString({})).toBe('');
  });
  it('skips null and undefined', () => {
    const qs = createQueryString({ a: 'value', b: null, c: undefined });
    expect(qs).toBe('a=value');
  });
});
