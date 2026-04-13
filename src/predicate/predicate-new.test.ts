import { describe, it, expect } from 'vitest';
import { isPromise, isError, isPrimitive } from './index';

describe('isPromise', () => {
  it('Promise.resolve', () => expect(isPromise(Promise.resolve(1))).toBe(true));
  it('new Promise', () => expect(isPromise(new Promise(() => {}))).toBe(true));
  it('thenable object', () => expect(isPromise({ then: () => {} })).toBe(true));
  it('number', () => expect(isPromise(42)).toBe(false));
  it('string', () => expect(isPromise('hello')).toBe(false));
  it('null', () => expect(isPromise(null)).toBe(false));
  it('plain object', () => expect(isPromise({})).toBe(false));
});

describe('isError', () => {
  it('Error', () => expect(isError(new Error('fail'))).toBe(true));
  it('TypeError', () => expect(isError(new TypeError('bad'))).toBe(true));
  it('string', () => expect(isError('error')).toBe(false));
  it('object with message', () => expect(isError({ message: 'nope' })).toBe(false));
  it('null', () => expect(isError(null)).toBe(false));
});

describe('isPrimitive', () => {
  it('string', () => expect(isPrimitive('hello')).toBe(true));
  it('number', () => expect(isPrimitive(42)).toBe(true));
  it('boolean', () => expect(isPrimitive(true)).toBe(true));
  it('null', () => expect(isPrimitive(null)).toBe(true));
  it('undefined', () => expect(isPrimitive(undefined)).toBe(true));
  it('symbol', () => expect(isPrimitive(Symbol('x'))).toBe(true));
  it('object', () => expect(isPrimitive({})).toBe(false));
  it('array', () => expect(isPrimitive([])).toBe(false));
  it('Date', () => expect(isPrimitive(new Date())).toBe(false));
  it('function', () => expect(isPrimitive(() => {})).toBe(false));
});
