import { describe, it, expect } from 'vitest';
import {
  capitalize,
  camelCase,
  kebabCase,
  snakeCase,
  words,
  escapeHtml,
  formatNumber,
  truncateString,
  htmlToText,
} from './index';

describe('capitalize', () => {
  it('capitalizes first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });
  it('empty string returns empty', () => {
    expect(capitalize('')).toBe('');
  });
  it('already capitalized', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });
});

describe('camelCase', () => {
  it('from spaces', () => expect(camelCase('hello world')).toBe('helloWorld'));
  it('from hyphens', () => expect(camelCase('foo-bar-baz')).toBe('fooBarBaz'));
  it('from underscores', () => expect(camelCase('FOO_BAR')).toBe('fooBar'));
  it('mixed', () => expect(camelCase('some-Mixed_string')).toBe('someMixedString'));
  it('PascalCase', () => expect(camelCase('PascalCase')).toBe('pascalCase'));
  it('empty', () => expect(camelCase('')).toBe(''));
  it('single word', () => expect(camelCase('hello')).toBe('hello'));
});

describe('kebabCase', () => {
  it('from camelCase', () => expect(kebabCase('helloWorld')).toBe('hello-world'));
  it('from underscores', () => expect(kebabCase('FOO_BAR')).toBe('foo-bar'));
  it('from spaces', () => expect(kebabCase('some string here')).toBe('some-string-here'));
  it('from PascalCase', () => expect(kebabCase('PascalCase')).toBe('pascal-case'));
  it('empty', () => expect(kebabCase('')).toBe(''));
});

describe('snakeCase', () => {
  it('from camelCase', () => expect(snakeCase('helloWorld')).toBe('hello_world'));
  it('from hyphens', () => expect(snakeCase('foo-bar-baz')).toBe('foo_bar_baz'));
  it('from spaces', () => expect(snakeCase('Some String Here')).toBe('some_string_here'));
  it('from PascalCase', () => expect(snakeCase('PascalCase')).toBe('pascal_case'));
  it('empty', () => expect(snakeCase('')).toBe(''));
});

describe('words', () => {
  it('splits camelCase', () => expect(words('helloWorld')).toEqual(['hello', 'world']));
  it('splits hyphens', () => expect(words('foo-bar-baz')).toEqual(['foo', 'bar', 'baz']));
  it('splits underscores', () => expect(words('FOO_BAR')).toEqual(['foo', 'bar']));
  it('splits PascalCase', () => expect(words('PascalCase')).toEqual(['pascal', 'case']));
  it('handles mixed', () => expect(words('some-Mixed_string')).toEqual(['some', 'mixed', 'string']));
  it('empty returns empty array', () => expect(words('')).toEqual([]));
});

describe('escapeHtml', () => {
  it('escapes all special chars', () => {
    expect(escapeHtml('<script>alert("xss")</script>'))
      .toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
  });
  it('escapes ampersand', () => {
    expect(escapeHtml('a & b')).toBe('a &amp; b');
  });
  it('escapes single quotes', () => {
    expect(escapeHtml("it's")).toBe("it&#39;s");
  });
  it('empty returns empty', () => {
    expect(escapeHtml('')).toBe('');
  });
  it('no special chars returns same', () => {
    expect(escapeHtml('hello world')).toBe('hello world');
  });
});

describe('formatNumber', () => {
  it('formats with commas (en-US)', () => {
    expect(formatNumber(1234567)).toBe('1,234,567');
  });
  it('formats string numbers', () => {
    expect(formatNumber('987654321')).toBe('987,654,321');
  });
  it('returns original for non-numbers', () => {
    expect(formatNumber('abc')).toBe('abc');
  });
});

describe('truncateString', () => {
  it('truncates long strings', () => {
    expect(truncateString('Hello, world!', 5)).toBe('Hello...');
  });
  it('keeps short strings as-is', () => {
    expect(truncateString('Short', 10)).toBe('Short');
  });
  it('exact length stays as-is', () => {
    expect(truncateString('abc', 3)).toBe('abc');
  });
});

describe('htmlToText', () => {
  it('strips HTML tags', () => {
    expect(htmlToText('<h1>Hello</h1> <p>World</p>')).toBe('Hello World');
  });
  it('normalizes whitespace', () => {
    expect(htmlToText('<div>  hello   world  </div>')).toBe('hello world');
  });
  it('empty returns empty', () => {
    expect(htmlToText('')).toBe('');
  });
  it('null-ish returns empty', () => {
    expect(htmlToText(null as any)).toBe('');
    expect(htmlToText(undefined as any)).toBe('');
  });
});
