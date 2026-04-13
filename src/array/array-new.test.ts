import { describe, it, expect } from 'vitest';
import {
  countBy, minBy, maxBy, union, xor, without,
  takeWhile, dropWhile, sample, zipObject,
} from './index';

describe('countBy', () => {
  it('counts occurrences', () => {
    expect(countBy(['a', 'b', 'a', 'c', 'b', 'a'], x => x)).toEqual({ a: 3, b: 2, c: 1 });
  });
  it('counts by function', () => {
    expect(countBy([1, 2, 3, 4, 5], x => x % 2 === 0 ? 'even' : 'odd')).toEqual({ odd: 3, even: 2 });
  });
  it('empty array', () => expect(countBy([], x => x)).toEqual({}));
});

describe('minBy', () => {
  it('finds min', () => {
    expect(minBy([{ a: 30 }, { a: 10 }, { a: 20 }], x => x.a)).toEqual({ a: 10 });
  });
  it('empty', () => expect(minBy([], (x: number) => x)).toBeUndefined());
  it('single element', () => expect(minBy([5], x => x)).toBe(5));
});

describe('maxBy', () => {
  it('finds max', () => {
    expect(maxBy([{ a: 30 }, { a: 10 }, { a: 20 }], x => x.a)).toEqual({ a: 30 });
  });
  it('empty', () => expect(maxBy([], (x: number) => x)).toBeUndefined());
});

describe('union', () => {
  it('merges unique values', () => {
    expect(union([1, 2, 3], [3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });
  it('handles duplicates', () => {
    expect(union([1, 1], [1, 2])).toEqual([1, 2]);
  });
  it('empty arrays', () => expect(union([], [])).toEqual([]));
});

describe('xor', () => {
  it('symmetric difference', () => {
    expect(xor([1, 2, 3, 4], [3, 4, 5, 6])).toEqual([1, 2, 5, 6]);
  });
  it('strings', () => expect(xor(['a', 'b'], ['b', 'c'])).toEqual(['a', 'c']));
  it('identical', () => expect(xor([1, 2], [1, 2])).toEqual([]));
  it('no overlap', () => expect(xor([1, 2], [3, 4])).toEqual([1, 2, 3, 4]));
});

describe('without', () => {
  it('removes values', () => expect(without([1, 2, 3, 4, 5], 2, 4)).toEqual([1, 3, 5]));
  it('strings', () => expect(without(['a', 'b', 'c'], 'b')).toEqual(['a', 'c']));
  it('no match', () => expect(without([1, 2], 3)).toEqual([1, 2]));
  it('empty', () => expect(without([], 1)).toEqual([]));
});

describe('takeWhile', () => {
  it('takes while true', () => expect(takeWhile([1, 2, 3, 4, 1], x => x < 3)).toEqual([1, 2]));
  it('all pass', () => expect(takeWhile([1, 2, 3], x => x < 10)).toEqual([1, 2, 3]));
  it('none pass', () => expect(takeWhile([5, 4, 3], x => x < 3)).toEqual([]));
  it('empty', () => expect(takeWhile([], () => true)).toEqual([]));
});

describe('dropWhile', () => {
  it('drops while true', () => expect(dropWhile([1, 2, 3, 4, 1], x => x < 3)).toEqual([3, 4, 1]));
  it('all pass', () => expect(dropWhile([1, 2, 3], x => x < 10)).toEqual([]));
  it('none pass', () => expect(dropWhile([5, 4, 3], x => x < 3)).toEqual([5, 4, 3]));
});

describe('sample', () => {
  it('returns element from array', () => {
    const arr = [1, 2, 3, 4, 5];
    for (let i = 0; i < 50; i++) {
      expect(arr).toContain(sample(arr));
    }
  });
  it('empty returns undefined', () => expect(sample([])).toBeUndefined());
  it('single element', () => expect(sample([42])).toBe(42));
});

describe('zipObject', () => {
  it('creates object from keys and values', () => {
    expect(zipObject(['a', 'b', 'c'], [1, 2, 3])).toEqual({ a: 1, b: 2, c: 3 });
  });
  it('missing values become undefined', () => {
    expect(zipObject(['x', 'y'], [10])).toEqual({ x: 10, y: undefined });
  });
  it('empty', () => expect(zipObject([], [])).toEqual({}));
});
