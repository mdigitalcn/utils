import { describe, it, expect } from 'vitest';
import { validateFileSize } from './index';

describe('validateFileSize', () => {
  const createFile = (sizeInMB: number, type: string) => {
    const bytes = new Uint8Array(Math.round(sizeInMB * 1024 * 1024));
    return new File([bytes], 'test', { type });
  };

  it('valid image within limit', () => {
    const file = createFile(2, 'image/png');
    const result = validateFileSize(file, { image: 5 });
    expect(result.isValid).toBe(true);
  });

  it('invalid image exceeding limit', () => {
    const file = createFile(10, 'image/png');
    const result = validateFileSize(file, { image: 5 });
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toContain('5 MB');
  });

  it('video category', () => {
    const file = createFile(100, 'video/mp4');
    const result = validateFileSize(file, { video: 50 });
    expect(result.isValid).toBe(false);
  });

  it('document fallback category', () => {
    const file = createFile(2, 'application/pdf');
    const result = validateFileSize(file, { document: 10 });
    expect(result.isValid).toBe(true);
  });

  it('custom category resolver', () => {
    const file = createFile(5, 'audio/mp3');
    const result = validateFileSize(file, { audio: 3 }, (f) => {
      if (f.type.startsWith('audio/')) return 'audio';
      return 'other';
    });
    expect(result.isValid).toBe(false);
  });

  it('custom error message', () => {
    const file = createFile(10, 'image/png');
    const result = validateFileSize(file, { image: 5 }, undefined, 'Too big!');
    expect(result.errorMessage).toBe('Too big!');
  });
});
