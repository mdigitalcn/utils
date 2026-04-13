import { describe, it, expect, vi } from 'vitest';
import { anyToString, convertToFormData, decodeURIValue, isFileArray, getBase64, downloadFile } from './index';

describe('anyToString', () => {
  it('converts File to object URL', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const result = anyToString(file);
    expect(result).toMatch(/^blob:/);
  });
  it('returns string as-is', () => {
    expect(anyToString('https://example.com')).toBe('https://example.com');
  });
  it('returns string value as-is', () => {
    expect(anyToString('/path/to/file.png')).toBe('/path/to/file.png');
  });
});

describe('convertToFormData', () => {
  it('converts object to FormData', () => {
    const fd = convertToFormData({ name: 'John', age: 30 });
    expect(fd.get('name')).toBe('John');
    expect(fd.get('age')).toBe('30');
  });
  it('skips null and undefined', () => {
    const fd = convertToFormData({ a: 'value', b: null, c: undefined });
    expect(fd.get('a')).toBe('value');
    expect(fd.get('b')).toBeNull();
    expect(fd.get('c')).toBeNull();
  });
  it('handles File arrays', () => {
    const file1 = new File(['a'], 'a.txt', { type: 'text/plain' });
    const file2 = new File(['b'], 'b.txt', { type: 'text/plain' });
    const fd = convertToFormData({ files: [file1, file2] });
    expect(fd.getAll('files')).toHaveLength(2);
  });
  it('handles single File', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const fd = convertToFormData({ doc: file });
    expect(fd.get('doc')).toBeInstanceOf(File);
  });
});

describe('decodeURIValue', () => {
  it('extracts filename from URL', () => {
    expect(decodeURIValue('https://example.com/files/test.pdf')).toBe('test.pdf');
  });
  it('decodes URI-encoded characters', () => {
    expect(decodeURIValue('https://example.com/%D1%82%D0%B5%D1%81%D1%82.pdf'))
      .toBe('тест.pdf');
  });
  it('returns empty on invalid URI', () => {
    expect(decodeURIValue('%E0%A4%A')).toBe('');
  });
});

describe('isFileArray', () => {
  it('true for File array', () => {
    const files = [new File(['a'], 'a.txt'), new File(['b'], 'b.txt')];
    expect(isFileArray(files)).toBe(true);
  });
  it('true for Blob array', () => {
    expect(isFileArray([new Blob(['a']), new Blob(['b'])])).toBe(true);
  });
  it('false for non-array', () => {
    expect(isFileArray('not an array')).toBe(false);
  });
  it('false for mixed array', () => {
    expect(isFileArray([new File(['a'], 'a.txt'), 'string'])).toBe(false);
  });
  it('true for empty array', () => {
    expect(isFileArray([])).toBe(true);
  });
});

describe('getBase64', () => {
  it('converts file to base64', async () => {
    const file = new File(['Hello World'], 'test.txt', { type: 'text/plain' });
    const result = await getBase64(file);
    expect(result).toMatch(/^data:text\/plain;base64,/);
  });
});

describe('downloadFile', () => {
  it('creates and clicks a download link', async () => {
    const blob = new Blob(['test content'], { type: 'text/plain' });
    const mockClick = vi.fn();
    const mockCreateElement = vi.spyOn(document, 'createElement').mockReturnValue({
      href: '',
      download: '',
      click: mockClick,
    } as any);
    const mockCreateObjectURL = vi.fn().mockReturnValue('blob:test');
    const mockRevokeObjectURL = vi.fn();
    Object.defineProperty(window, 'URL', {
      value: { createObjectURL: mockCreateObjectURL, revokeObjectURL: mockRevokeObjectURL },
      writable: true,
    });

    await downloadFile(() => Promise.resolve(blob), 'test.txt');

    expect(mockCreateObjectURL).toHaveBeenCalledWith(blob);
    expect(mockClick).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:test');

    mockCreateElement.mockRestore();
  });
});
