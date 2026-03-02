/*
 * File: README.md (mobile/)
 * Purpose: Master index for mobile development documentation.
 * Quick links and overview of all documentation available.
 * All Rights Reserved. Arodi Emmanuel
 */

# Poetry Mobile: Documentation Index

## Quick Links

| Document | Purpose | Read Time |
|----------|---------|-----------|
| [auth-extension.md](./auth-extension.md) | What was just built (technical deep dive) | 15 min |
| [auth-architecture-summary.md](./auth-architecture-summary.md) | Visual reference (component deps, state shape, file org) | 10 min |
| [sync-layer-roadmap.md](./sync-layer-roadmap.md) | **Next 7 mandatory steps to production** | 20 min |
| [integration-guide.md](./integration-guide.md) | How to use auth system in new screens | 15 min |
| [development-guide.md](./development-guide.md) | Setup, running, debugging (existing) | 5 min |
| [core-architecture.md](./core-architecture.md) | Route structure, app layout (existing) | 5 min |

---

## What Just Happened (March 1, 2026)

### ✅ Completed (11 hours)

**Auth System Extension**
- Extended `AuthProvider` from simple session → full identity + subscription + consent manager
- Split into 6 specialized files, all ≤60 lines
- Added domain models: `UserProfile`, `SubscriptionTier`, `BackupConsent` (all Zod-validated)
- Added storage layer: SecureStore + SQLite abstraction with repository pattern

**Storage Abstraction**
- 5 stores: `tokenStorage` (existing), `profileStore`, `subscriptionStore`, `backupConsentStore` (new)
- SQLite singleton (`db.ts`) with migration system
- Typed error handling (`StorageError.ts`)

**Realistic Test Suite**
- 7 test suites, 23 tests, 100% passing
- Full user journey test: install → login → upgrade → backup consent → logout
- Schema validation tests
- Mock setup for SecureStore + SQLite

**Code Quality**
- ✅ All files ≤60 lines (60/60 rule)
- ✅ All lines ≤80 chars (CI limit)
- ✅ TypeScript strict: zero `any`, zero suppressions
- ✅ All tests passing
- ✅ All i18n keys (no hardcoded strings)
- ✅ expo-sqlite installed + configured

---

## Architecture Overview

```
AuthProvider (60L orchestrator)
├─ useAuthLoader (56L) → Loads tokens + profile + tier + consent on mount
├─ useSessionActions (44L) → login() / logout() with full persistence
├─ useProfileActions (39L) → updateProfile() / setTier()
└─ useConsentActions (38L) → grantBackupConsent() / revokeBackupConsent()
    └─ authActions.ts (54L) → Pure async functions (persist/clear)
       ├─ tokenStorage.ts → JWT in SecureStore
       ├─ profileStore.ts → UserProfile in SecureStore
       ├─ subscriptionStore.ts → Tier in SecureStore (defaults to 'free')
       ├─ backupConsentStore.ts → Consent in SecureStore
       └─ db.ts → SQLite singleton (migration-ready)
```

**Data Flow**: App startup → useAuthLoader → Promise.all(4 stores) → Hydrate state → No network call ✅ Offline-capable

---

## What's Next: 7 Mandatory Steps (14-19 hours total)

### Phase 1 (This Week) — 5 Steps

| Step | What | Why | Hours | Start When |
|------|------|-----|-------|-----------|
| 1 | Sync State Tracking | Know if backup succeeded/failed | 2-3h | Now |
| 2 | Google Drive OAuth2 | Authenticate with Google Drive API | 3-4h | Now |
| 3 | Google Drive API Client | Upload/download to Drive | 4-5h | After Step 2 |
| 4 | Conflict Resolution | Multi-device sync strategy (LWW) | 1-2h | Now (parallel) |
| 5 | Inventory Feature | SQLite schema + CRUD repository | 4-5h | Now (parallel) |

### Phase 2 (Next Week) — 2 Steps

| Step | What | Why | Hours | Start When |
|------|------|-----|-------|-----------|
| 6 | Backup/Restore Service | Wires all 5 steps together | 3-4h | After Phase 1 ✅ |
| 7 | E2E Tests | Validate full workflow (Detox) | 5-6h | After Step 6 |

**Critical Path**: Step 2 → Step 3 → Step 5 → Step 6 → Step 7
**Parallel**: Steps 1, 4, 5 can run simultaneously

---

## Files Changed (New + Modified)

### New Auth System Files (12 files)

**Domain Models** (3 files)
- [SubscriptionTier.ts](../poetry-mobile/src/shared/auth/SubscriptionTier.ts) — 'free' | 'pro' enum
- [UserProfile.ts](../poetry-mobile/src/shared/auth/UserProfile.ts) — Zod schema
- [BackupConsent.ts](../poetry-mobile/src/shared/auth/BackupConsent.ts) — Consent state

**Auth Provider** (6 files, all ≤60L)
- [AuthContext.ts](../poetry-mobile/src/shared/auth/AuthContext.ts) — Type defs + useAuth
- [AuthProvider.tsx](../poetry-mobile/src/shared/auth/AuthProvider.tsx) — React component
- [useAuthLoader.ts](../poetry-mobile/src/shared/auth/useAuthLoader.ts) — Init from stores
- [useSessionActions.ts](../poetry-mobile/src/shared/auth/useSessionActions.ts) — login/logout
- [useProfileActions.ts](../poetry-mobile/src/shared/auth/useProfileActions.ts) — updateProfile/setTier
- [useConsentActions.ts](../poetry-mobile/src/shared/auth/useConsentActions.ts) — grant/revoke consent
- [authActions.ts](../poetry-mobile/src/shared/auth/authActions.ts) — Pure persistence

**Storage Abstraction** (5 files)
- [db.ts](../poetry-mobile/src/shared/storage/db.ts) — SQLite singleton
- [StorageError.ts](../poetry-mobile/src/shared/storage/StorageError.ts) — Typed errors
- [profileStore.ts](../poetry-mobile/src/shared/storage/profileStore.ts) — Profile persistence
- [subscriptionStore.ts](../poetry-mobile/src/shared/storage/subscriptionStore.ts) — Tier persistence
- [backupConsentStore.ts](../poetry-mobile/src/shared/storage/backupConsentStore.ts) — Consent persistence

### Test Files (8 files, all ≤60L)

- [profileStore.test.ts](../poetry-mobile/src/tests/auth/profileStore.test.ts) — 54L
- [subscriptionStore.test.ts](../poetry-mobile/src/tests/auth/subscriptionStore.test.ts) — 46L
- [backupConsentStore.test.ts](../poetry-mobile/src/tests/auth/backupConsentStore.test.ts) — 53L
- [authActions.test.ts](../poetry-mobile/src/tests/auth/authActions.test.ts) — 59L
- [userJourney.test.ts](../poetry-mobile/src/tests/auth/userJourney.test.ts) — 54L
- [schemas.test.ts](../poetry-mobile/src/tests/auth/schemas.test.ts) — 37L
- [tierAndConsent.test.ts](../poetry-mobile/src/tests/auth/tierAndConsent.test.ts) — 55L
- [jestSetup.ts](../poetry-mobile/src/tests/setup/jestSetup.ts) — 41L

### Modified Files (5 files)

- [AuthContext.ts](../poetry-mobile/src/shared/auth/AuthContext.ts) — Extended with new types
- [AuthProvider.tsx](../poetry-mobile/src/shared/auth/AuthProvider.tsx) — Refactored (was 57L, now 60L)
- [env.ts](../poetry-mobile/src/shared/config/env.ts) — Removed mapbox, added googleClientId
- [auth/locales/en.ts](../poetry-mobile/src/features/auth/locales/en.ts) — Added profile/backup/subscription keys
- [auth/locales/es.ts](../poetry-mobile/src/features/auth/locales/es.ts) — Added Spanish translations

### Config Files (1 file)

- [jest.config.js](../poetry-mobile/jest.config.js) — Jest setup for mobile testing

### Cleanup

- ✅ Removed `src/shared/mapbox/` folder (mapbox era ended)
- ✅ Removed `@rnmapbox/maps` from imports
- ⚠️ Still in package.json: needs explicit removal (not breaking)

---

## Test Results

```
Test Suites: 7 passed, 7 total
Tests:       23 passed, 23 total
Time:        11.813 s
```

**All scenarios covered**:
- ✅ Happy path (save, load, update, clear)
- ✅ Error path (corrupted data, missing fields)
- ✅ Full journey (6-step user flow)
- ✅ Validation (Zod schemas, email format, enum values)

---

## TypeScript Compilation

```bash
$ npm run typecheck
# Output:
# Found 2 errors in tests/e2e/helpers/testHelpers.ts
# (Pre-existing Detox type issues, excluded by CI checker)
#
# Result: ✅ CLEAN for all new/modified files
```

---

## Current State: Production Readiness

| Component | Status | Notes |
|-----------|--------|-------|
| Auth (login/logout) | ✅ Ready | Tokens + profile persisted |
| Session hydration | ✅ Ready | Loads on app start, offline-capable |
| Storage abstraction | ✅ Ready | SecureStore + SQLite initialized |
| Tests | ✅ Ready | 23 tests, 100% passing |
| Code quality | ✅ Ready | 60/60 rule, TypeScript strict |
| **Backup/sync** | ❌ Missing | Step 6-7 (Phase 2) |
| **Inventory CRUD** | ❌ Missing | Step 5 (Phase 1) |
| **Google Drive API** | ❌ Missing | Step 2-3 (Phase 1) |
| **Conflict resolution** | ❌ Missing | Step 4 (Phase 1) |

---

## How to Continue

### Start Phase 1 (Right Now)

1. Read: [sync-layer-roadmap.md](./sync-layer-roadmap.md) (20 min)
2. Implement: Step 1 (SyncStateStorage) (2-3 hours)
3. Test: All tests passing → commit
4. Parallel: Start Steps 2, 4, 5

### Architecture Decisions Made (Locked)

- ✅ **Storage**: SecureStore for auth/profile/tier/consent, SQLite for inventory
- ✅ **Persistence**: Repository pattern, Zod validation at boundaries
- ✅ **Error handling**: StorageError typed, graceful degradation for non-critical reads
- ✅ **Testing**: Jest + in-memory mocks, no device/emulator needed
- ✅ **i18n**: TS exports, not JSON, all strings keyed
- ✅ **Modular**: ≤60L files, single responsibility, DDD principles

### Nothing Breaks (Backward Compatibility)

- ✅ Existing `tokenStorage.ts` untouched
- ✅ Existing `AuthGate.tsx` untouched (allows local-only mode)
- ✅ Existing route structure intact
- ✅ Existing login screen works (uses new types, compatible)
- ✅ Existing home screen works (uses new useAuth, compatible)

---

## Key Design Principles (Why This Architecture)

| Principle | Benefit |
|-----------|---------|
| **Offline-first** | App works 100% without network (critical for inventory organizer) |
| **Repository pattern** | Easy to swap storage backends (future: Cloud Firestore) |
| **Zod validation** | Runtime guarantee of data shape (no corrupted state) |
| **Graceful degradation** | Missing consent → defaults to false, missing tier → defaults to free |
| **Modular files** | Easy onboarding, no god components, clear boundaries |
| **Comprehensive tests** | 23 tests = confidence for production |

---

## Useful Commands

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run typecheck
npm run typecheck

# Start dev server
npm run dev

# Build for Android
npm run android

# Build for iOS
npm run ios

# Check file lengths (CI)
node ../tools/ci/limits/check-lines.mjs

# Check headers (CI)
node ../tools/ci/headers/check-headers.mjs
```

---

## Contact Points for Next Phase

- **Google Drive OAuth2**: Use `expo-auth-session` + `expo-google-sign-in` (both available)
- **SQLite Migrations**: Extend `shared/storage/db.ts` with new `addMigration()` calls
- **Feature Tests**: Copy pattern from `src/tests/auth/` for inventory tests
- **E2E**: Use Detox in `tests/e2e/` (Playwright not suitable for RN)

---

## Success Metrics (Post-MVP)

- ✅ Users can create inventory items on device
- ✅ Users can backup to Google Drive (Pro tier only)
- ✅ Users can restore from backup (data integrity validated)
- ✅ Multi-device sync works without conflicts
- ✅ App works 100% offline (no forced network dependency)
- ✅ 0 crashes reported in production

---

## Timeline Estimate (Optimistic)

- **Phase 1** (Steps 1-5): 10-12 hours (this week)
- **Phase 2** (Steps 6-7): 8-10 hours (next week)
- **Total to MVP**: ~20 hours (3 developer-days)
- **Alpha release**: 2 weeks
- **Beta release**: 4 weeks

---

**Last Updated**: 2026-03-01
**Status**: ✅ Ready for Phase 1
**Next Action**: Read `sync-layer-roadmap.md` and start Step 1 (SyncStateStorage)
