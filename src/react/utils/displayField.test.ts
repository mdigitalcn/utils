import { describe, it, expect } from 'vitest';
import { displayField } from './displayField';

describe('displayField', () => {
  it('returns number as-is (including 0)', () => {
    expect(displayField(42)).toBe(42);
    expect(displayField(0)).toBe(0);
    expect(displayField(-1)).toBe(-1);
  });

  it('returns string as-is', () => {
    expect(displayField('Hello')).toBe('Hello');
  });

  it('returns placeholder for null', () => {
    expect(displayField(null)).toBe('-');
  });

  it('returns placeholder for undefined', () => {
    expect(displayField(undefined)).toBe('-');
  });

  it('returns placeholder for empty string', () => {
    expect(displayField('')).toBe('-');
  });

  it('uses custom placeholder', () => {
    expect(displayField(null, 'N/A')).toBe('N/A');
    expect(displayField(undefined, 0)).toBe(0);
  });
});
