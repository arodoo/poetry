# Poetry Mobile

Location-aware social application for discovering and publishing local events.

## Tech Stack

- **Framework**: React Native with Expo
- **Routing**: Expo Router (file-based)
- **State Management**: TanStack Query
- **Mapping**: Mapbox
- **Validation**: Zod
- **i18n**: i18next + react-i18next
- **API**: Auto-generated SDK from OpenAPI spec

## Platform Targets

- Android (native)
- iOS (native)  
- Web (PWA)

## Prerequisites

- Node.js 18+
- Expo CLI
- Backend running at http://localhost:8080

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env.local
```

3. Add your Mapbox token to `.env.local`

4. Generate SDK from backend OpenAPI spec:
```bash
npm run sdk:generate
```

## Development

Start the development server:
```bash
npm run dev
```

Then:
- Press `a` for Android
- Press `i` for iOS
- Press `w` for Web

## Scripts

- `npm run dev` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npm run test` - Run tests
- `npm run lint` - Lint code
- `npm run typecheck` - Type check
- `npm run sdk:generate` - Generate API SDK

## Project Structure

```
src/
├── features/          # Feature modules (DDD)
│   ├── events/
│   │   ├── model/
│   │   ├── api/
│   │   ├── hooks/
│   │   ├── components/
│   │   ├── screens/
│   │   └── locales/
│   └── auth/
├── shared/            # Shared utilities
│   ├── auth/
│   ├── http/
│   ├── i18n/
│   ├── mapbox/
│   └── query/
└── api/
    └── generated/     # Auto-generated SDK
```

## Architecture

Follows DDD and Clean Architecture principles:
- **Model**: Zod schemas matching OpenAPI
- **API**: SDK wrappers
- **Hooks**: React Query queries/mutations
- **Components**: Presentational UI
- **Screens**: Route-level orchestration

## Authentication

JWT tokens stored securely in Expo SecureStore.
Uses same `/api/v1/auth/*` endpoints as web app.

## Design System

Consumes design tokens from backend `/api/v1/tokens`
to maintain consistent styling across platforms.

## File Limits

- Max 80 lines per file
- Max 80 characters per line
- Exceptions: JSON, generated SDK

## Documentation

See `.github/prompts/MobileStartUp.prompt.md` for full setup guide.
