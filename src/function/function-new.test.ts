import { describe, it, expect } from 'vitest';
import { negate } from './index';

describe('negate', () => {
  it('negates predicate', () => {
    const isEven = (n: number) => n % 2 === 0;
    expect([1, 2, 3, 4, 5].filter(negate(isEven))).toEqual([1, 3, 5]);
  });
  it('negates truthy check', () => {
    const isTruthy = (v: any) => Boolean(v);
    expect([0, 1, '', 'a', null].filter(negate(isTruthy))).toEqual([0, '', null]);
  });
});
