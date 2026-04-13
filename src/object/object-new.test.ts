import { describe, it, expect } from 'vitest';
import { findKey, flattenObject } from './index';

describe('findKey', () => {
  it('finds first matching key', () => {
    expect(findKey({ a: 1, b: 2, c: 3 }, v => v > 1)).toBe('b');
  });
  it('returns undefined when no match', () => {
    expect(findKey({ a: 1 }, v => v > 5)).toBeUndefined();
  });
  it('empty object', () => {
    expect(findKey({}, () => true)).toBeUndefined();
  });
  it('passes key to predicate', () => {
    expect(findKey({ foo: 1, bar: 2 }, (_, k) => k === 'bar')).toBe('bar');
  });
});

describe('flattenObject', () => {
  it('flattens nested object', () => {
    expect(flattenObject({ a: { b: { c: 1 } }, d: 2 })).toEqual({ 'a.b.c': 1, d: 2 });
  });
  it('custom delimiter', () => {
    expect(flattenObject({ a: { b: 1 } }, '_')).toEqual({ a_b: 1 });
  });
  it('preserves arrays as values', () => {
    expect(flattenObject({ a: [1, 2] })).toEqual({ a: [1, 2] });
  });
  it('preserves Date as value', () => {
    const d = new Date('2024-01-01');
    expect(flattenObject({ a: { b: d } })).toEqual({ 'a.b': d });
  });
  it('empty object', () => expect(flattenObject({})).toEqual({}));
  it('flat object unchanged', () => {
    expect(flattenObject({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 });
  });
});
