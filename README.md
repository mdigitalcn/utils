# @fmlj/utils

Production-grade TypeScript utilities and React hooks. Zero dependencies (except optional React peer).

Tree-shakeable, ESM-only, with full type inference.

## Install

```bash
pnpm add @fmlj/utils
# or
npm install @fmlj/utils
```

## Usage

```ts
// Import everything
import { pipe, pick, isNil, chunk } from '@fmlj/utils';

// Or use subpath imports for smaller bundles
import { chunk, groupBy, zip } from '@fmlj/utils/array';
import { pick, omit, set, get } from '@fmlj/utils/object';
import { pipe, compose, debounce } from '@fmlj/utils/function';
import { isNil, isEqual, isDate } from '@fmlj/utils/predicate';
import { clamp, range, sum } from '@fmlj/utils/math';
import { camelCase, kebabCase, words } from '@fmlj/utils/string';
import { retry, timeout, delay } from '@fmlj/utils/promise';
import { useDebounce, useToggle } from '@fmlj/utils/react';
import { downloadFile, getBase64 } from '@fmlj/utils/file';
import { validateFileSize } from '@fmlj/utils/validation';
```

## API Overview

### Array

| Function | Description |
|----------|-------------|
| `chunk(arr, size)` | Split array into groups of `size` |
| `compact(arr)` | Remove falsy values |
| `difference(a, b)` | Elements in `a` not in `b` |
| `drop(arr, n)` | Remove first `n` elements |
| `first(arr)` | First element or `undefined` |
| `flatten(arr)` | Flatten one level |
| `groupBy(arr, fn)` | Group by function result |
| `intersection(a, b)` | Elements in both arrays |
| `keyBy(arr, fn)` | Index array into object by key |
| `last(arr)` | Last element or `undefined` |
| `partition(arr, fn)` | Split into `[pass, fail]` |
| `shuffle(arr)` | Random order (Fisher-Yates) |
| `sortBy(arr, fn)` | Sort by function result |
| `take(arr, n)` | First `n` elements |
| `uniq(arr)` | Remove duplicates |
| `uniqBy(arr, fn)` | Remove duplicates by function |
| `zip(a, b)` | Pair elements into tuples |
| `collectBy(arr, fn)` | Group into sub-arrays by key |
| `checkValueInArray(arr, key, val)` | Check if value exists for key |
| `sameElementsInArrays(...arrs)` | First element common to all |

### Object

| Function | Description |
|----------|-------------|
| `pick(obj, keys)` | Keep only specified keys |
| `pickBy(obj, fn)` | Keep properties passing predicate |
| `omit(obj, keys)` | Remove specified keys |
| `omitBy(obj, fn)` | Remove properties passing predicate |
| `get(obj, path, default?)` | Safe deep access by string/array path |
| `set(obj, path, value)` | Immutable deep setter |
| `has(obj, path)` | Check if deep path exists |
| `path(obj, pathArr)` | Access by array path |
| `pathOr(default, obj, pathArr)` | Access with fallback |
| `prop(key)` / `prop(key, obj)` | Property accessor (curried) |
| `propOr(default, key)` | Property accessor with fallback |
| `mergeDeep(a, b)` | Deep merge (b wins) |
| `cloneDeep(obj)` | Deep clone (handles circular refs) |
| `invert(obj)` | Swap keys ↔ values |
| `mapKeys(obj, fn)` | Transform keys |
| `mapValues(obj, fn)` | Transform values |
| `isEmpty(value)` | Check if empty (works with obj/arr/string/Map/Set) |
| `getTrues(obj)` | Keep only truthy values |
| `jsonParse(str, fallback?)` | Safe JSON.parse |

### Function

| Function | Description |
|----------|-------------|
| `pipe(f1, f2, ...)` | Left-to-right composition (type-safe up to 9 fns) |
| `compose(f1, f2, ...)` | Right-to-left composition (type-safe up to 9 fns) |
| `curry2(fn)` / `curry3` / `curry4` | Curry with 2–4 params |
| `partial(fn, ...args)` | Partial application (type-safe) |
| `memoize(fn, maxSize?)` | LRU memoization (default 500) |
| `debounce(fn, wait)` | Debounce with `.cancel()` / `.flush()` |
| `throttle(fn, interval)` | Throttle with `.cancel()` |
| `once(fn)` | Execute only once |
| `identity(x)` | Returns `x` |
| `noop()` / `asyncNoop()` | No-op functions |
| `hexToRgba(hex, opacity?)` | HEX → RGBA hex string |
| `convertToFormData(obj)` | Object → FormData |
| `createQueryString(params)` | Object → URL query string |

### Predicate

| Function | Description |
|----------|-------------|
| `isNil(v)` | `null \| undefined` guard |
| `isNotNil(v)` | Exclude `null \| undefined` |
| `isString(v)` | String primitive guard |
| `isNumber(v)` | Finite number guard (excludes NaN/Infinity) |
| `isBoolean(v)` | Boolean guard |
| `isArray(v)` | Array guard |
| `isFunction(v)` | Function guard |
| `isDate(v)` | Valid Date guard (excludes invalid dates) |
| `isPlainObject(v)` | Plain object guard (excludes arrays, class instances) |
| `isEqual(a, b)` | Deep equality (handles Date/RegExp/Map/Set) |

### Math

| Function | Description |
|----------|-------------|
| `clamp(min, max, value)` | Clamp number to range |
| `sum(numbers)` | Sum array |
| `mean(numbers)` | Arithmetic mean |
| `median(numbers)` | Median value |
| `round(value, precision?)` | Round to decimal places |
| `random(min, max?)` | Random float |
| `randomInt(min, max?)` | Random integer |
| `range(start, end?, step?)` | Generate number array |
| `inRange(value, start, end?)` | Check if in range |

### String

| Function | Description |
|----------|-------------|
| `capitalize(str)` | Capitalize first letter |
| `camelCase(str)` | Convert to camelCase |
| `kebabCase(str)` | Convert to kebab-case |
| `snakeCase(str)` | Convert to snake_case |
| `words(str)` | Split into word array |
| `escapeHtml(str)` | Escape HTML entities |
| `formatNumber(num, locale?)` | Format with thousands separators |
| `truncateString(str, max)` | Truncate with ellipsis |
| `htmlToText(html)` | Strip HTML tags |

### Promise

| Function | Description |
|----------|-------------|
| `delay(ms)` | Promise-based delay |
| `retry(fn, options?)` | Retry with exponential backoff |
| `timeout(promise, ms, msg?)` | Timeout wrapper |

### React Hooks

> Requires `react >= 19.0.0` as peer dependency.

| Hook | Description |
|------|-------------|
| `useDebounce(value, delay)` | Debounce a value |
| `useThrottle(callback, delay)` | Throttle a callback |
| `useLocalStorage(key, initial)` | Persistent state in localStorage |
| `useSessionStorage(key, initial)` | Persistent state in sessionStorage |
| `useToggle(initial?)` | Boolean toggle `[state, toggle, set]` |
| `usePrevious(value)` | Previous render's value |
| `useClickOutside(callback)` | Detect clicks outside element |
| `useMediaQuery(query)` | CSS media query match |
| `useIntersectionObserver(opts?)` | Viewport intersection detection |
| `useMountEffect(effect)` | Run once on mount |
| `useUpdateEffect(effect, deps)` | Run on updates only (skip mount) |
| `useScreenSize(threshold?)` | Check if below width threshold |
| `useIsMounted()` | Check if component is mounted |
| `useCopyToClipboard(resetDelay?)` | Copy text to clipboard |

### React Utilities

| Utility | Description |
|---------|-------------|
| `clsx(...args)` | Conditional class name builder |
| `createContext(name)` | Type-safe context + hook factory |
| `displayField(value, placeholder?)` | Display-safe value with fallback |

### File

| Function | Description |
|----------|-------------|
| `anyToString(value)` | File → object URL, string → string |
| `downloadFile(getData, name)` | Download blob as file |
| `getBase64(file)` | File → base64 string |
| `isFileArray(value)` | Check if array of File/Blob |
| `decodeURIValue(uri)` | Extract filename from URI |

### Validation

| Function | Description |
|----------|-------------|
| `validateFileSize(file, limits, resolver?)` | Validate file size by category |

### Types

```ts
import type {
  Predicate,
  Transformer,
  Comparator,
  Reducer,
  Curried2, Curried3, Curried4,
  DeepReadonly,
  DeepPartial,
  Nullish,
  RequireKeys,
  OptionalKeys,
} from '@fmlj/utils';
```

## Convention

All functions use **data-first** argument order:

```ts
pick(object, keys)      // ✅ data first
groupBy(array, fn)      // ✅ data first
partition(array, fn)    // ✅ data first
```

## License

MIT
