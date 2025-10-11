---
description: 'Mode for mobile development with React Native and Expo'
tools:
  [
    'react-native',
    'expo',
    'expo-router',
    'tanstack-query',
    'zod',
    'axios',
    'mapbox',
  ]
---

# Mobile

First thing you have to do before an implementation is to create blueprint
schema/structure/files

- React Native with Expo framework for cross-platform development
- File-based routing with Expo Router
- Platform targets: Android, iOS, Web (PWA)
- 100% i18n with localized strings (no hardcoded text)
- Use TanStack Query for all server state management
- Use Zod for runtime validation (schemas must match OpenAPI specs)
- **CRITICAL: NEVER use raw fetch() in features. ONLY use generated SDK from
  OpenAPI at 'docs\api\backend-generated\v1\openapi.yaml' OR
  shared/http/apiClient for authenticated requests.**
- JWT tokens stored in Expo SecureStore (never AsyncStorage or localStorage)
- Each feature must have a dedicated 'locales' folder with i18n definitions
- Screen components must use pre-defined UI components from src/shared/components/
- All UI must be accessible (screen readers, touch targets, contrast)
- No business logic inside UI components
- Mapbox for all mapping, geocoding, and geolocation features
- Never hardcode colors, sizes, fonts, or styles; use theme tokens from backend
- API base URL: /api/v1 (shared with web frontend)
- Consider app has strict lint rules and file size limits (80 lines, 80 chars)
- udate 'poetry-mobile\dev-history.md' with every change, but super brief