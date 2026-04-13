import { describe, it, expect } from 'vitest';
import {
  pascalCase, startCase, escapeRegExp, slugify,
  template, deburr, maskString, formatBytes,
  formatDuration, pluralize,
} from './index';

describe('pascalCase', () => {
  it('from spaces', () => expect(pascalCase('hello world')).toBe('HelloWorld'));
  it('from hyphens', () => expect(pascalCase('foo-bar-baz')).toBe('FooBarBaz'));
  it('from snake', () => expect(pascalCase('some_snake_case')).toBe('SomeSnakeCase'));
  it('empty', () => expect(pascalCase('')).toBe(''));
});

describe('startCase', () => {
  it('from spaces', () => expect(startCase('hello world')).toBe('Hello World'));
  it('from camelCase', () => expect(startCase('fooBarBaz')).toBe('Foo Bar Baz'));
  it('from snake', () => expect(startCase('some_snake_case')).toBe('Some Snake Case'));
  it('empty', () => expect(startCase('')).toBe(''));
});

describe('escapeRegExp', () => {
  it('escapes special chars', () => {
    expect(escapeRegExp('hello.world')).toBe('hello\\.world');
  });
  it('escapes complex pattern', () => {
    expect(escapeRegExp('$100 (USD)')).toBe('\\$100 \\(USD\\)');
  });
  it('no special chars', () => expect(escapeRegExp('hello')).toBe('hello'));
  it('empty', () => expect(escapeRegExp('')).toBe(''));
});

describe('slugify', () => {
  it('basic', () => expect(slugify('Hello World!')).toBe('hello-world'));
  it('accents removed', () => expect(slugify('café latte')).toBe('cafe-latte'));
  it('multiple hyphens collapsed', () => expect(slugify('foo---bar')).toBe('foo-bar'));
  it('trims hyphens', () => expect(slugify('  hello  ')).toBe('hello'));
  it('empty', () => expect(slugify('')).toBe(''));
});

describe('template', () => {
  it('replaces placeholders', () => {
    expect(template('Hello, {{name}}!', { name: 'World' })).toBe('Hello, World!');
  });
  it('multiple placeholders', () => {
    expect(template('{{a}} + {{b}}', { a: 1, b: 2 })).toBe('1 + 2');
  });
  it('missing key becomes empty', () => {
    expect(template('{{missing}}', {})).toBe('');
  });
  it('custom regex', () => {
    expect(template('Hi <name>', { name: 'Ray' }, /<(.+?)>/g)).toBe('Hi Ray');
  });
});

describe('deburr', () => {
  it('removes accents', () => expect(deburr('café')).toBe('cafe'));
  it('complex', () => expect(deburr('Crème brûlée')).toBe('Creme brulee'));
  it('no accents unchanged', () => expect(deburr('hello')).toBe('hello'));
  it('empty', () => expect(deburr('')).toBe(''));
});

describe('maskString', () => {
  it('masks middle', () => expect(maskString('1234567890', 4, 2)).toBe('1234****90'));
  it('mask all', () => expect(maskString('secret', 0, 0)).toBe('******'));
  it('custom char', () => expect(maskString('hello', 1, 1, '#')).toBe('h###o'));
  it('too short to mask', () => expect(maskString('ab', 1, 1)).toBe('ab'));
  it('no end visible', () => expect(maskString('abcdef', 2, 0)).toBe('ab****'));
});

describe('formatBytes', () => {
  it('zero', () => expect(formatBytes(0)).toBe('0 B'));
  it('KB', () => expect(formatBytes(1024)).toBe('1 KB'));
  it('MB with decimals', () => expect(formatBytes(1536, 1)).toBe('1.5 KB'));
  it('GB', () => expect(formatBytes(1073741824)).toBe('1 GB'));
});

describe('formatDuration', () => {
  it('zero', () => expect(formatDuration(0)).toBe('0s'));
  it('seconds', () => expect(formatDuration(5000)).toBe('5s'));
  it('minutes and seconds', () => expect(formatDuration(65000)).toBe('1m 5s'));
  it('full', () => expect(formatDuration(90061000)).toBe('1d 1h 1m 1s'));
  it('sub-second', () => expect(formatDuration(500)).toBe('500ms'));
});

describe('pluralize', () => {
  it('singular', () => expect(pluralize(1, 'item')).toBe('1 item'));
  it('plural default', () => expect(pluralize(5, 'item')).toBe('5 items'));
  it('zero is plural', () => expect(pluralize(0, 'item')).toBe('0 items'));
  it('custom plural', () => expect(pluralize(2, 'child', 'children')).toBe('2 children'));
  it('custom singular', () => expect(pluralize(1, 'person', 'people')).toBe('1 person'));
});
