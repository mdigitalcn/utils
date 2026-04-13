/**
 * @mdigitalcn/utils
 *
 * Production-grade TypeScript utilities — universal JS, works everywhere.
 *
 * React hooks are available via subpath import: `@mdigitalcn/utils/react`
 * Browser-only file utils via: `@mdigitalcn/utils/file`
 * Browser-only validation via: `@mdigitalcn/utils/validation`
 */

// Core types — universal
export * from './types/index.js';

// Array utilities — universal
export * from './array/index.js';

// Object utilities — universal
export * from './object/index.js';

// Function utilities — universal
export * from './function/index.js';

// Math utilities — universal
export * from './math/index.js';

// String utilities — universal
export * from './string/index.js';

// Predicate type guards — universal
export * from './predicate/index.js';

// Promise utilities — universal
export * from './promise/index.js';

// NOTE: file/, validation/, react/ are NOT re-exported here.
// They require browser/React APIs and must be imported via subpath:
//   import { downloadFile } from '@mdigitalcn/utils/file'
//   import { validateFileSize } from '@mdigitalcn/utils/validation'
//   import { useDebounce } from '@mdigitalcn/utils/react'
