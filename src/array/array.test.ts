import { describe, it, expect } from 'vitest';
import {
  chunk,
  compact,
  difference,
  drop,
  first,
  flatten,
  intersection,
  keyBy,
  last,
  shuffle,
  sortBy,
  take,
  uniq,
  uniqBy,
  zip,
  groupBy,
  partition,
  collectBy,
  checkValueInArray,
  sameElementsInArrays,
} from './index';

describe('chunk', () => {
  it('splits array into chunks of given size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });
  it('single element chunks', () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });
  it('chunk size >= array length returns single chunk', () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
  });
  it('empty array returns empty', () => {
    expect(chunk([], 3)).toEqual([]);
  });
  it('throws on size < 1', () => {
    expect(() => chunk([1], 0)).toThrow();
    expect(() => chunk([1], -1)).toThrow();
  });
});

describe('compact', () => {
  it('removes all falsy values', () => {
    expect(compact([0, 1, false, 2, '', 3, null, undefined, NaN])).toEqual([1, 2, 3]);
  });
  it('keeps truthy strings', () => {
    expect(compact(['hello', '', 'world', null])).toEqual(['hello', 'world']);
  });
  it('empty array returns empty', () => {
    expect(compact([])).toEqual([]);
  });
});

describe('difference', () => {
  it('returns elements only in first array', () => {
    expect(difference([1, 2, 3, 4], [2, 4])).toEqual([1, 3]);
  });
  it('returns empty when arrays are equal', () => {
    expect(difference([1, 2], [1, 2])).toEqual([]);
  });
  it('returns all when no overlap', () => {
    expect(difference([1, 2], [3, 4])).toEqual([1, 2]);
  });
  it('works with strings', () => {
    expect(difference(['a', 'b', 'c'], ['b'])).toEqual(['a', 'c']);
  });
});

describe('intersection', () => {
  it('returns common elements', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });
  it('returns empty when no overlap', () => {
    expect(intersection([1, 2], [3, 4])).toEqual([]);
  });
  it('works with strings', () => {
    expect(intersection(['a', 'b'], ['b', 'c'])).toEqual(['b']);
  });
});

describe('keyBy', () => {
  it('indexes array by key function', () => {
    const result = keyBy(
      [{ id: 'a1', name: 'Alice' }, { id: 'b2', name: 'Bob' }],
      item => item.id
    );
    expect(result).toEqual({
      a1: { id: 'a1', name: 'Alice' },
      b2: { id: 'b2', name: 'Bob' },
    });
  });
  it('last item wins on duplicate keys', () => {
    const result = keyBy([{ k: 1, v: 'a' }, { k: 1, v: 'b' }], item => item.k);
    expect(result[1].v).toBe('b');
  });
});

describe('shuffle', () => {
  it('returns array with same elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle(arr);
    expect(result).toHaveLength(5);
    expect(result.sort()).toEqual([1, 2, 3, 4, 5]);
  });
  it('does not mutate original', () => {
    const arr = [1, 2, 3];
    shuffle(arr);
    expect(arr).toEqual([1, 2, 3]);
  });
  it('empty array returns empty', () => {
    expect(shuffle([])).toEqual([]);
  });
});

describe('sortBy', () => {
  it('sorts by numeric function', () => {
    expect(sortBy([{ age: 30 }, { age: 20 }, { age: 25 }], x => x.age))
      .toEqual([{ age: 20 }, { age: 25 }, { age: 30 }]);
  });
  it('sorts by string function', () => {
    expect(sortBy(['banana', 'apple', 'cherry'], x => x))
      .toEqual(['apple', 'banana', 'cherry']);
  });
  it('does not mutate original', () => {
    const arr = [3, 1, 2];
    sortBy(arr, x => x);
    expect(arr).toEqual([3, 1, 2]);
  });
});

describe('uniq', () => {
  it('removes duplicates', () => {
    expect(uniq([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
  });
  it('works with strings', () => {
    expect(uniq(['a', 'b', 'a'])).toEqual(['a', 'b']);
  });
  it('empty array returns empty', () => {
    expect(uniq([])).toEqual([]);
  });
});

describe('uniqBy', () => {
  it('deduplicates by function', () => {
    expect(uniqBy([{ id: 1 }, { id: 1 }, { id: 2 }], x => x.id))
      .toEqual([{ id: 1 }, { id: 2 }]);
  });
});

describe('groupBy', () => {
  it('groups by function result', () => {
    const result = groupBy([1, 2, 3, 4], (x) => x % 2 === 0 ? 'even' : 'odd');
    expect(result).toEqual({ odd: [1, 3], even: [2, 4] });
  });
  it('groups objects by property', () => {
    const result = groupBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], x => x.type);
    expect(result).toEqual({
      a: [{ type: 'a' }, { type: 'a' }],
      b: [{ type: 'b' }],
    });
  });
});

describe('partition', () => {
  it('splits by predicate', () => {
    expect(partition([1, 2, 3, 4], (x) => x > 2)).toEqual([[3, 4], [1, 2]]);
  });
  it('all pass', () => {
    expect(partition([1, 2, 3], (x) => x > 0)).toEqual([[1, 2, 3], []]);
  });
  it('none pass', () => {
    expect(partition([1, 2, 3], (x) => x > 10)).toEqual([[], [1, 2, 3]]);
  });
});

describe('collectBy', () => {
  it('groups into sub-arrays', () => {
    const result = collectBy(
      [{ type: 'a', v: 1 }, { type: 'b', v: 2 }, { type: 'a', v: 3 }],
      (x) => x.type
    );
    expect(result).toEqual([
      [{ type: 'a', v: 1 }, { type: 'a', v: 3 }],
      [{ type: 'b', v: 2 }],
    ]);
  });
});

describe('first', () => {
  it('returns first element', () => expect(first([1, 2, 3])).toBe(1));
  it('returns undefined for empty', () => expect(first([])).toBeUndefined());
});

describe('last', () => {
  it('returns last element', () => expect(last([1, 2, 3])).toBe(3));
  it('returns undefined for empty', () => expect(last([])).toBeUndefined());
});

describe('take', () => {
  it('takes first n', () => expect(take([1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3]));
  it('takes all if n > length', () => expect(take([1, 2], 5)).toEqual([1, 2]));
  it('empty array', () => expect(take([], 3)).toEqual([]));
  it('take 0', () => expect(take([1, 2, 3], 0)).toEqual([]));
});

describe('drop', () => {
  it('drops first n', () => expect(drop([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5]));
  it('drops all if n > length', () => expect(drop([1, 2], 5)).toEqual([]));
  it('empty array', () => expect(drop([], 3)).toEqual([]));
  it('drop 0', () => expect(drop([1, 2, 3], 0)).toEqual([1, 2, 3]));
});

describe('flatten', () => {
  it('flattens one level', () => expect(flatten([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5]));
  it('empty', () => expect(flatten([])).toEqual([]));
  it('already flat', () => expect(flatten([1, 2, 3])).toEqual([1, 2, 3]));
});

describe('zip', () => {
  it('zips equal length', () => {
    expect(zip([1, 2, 3], ['a', 'b', 'c'])).toEqual([[1, 'a'], [2, 'b'], [3, 'c']]);
  });
  it('zips unequal length (shorter wins)', () => {
    expect(zip([1, 2], ['a'])).toEqual([[1, 'a']]);
  });
  it('empty arrays', () => expect(zip([], [])).toEqual([]));
});

describe('checkValueInArray', () => {
  it('finds matching value', () => {
    const users = [{ id: '1', name: 'Alice' }, { id: '2', name: 'Bob' }];
    expect(checkValueInArray(users, 'name', 'Alice')).toBe(true);
    expect(checkValueInArray(users, 'id', '3')).toBe(false);
  });
});

describe('sameElementsInArrays', () => {
  it('finds common element across all arrays', () => {
    expect(sameElementsInArrays([1, 2, 3], [3, 4, 5], [3, 6])).toBe(3);
  });
  it('returns null when no common element', () => {
    expect(sameElementsInArrays([1, 2], [3, 4])).toBe(null);
  });
  it('works with strings', () => {
    expect(sameElementsInArrays(['a', 'b'], ['b', 'c'], ['b', 'd'])).toBe('b');
  });
});
