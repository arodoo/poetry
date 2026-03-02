/*
 * File: auth-extension.md
 * Purpose: Technical documentation of AuthProvider extension
 * with subscription tier, user profile, backup consent, and
 * storage abstraction. Explains architecture, data flow, and
 * testing strategy. Target: mobile engineers and architects.
 * All Rights Reserved. Arodi Emmanuel
 */

# AuthProvider Extension: Technical Specification

## 1. Overview

The `AuthProvider` has been extended from a simple session manager
to a comprehensive identity + subscription + consent manager for
an offline-first inventory application. This document details the
architecture, implementation, and testing approach.

### Key Changes
- **Domain models** now Zod-validated (UserProfile, SubscriptionTier, BackupConsent)
- **Storage abstraction** with repository pattern (SecureStore + SQLite)
- **Modular AuthProvider** split into 6 specialized files (≤60L each)
- **Realistic test suite** simulating real user journeys (23 tests, 7 suites, 100% pass)

---

## 2. Architecture: Data Model

### 2.1 Domain Types (Zod Schemas)

#### UserProfile
```typescript
interface UserProfile {
  id: string              // OAuth provider ID (Google)
  email: string           // Validated email
  displayName: string     // User-visible name
  avatarUrl?: string      // Optional profile photo URL
}
```
- **Location**: `shared/auth/UserProfile.ts`
- **Validation**: Email must be valid, all strings non-empty
- **Persistence**: SecureStore via `profileStore.ts`

#### SubscriptionTier
```typescript
type SubscriptionTier = 'free' | 'pro'

// Feature gating
isPro(tier) → boolean  // Unlocks Google Drive backup
```
- **Location**: `shared/auth/SubscriptionTier.ts`
- **Default**: `'free'` (app is fully functional offline)
- **Pro unlock**: Backup consent UI, sync features
- **Persistence**: SecureStore via `subscriptionStore.ts`
- **Resilience**: Corrupted data → defaults to 'free' (graceful degradation)

#### BackupConsent
```typescript
interface BackupConsent {
  granted: boolean        // User opted-in to backup
  grantedAt: ISO8601 | null  // Timestamp of consent
  revokedAt: ISO8601 | null  // Timestamp of revocation
}
```
- **Location**: `shared/auth/BackupConsent.ts`
- **Default**: `{ granted: false, grantedAt: null, revokedAt: null }`
- **Audit**: Timestamps allow compliance logging
- **Persistence**: SecureStore via `backupConsentStore.ts`

---

## 3. Storage Layer: Repository Pattern

### 3.1 SecureStore Persistence (Tokens, Profile, Tier, Consent)

All sensitive data stored in **expo-secure-store** (hardware-backed on iOS/Android):

| Store | Content | Location | Recovery |
|-------|---------|----------|----------|
| `poetry.auth.tokens` | AccessToken + RefreshToken | `tokenStorage.ts` | Existing |
| `poetry.user.profile` | UserProfile JSON | `profileStore.ts` | New |
| `poetry.subscription.tier` | 'free' \| 'pro' string | `subscriptionStore.ts` | New |
| `poetry.backup.consent` | BackupConsent JSON | `backupConsentStore.ts` | New |

**Storage Interface Pattern:**
```typescript
export const profileStore = {
  async save(profile: UserProfile): Promise<void>
  async load(): Promise<UserProfile | null>
  async clear(): Promise<void>
}
```

### 3.2 SQLite Abstraction (Future: Inventory Data)

- **Location**: `shared/storage/db.ts`
- **Singleton pattern**: Only one connection open at a time
- **Migrations**: Cumulative SQL array run on app launch
- **TypeScript**: `getDb()` returns fully-typed `SQLiteDatabase`

```typescript
const db = await getDb()
// Future: repositories will use db for inventory CRUD
```

### 3.3 Error Handling

- **Location**: `shared/storage/StorageError.ts`
- **Pattern**: Typed error with `operation` context

```typescript
throw new StorageError(
  'profileStore.save',
  'Failed to persist user profile',
  originalError
)
```

---

## 4. AuthProvider: Decomposed into 6 Files

### 4.1 File Breakdown (all ≤60 lines per 60/60 rule)

| File | Purpose | Lines | Dependencies |
|------|---------|-------|--------------|
| `AuthContext.ts` | Type defs + useAuth hook | 52 | UserProfile, SubscriptionTier, BackupConsent |
| `AuthProvider.tsx` | React component orchestrating all state | 60 | All 5 hooks + authActions |
| `useAuthLoader.ts` | Load persisted state on mount | 56 | tokenStorage, profileStore, subscriptionStore, backupConsentStore |
| `useSessionActions.ts` | login() / logout() callbacks | 44 | authActions, all setters |
| `useProfileActions.ts` | updateProfile() / setTier() | 39 | authActions, setUser, setTier |
| `useConsentActions.ts` | grantBackupConsent() / revokeBackupConsent() | 38 | authActions, setConsent |
| `authActions.ts` | Pure async functions (no React) | 54 | All stores |

### 4.2 Data Flow: Login Journey

```
User clicks "Sign in with Google"
    ↓
loginScreen.tsx → auth.login(user, tokens)
    ↓
useSessionActions.login()
    ↓
authActions.persistLogin(user, tokens)
    ├── tokenStorage.save(tokens)       [SecureStore]
    └── profileStore.save(user)         [SecureStore]
    ↓
setUser(user), setStatus('authenticated')
    ↓
App navigates to (app)/home
    ↓
useAuth() hook provides user, tier, consent, status
```

### 4.3 Data Flow: App Startup

```
AuthProvider mounts
    ↓
useAuthLoader() hook runs
    ↓
Promise.all([
  tokenStorage.load(),           [SecureStore]
  profileStore.load(),           [SecureStore]
  subscriptionStore.load(),      [SecureStore]
  backupConsentStore.load()      [SecureStore]
])
    ↓
INITIAL_STATE = {
  status: tokens ? 'authenticated' : 'unauthenticated',
  user: profile,
  tier: tier ?? 'free',
  consent: consent ?? DEFAULT_CONSENT
}
    ↓
AuthProvider renders with hydrated state
    ↓
(no network call — fully offline-capable)
```

---

## 5. Testing Strategy: Real User Flows

### 5.1 Test Structure

**Location**: `src/tests/auth/` (all files ≤60L)

```
profileStore.test.ts       [54L] Save/load/clear profile
subscriptionStore.test.ts  [46L] Tier default/upgrade/clear
backupConsentStore.test.ts [53L] Consent grant/revoke/clear
authActions.test.ts        [59L] Login/logout store coordination
userJourney.test.ts        [54L] Full flow: 6-step user journey
schemas.test.ts            [37L] UserProfile Zod validation
tierAndConsent.test.ts     [55L] Tier enum + consent datetime
setup/jestSetup.ts         [41L] Jest mocks for SecureStore + SQLite
```

### 5.2 Jest Setup: Mocking Native Modules

**Problem**: Jest runs in Node, not React Native. Native modules must be mocked.

**Solution**: `src/tests/setup/jestSetup.ts`
```typescript
jest.mock('expo-secure-store', () => {
  const store = new Map<string, string>()
  return {
    setItemAsync: jest.fn((k, v) => {
      store.set(k, v)
      return Promise.resolve()
    }),
    getItemAsync: jest.fn((k) =>
      Promise.resolve(store.get(k) ?? null)
    ),
    deleteItemAsync: jest.fn((k) => {
      store.delete(k)
      return Promise.resolve()
    }),
    __store: store,      // Access for tests
    __clear: () => store.clear()
  }
})

jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: jest.fn(() =>
    Promise.resolve({
      execAsync: jest.fn(() => Promise.resolve()),
      closeAsync: jest.fn(() => Promise.resolve()),
    })
  )
}))
```

### 5.3 Key Test: Full User Journey

**File**: `userJourney.test.ts`

Simulates real behavior (install → login → upgrade → consent → logout):
```typescript
beforeEach(() => SecureStore.__clear())

describe('full user journey', () => {
  it('install → login → pro → backup → logout', async () => {
    // Fresh install: empty stores
    expect(await tokenStorage.load()).toBeNull()
    expect(await subscriptionStore.load()).toBe('free')

    // Login with Google
    await actions.persistLogin(USER, TOKENS)
    const profile = await profileStore.load()
    expect(profile?.displayName).toBe('Ana Torres')

    // Upgrade to Pro (backend validation later)
    await actions.persistTier('pro')
    expect(await subscriptionStore.load()).toBe('pro')

    // Grant backup consent
    await actions.persistConsent({
      granted: true,
      grantedAt: new Date().toISOString(),
      revokedAt: null
    })
    const consent = await backupConsentStore.load()
    expect(consent.granted).toBe(true)

    // Update display name
    await actions.persistProfile({
      ...USER,
      displayName: 'Ana T.'
    })
    const reloaded = await profileStore.load()
    expect(reloaded?.displayName).toBe('Ana T.')

    // Logout: everything resets
    await actions.persistLogout()
    expect(await tokenStorage.load()).toBeNull()
    expect(await subscriptionStore.load()).toBe('free')
  })
})
```

### 5.4 Test Results

```
Test Suites: 7 passed, 7 total
Tests:       23 passed, 23 total
Time:        11.813 s
```

| Suite | Tests | Coverage |
|-------|-------|----------|
| profileStore | 4 | Save, load, overwrite, clear |
| subscriptionStore | 4 | Default, upgrade, clear, corrupted data |
| backupConsentStore | 4 | Default, grant, revoke, clear |
| authActions | 2 | Login, logout w/ full cleanup |
| userJourney | 1 | 6-step real flow |
| schemas | 3 | Email validation, missing fields |
| tierAndConsent | 5 | Enum validation, isPro(), datetime |

---

## 6. Integration Points: AuthProvider → App

### 6.1 AuthContext Usage

```typescript
// In any screen/component:
const {
  status,              // 'loading' | 'authenticated' | 'unauthenticated'
  user,                // UserProfile | null
  tier,                // 'free' | 'pro'
  backupConsent,       // BackupConsent
  login,               // (user, tokens) => Promise<void>
  logout,              // () => Promise<void>
  updateProfile,       // (partial) => Promise<void>
  setTier,             // (tier) => Promise<void>
  grantBackupConsent,  // () => Promise<void>
  revokeBackupConsent  // () => Promise<void>
} = useAuth()
```

### 6.2 Route Guards (AuthGate)

```typescript
// (auth)/_layout.tsx — login optional
<AuthGate requireAuth={false} />

// (app)/_layout.tsx — protected
<AuthGate requireAuth={true} />
```

AuthGate allows **local-only mode**: no login required to use app.

### 6.3 i18n Integration

New translation keys in `features/auth/locales/{en,es}.ts`:
```typescript
auth.profile.title
auth.subscription.free | auth.subscription.pro
auth.backup.consentGrant | auth.backup.consentRevoke
```

---

## 7. Cleanup Done

- ✅ Removed `@rnmapbox/maps` from imports (mapbox folder deleted)
- ✅ Updated `env.ts`: removed `mapboxAccessToken`, added `googleClientId`
- ✅ All domain models, stores, and auth files under 60L per rule
- ✅ TypeScript strict mode: zero `any`, zero suppressions

---

## 8. TypeScript Compilation

```bash
npx tsc --noEmit
```

Result: ✅ **CLEAN** (only pre-existing Detox e2e errors, excluded)

All 12 new auth files compile without errors.

---

## 9. Next Steps: Mandatory Before Production

See next document: `sync-layer-roadmap.md`
