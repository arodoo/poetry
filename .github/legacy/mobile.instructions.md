---
applyTo: 'poetry-mobile/**'
---

Logs in real time with hot reload at `logs/mobile/mobile-dev.log`

## App Vision

Offline-first **inventory organizer** distributed via Play Store / App Store.
Data lives on the device (SQLite via expo-sqlite). Cloud backup to Google Drive
is a paid feature. The backend exists only for subscription management,
analytics, and monitoring — it does NOT serve app data.

## Core Architecture

- **Offline-first**: All reads/writes go to local SQLite. No network = no
  problem.
- **Sync layer**: Google Drive API for backup/restore (paid tier only).
- **Backend role**: Subscription validation, crash analytics, user monitoring.
  Never the primary data source.
- **Auth**: Google Sign-In (expo-auth-session). JWT stored in SecureStore.
  Required only for sync/backup. App works unauthenticated (local-only mode).

## Mobile-Specific Rules

- React Native with Expo (managed workflow, no bare ejection)
- File-based routing with Expo Router
- TypeScript strict mode — zero `any`, zero suppressions
- Production-ready code only (no TODO, FIXME, commented-out code)
- DDD, SOLID, Clean Architecture — domain logic never in components
- English for all code, comments, vars
- ESLint + Prettier enforced
- File header required: name, 3+ sentence purpose, rights legend
- Max 60L/file, 80C/line (CI enforced)

## Platform Targets

- Android (primary, Play Store)
- iOS (App Store)
- Web: 

## Data Layer (Offline-First)

- **Local storage**: `expo-sqlite` for structured inventory data
- **Secure storage**: `expo-secure-store` for tokens and user credentials
- **FORBIDDEN**: AsyncStorage, localStorage, or any unencrypted key-value
  store for sensitive data
- All local DB operations via repository pattern in `shared/storage/`
- Zod validates all data at read and write boundaries

## Sync & Backup (Paid Tier)

- Google Drive API via `expo-auth-session` + Google OAuth2
- Backup triggered manually by user or on schedule (if Pro)
- Conflict resolution: **last-write-wins** with timestamp comparison
- Backup format: encrypted JSON exported from SQLite
- Sync state tracked in `shared/sync/SyncStateStorage.ts`

## Subscription Tiers

- **Free**: Unlimited local inventory, no cloud backup
- **Pro**: Google Drive backup, multi-device sync, export features
- Tier stored locally in SecureStore, validated against backend on launch
- No features should hard-block on network — degrade gracefully

## Authentication

- Google Sign-In via `expo-auth-session` (PKCE flow)
- JWT stored in `expo-secure-store` (NEVER AsyncStorage)
- Auth is OPTIONAL for local-only mode — gate sync, not the app
- Token refresh via backend `/auth/refresh` endpoint
- `AuthProvider` manages: status, user profile, subscription tier,
  backup consent

## Backend Integration (Minimal)

- **USE**: `shared/http/apiClient.ts` (Axios + JWT interceptors)
- **FORBIDDEN**: raw fetch() or axios in feature code
- Backend endpoints used: auth, subscription validation, analytics events
- All responses validated with Zod
- Network failures must NOT break local functionality

## State Management

- TanStack Query for remote state (backend calls only)
- React Context for global state: Auth, Theme, i18n
- Local SQLite state via custom hooks in `shared/storage/`
- No Redux, no MobX

## Navigation

- Expo Router file-based routing
- `app/(auth)/` — login / onboarding
- `app/(app)/` — protected, requires local session
- `app/(tabs)/` — main tab navigator inside `(app)`
- Auth gate: allow local-only mode (no login required to use app)

## Testing

- Jest + React Native Testing Library
- Test location: `poetry-mobile/src/tests/<feature>/`
- Mock SQLite with in-memory implementation
- Mock Google Drive with controlled fixtures
- Tests simulate real user flows (create item, backup, restore)

## Error Handling

- All errors explicitly handled
- i18n keys for all user-facing messages
- Network errors degrade gracefully (never crash the app)
- SQLite errors logged + surfaced to user with recovery options

## Environment Variables

- `EXPO_PUBLIC_API_BASE_URL` — backend URL
- `EXPO_PUBLIC_GOOGLE_CLIENT_ID` — OAuth client ID
- Validated with Zod at startup

## Architecture References

- Mobile blueprint: `docs/architecture/mobile-module-blueprint.json`
- Dev guide: `docs/mobile/development-guide.md`
- Core architecture: `docs/mobile/core-architecture.md`

