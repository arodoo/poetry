# Fix: i18n Missing Locale Translation Error

**Date:** 2025-10-02 **Error:**
`Uncaught Error: i18n.missing:ui.users.form.locale.en-US`

## Problem

The UserDetailPage was trying to translate locale codes like "en-US" directly
using:

```typescript
value: t(`ui.users.form.locale.${user.locale}`)
```

However, the i18n files only had keys for base locales:

- `ui.users.form.locale.en` → "English"
- `ui.users.form.locale.es` → "Spanish"

When a user had a locale variant like "en-US", "en-GB", "es-MX", etc., the
translation would fail with a missing key error.

## Solution

Implemented a two-part fix:

### 1. Added `getLocaleName()` Helper Function

Created a helper function in `UserDetailPage.tsx` that:

1. Extracts the base locale code (e.g., "en-US" → "en")
2. Tries to translate using the base locale key
3. Falls back to the original locale code if translation fails

```typescript
function getLocaleName(localeCode: string): string {
  const parts: string[] = localeCode.split('-')
  const baseLocale: string = parts[0] ?? localeCode
  const localeKey: string = `ui.users.form.locale.${baseLocale}`
  try {
    return t(localeKey)
  } catch {
    return localeCode
  }
}
```

### 2. Added Common Locale Variants to i18n

Added translations for common locale variants to both `en.json` and `es.json`:

**English (en.json):**

- `ui.users.form.locale.en-US` → "English (US)"
- `ui.users.form.locale.en-GB` → "English (UK)"
- `ui.users.form.locale.es-ES` → "Spanish (Spain)"
- `ui.users.form.locale.es-MX` → "Spanish (Mexico)"

**Spanish (es.json):**

- `ui.users.form.locale.en-US` → "Inglés (EE.UU.)"
- `ui.users.form.locale.en-GB` → "Inglés (Reino Unido)"
- `ui.users.form.locale.es-ES` → "Español (España)"
- `ui.users.form.locale.es-MX` → "Español (México)"

## Behavior

Now when displaying a user's locale:

1. **Exact match exists:** Show full variant name
   - "en-US" → "English (US)" ✅
   - "es-MX" → "Spanish (Mexico)" ✅

2. **Only base locale exists:** Show base locale name
   - "en-CA" → "English" ✅
   - "es-AR" → "Spanish" ✅

3. **No translation exists:** Show raw code
   - "fr-FR" → "fr-FR" ✅

## Files Modified

1. `poetry-frontend/src/features/users/pages/UserDetailPage.tsx`
   - Added `getLocaleName()` helper function
   - Updated locale display to use the helper

2. `poetry-frontend/src/features/users/locales/en.json`
   - Added 4 locale variant keys

3. `poetry-frontend/src/features/users/locales/es.json`
   - Added 4 locale variant keys

## Testing

✅ All existing tests pass ✅ TypeScript compilation successful ✅ i18n
validation passed

## Future Enhancements

If more locale variants are needed:

1. Add them to both `en.json` and `es.json`
2. Follow the pattern: `ui.users.form.locale.{code}` → "{Language} ({Region})"
3. The fallback mechanism ensures no errors if a variant is missing

## Related Issues

This fix ensures that the view button and detail page work correctly for users
with any locale setting, preventing the white screen issue caused by the i18n
error.
