/_ File: ERROR_HANDLING_GUIDE.md Purpose: Documentation for error handling
mechanisms implemented to prevent silent failures in the application. All Rights
Reserved. Arodi Emmanuel _/

# Error Handling & Visibility Guide

## Problem Statement

The application was experiencing **silent failures**:

- Backend data model mismatch → Zod validation failure
- CSS variables not applied → broken UI
- No visible errors → impossible to debug
- App appeared "working" but was broken

**This should never happen again.**

## Solutions Implemented

### 1. **TokensProvider Error UI** 🚨

**Location**: `src/shared/tokens/TokensProvider.tsx`

**What it does**:

- Catches token loading failures
- Shows **full-screen error overlay** with details
- Logs detailed error to console
- Provides troubleshooting guidance
- Shows "Reload Page" button

**Error cases handled**:

- Backend not accessible (network error)
- Zod validation failure (data model mismatch)
- Token bundle mapping errors

**Visual output**:

```
┌─────────────────────────────────────────┐
│ 🚨 Design Tokens Failed to Load        │
│                                         │
│ The application cannot render properly  │
│ without design system tokens.           │
│                                         │
│ Error: Token bundle validation failed  │
│ - fontFamilies: Required               │
│                                         │
│ Common Solutions:                       │
│ • Check backend is running on :8080    │
│ • Verify /api/v1/tokens endpoint       │
│ • Check Zod validation errors          │
│                                         │
│        [ Reload Page ]                  │
└─────────────────────────────────────────┘
```

### 2. **Enhanced Error Messages** 📝

**Location**: `src/features/tokens/api/tokensApi.ts`

**What it does**:

- Catches Zod validation errors
- Provides detailed field-by-field breakdown
- Explains what the error means
- Suggests common causes

**Example error output**:

```typescript
TokenBundleValidationError: Token bundle validation failed.
Backend data model doesn't match frontend schema.

Validation errors:
  - fontFamilies: Required
  - themes[0].colors.onPrimary: Expected string, received undefined

This usually means:
- Backend changed data structure without updating frontend
- Missing required fields in backend response
- Type mismatch between backend and frontend models
```

### 3. **React Error Boundary** 🛡️

**Location**: `src/shared/error/ErrorBoundary.tsx`

**What it does**:

- Catches all React component errors
- Shows error UI instead of white screen
- Displays stack trace in dev mode
- Logs to console for debugging
- Ready for error tracking service (Sentry, etc.)

**Usage**:

```tsx
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

**Visual output (dev mode)**:

```
┌─────────────────────────────────────────┐
│ 🐛 React Error                          │
│                                         │
│ A React component error occurred.       │
│                                         │
│ Error: Cannot read property 'map'      │
│        of undefined                     │
│                                         │
│ ▸ Stack Trace                          │
│ ▸ Component Stack                      │
│                                         │
│        [ Reload Page ]                  │
└─────────────────────────────────────────┘
```

### 4. **CSS Variables Health Check** ✅

**Location**: `src/shared/dev/cssVariablesHealthCheck.ts`

**What it does** (dev mode only):

- Runs after 2 seconds to check CSS variables
- Validates critical variables are set
- Warns if variables are missing or empty
- Monitors for variables being cleared
- Logs success message when all OK

**Console output (success)**:

```
✅ CSS Variables Health Check Passed
5 critical variables are set correctly
```

**Console output (failure)**:

```
⚠️ CSS VARIABLES HEALTH CHECK FAILED

Critical CSS variables are not properly set!
This will cause UI rendering issues.

Empty variables:
  - --color-primary
  - --color-error

Possible causes:
  - TokensProvider failed to load
  - mapBundleToCssVars returned empty object
  - Backend response missing data
```

### 5. **Development Mode Warnings** 🔔

**Console styling** for visibility:

- 🚨 Red background: Critical errors
- ⚠️ Orange background: Warnings
- ✅ Green background: Success

**Example**:

```javascript
console.error(
  '%c🚨 TOKENS PROVIDER FAILURE 🚨',
  'color: white; background: red; font-size: 16px; padding: 8px;',
  'Check the error above for details.'
)
```

## Testing Error Handling

### Test 1: Simulate Backend Data Mismatch

1. Add required field to `TokenBundleSchema`:
   ```typescript
   // In TokensSchemas.impl2.ts
   export const TokenBundleSchema = z.object({
     ...existingFields,
     newRequiredField: z.string(), // ← Add this
   })
   ```
2. Start app: `npm run dev`
3. Expected: Full-screen error overlay with Zod details

### Test 2: Simulate Backend Down

1. Stop backend server
2. Start frontend: `npm run dev`
3. Expected: Error overlay "Failed to fetch tokens"

### Test 3: Simulate React Error

1. Add intentional error in component:
   ```tsx
   const data = undefined
   return <div>{data.map((x) => x)}</div> // ← Will crash
   ```
2. Expected: Error boundary catches and shows error UI

### Test 4: CSS Variables Health Check

1. Start app normally
2. Open browser console
3. Wait 2 seconds
4. Expected: "✅ CSS Variables Health Check Passed"

## Error Handling Checklist

When adding new features:

- [ ] API calls have try/catch with descriptive errors
- [ ] Zod schemas match backend contracts
- [ ] Critical failures show user-visible errors
- [ ] Console logs use styled warnings in dev mode
- [ ] Error boundaries wrap major sections
- [ ] Health checks validate critical functionality

## Related Files

- `src/shared/tokens/TokensProvider.tsx` - Token loading + error UI
- `src/features/tokens/api/tokensApi.ts` - Enhanced Zod errors
- `src/shared/error/ErrorBoundary.tsx` - React error catching
- `src/shared/dev/cssVariablesHealthCheck.ts` - Dev health checks
- `src/main.tsx` - Error boundary integration

## Future Improvements

- [ ] Add production error tracking (Sentry/LogRocket)
- [ ] Create error tracking dashboard
- [ ] Add retry mechanisms for transient failures
- [ ] Implement graceful degradation for non-critical errors
- [ ] Add error analytics to track failure patterns
