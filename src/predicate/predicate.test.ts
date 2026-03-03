import { describe, it, expect } from 'vitest';
import { isNil, isNotNil, isString, isNumber, isPlainObject, isEqual } from './index';

describe('isNil', () => {
  it('null is nil', () => expect(isNil(null)).toBe(true));
  it('undefined is nil', () => expect(isNil(undefined)).toBe(true));
  it('0 is not nil', () => expect(isNil(0)).toBe(false));
  it('empty string is not nil', () => expect(isNil('')).toBe(false));
  it('false is not nil', () => expect(isNil(false)).toBe(false));
});

describe('isNotNil', () => {
  it('0 is not nil', () => expect(isNotNil(0)).toBe(true));
  it('empty string is not nil', () => expect(isNotNil('')).toBe(true));
  it('null is nil', () => expect(isNotNil(null)).toBe(false));
  it('undefined is nil', () => expect(isNotNil(undefined)).toBe(false));
  it('filters correctly', () => {
    const items = [1, null, 2, undefined, 3];
    const result: number[] = items.filter(isNotNil);
    expect(result).toEqual([1, 2, 3]);
  });
});

describe('isString', () => {
  it('string primitive', () => expect(isString('hello')).toBe(true));
  it('empty string', () => expect(isString('')).toBe(true));
  it('number', () => expect(isString(123)).toBe(false));
  it('null', () => expect(isString(null)).toBe(false));
  it('undefined', () => expect(isString(undefined)).toBe(false));
  it('object', () => expect(isString({})).toBe(false));
});

describe('isNumber', () => {
  it('integer', () => expect(isNumber(42)).toBe(true));
  it('float', () => expect(isNumber(3.14)).toBe(true));
  it('zero', () => expect(isNumber(0)).toBe(true));
  it('negative', () => expect(isNumber(-5)).toBe(true));
  it('NaN is not a number', () => expect(isNumber(NaN)).toBe(false));
  it('Infinity is not a number', () => expect(isNumber(Infinity)).toBe(false));
  it('-Infinity is not a number', () => expect(isNumber(-Infinity)).toBe(false));
  it('string', () => expect(isNumber('42')).toBe(false));
  it('null', () => expect(isNumber(null)).toBe(false));
});

describe('isPlainObject', () => {
  it('plain object', () => expect(isPlainObject({})).toBe(true));
  it('with properties', () => expect(isPlainObject({ a: 1 })).toBe(true));
  it('Object.create(null)', () => expect(isPlainObject(Object.create(null))).toBe(true));
  it('array is not', () => expect(isPlainObject([])).toBe(false));
  it('Date is not', () => expect(isPlainObject(new Date())).toBe(false));
  it('Map is not', () => expect(isPlainObject(new Map())).toBe(false));
  it('Set is not', () => expect(isPlainObject(new Set())).toBe(false));
  it('null is not', () => expect(isPlainObject(null)).toBe(false));
  it('string is not', () => expect(isPlainObject('hello')).toBe(false));
  it('number is not', () => expect(isPlainObject(42)).toBe(false));
  it('class instance is not', () => {
    class Foo {}
    expect(isPlainObject(new Foo())).toBe(false);
  });
});

describe('isEqual', () => {
  // Primitives
  it('equal numbers', () => expect(isEqual(1, 1)).toBe(true));
  it('different numbers', () => expect(isEqual(1, 2)).toBe(false));
  it('equal strings', () => expect(isEqual('abc', 'abc')).toBe(true));
  it('different strings', () => expect(isEqual('abc', 'def')).toBe(false));
  it('booleans', () => {
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(true, false)).toBe(false);
  });
  it('null equality', () => {
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(null, undefined)).toBe(false);
  });
  it('undefined equality', () => expect(isEqual(undefined, undefined)).toBe(true));

  // Objects
  it('equal objects', () => {
    expect(isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
  });
  it('different objects', () => {
    expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
  });
  it('different keys', () => {
    expect(isEqual({ a: 1 }, { b: 1 })).toBe(false);
  });
  it('extra key', () => {
    expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });

  // Arrays
  it('equal arrays', () => {
    expect(isEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
  });
  it('different arrays', () => {
    expect(isEqual([1, 2], [1, 3])).toBe(false);
  });
  it('different length', () => {
    expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
  });

  // Special types
  it('equal Dates', () => {
    expect(isEqual(new Date('2024-01-01'), new Date('2024-01-01'))).toBe(true);
  });
  it('different Dates', () => {
    expect(isEqual(new Date('2024-01-01'), new Date('2024-01-02'))).toBe(false);
  });
  it('equal RegExp', () => {
    expect(isEqual(/abc/gi, /abc/gi)).toBe(true);
  });
  it('different RegExp', () => {
    expect(isEqual(/abc/g, /def/g)).toBe(false);
  });
  it('equal Sets', () => {
    expect(isEqual(new Set([1, 2, 3]), new Set([1, 2, 3]))).toBe(true);
  });
  it('different Sets', () => {
    expect(isEqual(new Set([1, 2]), new Set([1, 3]))).toBe(false);
  });
  it('equal Maps', () => {
    expect(isEqual(new Map([['a', 1]]), new Map([['a', 1]]))).toBe(true);
  });
  it('different Maps', () => {
    expect(isEqual(new Map([['a', 1]]), new Map([['a', 2]]))).toBe(false);
  });

  // Cross-type
  it('object vs array', () => expect(isEqual({}, [])).toBe(false));
  it('string vs number', () => expect(isEqual('1' as any, 1)).toBe(false));
});
