# Common React Pitfalls & Debugging Guide

## Object Stability Issues

### ❌ Problem: Creating New Objects in Getters

**Symptom**: Infinite re-renders, "Maximum update depth exceeded" errors

**Root Cause**: Functions that return new object instances on every call cause
React hooks to think data changed.

```typescript
// ❌ BAD - Creates NEW object every time
function load() {
  return JSON.parse(localStorage.getItem('key'))
}

const data = useSyncExternalStore(subscribe, load) // Infinite loop!
```

**Why it fails**: `useSyncExternalStore` uses `Object.is()` to check if data
changed. Since `JSON.parse()` creates a new object each time, React thinks the
data is constantly changing.

```typescript
// ✅ GOOD - Cache and return same reference
let cache = null
let cacheKey = null

function load() {
  const raw = localStorage.getItem('key')
  if (raw === cacheKey && cache) {
    return cache // Same reference when data unchanged
  }
  cache = JSON.parse(raw)
  cacheKey = raw
  return cache
}
```

### ❌ Problem: Spread Operators in useMemo

```typescript
// ❌ BAD - Creates new array every render
const result = useMemo(
  () => ({
    roles: [...userRoles], // NEW ARRAY REFERENCE!
  }),
  [userRoles]
)
```

```typescript
// ✅ GOOD - Preserve reference
const result = useMemo(
  () => ({
    roles: userRoles, // Same reference
  }),
  [userRoles]
)
```

## Debugging Tools

### 1. React Query DevTools (Already Installed)

Press the React Query icon in bottom-right to see:

- ✅ Query state (loading, success, error)
- ✅ When queries refetch
- ✅ Cache data
- ✅ Network timeline

**Would have caught**: `/auth/me` returning incomplete data

### 2. React DevTools Profiler

Install:
[React DevTools Extension](https://react.dev/learn/react-developer-tools)

**Features**:

- See which components re-render
- See what props changed
- Measure render performance

**Would have caught**: RequireAuth re-rendering infinitely

### 3. Console Warnings

Enable in development:

```typescript
// Add to main.tsx
if (import.meta.env.DEV) {
  const originalWarn = console.warn
  console.warn = (...args) => {
    if (args[0]?.includes?.('maximum update depth')) {
      debugger // Pause immediately
    }
    originalWarn(...args)
  }
}
```

## Testing Best Practices

### Object Stability Tests

Always test that functions return stable references:

```typescript
it('returns same object reference when data unchanged', () => {
  const obj1 = getData()
  const obj2 = getData()
  expect(obj1).toBe(obj2) // SAME REFERENCE
})
```

### Integration Tests for Infinite Loops

```typescript
it('does not cause infinite re-renders', async () => {
  const renderSpy = vi.fn()

  function TestComponent() {
    renderSpy()
    const session = useSession()
    return <div>{session.status}</div>
  }

  render(<TestComponent />)
  await waitFor(() => expect(renderSpy).toHaveBeenCalledTimes(2))

  // Should stabilize, not keep rendering
  await new Promise(resolve => setTimeout(resolve, 100))
  expect(renderSpy).toHaveBeenCalledTimes(2) // NOT 50+
})
```

## Quick Diagnosis Checklist

When you see "Maximum update depth exceeded":

1. ✅ Open React Query DevTools - are queries refetching constantly?
2. ✅ Open React DevTools Profiler - which component is re-rendering?
3. ✅ Check `useSyncExternalStore` calls - is the snapshot function creating new
   objects?
4. ✅ Check `useMemo`/`useCallback` dependencies - are you spreading
   arrays/objects?
5. ✅ Check `useEffect` dependencies - is `navigate` or other stable functions
   included?

## Prevention Checklist

Before committing code with hooks:

- [ ] No `JSON.parse()` without caching
- [ ] No spread operators (`...`) in `useMemo` returns
- [ ] No new objects/arrays created in getSnapshot functions
- [ ] Stable functions (navigate, dispatch) excluded from useEffect deps
- [ ] Object stability tests added for critical data sources

## References

- [React useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)
- [React Query DevTools](https://tanstack.com/query/latest/docs/react/devtools)
- [why-did-you-render](https://github.com/welldone-software/why-did-you-render)
