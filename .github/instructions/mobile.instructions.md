---
applyTo: 'poetry-mobile/**'
---

## Mobile-Specific Rules

- React Native with Expo framework
- File-based routing with Expo Router
- TypeScript strict mode enabled
- Production-ready code only (no TODO, FIXME, or commented-out code)
- Follow DDD, SOLID, Clean Architecture patterns (mirror backend structure)
- Descriptive naming (e.g. `response` vs `r`)
- English for code, comments, and vars
- ESLint + Prettier (strict enforcement)
- File header required: name, 3+ sentence purpose, rights legend
- Module docs in /docs/domains/, API contracts in /docs/api/

## Platform Targets

- Android (native)
- iOS (native)
- Web (PWA via Expo Web)

## Authentication & Security

- JWT tokens stored in Expo SecureStore (NEVER AsyncStorage or localStorage)
- Token refresh handled by Axios interceptors
- Session state via `useSession()` hook
- Protected routes enforce authentication
- All API calls include Bearer token via interceptor

## API Integration

- **PRIMARY**: Use generated SDK from OpenAPI at `docs/api/backend-generated/v1/openapi.yaml`
- **FALLBACK**: Use `shared/http/apiClient.ts` (Axios with interceptors)
- **FORBIDDEN**: Never use raw fetch() or axios in feature code
- All API responses validated with Zod at runtime
- SDK regeneration: `npm run sdk:generate` (to be created)

## Mapbox Integration

- Use @rnmapbox/maps for all mapping functionality
- Access token from environment: `EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN`
- Geocoding and search via Mapbox Geocoding API
- Cost management: Implement request caching and debouncing
- Map styles: Use Mapbox default styles (configurable via theme)

## File Limits & Structure

- Max 80 lines per file (split if exceeded)
- Max 80 characters per line
- Exceptions: JSON files, generated SDK
- Feature modules follow blueprint: model/api/hooks/components/screens/locales
- Shared utilities in `src/shared/`

## i18n (Internationalization)

- No hardcoded UI text anywhere
- Use i18n keys: `t('events.create.title')`
- Supported locales: en, es
- Each feature has `locales/en.json` and `locales/es.json`
- Register feature locales in `shared/i18n/catalog/{en,es}/index.ts`

## Styling & Theming

- Use React Native StyleSheet API
- Consume design tokens from backend `/api/v1/tokens`
- No hardcoded colors, fonts, sizes, or spacing
- Theme context: `useTheme()` hook provides tokens
- Responsive design: Handle different screen sizes (phone, tablet)

## State Management

- TanStack Query for server state (queries, mutations)
- React Context for global UI state (theme, locale)
- Local state with useState/useReducer for component state
- No Redux or MobX (keep it simple)

## Navigation

- Expo Router file-based routing
- Screen files in `app/` directory
- Tab navigation: `app/(tabs)/`
- Auth flow: `app/(auth)/`
- Protected routes: Check session in _layout.tsx

## Testing

- Unit tests: Jest + React Native Testing Library
- Test location: `poetry-mobile/src/tests/<feature>/`
- Test hooks, API wrappers, components
- No E2E tests initially (add Detox/Maestro later)
- Mock generated SDK in tests
- Use data-testid for component queries

## Environment Configuration

- Use `expo-constants` and Expo environment variables
- Prefix public vars: `EXPO_PUBLIC_API_BASE_URL`
- Never commit secrets (Mapbox token in .env.local, gitignored)
- Validate env schema with Zod at app startup
- Development: `http://localhost:8080/api/v1`

## Error Handling

- All errors explicitly handled or resolved
- Never suppress, hide, or ignore errors
- Use i18n keys for error messages
- Toast notifications for user-facing errors
- Sentry integration for production error tracking (future)

## Performance

- Lazy load screens where possible
- Optimize images (use expo-image)
- Implement pagination for lists
- Debounce map searches and geocoding
- Cache map tiles and API responses
- FlatList for long scrollable lists (virtualization)

## Accessibility

- Support screen readers (accessibilityLabel, accessibilityHint)
- Touch targets minimum 44x44 points
- Sufficient color contrast (WCAG 2.1 AA)
- Keyboard navigation support (for web platform)

## Pre-Commit Checks (Mobile)

1. File Headers: name, 3+ sentence purpose, rights legend
2. Line/Char Limits: 80 lines/file, 80 chars/line
3. i18n Strings: No hardcoded UI text
4. Formatting: Prettier + ESLint
5. Linting: ESLint --max-warnings=0
6. Typecheck: TypeScript compilation

## Pre-Push Checks (Mobile)

1. Typecheck: `npm run typecheck` (no errors)
2. Tests: `npm run test` (all pass)
3. Lint: `npm run lint` (--max-warnings=0)
4. Build: `npx expo export` (success)

## Commit Format

Same as global: Use one `-m` flag with plain ASCII: `type: subject`

- Examples: `feat: add event map view`, `fix: resolve geolocation error`
- Forbidden chars: `;, |, &, $, <, >, (, ), \, :` LF CR \n \r backticks
- Keep messages short, descriptive, English only
- Execute one command at a time

## Architecture References

- Mobile blueprint: `docs/architecture/mobile-module-blueprint.json`
- Backend blueprint: `docs/architecture/backend-module-blueprint.md`
- Frontend blueprint: `docs/architecture/frontend-module-blueprint.md`
- Mobile chatmode: `.github/chatmodes/mobile.chatmode.md`
- Backend API: `docs/api/backend-generated/v1/openapi.yaml`

## Dependencies

- Keep dependencies minimal and justified
- Prefer Expo-compatible libraries
- Document why each dependency is needed
- Update regularly for security patches
- Avoid native modules unless necessary (keep Expo managed workflow)

## Platform-Specific Code

- Use Platform.select() for platform differences
- Minimize platform-specific code
- Test on all platforms (Android, iOS, Web)
- Web platform: Progressive Web App (PWA) capabilities

## Geolocation

- Request permissions explicitly
- Handle permission denial gracefully
- Use expo-location for device location
- Cache last known location
- Implement location accuracy settings

## Offline Support (Future)

- Currently requires internet connection
- Plan for offline-first architecture later
- Cache critical data with AsyncStorage
- Queue mutations when offline
- Sync when back online
