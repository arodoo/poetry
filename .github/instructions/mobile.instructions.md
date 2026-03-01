---
applyTo: 'poetry-mobile/**'
---

Logs in real time with hot reload at `logs/mobile/mobile-dev.log`

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

- **PRIMARY**: Use generated SDK 
- **FALLBACK**: Use `shared/http/apiClient.ts` (Axios with interceptors)
- **FORBIDDEN**: Never use raw fetch() or axios in feature code
- All API responses validated with Zod at runtime
- SDK regeneration: `npm run sdk:generate` (to be created)


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
- Mock generated SDK in tests

## Environment Configuration

- Use `expo-constants` and Expo environment variables
- Prefix public vars: `EXPO_PUBLIC_API_BASE_URL`
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
- FlatList for long scrollable lists (virtualization)

## Accessibility

- Support screen readers (accessibilityLabel, accessibilityHint)
- Touch targets minimum 44x44 points
- Sufficient color contrast (WCAG 2.1 AA)
- Keyboard navigation support (for web platform)

## Architecture References

- Mobile blueprint: `docs/architecture/mobile-module-blueprint.json`

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

