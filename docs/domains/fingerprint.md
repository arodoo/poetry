# Fingerprint Domain

Biometric authentication module enabling fingerprint enrollment and verification
for secure physical access control. Integrates with HID Digital Persona
(FMD-based) readers via backend SDK.

## Architecture

```
Frontend (React) → Backend (Java) → HID SDK (dpfpdd) → U.are.U 4500
```

The backend communicates directly with the HID Digital Persona SDK to capture
fingerprints. The frontend calls backend endpoints to initiate capture and
enrollment operations.

## Database Schema

### Table: `fingerprints`

| Column           | Type        | Constraints                     |
| ---------------- | ----------- | ------------------------------- |
| id               | BIGINT      | PRIMARY KEY, AUTO_INCREMENT     |
| user_id          | BIGINT      | NOT NULL, FK(users.id)          |
| fmd              | TEXT        | NOT NULL (Base64 FMD)           |
| status           | VARCHAR(20) | NOT NULL, ENUM(ACTIVE,ARCHIVED) |
| enrolled_at      | TIMESTAMP   | NOT NULL                        |
| last_activity_at | TIMESTAMP   | NULL                            |
| created_at       | TIMESTAMP   | NOT NULL, auto-generated        |
| updated_at       | TIMESTAMP   | NOT NULL, auto-updated          |
| deleted_at       | TIMESTAMP   | NULL (soft delete)              |
| version          | BIGINT      | NOT NULL, optimistic lock       |

**Indexes:**

- `idx_fingerprints_user` on `user_id`
- `idx_fingerprints_status` on `status`

## API Endpoints

- `POST /api/v1/fingerprints/capture` - Initiate capture from HID reader
- `POST /api/v1/fingerprints/enroll` - Enroll captured FMD for current user
- `POST /api/v1/fingerprints/verify` - Verify FMD (server-side matching)
- `GET /api/v1/fingerprints` - List all enrolled fingerprints
- `DELETE /api/v1/fingerprints/{id}` - Soft-delete fingerprint

## Integration Flow

1. **Capture**: Frontend calls POST /capture → Backend activates HID SDK
2. **Wait**: User places finger on reader → SDK captures FMD
3. **Return**: Backend returns FMD to frontend
4. **Enrollment**: Frontend calls POST /enroll with FMD → Save to DB
5. **Verification**: POST /verify with probe FMD → Match against DB templates

## Fingerprint Listener (Real-time Banner)

When a finger is placed on the reader from **any page**, a banner appears
at the top-right corner for 60 seconds showing the user's name, email,
and membership status. Unknown fingerprints show "Unrecognized fingerprint".

### Architecture

```
FingerprintListenerProvider (App root)
  └── useListenerLoop
        └── loop: POST /capture (blocks) → POST /verify → push banner
```

### Key files

| File | Purpose |
|------|---------|
| `src/features/fingerprint/FingerprintListenerProvider.tsx` | Global provider, starts/stops loop on auth status |
| `src/features/fingerprint/hooks/useListenerLoop.ts` | Async loop: capture → verify → banner |
| `src/shared/banner/BannerContext.tsx` | Fetches user + membership, manages 60s lifetime |
| `src/shared/banner/BannerItem.tsx` | Renders banner (known user or unknown fingerprint) |

### Loop behavior

1. Calls `POST /capture` (blocks on backend until finger detected)
2. On success, calls `POST /verify` with the captured FMD
3. `matched: true` → fetches user + membership + demographics → shows banner
4. `matched: false` → banner with "Unrecognized fingerprint"
5. On error → waits 3s and retries

### Banner membership status

After verification the banner calls `GET /api/v1/memberships/paged?search={userId}&size=1` and reads `membership.status` directly from the response. Status is mapped as follows:

| `membership.status` | Banner display | Border color |
|---|---|---|
| `active` | Active (green) | `--color-success` |
| `expired` | Expired (red) | `--color-danger` |
| `inactive` / any other | Inactive (red) | `--color-danger` |
| no membership | None (subtle) | `--color-border` |
| userId null | Unknown fingerprint | `--color-warning` |

> **Note:** `BannerItem.tsx` reads `membership.status` explicitly. It does **not** assume "active" when a membership object exists.

### StrictMode safety

Uses a **module-level** `let loopActive` flag (not `useRef`) so React 18
StrictMode double-mount does not start two concurrent loops.

### Backend: verify uses HID SDK

`VerifyFingerprintUseCase` uses `HidCapturePort.compare()` (HID SDK native
ANSI_378_2004 matching) — **not** SourceAFIS. Both probe and stored FMDs
are decoded with URL-safe Base64 normalization (`-`→`+`, `_`→`/`).

### FMD format notes

- Captured FMDs may arrive in URL-safe Base64 (contains `-` and `_`)
- `ProdHidCaptureAdapter.decodeFmd()` normalizes before decoding
- Match score from HID SDK: lower = better (FAR-based), threshold = 21474

## SDK Requirements

- HID Digital Persona SDK installed on backend server
- Native library (dpfpdd.dll) in JNI path
- Profile `prod` for real SDK, `stub` for simulated capture

## Hardware Cancel Endpoint

`DELETE /api/v1/fingerprints/capture` was added to allow the frontend to
abort a blocking `reader.Capture()` call on the JNI layer before starting
a new one. Without this, the hardware lock could hold for up to 30 seconds.

| Layer | File |
|---|---|
| Port | `HidCapturePort.java` → `void cancelCapture()` |
| Adapter | `ProdHidCaptureAdapter.java` → `reader.CancelCapture()` |
| Use Case | `CancelCaptureUseCase.java` |
| Controller | `FingerprintCaptureController.java` → `@DeleteMapping("/capture")` |

## Known Bug: Why the Listener Skips Reads

### Root Cause (documented for future reference)

`POST /capture` is a **blocking JNI call** inside a `synchronized` block in
`ProdHidCaptureAdapter`. The C++ driver holds the hardware laser open until
a finger is detected or the timeout expires.

**React 18 Strict Mode** mounts every component twice in development. If
the listener hook is not guarded, two concurrent loops can both call
`/capture`. The first loop's HTTP request occupies the hardware. When the
user places their finger, the first loop reads it — but if that loop's HTTP
socket was already abandoned (component unmounted), the FMD is silently
dropped. The user sees nothing. The second valid loop then starts a new
capture, but the finger is gone.

### The Fix (what works)

A **module-level `loopActive` boolean** (`let loopActive = false`) with a
guard at the start of `start()`:

```typescript
if (loopActive) return  // StrictMode double-mount guard
loopActive = true
```

Because the flag lives **at module scope** (not inside the React component),
it survives unmount/remount cycles. The second StrictMode call hits the
guard and returns immediately, leaving only one hardware request in flight
at any time.

### What does NOT work

| Approach | Why it fails |
|---|---|
| `AbortController` on the `fetch` | Closes the HTTP socket but the **JNI thread keeps the hardware blocked** for up to 30s. The next loop hits the synchronized gate and fails. |
| `Symbol`-based `currentRunId` | Both StrictMode mounts get unique Symbols, so both pass the guard and start concurrent loops. |

All Rights Reserved Arodi Emmanuel
