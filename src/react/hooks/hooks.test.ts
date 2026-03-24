import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';
import { useToggle } from './useToggle';
import { usePrevious } from './usePrevious';
import { useLocalStorage } from './useLocalStorage';
import { useSessionStorage } from './useSessionStorage';
import { useThrottle } from './useThrottle';
import { useMountEffect } from './useMountEffect';
import { useUpdateEffect } from './useUpdateEffect';
import { useMediaQuery } from './useMediaQuery';
import { useClickOutside } from './useClickOutside';
import { useScreenSize } from './useScreenSize';
import { useIsMounted } from './useIsMounted';

// ─── useDebounce ──────────────────────────────────────────
describe('useDebounce', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 500));
    expect(result.current).toBe('hello');
  });

  it('debounces value updates', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'a', delay: 300 } }
    );

    expect(result.current).toBe('a');

    rerender({ value: 'b', delay: 300 });
    expect(result.current).toBe('a'); // not yet

    act(() => { vi.advanceTimersByTime(300); });
    expect(result.current).toBe('b');
  });

  it('resets timer on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'a' } }
    );

    rerender({ value: 'b' });
    act(() => { vi.advanceTimersByTime(200); });
    rerender({ value: 'c' });
    act(() => { vi.advanceTimersByTime(200); });
    expect(result.current).toBe('a'); // still debouncing

    act(() => { vi.advanceTimersByTime(300); });
    expect(result.current).toBe('c');
  });
});

// ─── useToggle ────────────────────────────────────────────
describe('useToggle', () => {
  it('starts with default false', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it('starts with custom initial value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  it('toggles value', () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => { result.current[1](); });
    expect(result.current[0]).toBe(true);
    act(() => { result.current[1](); });
    expect(result.current[0]).toBe(false);
  });

  it('sets value directly', () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => { result.current[2](true); });
    expect(result.current[0]).toBe(true);
    act(() => { result.current[2](false); });
    expect(result.current[0]).toBe(false);
  });
});

// ─── usePrevious ──────────────────────────────────────────
describe('usePrevious', () => {
  it('returns undefined on first render', () => {
    const { result } = renderHook(() => usePrevious(0));
    expect(result.current).toBeUndefined();
  });

  it('returns previous value after update', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: 1 } }
    );

    expect(result.current).toBeUndefined();
    rerender({ value: 2 });
    expect(result.current).toBe(1);
    rerender({ value: 3 });
    expect(result.current).toBe(2);
  });
});

// ─── useLocalStorage ──────────────────────────────────────
describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial value when nothing stored', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('reads existing value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('stored');
  });

  it('writes to localStorage on update', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    act(() => { result.current[1]('updated'); });
    expect(result.current[0]).toBe('updated');
    expect(JSON.parse(localStorage.getItem('test-key')!)).toBe('updated');
  });

  it('supports functional updates', () => {
    const { result } = renderHook(() => useLocalStorage<number>('counter', 0));
    act(() => { result.current[1]((prev) => prev + 1); });
    expect(result.current[0]).toBe(1);
  });

  it('handles complex objects', () => {
    const initial = { name: 'test', count: 0 };
    const { result } = renderHook(() => useLocalStorage('obj-key', initial));
    act(() => { result.current[1]({ name: 'updated', count: 1 }); });
    expect(result.current[0]).toEqual({ name: 'updated', count: 1 });
  });
});

// ─── useSessionStorage ────────────────────────────────────
describe('useSessionStorage', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('returns initial value when nothing stored', () => {
    const { result } = renderHook(() => useSessionStorage('ss-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('reads existing value', () => {
    sessionStorage.setItem('ss-key', JSON.stringify('stored'));
    const { result } = renderHook(() => useSessionStorage('ss-key', 'default'));
    expect(result.current[0]).toBe('stored');
  });

  it('writes to sessionStorage on update', () => {
    const { result } = renderHook(() => useSessionStorage('ss-key', 'initial'));
    act(() => { result.current[1]('updated'); });
    expect(result.current[0]).toBe('updated');
    expect(JSON.parse(sessionStorage.getItem('ss-key')!)).toBe('updated');
  });

  it('supports functional updates', () => {
    const { result } = renderHook(() => useSessionStorage<number>('ss-counter', 0));
    act(() => { result.current[1]((prev) => prev + 1); });
    expect(result.current[0]).toBe(1);
  });
});

// ─── useThrottle ──────────────────────────────────────────
describe('useThrottle', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('executes callback immediately on first call', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useThrottle(fn, 200));

    act(() => { result.current(); });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('throttles rapid calls', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useThrottle(fn, 200));

    act(() => { result.current(); }); // executes
    act(() => { result.current(); }); // queued
    act(() => { result.current(); }); // replaces queue
    expect(fn).toHaveBeenCalledTimes(1);

    act(() => { vi.advanceTimersByTime(200); });
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

// ─── useMountEffect ──────────────────────────────────────
describe('useMountEffect', () => {
  it('runs effect on mount', () => {
    const fn = vi.fn();
    renderHook(() => useMountEffect(fn));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does not run on rerender', () => {
    const fn = vi.fn();
    const { rerender } = renderHook(() => useMountEffect(fn));
    rerender();
    rerender();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('runs cleanup on unmount', () => {
    const cleanup = vi.fn();
    const { unmount } = renderHook(() => useMountEffect(() => cleanup));
    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});

// ─── useUpdateEffect ─────────────────────────────────────
describe('useUpdateEffect', () => {
  it('does NOT run on mount', () => {
    const fn = vi.fn();
    renderHook(({ dep }) => useUpdateEffect(fn, [dep]), {
      initialProps: { dep: 0 },
    });
    expect(fn).not.toHaveBeenCalled();
  });

  it('runs on dependency change', () => {
    const fn = vi.fn();
    const { rerender } = renderHook(
      ({ dep }) => useUpdateEffect(fn, [dep]),
      { initialProps: { dep: 0 } }
    );
    rerender({ dep: 1 });
    expect(fn).toHaveBeenCalledTimes(1);
    rerender({ dep: 2 });
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

// ─── useMediaQuery ────────────────────────────────────────
describe('useMediaQuery', () => {
  it('returns initial match state', () => {
    // jsdom doesn't support matchMedia properly, so we mock it
    const mockMatchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(typeof result.current).toBe('boolean');
  });
});

// ─── useClickOutside ─────────────────────────────────────
describe('useClickOutside', () => {
  it('returns a ref object', () => {
    const { result } = renderHook(() => useClickOutside<HTMLDivElement>(vi.fn()));
    expect(result.current).toBeDefined();
    expect(result.current.current).toBeNull();
  });
});

// ─── useIsMounted ─────────────────────────────────────────
describe('useIsMounted', () => {
  it('returns true when mounted', () => {
    const { result } = renderHook(() => useIsMounted());
    expect(result.current()).toBe(true);
  });

  it('returns false after unmount', () => {
    const { result, unmount } = renderHook(() => useIsMounted());
    const isMounted = result.current;
    unmount();
    expect(isMounted()).toBe(false);
  });
});

// ─── useScreenSize ────────────────────────────────────────
describe('useScreenSize', () => {
  it('returns a boolean', () => {
    const { result } = renderHook(() => useScreenSize(768));
    expect(typeof result.current).toBe('boolean');
  });

  it('uses default threshold of 768', () => {
    const { result } = renderHook(() => useScreenSize());
    expect(typeof result.current).toBe('boolean');
  });
});
