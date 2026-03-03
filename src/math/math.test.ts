import { describe, it, expect } from 'vitest';
import { clamp, sum, mean, median, round, random, randomInt, range, inRange } from './index';

describe('clamp', () => {
  it('clamps above max', () => expect(clamp(0, 10, 15)).toBe(10));
  it('clamps below min', () => expect(clamp(0, 10, -5)).toBe(0));
  it('within range unchanged', () => expect(clamp(0, 10, 5)).toBe(5));
  it('at boundaries', () => {
    expect(clamp(0, 10, 0)).toBe(0);
    expect(clamp(0, 10, 10)).toBe(10);
  });
});

describe('sum', () => {
  it('sums numbers', () => expect(sum([1, 2, 3, 4])).toBe(10));
  it('empty array returns 0', () => expect(sum([])).toBe(0));
  it('single element', () => expect(sum([5])).toBe(5));
  it('negative numbers', () => expect(sum([-1, 1])).toBe(0));
});

describe('mean', () => {
  it('calculates average', () => expect(mean([1, 2, 3, 4])).toBe(2.5));
  it('empty array returns 0', () => expect(mean([])).toBe(0));
  it('single element', () => expect(mean([5])).toBe(5));
});

describe('median', () => {
  it('odd length — middle value', () => expect(median([1, 2, 3])).toBe(2));
  it('even length — average of middle two', () => expect(median([1, 2, 3, 4])).toBe(2.5));
  it('unsorted input', () => expect(median([5, 1, 3])).toBe(3));
  it('empty array returns 0', () => expect(median([])).toBe(0));
  it('single element', () => expect(median([7])).toBe(7));
  it('does not mutate original', () => {
    const arr = [3, 1, 2];
    median(arr);
    expect(arr).toEqual([3, 1, 2]);
  });
});

describe('round', () => {
  it('rounds to decimals', () => expect(round(1.2345, 2)).toBe(1.23));
  it('rounds half up', () => expect(round(1.235, 2)).toBe(1.24));
  it('default precision is 0', () => expect(round(1.5)).toBe(2));
  it('negative precision', () => expect(round(1234, -2)).toBe(1200));
  it('zero stays zero', () => expect(round(0)).toBe(0));
});

describe('random', () => {
  it('returns number in range', () => {
    for (let i = 0; i < 100; i++) {
      const r = random(1, 10);
      expect(r).toBeGreaterThanOrEqual(1);
      expect(r).toBeLessThanOrEqual(10);
    }
  });
  it('single arg: 0 to n', () => {
    for (let i = 0; i < 100; i++) {
      const r = random(5);
      expect(r).toBeGreaterThanOrEqual(0);
      expect(r).toBeLessThanOrEqual(5);
    }
  });
});

describe('randomInt', () => {
  it('returns integer in range', () => {
    for (let i = 0; i < 100; i++) {
      const r = randomInt(1, 10);
      expect(Number.isInteger(r)).toBe(true);
      expect(r).toBeGreaterThanOrEqual(1);
      expect(r).toBeLessThanOrEqual(10);
    }
  });
  it('single arg: 0 to n', () => {
    for (let i = 0; i < 100; i++) {
      const r = randomInt(5);
      expect(Number.isInteger(r)).toBe(true);
      expect(r).toBeGreaterThanOrEqual(0);
      expect(r).toBeLessThanOrEqual(5);
    }
  });
});

describe('range', () => {
  it('single arg: 0 to n', () => expect(range(5)).toEqual([0, 1, 2, 3, 4]));
  it('start and end', () => expect(range(1, 5)).toEqual([1, 2, 3, 4]));
  it('with step', () => expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]));
  it('descending', () => expect(range(5, 0, -1)).toEqual([5, 4, 3, 2, 1]));
  it('auto descending', () => expect(range(5, 0)).toEqual([5, 4, 3, 2, 1]));
  it('zero range', () => expect(range(0)).toEqual([]));
  it('same start and end', () => expect(range(3, 3)).toEqual([]));
  it('throws on zero step', () => expect(() => range(0, 10, 0)).toThrow());
});

describe('inRange', () => {
  it('in range', () => expect(inRange(3, 1, 5)).toBe(true));
  it('end exclusive', () => expect(inRange(5, 1, 5)).toBe(false));
  it('start inclusive', () => expect(inRange(1, 1, 5)).toBe(true));
  it('two args: 0 to end', () => {
    expect(inRange(3, 5)).toBe(true);
    expect(inRange(-1, 5)).toBe(false);
  });
  it('out of range', () => expect(inRange(10, 1, 5)).toBe(false));
  it('inverted range works', () => expect(inRange(3, 5, 1)).toBe(true));
});
