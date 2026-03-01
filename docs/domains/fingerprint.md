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
Frontend (React)
  └── FingerprintListenerProvider (App root)
        └── useListenerLoop (WebSocket client)
              └── ws://localhost/ws/fingerprint (JSON events)
                    └── Backend: FingerprintWebSocketHandler
                          └── ScanResultHandler (HID + verify + broadcast)
                                └── broadcastMatch(userId) → all connected clients
```

The listener establishes a **persistent WebSocket** connection on app mount.
The backend broadcasts match events to all connected clients in real-time.
No polling. No long-blocking HTTP. No StrictMode concurrency issues.

### Key files

| File | Purpose |
|------|---------|
| **Frontend** | |
| `src/features/fingerprint/FingerprintListenerProvider.tsx` | Global provider, starts/stops WS on auth status |
| `src/features/fingerprint/hooks/useListenerLoop.ts` | WebSocket client: connects, authenticates, handles events |
| `src/shared/banner/BannerContext.tsx` | Fetches user + membership on match event, manages 60s lifetime |
| `src/shared/banner/BannerList.tsx` | Renders stacked banners, portal to fullscreen or body |
| `src/shared/banner/BannerItem.tsx` | Single banner card (known user or unknown fingerprint) |
| **Backend** | |
| `config/websocket/WebSocketConfig.java` | Registers `/ws/fingerprint` handler |
| `infrastructure/websocket/FingerprintWebSocketHandler.java` | Raw WebSocket handler, JWT auth on first frame, broadcasts events |
| `infrastructure/websocket/WsBroadcaster.java` | Sends JSON to all connected sessions |
| `infrastructure/hardware/hid/ScanResultHandler.java` | Captures → verifies → calls `broadcastMatch(userId)` |

### WebSocket Event Flow

1. **Connection**: Frontend connects to `ws://localhost/ws/fingerprint`
2. **Auth**: Frontend sends JWT access token in first text frame
3. **Handler validates**: `FingerprintWebSocketHandler.handleTextMessage()` parses JWT
4. **Match event**: When finger detected, backend sends `{"type":"MATCH","userId":2}`
5. **Banner**: Frontend calls `push(2)` → fetches user + membership → shows banner
6. **Unknown**: Finger not matched → `{"type":"UNKNOWN"}` → banner with warning
7. **Reconnect**: On socket close, auto-reconnect with exponential backoff (2s → 30s max)

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

### Critical: PathLocaleFilter must exclude /ws/ paths

**BUG TRAP:** `PathLocaleFilter` (@Order(HIGHEST_PRECEDENCE)) strips leading
2-letter segments thinking they are locale codes (e.g., `en`, `es`).

The string **`"ws"`** matches the regex `^[a-zA-Z]{2}$`, so:
- Request: `GET /ws/fingerprint`
- Filter sees: `"ws"` looks like a locale → strips it
- Wrapped URI becomes: `/fingerprint` (no longer matches `/ws/fingerprint`)
- Result: Spring Security denies access → **HTTP 403**

**The fix:** `PathLocaleFilter.doFilterInternal()` must check and skip WebSocket paths:

```java
if (uri == null || uri.length() < 4 || uri.startsWith("/ws/")) {
  chain.doFilter(req, res);
  return;
}
```

Without this, WebSocket handshakes fail silently. The frontend logs:
```
consoleWrap.ts:27 [WS] error
WebSocket connection to 'ws://localhost:8080/ws/fingerprint' failed
```

And the banner never appears because the WebSocket never connects.

## Proxy Configuration (Dev & Prod)

WebSocket connections must pass through the same origin as the frontend.
Direct cross-origin connections fail (even with CORS).

### Development (Vite)

`vite.config.ts` must proxy `/ws/` to backend:

```javascript
const server = {
  proxy: {
    '/ws': {
      target: 'ws://localhost:8080',
      changeOrigin: true,
      ws: true,  // Enable WebSocket support
    },
  },
}
```

This ensures frontend connects to `ws://localhost:5173/ws/fingerprint` (same origin)
which Vite proxies to `ws://localhost:8080/ws/fingerprint` (backend).

### Production (Nginx)

`nginx.conf` must have a `/ws/` location block with WebSocket headers:

```nginx
location /ws/ {
    proxy_pass http://backend:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_read_timeout 3600s;  # Long timeout for persistent connection
}
```

Without this, browsers reject the upgrade: `WebSocket connection failed`.

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

## Historical Note: Migration from HTTP Long-Polling

Previous versions used `POST /capture` (blocking) → `POST /verify` polling.
Issues:
- Blocking JNI calls held hardware for up to 30s
- React 18 StrictMode caused double-mounts → concurrent requests → dropped reads
- No real-time broadcasting → latency

**Current solution:** Persistent WebSocket with server-side broadcasting.
All match events push to connected clients instantly. No polling. No concurrency.

All Rights Reserved Arodi Emmanuel
