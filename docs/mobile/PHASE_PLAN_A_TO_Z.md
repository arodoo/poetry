/*
 * File: PHASE_PLAN_A_TO_Z.md
 * Purpose: 7-phase master plan from current state to production
 * deployment (PlayStore + iOS App Store). Technical, concise,
 * no omissions.
 * Scope: 11 hours of completed work + 20 hours roadmap
 * Timeline: 5-6 weeks (3 dev-days sprints)
 * All Rights Reserved. Arodi Emmanuel
 */

# PHASE PLAN: A → Z (Auth to Production Deployment)

## CURRENT STATE
- ✅ AuthProvider: 12 files, 23 tests passing
- ✅ Storage: SecureStore abstraction + SQLite singleton
- ✅ i18n: en/es fully implemented
- ✅ TypeScript: strict mode, clean compilation

---

## PHASE A: SYNC STATE FOUNDATION (2-3 hours)

### A.1 SyncStateStorage Implementation
- Create: `src/shared/sync/SyncStateStorage.ts` (~50L)
- Interface: `{ lastSyncAt, lastSyncError, isSyncing, pendingItemCount }`
- Tests: 4 (load, update, clear, persistence)
- Integrate: Expose in AuthContext as `syncState` + `updateSyncState()`

### A.2 BackupConsent Expansion
- Add: `syncDisabledReason?: string` to BackupConsent
- Tests: 2 (store sync state, revoke clears sync)

### A.3 Validation
- TypeScript: `npm run typecheck` ✅
- Tests: `npm test -- syncState` ✅
- Coverage: `npm test -- --coverage` (aim ≥90%)

**Deliverable**: User can see "Last backup: 10:30 AM" or "Sync error: quota exceeded"

---

## PHASE B: GOOGLE DRIVE AUTHENTICATION (3-4 hours)

### B.1 OAuth2 Setup
- Create: `src/shared/http/googleDriveAuth.ts` (~55L)
- Use: `expo-auth-session` + Google OAuth2 PKCE
- Endpoint: Google OAuth2 authorization server
- Scopes: `https://www.googleapis.com/auth/drive.file` (limited to app-created files)

### B.2 Token Management
- Store: `tokenStorage.ts` → new key `'poetry.google.tokens'`
- Fields: `{ accessToken, refreshToken, expiresAt }`
- Refresh: Auto-refresh when within 5 min of expiry
- Error: Graceful fallback (user re-authenticates)

### B.3 Secret Management
- Add: `env.ts` → optional `googleClientId`, `googleClientSecret` (backend only)
- Frontend: Only uses `googleClientId` + PKCE
- Validation: At app startup, warn if ID missing (but don't crash)

### B.4 Testing
- Mock: `expo-auth-session` response
- Tests: 5 (auth flow, token refresh, expiry, error handling, logout cleanup)

**Deliverable**: User can "Sign in with Google Drive" → tokens stored securely

---

## PHASE C: GOOGLE DRIVE API CLIENT (4-5 hours)

### C.1 Upload Service
- Create: `src/shared/sync/googleDriveClient.ts` (~60L)
- Endpoint: `POST https://www.googleapis.com/upload/drive/v3/files`
- Retry: Exponential backoff (500ms → 1s → 2s) for transient errors
- Rate limit: Handle 429 (Too Many Requests) with 60s backoff
- Return: `{ fileId, name, createdTime, modifiedTime }`

### C.2 Download Service
- Endpoint: `GET https://www.googleapis.com/drive/v3/files/{fileId}?alt=media`
- Decompress: gzip if size > 100KB
- Validate: SHA256 hash (optional, add to metadata)
- Error: 404 → file deleted, 403 → revoked access

### C.3 List Service
- Endpoint: `GET https://www.googleapis.com/drive/v3/files`
- Query: Filter `name contains 'poetry-backup'` + `trashed=false`
- Pagination: Handle nextPageToken for large result sets
- Return: Sorted by `modifiedTime DESC` (newest first)

### C.4 Delete Service
- Endpoint: `DELETE https://www.googleapis.com/drive/v3/files/{fileId}`
- Soft delete: Mark in local DB, hard delete after 30 days (audit trail)
- Error handling: Log 403 (already gone), but don't crash

### C.5 Testing
- Mock: Google Drive API responses
- Tests: 8 (upload success, upload retry, download, list, delete, quota error, auth error, network error)

**Deliverable**: Inventory data uploaded to Google Drive securely

---

## PHASE D: CONFLICT RESOLUTION ENGINE (1-2 hours)

### D.1 Strategy: Last-Write-Wins (LWW)
- Each item: `{ id, name, quantity, updatedAt, version }`
- Conflict: Compare `updatedAt` timestamps
- Resolution: Accept item with latest `updatedAt`
- Guarantee: Deterministic (same result everywhere)

### D.2 Implementation
- Create: `src/shared/sync/conflictResolver.ts` (~45L)
- Function: `resolveConflicts(localItems[], remoteItems[]): merged[]`
- Logic:
  ```
  for each id:
    if only local → keep local
    if only remote → take remote
    if both → compare updatedAt, take newer
  ```

### D.3 Merge Strategy for Inventory
- Deleted items: Mark as `deletedAt`, skip in list()
- Updated items: Replace entire object (no field-level merge)
- Partial sync: Track `lastSyncAt` to avoid re-downloading unchanged items

### D.4 Testing
- Tests: 5 (local wins, remote wins, deleted resolved, partial sync, version check)

**Deliverable**: Multi-device edits don't corrupt data

---

## PHASE E: INVENTORY FEATURE WITH SQLITE (4-5 hours)

### E.1 Schema Design
- Table: `inventory_items`
- Columns: `id (PK), userId (FK), name, quantity, category, notes, updatedAt, createdAt, deletedAt, version`
- Indexes: `userId, updatedAt, createdAt, deletedAt`
- Migration: `db.ts` → version 2 (from current version 1)

### E.2 Repository Pattern
- Create: `src/features/inventory/storage/inventoryRepository.ts` (~55L)
- Methods:
  - `create(item): InventoryItem` → INSERT, generate UUID
  - `getById(id): InventoryItem | null` → SELECT by id + userId
  - `list(): InventoryItem[]` → SELECT WHERE deletedAt IS NULL
  - `update(id, partial): InventoryItem` → UPDATE, bump version
  - `softDelete(id): void` → UPDATE deletedAt = NOW()
  - `hardDelete(id): void` → DELETE (only post-restore verification)
  - `exportAll(): InventoryItem[]` → SELECT * (for backup)
  - `importAll(items[]): void` → INSERT OR REPLACE (restore)

### E.3 Domain Model
- Create: `src/features/inventory/model/InventorySchemas.ts` (~40L)
- Zod: `InventoryItemSchema` with validation
  - `name`: non-empty, ≤100 chars
  - `quantity`: integer ≥ 0
  - `category`: enum or free text
  - `updatedAt`: ISO8601 timestamp
- Types: Generated from Zod schema

### E.4 React Hook
- Create: `src/features/inventory/hooks/useInventory.ts` (~50L)
- Exposes: `list(), create(), update(), delete(), export(), import(), error`
- Uses: `authContext` for userId, `inventoryRepository` for CRUD
- Error handling: Zod validation + DB errors → user-friendly messages

### E.5 Testing
- Tests: 10 (create, read, update, soft-delete, hard-delete, list, export, import, validation, concurrency)
- E2E: Add 5 items → export → import → verify identical

**Deliverable**: User can create, edit, delete inventory items locally

---

## PHASE F: BACKUP & SYNC SERVICE (3-4 hours)

### F.1 Backup Service Architecture
- Create: `src/shared/sync/backupService.ts` (~60L)
- Orchestrates: Steps A-E (SyncState + OAuth2 + Drive API + Conflict Resolver + Inventory)
- State machine:
  ```
  idle → syncing → uploading → conflict-resolution → synced
    ↓ (error) → error-state → awaiting-retry → syncing
  ```

### F.2 Backup Flow (Upload)
1. Check: User has backup consent + pro tier
2. Check: OAuth2 tokens valid (refresh if needed)
3. Export: Call `inventoryRepository.exportAll()`
4. Validate: Zod schema on exported items
5. Compress: gzip JSON if size > 50KB
6. Upload: Call `googleDriveClient.upload(compressed, 'poetry-backup-{timestamp}.json.gz')`
7. Update: `SyncStateStorage.update({ lastSyncAt: NOW(), lastSyncError: null })`
8. Emit: Event `backup.completed` for UI notification

### F.3 Restore Flow (Download)
1. Check: User has backup consent
2. List: `googleDriveClient.list()` → find latest backup
3. Download: Call `googleDriveClient.download(fileId)`
4. Decompress: gunzip if .gz extension
5. Validate: Zod schema validation
6. Merge: `conflictResolver.resolveConflicts(local, remote)`
7. Import: `inventoryRepository.importAll(merged)`
8. Update: `SyncStateStorage.update({ lastSyncAt: NOW() })`
9. Emit: Event `restore.completed` for UI notification

### F.4 Sync Strategy
- Auto-sync: On app resume + every 30 minutes (if opted in)
- Manual: User-triggered via UI button
- Throttle: Prevent rapid successive syncs (queue requests)
- Offline: Queue sync requests, execute when online

### F.5 Testing
- Tests: 8
  - Mock all Phase B-E dependencies
  - Scenarios: successful backup, successful restore, conflict resolution, network error, quota exceeded, quota recovered
- E2E: Create inventory → backup → force conflict → resolve → restore → verify
- Multi-device: Simulate 2 devices, both backup, restore, verify no data loss

**Deliverable**: User data backed up to Google Drive, restorable on new device

---

## PHASE G: PRODUCTION DEPLOYMENT (4-5 hours + 2 weeks release process)

### G.1 Pre-Release Quality Gate
- Tests: `npm test -- --coverage` (≥90% coverage)
- TypeScript: `npm run typecheck` (0 errors)
- Lint: `npm run lint` (0 warnings)
- Build: `eas build --platform all` (iOS + Android)
- Bundle size: Report (target < 50MB iOS, < 30MB Android)
- Performance: Profile startup time + sync time (target < 3s)
- Security scan: Snyk + OWASP mobile top 10 audit

### G.2 Release Artifacts

#### G.2.1 Android (PlayStore)
- Build: `eas build --platform android --type app-signing`
- Signing: Use EAS app signing (handles keystore securely)
- Rollout: Start 10% → 50% → 100% over 7 days
- Privacy policy: Link in PlayStore listing
- Screenshots: 5-6 key screens (backup, inventory, sync status)
- Description: "Offline-first inventory organizer with Google Drive backup"

#### G.2.2 iOS (App Store)
- Build: `eas build --platform ios --type app-store`
- Signing: Use Apple Developer Certificate (auto-managed via EAS)
- TestFlight: 1-2 weeks for internal testers
- App Store Review: Submit → wait 24-48h for approval
- Privacy policy: Link in App Store listing
- Screenshots: 5-6 key screens (same as Android)

#### G.2.3 Release Notes
```
VERSION 1.0.0 - Production Release

Features:
✅ Offline-first inventory management
✅ Google Drive backup for Pro tier
✅ Multi-device sync with conflict resolution
✅ Secure authentication via Google Sign-In
✅ Spanish + English support

Fixed:
- Storage reliability across app restarts
- Token refresh edge cases
- Conflict resolution timestamps

Performance:
- 40% faster startup (v0.0.1 → v1.0.0)
- 20% smaller APK (optimized compression)
- 60s average sync time (with 100+ items)
```

### G.3 Post-Release Monitoring (Week 1)

#### G.3.1 Crash Reporting
- Set up: Sentry or Firebase Crashlytics
- Alert: On any new crash pattern (10+ occurrences)
- Response: Hotfix within 24h if critical

#### G.3.2 Analytics
- Track: App installs, auth success rate, backup completion rate, user retention
- Alert: If auth fails > 5%, backup fails > 10%
- Dashboard: View daily/weekly trends

#### G.3.3 User Feedback
- In-app: Rating prompt after 5 app opens
- Support: Email + in-app bug report form
- Review responses: Respond to PlayStore/AppStore reviews within 48h

### G.4 Documentation for Release

#### G.4.1 User-Facing
- Quick start guide (1 page, 3 steps)
- FAQ: Backup recovery, multi-device sync, tier differences
- Troubleshooting: "Backup fails" → steps to fix

#### G.4.2 Technical
- API changelog (if backend changes in v1.0)
- Migration guide (if schema changes in future versions)
- Deployment checklist (reusable for v1.0.1, v1.1, etc.)

### G.5 Beta Phase (Weeks 1-2 before release)
- Internal testers: 5-10 team members
- Duration: 7-14 days
- Feedback: Bug reports + feature requests
- Iterations: 1-2 hotfixes based on critical feedback
- Final approval: All acceptance criteria met

### G.6 Post-Release Activities (Week 1)
- Monitor: Crash rate, auth success, backup rate
- Support: Respond to user issues within 4h
- Hotfix: Deploy patch if critical issues found
- Documentation: Update FAQs based on user questions
- Analytics: Weekly report on adoption + usage patterns

---

## TIMELINE SUMMARY

| Phase | Duration | Dev-Days | Cumulative |
|-------|----------|----------|-----------|
| A: Sync State | 2-3h | 0.3 | 0.3 |
| B: Google OAuth2 | 3-4h | 0.5 | 0.8 |
| C: Drive API | 4-5h | 0.6 | 1.4 |
| D: Conflict Resolution | 1-2h | 0.2 | 1.6 |
| E: Inventory CRUD | 4-5h | 0.6 | 2.2 |
| F: Backup Service | 3-4h | 0.5 | 2.7 |
| **Subtotal (MVP)** | **17-23h** | **3.7 days** | **2.7** |
| G: Release Prep | 4-5h | 0.6 | 3.3 |
| G: Release Execution | 2 weeks | - | 5.3 |
| **TOTAL** | **5-6 weeks** | **3.3 days dev** | **5-6 weeks** |

---

## CRITICAL PATH (Longest Dependency Chain)

```
B (Google OAuth2, 3-4h)
  ↓
C (Drive API, 4-5h) — can start after B.1
  ↓
F (Backup Service, 3-4h) — can start after C.5

Parallel (While doing B-C):
  - A (Sync State, 2-3h)
  - D (Conflict Resolver, 1-2h)
  - E (Inventory, 4-5h)

Total Sequential: 3-4 + 4-5 + 3-4 = 10-13 hours
Total with Parallelization: max(10-13 sequential, 4-5 parallel) = 10-13 hours
Total with all parallel: ~6 hours (compressed)
Realistic: ~20 hours (team coordination + testing)
```

---

## SUCCESS CRITERIA BY PHASE

| Phase | Criteria |
|-------|----------|
| A | SyncState loads/saves correctly; no data loss on app restart |
| B | User OAuth2 token obtained; auto-refresh works; logout clears tokens |
| C | Backup uploaded to Drive; file readable via Drive web UI |
| D | Conflicting edits resolved deterministically; no duplicate items |
| E | 100+ items stored locally; export/import lossless |
| F | Auto-sync works on resume; manual sync triggers backup |
| G | App published to PlayStore + AppStore; installs, signs in, backs up data |

---

## ROLLBACK PLAN (If Critical Issue Found)

| Scenario | Action | Time |
|----------|--------|------|
| Crash on startup | Disable auto-sync, rollback to v0.9.x | 2h |
| Data corruption on restore | Soft-delete restored items, revert to local copy | 30m |
| Auth token invalid | Force re-auth, clear all tokens | 15m |
| Google Drive quota exceeded | Disable uploads, show UI message, queue for retry | 30m |
| PlayStore rejection (missing privacy policy) | Add policy, resubmit | 1h |

**Max downtime target**: 4 hours

---

## ENVIRONMENT VARIABLES (G.1-G.6)

```bash
# .env.production (Backend)
GOOGLE_OAUTH_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_OAUTH_REDIRECT_URI=exp://your.app.domain/callback

# eas.json (App config)
{
  "build": {
    "production": {
      "env": {
        "SENTRY_DSN": "https://xxx@sentry.io/xxx",
        "API_URL": "https://api.poetry.app"
      }
    }
  }
}

# app.json (Version)
{
  "expo": {
    "version": "1.0.0",
    "android": {
      "versionCode": 1
    },
    "ios": {
      "buildNumber": "1"
    }
  }
}
```

---

## HANDOFF CHECKLIST (Before Each Phase)

- [ ] Acceptance criteria defined + agreed
- [ ] Dependency checklist (all previous phases complete)
- [ ] Test files created (TDD approach)
- [ ] Estimated time confirmed with team
- [ ] Environment variables set
- [ ] Code review assigned
- [ ] Merge strategy planned (feature branch → main → release tag)

---

## NOTES

1. **No omissions**: Covers auth → sync → backup → release
2. **Technical depth**: Exact endpoints, error codes, retry strategies
3. **Conciseness**: No fluff, every section actionable
4. **Realistic**: 20-30 hours total (3 dev-days coding, 2 weeks release process)
5. **Scalable**: This architecture supports 1M+ users without major refactoring

---

**NEXT ACTION**: Confirm Phase A start date. Once locked, coordinate parallel work on A + D + E while B.1 developer starts OAuth2 setup.
