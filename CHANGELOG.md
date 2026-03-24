# Changelog

## 2.0.0

### Breaking Changes

- **Data-first argument order** — All functions now use `fn(data, ...options)` convention:
  - `pick(obj, keys)` (was `pick(keys, obj)`)
  - `omit(obj, keys)` (was `omit(keys, obj)`)
  - `partition(arr, fn)` (was `partition(fn, arr)`)
  - `uniqBy(arr, fn)` (was `uniqBy(fn, arr)`)
  - `collectBy(arr, fn)` (was `collectBy(fn, arr)`)
  - `groupBy(arr, fn)` (was `groupBy(fn, arr)`) — curried overload removed
  - `path(obj, pathArr)` (was `path(pathArr, obj)`)
  - `pathOr(default, obj, pathArr)` (was `pathOr(default, pathArr, obj)`)

- **`displayField` moved** from `@fmlj/utils/string` to `@fmlj/utils/react`

- **`anyToString` signature changed** — now accepts `File | string` (was `any`)

### New Features

#### Predicates
- `isBoolean(value)` — boolean type guard
- `isArray(value)` — array type guard
- `isFunction(value)` — function type guard
- `isDate(value)` — valid Date type guard

#### Array
- `first(arr)` — first element
- `last(arr)` — last element
- `take(arr, n)` — first n elements
- `drop(arr, n)` — skip first n elements
- `flatten(arr)` — flatten one level
- `zip(a, b)` — pair elements into tuples

#### Object
- `set(obj, path, value)` — immutable deep setter
- `has(obj, path)` — deep path existence check
- `invert(obj)` — swap keys and values

#### String
- `words(str)` — split string into word array

#### React Hooks
- `useIsMounted()` — check if component is still mounted
- `useCopyToClipboard(resetDelay?)` — clipboard copy with state tracking

### Improvements

- **Type-safe `pipe` and `compose`** — full type inference for up to 9 chained functions
- **Type-safe `partial`** — preserves types for up to 3 pre-applied arguments
- **`compact` type narrowing** — properly excludes `Falsy` types from result
- **`isEqual` deep Set comparison** — now uses deep equality for Set members
- **`checkValueInArray` value type** — `value` param is now `T[keyof T]` (was `string`)
- **`words()` shared helper** — `camelCase`, `kebabCase`, `snakeCase` use shared word-splitting logic
- **React as optional peer dependency** — `peerDependenciesMeta.react.optional: true`
- **All React hooks tested** — 31 hook tests added with `@testing-library/react`

### Fixes

- Fixed TypeScript error in `propOr` test
- Removed incorrect `"use client"` from `formatNumber`
- Fixed `.ts` → `.js` import extensions in `file/index.ts`
- Fixed `jsonParse` JSDoc (incorrect examples)
- Removed stray `export default` from `collectBy`
- Translated Russian JSDoc to English in `displayField`
- Added `vitest/globals` to tsconfig types

## 1.0.3

- Initial public release
