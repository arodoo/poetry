# Poetry Mobile - Setup Complete ✅

**Created**: 2025-10-11
**Status**: Initial setup complete

## What Has Been Done

### ✅ Phase 1: Project Initialization - COMPLETE

1. **Expo Project Created**
   - Template: `blank-typescript`
   - Name: `poetry-mobile` (Poetry Events)
   - Version: 1.0.0

2. **Core Dependencies Installed**
   - ✅ expo-router (file-based navigation)
   - ✅ expo-secure-store (secure token storage)
   - ✅ @tanstack/react-query (server state)
   - ✅ axios (HTTP client)
   - ✅ zod (runtime validation)
   - ✅ @rnmapbox/maps (mapping)
   - ✅ expo-location (geolocation)
   - ✅ expo-image-picker, expo-camera (media)
   - ✅ i18next, react-i18next (internationalization)

3. **Dev Dependencies Installed**
   - ✅ TypeScript types
   - ✅ ESLint
   - ✅ Prettier
   - ✅ Jest
   - ✅ @testing-library/react-native

4. **Configuration Files**
   - ✅ `tsconfig.json` - TypeScript config with strict mode
   - ✅ `app.json` - Expo config with Mapbox plugin
   - ✅ `package.json` - Scripts for dev, build, test, sdk:generate
   - ✅ `.env.example` - Environment template
   - ✅ `.gitignore` - Ignore node_modules, generated files

5. **Core Infrastructure Created**
   - ✅ `src/shared/config/env.ts` - Environment validation
   - ✅ `src/shared/auth/tokenStorage.ts` - Secure JWT storage
   - ✅ `src/shared/http/apiClient.ts` - Axios with interceptors
   - ✅ `src/shared/query/queryClient.ts` - React Query config
   - ✅ `src/shared/mapbox/MapboxConfig.ts` - Mapbox init
   - ✅ `src/shared/i18n/` - i18n setup (en, es)
   - ✅ `scripts/generate-sdk.sh` - OpenAPI SDK generator

6. **Documentation**
   - ✅ `README.md` - Project overview and setup guide
   - ✅ Architecture references in `.github/`

## Project Structure

```
poetry-mobile/
├── app/                      # Expo Router screens (to be created)
├── src/
│   ├── api/
│   │   └── generated/        # Auto-generated SDK (empty)
│   ├── shared/
│   │   ├── auth/            # tokenStorage.ts ✅
│   │   ├── config/          # env.ts ✅
│   │   ├── http/            # apiClient.ts ✅
│   │   ├── i18n/            # i18n setup ✅
│   │   ├── mapbox/          # MapboxConfig.ts ✅
│   │   └── query/           # queryClient.ts ✅
│   └── features/            # (to be created)
├── scripts/
│   └── generate-sdk.sh      # SDK generation script ✅
├── app.json                 # Expo config ✅
├── tsconfig.json            # TypeScript config ✅
├── package.json             # Dependencies + scripts ✅
├── .env.example             # Environment template ✅
└── README.md                # Documentation ✅
```

## TypeScript Verification

✅ Type check passes with no errors

## Next Steps

### Immediate (Phase 2)

1. **Backend Setup**
   - Create Events domain in `poetry-backend`
   - Add Event entity, repository, controller
   - Update OpenAPI spec
   - Run: `npm run update:openapi` (from root)

2. **Generate Mobile SDK**
   - After backend OpenAPI is updated
   - Run: `cd poetry-mobile && npm run sdk:generate`

3. **Backend CORS**
   - Add mobile origins to `application.properties`:
     ```
     app.cors-allowed-origins=http://localhost:5173,http://localhost:8081,exp://localhost:8081
     ```

### Next (Phase 3-5)

4. **Authentication Feature**
   - Create `src/features/auth/`
   - Model, API, hooks, screens
   - Login/Register forms

5. **Events Feature**
   - Create `src/features/events/`
   - Model, API, hooks, components, screens
   - Event creation, nearby events query

6. **Navigation Setup**
   - Create `app/(auth)/` routes
   - Create `app/(tabs)/` routes
   - Root layout with providers

### Later (Phase 6-9)

7. **Mapbox Integration**
   - Map screen with markers
   - Geolocation hook
   - Event markers on map

8. **Localization**
   - Add feature-specific i18n
   - Register in catalog

9. **Testing**
   - Jest config
   - Unit tests for hooks, API

## Environment Setup

Before running the app:

1. Copy `.env.example` to `.env.local`
2. Get Mapbox token from https://account.mapbox.com/
3. Update `.env.local` with your token
4. Ensure backend is running on `http://localhost:8080`

## Running the App

```bash
# Start development server
npm run dev

# Or specific platforms
npm run android
npm run ios
npm run web
```

## Important Notes

- **JWT Storage**: Using Expo SecureStore (NOT AsyncStorage)
- **API Calls**: Always use generated SDK or apiClient (NEVER raw fetch)
- **File Limits**: 80 lines/file, 80 chars/line
- **i18n**: No hardcoded strings, use translation keys
- **Design Tokens**: Will consume from `/api/v1/tokens`

## References

- Startup Guide: `.github/prompts/MobileStartUp.prompt.md`
- Architecture: `docs/architecture/mobile-module-blueprint.json`
- Instructions: `.github/instructions/mobile.instructions.md`
- Chat Mode: `.github/chatmodes/mobile.chatmode.md`
