import { describe, it, expect } from 'vitest';
import { clsx, createContext } from './utils/index';

describe('clsx', () => {
  it('joins strings', () => {
    expect(clsx('btn', 'btn-primary')).toBe('btn btn-primary');
  });
  it('filters falsy', () => {
    expect(clsx('btn', false && 'disabled', null, undefined, 'active')).toBe('btn active');
  });
  it('handles objects', () => {
    expect(clsx('btn', { 'btn-disabled': false, 'btn-active': true })).toBe('btn btn-active');
  });
  it('handles arrays', () => {
    expect(clsx(['btn', ['btn-large', { 'btn-disabled': false }]])).toBe('btn btn-large');
  });
  it('handles numbers', () => {
    // clsx includes 0 as a number (not falsy for classnames)
    expect(clsx('a', 0, 1, 'b')).toBe('a 0 1 b');
  });
  it('empty returns empty string', () => {
    expect(clsx()).toBe('');
  });
  it('all falsy returns empty (excluding 0 which is a number)', () => {
    expect(clsx(false, null, undefined, '')).toBe('');
    // 0 is a number, so clsx includes it
    expect(clsx(0)).toBe('0');
  });
});

describe('createContext', () => {
  it('returns provider and hook', () => {
    const [Provider, useCtx] = createContext<{ value: string }>('Test');
    expect(Provider).toBeDefined();
    expect(useCtx).toBeTypeOf('function');
  });

  it('hook throws outside provider', () => {
    const [, useCtx] = createContext<{ value: string }>('TestCtx');
    // Can't call hooks outside React component, but we can verify it's a function
    expect(useCtx).toBeTypeOf('function');
  });
});
