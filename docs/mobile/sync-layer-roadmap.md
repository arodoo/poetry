/*
 * File: sync-layer-roadmap.md
 * Purpose: Defines mandatory next steps to scale the app
 * from extended auth to a production-ready sync system.
 * Explains why each step is required, how to do it, and the
 * technical dependencies between features.
 * All Rights Reserved. Arodi Emmanuel
 */

# Sync Layer Roadmap: Mandatory Next Steps

## 0. Current State Assessment

✅ **DONE:**
- Auth: signup/login/logout with persisted tokens
- Domain models: UserProfile, SubscriptionTier, BackupConsent
- Storage: SecureStore (tokens, profile, tier, consent)
- SQLite: singleton initialized, ready for feature tables
- Tests: 23 unit tests covering all persistence

❌ **MISSING (blocks production):**
1. Sync state tracking
2. Google Drive API integration
3. Conflict resolution (multi-device sync)
4. Network resilience + retry logic
5. Inventory feature + SQLite repository
6. Backup/restore flows
7. E2E tests (user workflow validation)

---

## 1. MANDATORY: Sync State Tracking

### Why It's Mandatory
- Without tracking, you can't know if backup succeeded/failed
- Can't queue failed backups for retry
- Can't show user sync status in UI
- Risk of silent data loss

### What to Build

**File**: `shared/sync/SyncStateStorage.ts` (~50L)

```typescript
interface SyncState {
  lastSyncAt: ISO8601 | null          // Last successful sync
  lastSyncError: string | null        // Error message if failed
  isSyncing: boolean                  // Currently in progress
  pendingItemCount: number            // Items queued for sync
}

export const syncStateStorage = {
  async load(): Promise<SyncState>
  async update(partial: Partial<SyncState>): Promise<void>
  async clear(): Promise<void>
}
```

**How to Implement:**
1. Store in SecureStore as JSON (like profile)
2. Load on AuthProvider mount (add to useAuthLoader)
3. Extend AuthContext to expose `syncState` + `updateSyncState()`
4. Create tests: load, update, clear, persistence

**Time estimate**: 2-3 hours
**Dependencies**: None (uses existing SecureStore pattern)

---

## 2. MANDATORY: Google Drive OAuth2 (expo-auth-session)

### Why It's Mandatory
- Required to authenticate Google Drive API calls
- Token refresh needed for long-lived sessions
- Must work offline (redirect → Google → back to app)

### What to Build

**File**: `shared/http/googleDriveAuth.ts` (~55L)

```typescript
// PKCE flow via expo-auth-session
export async function setupGoogleDriveAuth(): Promise<{
  accessToken: string      // For Google Drive API
  expiresIn: number        // Seconds until refresh needed
  refreshToken?: string
}>

export async function refreshGoogleDriveToken(
  refreshToken: string
): Promise<{ accessToken: string; expiresIn: number }>
```

**How to Implement:**
1. Use `expo-auth-session` + `expo-google-sign-in` (if available)
2. Store tokens in SecureStore (separate key from auth tokens)
3. Implement token refresh on expiry
4. Handle network unavailable gracefully (cache last token)

**Integration Point:**
```typescript
// In AuthProvider: on login, request Google Drive scope
const SCOPES = [
  'https://www.googleapis.com/auth/drive.file'
]
```

**Time estimate**: 3-4 hours (OAuth2 is fiddly)
**Dependencies**: None (existing deps sufficient)

---

## 3. MANDATORY: Google Drive API Client

### Why It's Mandatory
- Need to upload/download inventory backups
- Must handle quota limits + rate limiting
- Must implement retry with exponential backoff

### What to Build

**File**: `shared/sync/googleDriveClient.ts` (~60L)

```typescript
export interface DriveFile {
  id: string
  name: string
  modifiedTime: ISO8601
  size: number
}

export const googleDriveClient = {
  // Upload inventory snapshot to Drive
  async uploadBackup(
    data: string,           // JSON stringified DB
    fileName: string,
    accessToken: string
  ): Promise<DriveFile>

  // List existing backups
  async listBackups(
    accessToken: string
  ): Promise<DriveFile[]>

  // Download backup by ID
  async downloadBackup(
    fileId: string,
    accessToken: string
  ): Promise<string>        // JSON stringified DB

  // Delete old backup
  async deleteBackup(
    fileId: string,
    accessToken: string
  ): Promise<void>
}
```

**How to Implement:**
1. Use `axios` (already in deps) with Bearer auth
2. POST/GET to `https://www.googleapis.com/upload/drive/v3/files`
3. Implement retry logic:
   ```typescript
   // On 429 (rate limit) or 5xx: exponential backoff
   // retry with delay = 2^attempt seconds (max 5 attempts)
   ```
4. Parse JSON responses with Zod validation
5. Handle 401 → token refresh → retry

**API Calls Needed:**
| Method | Endpoint | Use |
|--------|----------|-----|
| POST | /files | Upload backup |
| GET | /files?q=name='Poetry%20Backup%20*' | List backups |
| GET | /files/{id}?alt=media | Download backup |
| DELETE | /files/{id} | Delete old backup |

**Time estimate**: 4-5 hours
**Dependencies**: googleDriveAuth.ts (must build first)

---

## 4. MANDATORY: Conflict Resolution Strategy

### Why It's Mandatory
- Without a strategy, merging changes from multi-device sync is undefined
- Risk of data loss or corruption
- Users need predictable behavior

### What to Implement

**Strategy: Last-Write-Wins (LWW) with Timestamps**

```typescript
interface InventoryItem {
  id: string
  name: string
  quantity: number
  updatedAt: ISO8601  // Timestamp of last write
}

// During sync: compare timestamps
// Device A: item.updatedAt = 2026-03-01T10:00:00Z
// Device B: item.updatedAt = 2026-03-01T11:00:00Z
// → Accept Device B version (later timestamp wins)
```

**File**: `shared/sync/conflictResolver.ts` (~50L)

```typescript
export function resolveConflict(
  local: InventoryItem,
  remote: InventoryItem
): InventoryItem {
  const localTime = new Date(local.updatedAt).getTime()
  const remoteTime = new Date(remote.updatedAt).getTime()
  return remoteTime > localTime ? remote : local
}
```

**Alternative: ETag + If-Match Headers** (future v2)
- Backend validates version before accepting upload
- Prevents lost updates across devices
- Requires backend changes

**Time estimate**: 1-2 hours
**Dependencies**: None

---

## 5. MANDATORY: Inventory Feature (SQLite Schema)

### Why It's Mandatory
- Without inventory, there's nothing to backup/sync
- Provides realistic end-to-end testing
- Validates SQLite repository pattern

### What to Build

**File**: `features/inventory/model/InventorySchemas.ts` (~40L)

```typescript
export const ItemSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),           // User who owns item
  name: z.string().min(1),
  quantity: z.number().int().min(0),
  category: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
})

export type InventoryItem = z.infer<typeof ItemSchema>
```

**File**: `features/inventory/storage/inventoryRepository.ts` (~55L)

```typescript
export const inventoryRepository = {
  // Create item
  async create(item: Omit<InventoryItem, 'id' | 'createdAt'>)

  // Read by ID
  async getById(id: string): Promise<InventoryItem | null>

  // List all (not deleted)
  async list(): Promise<InventoryItem[]>

  // Update
  async update(id: string, partial: Partial<InventoryItem>)

  // Soft delete (sets deletedAt)
  async softDelete(id: string)

  // Export all (for backup)
  async exportAll(): Promise<InventoryItem[]>

  // Import all (for restore)
  async importAll(items: InventoryItem[]): Promise<void>
}
```

**SQLite Schema**:
```sql
CREATE TABLE IF NOT EXISTS inventory_items (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  category TEXT,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  deletedAt TEXT,
  FOREIGN KEY (userId) REFERENCES users(id)
)
```

**How to Implement:**
1. Add migration to `shared/storage/db.ts`:
   ```typescript
   addMigration(`CREATE TABLE IF NOT EXISTS ...`)
   ```
2. Build repository with CRUD operations
3. Use Zod to validate all reads/writes
4. Add tests: create, read, update, delete, soft-delete, export/import

**Time estimate**: 4-5 hours
**Dependencies**: None (uses existing SQLite + Zod)

---

## 6. MANDATORY: Backup Trigger + Restore Flow

### Why It's Mandatory
- Proof that entire system works (auth → tier check → consent → storage → Google Drive)
- Validates sync state tracking
- Prepares for scheduling backups (future)

### What to Build

**File**: `shared/sync/backupService.ts` (~55L)

```typescript
export const backupService = {
  async triggerBackup(
    userId: string,
    syncState: SyncState,
    authTokens: TokenPair,
    driveToken: string
  ): Promise<{ success: boolean; error?: string }>
    // 1. Check: tier === 'pro' && consent.granted
    // 2. Export inventory from SQLite
    // 3. Upload to Google Drive
    // 4. Update syncStateStorage
    // 5. Handle errors gracefully

  async triggerRestore(
    userId: string,
    backupFileId: string,
    driveToken: string
  ): Promise<{ success: boolean; error?: string }>
    // 1. Download backup from Google Drive
    // 2. Import inventory into SQLite
    // 3. Update syncState
    // 4. Show success toast
}
```

**How to Implement:**
1. Request backup on button press
2. Check tier + consent (block if not Pro)
3. Set syncState.isSyncing = true
4. Call inventoryRepository.exportAll()
5. Call googleDriveClient.uploadBackup()
6. Update syncState with timestamp on success
7. Show error toast if failed

**Time estimate**: 3-4 hours
**Dependencies**: All previous steps (auth, tier, consent, inventory, Google Drive API, conflict resolution)

---

## 7. E2E Test: Full User Workflow

### Why It's Mandatory
- Unit tests pass, but integration might fail
- Need to validate: auth → inventory CRUD → backup → restore
- Catches timing issues, race conditions, error paths

### What to Build

**File**: `tests/e2e/inventory-backup.e2e.test.ts` (~80L)

```typescript
describe('E2E: Inventory + Backup', () => {
  it('user creates items, backs up, restores on new device', async () => {
    // 1. Login
    await element(by.text('Sign in')).tap()
    // ... OAuth flow

    // 2. Add inventory items
    await element(by.id('addItemBtn')).tap()
    await element(by.id('itemName')).typeText('Milk')
    await element(by.id('itemQty')).typeText('2')
    await element(by.text('Save')).tap()
    await expect(element(by.text('Milk'))).toBeVisible()

    // 3. Upgrade to Pro
    await element(by.id('profileTab')).tap()
    await element(by.text('Upgrade to Pro')).tap()
    // ... Subscription UI

    // 4. Enable backup
    await element(by.id('settingsTab')).tap()
    await element(by.text('Enable backup')).tap()
    await expect(element(by.text('Backup enabled'))).toBeVisible()

    // 5. Trigger backup
    await element(by.id('backupBtn')).tap()
    await waitFor(element(by.text('Backup successful')))
      .toBeVisible()
      .withTimeout(10000)

    // 6. Logout
    await element(by.text('Logout')).tap()

    // 7. Simulate new device: login again
    await element(by.text('Sign in')).tap()
    // ... OAuth flow (same account)

    // 8. Restore from backup
    await element(by.id('settingsTab')).tap()
    await element(by.text('Restore from backup')).tap()
    await waitFor(element(by.text('Restore complete')))
      .toBeVisible()
      .withTimeout(10000)

    // 9. Verify items restored
    await element(by.id('inventoryTab')).tap()
    await expect(element(by.text('Milk'))).toBeVisible()
  })
})
```

**Time estimate**: 5-6 hours (Detox debugging is slow)
**Dependencies**: All previous steps (auth, inventory, backup service)

---

## 8. Implementation Sequence (Dependency Tree)

```
PHASE 1 (This week):
├─ Step 1: Sync State Tracking      (2-3h) ← STANDALONE
├─ Step 2: Google Drive OAuth2      (3-4h) ← STANDALONE
├─ Step 3: Google Drive API Client  (4-5h) ← depends on Step 2
├─ Step 4: Conflict Resolution      (1-2h) ← STANDALONE
└─ Step 5: Inventory Feature        (4-5h) ← STANDALONE

PHASE 2 (Next week):
├─ Step 6: Backup/Restore Service   (3-4h) ← depends on Steps 1-5
└─ Step 7: E2E Tests               (5-6h) ← depends on Steps 1-6

CRITICAL PATH (longest dependency chain):
  Google Drive OAuth2 (3-4h)
    ↓
  Google Drive API Client (4-5h)
    ↓
  Inventory Feature (4-5h)  [parallel to above]
    ↓
  Backup Service (3-4h)
    ↓
  E2E Tests (5-6h)

TOTAL: ~14-19 hours (sequential)
       ~10-12 hours (parallel, with concurrent inventory work)
```

---

## 9. Why This Order Is Mandatory

| Reason | Steps Affected |
|--------|----------------|
| Impossible to test backup without inventory | Steps 1, 5, 6, 7 |
| Backup requires Google Drive auth | Steps 2, 3, 6 |
| API client needs auth tokens | Step 3 depends on Step 2 |
| Conflict resolution validates sync strategy before backup | Step 4 before Step 6 |
| E2E tests validate entire pipeline | Step 7 is final validation |

---

## 10. How to Start: Step 1 (This Hour)

### SyncStateStorage Implementation

1. **Create file**: `src/shared/sync/SyncStateStorage.ts`
2. **Copy SecureStore pattern** from `profileStore.ts`
3. **Add key**: `'poetry.sync.state'`
4. **Write 4 tests**:
   - Load empty → defaults to `{ lastSyncAt: null, ... }`
   - Save → load matches
   - Update partial fields
   - Clear → resets to defaults

5. **Update AuthContext**:
   - Add `syncState: SyncState`
   - Add `updateSyncState: (partial) => Promise<void>`

6. **Update useAuthLoader**:
   - Add `syncStateStorage.load()` to Promise.all

7. **Update AuthProvider**:
   - Hydrate `syncState` from loaded
   - Expose `updateSyncState` action

8. **Test**:
   ```bash
   npm test -- syncStateStorage.test.ts
   ```

**Expected result**: Green test suite in 1-2 hours.

---

## 11. Hands-On Checklist for Phase 1

- [ ] Sync State Storage (Step 1) → 2-3h
- [ ] Google Drive OAuth2 (Step 2) → 3-4h
- [ ] Google Drive API Client (Step 3) → 4-5h
- [ ] Conflict Resolver (Step 4) → 1-2h
- [ ] Inventory Feature (Step 5) → 4-5h
- [ ] All Phase 1 unit tests passing ✅
- [ ] TypeScript compiles clean ✅
- [ ] No hardcoded strings (all i18n keys) ✅
- [ ] All files ≤60L ✅

---

## 12. Success Criteria

**After Phase 1**:
- ✅ SyncState can be read/written/cleared
- ✅ Google Drive OAuth tokens can be obtained
- ✅ Files can be uploaded/downloaded to Drive
- ✅ Inventory items can be created/read/updated
- ✅ 35+ new unit tests, all passing

**After Phase 2**:
- ✅ Backup button works end-to-end
- ✅ Restore button recovers inventory correctly
- ✅ E2E test validates full workflow
- ✅ App ready for alpha testing with real devices

---

## 13. Fallback: Local-Only Mode (No Google Drive)

If Google Drive integration gets blocked:

1. App remains **fully functional** for inventory management
2. Backup button gracefully disabled for free users
3. Pro tier shows "Upgrade to unlock backup" message
4. Users can export as JSON via email (no Drive dependency)

This is intentional: offline-first means never hard-blocking on cloud services.
