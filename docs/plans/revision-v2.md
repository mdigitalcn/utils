# @mdigitalcn/utils Revision Plan v2

## Requirements Summary

Full revision of the utility library to fix bugs, improve type safety, standardize conventions, fill test coverage gaps, and add missing utilities. The package should be a polished, publishable npm library.

---

## Phase 1: Critical Fixes (no breaking changes)

**Goal:** Fix bugs and errors that exist right now.

| # | Task | Files | Effort |
|---|------|-------|--------|
| 1.1 | Fix TypeScript error — `propOr` test passes `{}` violating `Record<"name", any>` | `src/object/object.test.ts` | 2 min |
| 1.2 | Remove `"use client"` from `formatNumber.ts` — pure util, not a hook | `src/string/formatNumber.ts` | 1 min |
| 1.3 | Fix `file/index.ts` — change `.ts` imports to `.js` to match all other barrel files | `src/file/index.ts` | 1 min |
| 1.4 | Fix `checkValueInArray` — change `value: string` to `value: T[keyof T]` | `src/array/checkValueInArray.ts` | 2 min |
| 1.5 | Fix `jsonParse` JSDoc — `jsonParse('true')` returns `true`, not `undefined` | `src/object/jsonParse.ts` | 2 min |
| 1.6 | Remove stray `export default` from `collectBy.ts` | `src/array/collectBy.ts` | 1 min |
| 1.7 | Fix `anyToString` typing — replace `any` with `unknown`, return `string` properly | `src/file/anyToString.ts` | 3 min |
| 1.8 | Translate `displayField` Russian JSDoc to English | `src/string/displayField.ts` | 3 min |

**Acceptance criteria:**
- [ ] `pnpm typecheck` passes with 0 errors
- [ ] `pnpm test` still passes 294 tests
- [ ] No `any` in public API signatures (except `memoize` cache key)
- [ ] All JSDoc in English, no factual errors

---

## Phase 2: Structural Refactors

**Goal:** Fix architectural issues and standardize conventions.

| # | Task | Files | Effort |
|---|------|-------|--------|
| 2.1 | Move `displayField.ts` from `string/` to `react/utils/` — it imports `ReactNode` | `src/string/displayField.ts` → `src/react/utils/displayField.ts`, update both barrel files | 5 min |
| 2.2 | Standardize argument order to **data-first** everywhere | See table below | 30 min |
| 2.3 | Add `peerDependenciesMeta` to `package.json` — React optional | `package.json` | 1 min |
| 2.4 | Remove `pnpm-workspace.yaml` — not a monorepo | `pnpm-workspace.yaml` | 1 min |
| 2.5 | Extract shared `words()` helper for case conversion fns | `src/string/words.ts`, update `camelCase`, `kebabCase`, `snakeCase` | 10 min |

### 2.2 Argument order migration (data-first)

Functions to change (currently data-last → data-first):

| Function | Current | Target |
|----------|---------|--------|
| `pick(keys, obj)` | `pick(['a'], obj)` | `pick(obj, ['a'])` |
| `omit(keys, obj)` | `omit(['b'], obj)` | `omit(obj, ['b'])` |
| `partition(pred, list)` | `partition(fn, arr)` | `partition(arr, fn)` |
| `uniqBy(fn, list)` | `uniqBy(fn, arr)` | `uniqBy(arr, fn)` |
| `collectBy(fn, list)` | `collectBy(fn, arr)` | `collectBy(arr, fn)` |
| `groupBy(fn, list)` | `groupBy(fn, list)` | `groupBy(list, fn)` — drop auto-curry overload |
| `path(pathArr, obj)` | `path(['a'], obj)` | `path(obj, ['a'])` |
| `pathOr(default, pathArr, obj)` | keep — 3-arg is fine, default-first is Ramda convention and readable |

> **Breaking change.** This is v2. Mark clearly in CHANGELOG.

**Acceptance criteria:**
- [ ] All public functions use data-first: `fn(data, ...options)`
- [ ] Exception: `pathOr(default, path, obj)` — intentional, documented
- [ ] `pnpm typecheck` passes
- [ ] All tests updated and passing
- [ ] `displayField` no longer in `string` module
- [ ] `string` module has zero React imports

---

## Phase 3: Type Safety Improvements

**Goal:** Make pipe/compose/partial actually useful in TypeScript.

| # | Task | Files | Effort |
|---|------|-------|--------|
| 3.1 | Add overloads to `pipe` (up to 9 functions) for full type inference | `src/function/pipe.ts` | 15 min |
| 3.2 | Add overloads to `compose` (up to 9 functions) | `src/function/compose.ts` | 15 min |
| 3.3 | Improve `partial` types — at least for 1-2 pre-applied args | `src/function/partial.ts` | 10 min |
| 3.4 | Fix `compact` return type — use conditional type to exclude falsy | `src/array/compact.ts` | 5 min |
| 3.5 | Fix `isEqual` Set comparison — use deep equality for Set members | `src/predicate/isEqual.ts` | 10 min |

**Acceptance criteria:**
- [ ] `pipe(add1, double)` infers `(a: number) => number` — not `any`
- [ ] `compose(double, add1)` same
- [ ] `compact([0, 1, null, 'hello'])` return type excludes `null | 0`
- [ ] `isEqual(new Set([{a:1}]), new Set([{a:1}]))` returns `true`
- [ ] Tests cover all new type overloads

---

## Phase 4: Test Coverage

**Goal:** Cover all untested code, especially React hooks.

| # | Task | Files | Effort |
|---|------|-------|--------|
| 4.1 | Test `useDebounce` | `src/react/hooks/useDebounce.test.ts` | 10 min |
| 4.2 | Test `useThrottle` | `src/react/hooks/useThrottle.test.ts` | 10 min |
| 4.3 | Test `useToggle` | `src/react/hooks/useToggle.test.ts` | 5 min |
| 4.4 | Test `useClickOutside` | `src/react/hooks/useClickOutside.test.ts` | 10 min |
| 4.5 | Test `useLocalStorage` | `src/react/hooks/useLocalStorage.test.ts` | 10 min |
| 4.6 | Test `useSessionStorage` | `src/react/hooks/useSessionStorage.test.ts` | 10 min |
| 4.7 | Test `useMediaQuery` | `src/react/hooks/useMediaQuery.test.ts` | 10 min |
| 4.8 | Test `usePrevious` | `src/react/hooks/usePrevious.test.ts` | 5 min |
| 4.9 | Test `useUpdateEffect` | `src/react/hooks/useUpdateEffect.test.ts` | 5 min |
| 4.10 | Test `useMountEffect` | `src/react/hooks/useMountEffect.test.ts` | 5 min |
| 4.11 | Test `useIntersectionObserver` | `src/react/hooks/useIntersectionObserver.test.ts` | 10 min |
| 4.12 | Test `useScreenSize` | `src/react/hooks/useScreenSize.test.ts` | 5 min |
| 4.13 | Test `displayField` (after move to react/utils) | `src/react/utils/displayField.test.ts` | 5 min |
| 4.14 | Test `downloadFile` | `src/file/file.test.ts` (extend) | 5 min |
| 4.15 | Add `isEqual` edge case tests — Sets with objects, circular refs | `src/predicate/predicate.test.ts` (extend) | 5 min |
| 4.16 | Test `convertToFormData` with File arrays | `src/function/function.test.ts` (extend) | 5 min |

**Acceptance criteria:**
- [ ] Every exported function/hook has at least 1 test
- [ ] React hooks tested with `@testing-library/react` `renderHook`
- [ ] All tests pass: `pnpm test`
- [ ] No untested exports

---

## Phase 5: New Utilities

**Goal:** Fill common gaps to make the lib more complete.

| # | Task | Module | Effort |
|---|------|--------|--------|
| 5.1 | `isBoolean`, `isArray`, `isFunction`, `isDate` | `predicate/` | 10 min |
| 5.2 | `first`, `last`, `take`, `drop` | `array/` | 10 min |
| 5.3 | `flatten`, `zip` | `array/` | 10 min |
| 5.4 | `set` (deep setter), `has` (deep path check) | `object/` | 15 min |
| 5.5 | `invert` (swap keys/values) | `object/` | 5 min |
| 5.6 | `truncate` with word boundary + custom suffix | `string/` — enhance existing `truncateString` | 10 min |
| 5.7 | `useIsMounted`, `useCopyToClipboard` | `react/hooks/` | 15 min |

**Acceptance criteria:**
- [ ] Every new function has JSDoc + tests
- [ ] Exported through barrel files and main index
- [ ] `pnpm typecheck` + `pnpm test` pass
- [ ] No duplicate functionality with existing utils

---

## Phase 6: Documentation & Polish

| # | Task | Files | Effort |
|---|------|-------|--------|
| 6.1 | Write full README — install, usage, subpath imports, API overview with examples | `README.md` | 30 min |
| 6.2 | Add CHANGELOG.md with v2 breaking changes | `CHANGELOG.md` | 10 min |
| 6.3 | Add ESLint + Prettier config (minimal) | `.eslintrc.json`, `.prettierrc` | 10 min |
| 6.4 | Verify build output — `pnpm build` clean, check dist structure | `rollup.config.js`, `dist/` | 5 min |
| 6.5 | Bump version to 2.0.0 in package.json (suggest, not execute) | `package.json` | 1 min |

**Acceptance criteria:**
- [ ] README has: installation, quick start, all module sections with examples, subpath import guide
- [ ] CHANGELOG documents all breaking changes (arg order, moved exports)
- [ ] `pnpm build` produces clean output
- [ ] Linter passes on codebase

---

## Execution Order

```
Phase 1 (Critical Fixes)     ~15 min  ← safe, no breaking changes
Phase 2 (Structural Refactors) ~50 min  ← breaking changes, test updates
Phase 3 (Type Safety)          ~55 min  ← improves DX significantly  
Phase 4 (Test Coverage)        ~115 min ← biggest phase, most value
Phase 5 (New Utilities)        ~75 min  ← additive, no risk
Phase 6 (Docs & Polish)        ~55 min  ← final polish
                               ─────────
                         Total: ~6 hours
```

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Phase 2 arg order change breaks consumers | High | Bump to v2.0.0, document in CHANGELOG |
| React hook tests need jsdom + testing-library setup | Low | Already configured in vitest.config.ts |
| `pipe`/`compose` overloads become verbose | Low | Max 9 overloads, standard pattern from fp-ts/remeda |
| Moving `displayField` breaks `string` subpath imports | Medium | Breaking change, documented |

---

## Commit Strategy (suggested)

```
Phase 1 → git commit -m "fix: critical bugs, TS error, JSDoc, typing issues"
Phase 2 → git commit -m "refactor!: standardize data-first arg order, move displayField to react"
Phase 3 → git commit -m "feat: type-safe pipe/compose overloads, fix isEqual Set comparison"
Phase 4 → git commit -m "test: add React hook tests, complete test coverage"
Phase 5 → git commit -m "feat: add predicates, array/object/string utilities, new hooks"
Phase 6 → git commit -m "docs: full README, CHANGELOG, ESLint/Prettier setup"
```
