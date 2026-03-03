import { describe, it, expect } from 'vitest';
import {
  pick,
  pickBy,
  omit,
  omitBy,
  mergeDeep,
  cloneDeep,
  get,
  path,
  pathOr,
  prop,
  propOr,
  getTrues,
  jsonParse,
  mapKeys,
  mapValues,
  isEmpty,
} from './index';

describe('pick', () => {
  it('picks specified keys', () => {
    expect(pick(['a', 'c'], { a: 1, b: 2, c: 3 })).toEqual({ a: 1, c: 3 });
  });
  it('ignores missing keys', () => {
    expect(pick(['a', 'z'] as any, { a: 1, b: 2 })).toEqual({ a: 1 });
  });
});

describe('pickBy', () => {
  it('picks by predicate', () => {
    expect(pickBy({ a: 1, b: null, c: 3, d: undefined }, (v) => v != null))
      .toEqual({ a: 1, c: 3 });
  });
  it('picks by value condition', () => {
    expect(pickBy({ x: 0, y: 1, z: 2 }, (v) => v > 0)).toEqual({ y: 1, z: 2 });
  });
});

describe('omit', () => {
  it('omits specified keys', () => {
    expect(omit(['b'], { a: 1, b: 2, c: 3 })).toEqual({ a: 1, c: 3 });
  });
});

describe('omitBy', () => {
  it('omits by predicate', () => {
    expect(omitBy({ a: 1, b: null, c: 3 }, (v) => v == null)).toEqual({ a: 1, c: 3 });
  });
  it('omits zero values', () => {
    expect(omitBy({ x: 0, y: 1, z: 2 }, (v) => v === 0)).toEqual({ y: 1, z: 2 });
  });
});

describe('mergeDeep', () => {
  it('merges nested objects', () => {
    expect(mergeDeep({ a: { b: 1 } }, { a: { c: 2 } })).toEqual({ a: { b: 1, c: 2 } });
  });
  it('second takes precedence on conflict', () => {
    expect(mergeDeep({ a: { b: 1 } }, { a: { b: 2 } })).toEqual({ a: { b: 2 } });
  });
  it('preserves arrays (replaces, not merges)', () => {
    expect(mergeDeep({ a: [1, 2] }, { a: [3, 4] })).toEqual({ a: [3, 4] });
  });
  it('preserves Date objects', () => {
    const date = new Date('2024-01-01');
    const result = mergeDeep({ a: 1 }, { d: date });
    expect(result.d).toBe(date);
  });
});

describe('cloneDeep', () => {
  it('deep clones nested objects', () => {
    const obj = { a: { b: { c: 1 } } };
    const cloned = cloneDeep(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.a).not.toBe(obj.a);
    expect(cloned.a.b).not.toBe(obj.a.b);
  });
  it('clones arrays', () => {
    const arr = [1, [2, [3]]];
    const cloned = cloneDeep(arr);
    expect(cloned).toEqual(arr);
    expect(cloned[1]).not.toBe(arr[1]);
  });
  it('clones Date', () => {
    const date = new Date('2024-01-01');
    const cloned = cloneDeep(date);
    expect(cloned).toEqual(date);
    expect(cloned).not.toBe(date);
  });
  it('clones Map', () => {
    const map = new Map([['a', 1], ['b', 2]]);
    const cloned = cloneDeep(map);
    expect(cloned.get('a')).toBe(1);
    expect(cloned).not.toBe(map);
  });
  it('clones Set', () => {
    const set = new Set([1, 2, 3]);
    const cloned = cloneDeep(set);
    expect(cloned.has(1)).toBe(true);
    expect(cloned).not.toBe(set);
  });
  it('handles circular references', () => {
    const obj: any = { a: 1 };
    obj.self = obj;
    const cloned = cloneDeep(obj);
    expect(cloned.a).toBe(1);
    expect(cloned.self).toBe(cloned);
  });
  it('handles primitives', () => {
    expect(cloneDeep(42)).toBe(42);
    expect(cloneDeep('hello')).toBe('hello');
    expect(cloneDeep(null)).toBe(null);
    expect(cloneDeep(undefined)).toBe(undefined);
  });
});

describe('get', () => {
  it('accesses nested path', () => {
    expect(get({ user: { profile: { name: 'Alice' } } }, 'user.profile.name')).toBe('Alice');
  });
  it('returns default for missing path', () => {
    expect(get({ a: 1 }, 'a.b.c', 'default')).toBe('default');
  });
  it('works with array path', () => {
    expect(get({ a: { b: 1 } }, ['a', 'b'])).toBe(1);
  });
  it('returns default for undefined obj', () => {
    expect(get(undefined, 'any.path', 'fallback')).toBe('fallback');
  });
});

describe('path', () => {
  it('accesses nested path', () => {
    expect(path(['a', 'b'], { a: { b: 1 } })).toBe(1);
  });
  it('returns undefined for missing', () => {
    expect(path(['a', 'c'], { a: { b: 1 } })).toBeUndefined();
  });
});

describe('pathOr', () => {
  it('returns value at path', () => {
    expect(pathOr('default', ['a', 'b'], { a: { b: 1 } })).toBe(1);
  });
  it('returns default for missing', () => {
    expect(pathOr('default', ['a', 'c'], { a: { b: 1 } })).toBe('default');
  });
});

describe('prop', () => {
  it('accesses property', () => {
    expect(prop('name', { name: 'Alice', age: 30 })).toBe('Alice');
  });
  it('curried form works', () => {
    const getName = prop('name');
    expect(getName({ name: 'Bob' })).toBe('Bob');
  });
});

describe('propOr', () => {
  it('returns value when exists', () => {
    expect(propOr('Unknown', 'name', { name: 'Alice' })).toBe('Alice');
  });
  it('returns default when missing', () => {
    const getNameOrUnknown = propOr('Unknown', 'name');
    expect(getNameOrUnknown({})).toBe('Unknown');
  });
  it('returns default for undefined value', () => {
    expect(propOr('default', 'x', { x: undefined })).toBe('default');
  });
});

describe('getTrues', () => {
  it('filters truthy values', () => {
    expect(getTrues({ a: 1, b: 0, c: null, d: 'hello' })).toEqual({ a: 1, d: 'hello' });
  });
  it('empty object returns empty', () => {
    expect(getTrues({})).toEqual({});
  });
});

describe('jsonParse', () => {
  it('parses valid JSON', () => {
    expect(jsonParse('{"a": 1}')).toEqual({ a: 1 });
  });
  it('returns fallback for invalid', () => {
    expect(jsonParse('not json')).toBe('');
  });
  it('returns custom fallback', () => {
    expect(jsonParse('bad', [])).toEqual([]);
  });
  it('returns fallback for null/empty', () => {
    expect(jsonParse(null)).toBe('');
    expect(jsonParse('')).toBe('');
    expect(jsonParse(undefined)).toBe('');
  });
});

describe('mapKeys', () => {
  it('transforms keys', () => {
    expect(mapKeys({ a: 1, b: 2 }, (key) => key.toUpperCase())).toEqual({ A: 1, B: 2 });
  });
  it('prefix keys', () => {
    expect(mapKeys({ name: 'Alice' }, (key) => `user_${key}`)).toEqual({ user_name: 'Alice' });
  });
});

describe('mapValues', () => {
  it('transforms values', () => {
    expect(mapValues({ a: 1, b: 2, c: 3 }, (v) => v * 2)).toEqual({ a: 2, b: 4, c: 6 });
  });
  it('transforms to strings', () => {
    expect(mapValues({ name: 'alice', city: 'nyc' }, (v) => (v as string).toUpperCase()))
      .toEqual({ name: 'ALICE', city: 'NYC' });
  });
});

describe('isEmpty', () => {
  it('empty object', () => expect(isEmpty({})).toBe(true));
  it('non-empty object', () => expect(isEmpty({ a: 1 })).toBe(false));
  it('empty array', () => expect(isEmpty([])).toBe(true));
  it('non-empty array', () => expect(isEmpty([1])).toBe(false));
  it('empty string', () => expect(isEmpty('')).toBe(true));
  it('non-empty string', () => expect(isEmpty('hello')).toBe(false));
  it('null', () => expect(isEmpty(null)).toBe(true));
  it('undefined', () => expect(isEmpty(undefined)).toBe(true));
  it('empty Map', () => expect(isEmpty(new Map())).toBe(true));
  it('non-empty Map', () => expect(isEmpty(new Map([['a', 1]]))).toBe(false));
  it('empty Set', () => expect(isEmpty(new Set())).toBe(true));
  it('non-empty Set', () => expect(isEmpty(new Set([1]))).toBe(false));
  it('number returns false', () => expect(isEmpty(42)).toBe(false));
});
