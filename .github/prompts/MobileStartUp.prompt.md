# Poetry Mobile App - Startup Documentation

**Created:** 2025-10-10  
**Purpose:** Comprehensive reference for initializing and developing the Poetry mobile application using React Native with Expo framework.

---

## Application Overview

### Core Concept

A mobile-first, location-aware social application where users can both publish local events and discover events happening around them.

### Key Features

1. **Event Publishing**: Users can create and post details about an event (name, date, location, description).

2. **Local Discovery**: The main screen will feature a map or list view displaying events near the user's current geographical location.

### Technology Stack

**Frontend Framework**: The application will be developed using React Native with the Expo framework. This allows for a single JavaScript/React codebase to build a true native app for both Android and iOS, as well as a progressive web app (PWA).

**Mapping & Geolocation**: To manage costs, the app will use Mapbox for all mapping, geocoding, and search functionalities. This provides a robust, scalable solution with a generous free tier that supports commercial use from day one.

---

## Project Structure

### Repository Layout

```
poetry/
├── poetry-backend/          (Existing - Java Spring Boot API)
├── poetry-frontend/         (Existing - React web back office)
├── poetry-mobile/           (NEW - React Native + Expo)
│   ├── app/                 (Expo Router screens)
│   │   ├── (auth)/
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   ├── (tabs)/
│   │   │   ├── index.tsx    (Map/Event Discovery)
│   │   │   ├── create.tsx   (Create Event)
│   │   │   ├── profile.tsx  (User Profile)
│   │   │   └── _layout.tsx
│   │   └── _layout.tsx      (Root layout)
│   ├── src/
│   │   ├── features/
│   │   │   ├── events/
│   │   │   │   ├── model/
│   │   │   │   ├── api/
│   │   │   │   ├── hooks/
│   │   │   │   ├── components/
│   │   │   │   ├── screens/
│   │   │   │   ├── locales/
│   │   │   │   └── index.ts
│   │   │   ├── auth/
│   │   │   └── profile/
│   │   ├── shared/
│   │   │   ├── auth/
│   │   │   ├── http/
│   │   │   ├── i18n/
│   │   │   ├── theme/
│   │   │   ├── mapbox/
│   │   │   ├── components/
│   │   │   └── query/
│   │   ├── api/
│   │   │   └── generated/
│   │   └── tests/
│   ├── app.json
│   ├── package.json
│   └── tsconfig.json
├── docs/
│   └── architecture/
│       └── mobile-module-blueprint.json
└── .github/
    ├── instructions/
    │   └── mobile.instructions.md
    └── chatmodes/
        └── mobile.chatmode.md
```

---

## Architecture Principles

### DDD & Clean Architecture

Following the same patterns as backend and web frontend:

- **Domain Layer**: Pure business models (events, locations)
- **Application Layer**: Use cases and ports (mirrored as React Query hooks)
- **Infrastructure Layer**: API clients, storage, Mapbox integration
- **Interface Layer**: React Native screens and components

### Layer Responsibilities

| Layer | Location | Responsibility |
|-------|----------|---------------|
| Model | `features/<feature>/model/` | Zod schemas, types (match OpenAPI) |
| API | `features/<feature>/api/` | SDK wrappers, API calls |
| Hooks | `features/<feature>/hooks/` | React Query queries/mutations |
| Components | `features/<feature>/components/` | Presentational UI (no logic) |
| Screens | `features/<feature>/screens/` | Route-level orchestration |
| Locales | `features/<feature>/locales/` | i18n translations |

---

## Phase 1: Project Initialization

### 1.1 Create Expo Project

```bash
cd d:\zProyectos\01Java\poetry
npx create-expo-app@latest poetry-mobile --template blank-typescript
cd poetry-mobile
```

### 1.2 Install Core Dependencies

```bash
# Navigation & Routing
npx expo install expo-router react-native-safe-area-context react-native-screens

# Authentication & Storage
npx expo install expo-secure-store @react-native-async-storage/async-storage

# Data Fetching & Validation
npm install @tanstack/react-query axios zod

# Mapbox
npm install @rnmapbox/maps

# UI & Animations
npx expo install react-native-reanimated react-native-gesture-handler

# Geolocation
npx expo install expo-location

# Media (for event images)
npx expo install expo-image-picker expo-camera expo-media-library expo-image

# i18n
npm install i18next react-i18next
```

### 1.3 Install Dev Dependencies

```bash
npm install --save-dev \
  typescript \
  @types/react \
  @types/react-native \
  eslint \
  prettier \
  @testing-library/react-native \
  jest
```

### 1.4 Configure TypeScript

Create `tsconfig.json`:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "jsx": "react-native",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"],
  "exclude": ["node_modules"]
}
```

### 1.5 Configure app.json

```json
{
  "expo": {
    "name": "Poetry Events",
    "slug": "poetry-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "plugins": [
      "expo-router",
      [
        "@rnmapbox/maps",
        {
          "RNMapboxMapsDownloadToken": "PLACE_YOUR_MAPBOX_DOWNLOAD_TOKEN_HERE"
        }
      ]
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.poetry.mobile",
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "We need your location to show nearby events",
        "NSCameraUsageDescription": "We need camera access to add photos to your events",
        "NSPhotoLibraryUsageDescription": "We need photo library access to add photos to your events"
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.poetry.mobile",
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    }
  }
}
```

---

## Phase 2: Backend API Extensions

### 2.1 Create Events Domain (Backend)

Following DDD blueprint in `poetry-backend/`:

```
src/main/java/com/poetry/poetry_backend/
├── domain/events/
│   └── model/
│       ├── Event.java
│       ├── Location.java
│       └── EventStatus.java
├── application/events/
│   ├── port/
│   │   ├── EventsQueryPort.java
│   │   └── EventsCommandPort.java
│   └── usecase/
│       ├── CreateEventUseCase.java
│       ├── GetNearbyEventsUseCase.java
│       ├── GetEventByIdUseCase.java
│       └── UpdateEventUseCase.java
├── infrastructure/jpa/events/
│   ├── EventEntity.java
│   ├── EventRepository.java
│   ├── EventMapper.java
│   └── JpaEventsAdapter.java
└── interfaces/v1/events/
    ├── EventsController.java
    └── EventsDtos.java
```

### 2.2 Event Domain Model

**Event Aggregate**:

- `id`: Long (unique identifier)
- `userId`: Long (creator reference)
- `title`: String (max 200 chars)
- `description`: String (max 2000 chars)
- `locationName`: String (e.g., "Central Park")
- `latitude`: Double
- `longitude`: Double
- `eventDate`: LocalDateTime
- `createdAt`: LocalDateTime
- `updatedAt`: LocalDateTime
- `status`: Enum (DRAFT, PUBLISHED, CANCELLED)
- `imageUrl`: String (optional, media URL)

### 2.3 API Endpoints

Add to `EventsController.java`:

```java
@RestController
@RequestMapping("/api/v1/events")
@Tag(name = "events", description = "Event management")
public class EventsController {
  
  @PostMapping
  @Operation(summary = "Create new event")
  ResponseEntity<EventResponse> createEvent(@Valid @RequestBody CreateEventRequest request);
  
  @GetMapping("/nearby")
  @Operation(summary = "Get events near location")
  ResponseEntity<List<EventResponse>> getNearbyEvents(
    @RequestParam Double lat,
    @RequestParam Double lon,
    @RequestParam(defaultValue = "5000") Integer radiusMeters
  );
  
  @GetMapping("/{id}")
  @Operation(summary = "Get event by ID")
  ResponseEntity<EventResponse> getEventById(@PathVariable Long id);
  
  @PutMapping("/{id}")
  @Operation(summary = "Update event")
  ResponseEntity<EventResponse> updateEvent(
    @PathVariable Long id,
    @Valid @RequestBody UpdateEventRequest request
  );
  
  @DeleteMapping("/{id}")
  @Operation(summary = "Delete event (soft delete)")
  ResponseEntity<Void> deleteEvent(@PathVariable Long id);
}
```

### 2.4 Database Schema

```sql
CREATE TABLE events (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  location_name VARCHAR(255),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  event_date TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'PUBLISHED',
  image_url VARCHAR(500),
  version INT DEFAULT 0
);

CREATE INDEX idx_events_location ON events (latitude, longitude);
CREATE INDEX idx_events_date ON events (event_date);
CREATE INDEX idx_events_user ON events (user_id);
```

### 2.5 Update OpenAPI Spec

```bash
# Start backend
cd poetry-backend
./mvnw spring-boot:run

# In another terminal
cd poetry
npm run update:openapi
```

### 2.6 Backend CORS Configuration

Update `application.properties`:

```properties
app.cors-allowed-origins=http://localhost:5173,http://localhost:8081,exp://localhost:8081
```

---

## Phase 3: Mobile SDK Generation

### 3.1 Create SDK Generation Script

Create `poetry-mobile/scripts/generate-sdk.sh`:

```bash
#!/bin/bash
npx @hey-api/openapi-ts \
  -i ../docs/api/backend-generated/v1/openapi.yaml \
  -o src/api/generated \
  -c axios
```

### 3.2 Add to package.json

```json
{
  "scripts": {
    "sdk:generate": "bash scripts/generate-sdk.sh",
    "dev": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "test": "jest",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  }
}
```

### 3.3 Generate SDK

```bash
cd poetry-mobile
npm run sdk:generate
```

---

## Phase 4: Core Infrastructure

### 4.1 Environment Configuration

Create `src/shared/config/env.ts`:

```typescript
import { z } from 'zod'
import Constants from 'expo-constants'

const envSchema = z.object({
  apiBaseUrl: z.string().url(),
  mapboxAccessToken: z.string().min(1),
})

export type Env = z.infer<typeof envSchema>

export function getEnv(): Env {
  const raw = {
    apiBaseUrl: Constants.expoConfig?.extra?.apiBaseUrl ?? 
                'http://localhost:8080/api/v1',
    mapboxAccessToken: Constants.expoConfig?.extra?.mapboxAccessToken ?? '',
  }
  
  return envSchema.parse(raw)
}
```

Update `app.json`:

```json
{
  "expo": {
    "extra": {
      "apiBaseUrl": "http://localhost:8080/api/v1",
      "mapboxAccessToken": "YOUR_MAPBOX_TOKEN_HERE"
    }
  }
}
```

### 4.2 Secure Token Storage

Create `src/shared/auth/tokenStorage.ts`:

```typescript
import * as SecureStore from 'expo-secure-store'

const TOKEN_KEY = 'poetry.auth.tokens'

export interface TokenBundle {
  accessToken: string
  refreshToken: string
}

export const tokenStorage = {
  async save(tokens: TokenBundle): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(tokens))
  },
  
  async load(): Promise<TokenBundle | null> {
    const raw = await SecureStore.getItemAsync(TOKEN_KEY)
    return raw ? JSON.parse(raw) : null
  },
  
  async clear(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY)
  },
}
```

### 4.3 Axios API Client

Create `src/shared/http/apiClient.ts`:

```typescript
import axios, { AxiosInstance, AxiosError } from 'axios'
import { tokenStorage } from '../auth/tokenStorage'
import { getEnv } from '../config/env'

const env = getEnv()

export const apiClient: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(async (config) => {
  const tokens = await tokenStorage.load()
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const tokens = await tokenStorage.load()
      if (tokens?.refreshToken) {
        // TODO: Implement token refresh
        // Call /api/v1/auth/refresh
        // On success, retry original request
      } else {
        await tokenStorage.clear()
      }
    }
    return Promise.reject(error)
  }
)
```

### 4.4 React Query Setup

Create `src/shared/query/queryClient.ts`:

```typescript
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      gcTime: 1000 * 60 * 5,
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})
```

### 4.5 Mapbox Configuration

Create `src/shared/mapbox/MapboxConfig.ts`:

```typescript
import Mapbox from '@rnmapbox/maps'
import { getEnv } from '../config/env'

const env = getEnv()

export function initializeMapbox(): void {
  Mapbox.setAccessToken(env.mapboxAccessToken)
}
```

---

## Phase 5: Authentication Feature

### 5.1 Auth Model

Create `src/features/auth/model/AuthSchemas.ts`:

```typescript
import { z } from 'zod'

export const LoginRequestSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
})

export const TokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  username: z.string(),
})

export type LoginRequest = z.infer<typeof LoginRequestSchema>
export type TokenResponse = z.infer<typeof TokenResponseSchema>
```

### 5.2 Auth API

Create `src/features/auth/api/authApi.ts`:

```typescript
import { login as loginSDK } from '../../../api/generated'
import { apiClient } from '../../../shared/http/apiClient'
import { TokenResponseSchema, type LoginRequest, type TokenResponse } from '../model/AuthSchemas'

export async function postLogin(data: LoginRequest): Promise<TokenResponse> {
  const response = await loginSDK({ body: data })
  return TokenResponseSchema.parse(response.data)
}
```

### 5.3 Auth Hooks

Create `src/features/auth/hooks/useAuthMutations.ts`:

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postLogin } from '../api/authApi'
import { tokenStorage } from '../../../shared/auth/tokenStorage'
import type { LoginRequest, TokenResponse } from '../model/AuthSchemas'

export function useLogin() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: LoginRequest) => postLogin(data),
    onSuccess: async (tokens: TokenResponse) => {
      await tokenStorage.save({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      })
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
    },
  })
}
```

### 5.4 Session Hook

Create `src/shared/auth/useSession.ts`:

```typescript
import { useEffect, useState } from 'react'
import { tokenStorage, type TokenBundle } from './tokenStorage'

export interface SessionState {
  isAuthenticated: boolean
  isLoading: boolean
  tokens: TokenBundle | null
}

export function useSession(): SessionState {
  const [state, setState] = useState<SessionState>({
    isAuthenticated: false,
    isLoading: true,
    tokens: null,
  })
  
  useEffect(() => {
    tokenStorage.load().then((tokens) => {
      setState({
        isAuthenticated: !!tokens,
        isLoading: false,
        tokens,
      })
    })
  }, [])
  
  return state
}
```

---

## Phase 6: Events Feature

### 6.1 Events Model

Create `src/features/events/model/EventsSchemas.ts`:

```typescript
import { z } from 'zod'

export const LocationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  name: z.string().optional(),
})

export const EventSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  description: z.string(),
  locationName: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  eventDate: z.string(),
  createdAt: z.string(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'CANCELLED']),
  imageUrl: z.string().optional(),
})

export const CreateEventSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(2000),
  locationName: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  eventDate: z.string(),
  imageUrl: z.string().optional(),
})

export type Event = z.infer<typeof EventSchema>
export type CreateEventRequest = z.infer<typeof CreateEventSchema>
export type Location = z.infer<typeof LocationSchema>
```

### 6.2 Events API

Create `src/features/events/api/eventsApi.ts`:

```typescript
import { apiClient } from '../../../shared/http/apiClient'
import { EventSchema, type Event, type CreateEventRequest } from '../model/EventsSchemas'

export async function fetchNearbyEvents(
  lat: number,
  lon: number,
  radiusMeters: number = 5000
): Promise<Event[]> {
  const response = await apiClient.get('/events/nearby', {
    params: { lat, lon, radiusMeters },
  })
  return z.array(EventSchema).parse(response.data)
}

export async function createEvent(data: CreateEventRequest): Promise<Event> {
  const response = await apiClient.post('/events', data)
  return EventSchema.parse(response.data)
}

export async function fetchEventById(id: number): Promise<Event> {
  const response = await apiClient.get(`/events/${id}`)
  return EventSchema.parse(response.data)
}
```

### 6.3 Events Hooks

Create `src/features/events/hooks/useEventsQueries.ts`:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchNearbyEvents, createEvent, fetchEventById } from '../api/eventsApi'
import type { Event, CreateEventRequest } from '../model/EventsSchemas'

export const eventsQueryKeys = {
  all: ['events'] as const,
  nearby: (lat: number, lon: number, radius: number) => 
    ['events', 'nearby', lat, lon, radius] as const,
  detail: (id: number) => ['events', 'detail', id] as const,
}

export function useNearbyEvents(lat: number, lon: number, radius: number = 5000) {
  return useQuery({
    queryKey: eventsQueryKeys.nearby(lat, lon, radius),
    queryFn: () => fetchNearbyEvents(lat, lon, radius),
    enabled: !!lat && !!lon,
  })
}

export function useCreateEvent() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateEventRequest) => createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventsQueryKeys.all })
    },
  })
}

export function useEventDetail(id: number) {
  return useQuery({
    queryKey: eventsQueryKeys.detail(id),
    queryFn: () => fetchEventById(id),
    enabled: !!id,
  })
}
```

---

## Phase 7: Mapbox Integration

### 7.1 Map Screen

Create `app/(tabs)/index.tsx`:

```typescript
import { View, StyleSheet } from 'react-native'
import MapboxGL from '@rnmapbox/maps'
import { useLocation } from '../../src/features/events/hooks/useLocation'
import { useNearbyEvents } from '../../src/features/events/hooks/useEventsQueries'

export default function MapScreen() {
  const { location, isLoading } = useLocation()
  const { data: events } = useNearbyEvents(
    location?.latitude ?? 0,
    location?.longitude ?? 0
  )
  
  if (isLoading) return <View><Text>Loading...</Text></View>
  
  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          centerCoordinate={[location?.longitude ?? 0, location?.latitude ?? 0]}
          zoomLevel={13}
        />
        
        {events?.map((event) => (
          <MapboxGL.MarkerView
            key={event.id}
            coordinate={[event.longitude, event.latitude]}
          >
            <View style={styles.marker}>
              <Text>{event.title}</Text>
            </View>
          </MapboxGL.MarkerView>
        ))}
      </MapboxGL.MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  marker: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
  },
})
```

### 7.2 Geolocation Hook

Create `src/features/events/hooks/useLocation.ts`:

```typescript
import { useState, useEffect } from 'react'
import * as Location from 'expo-location'

export function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setIsLoading(false)
        return
      }
      
      const loc = await Location.getCurrentPositionAsync({})
      setLocation(loc)
      setIsLoading(false)
    })()
  }, [])
  
  return { location, isLoading }
}
```

---

## Phase 8: i18n Setup

### 8.1 i18n Configuration

Create `src/shared/i18n/index.ts`:

```typescript
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './catalog/en'
import es from './catalog/es'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
```

### 8.2 Feature Locales

Create `src/features/events/locales/en.json`:

```json
{
  "events": {
    "map": {
      "title": "Nearby Events"
    },
    "create": {
      "title": "Create Event",
      "titleLabel": "Event Title",
      "descriptionLabel": "Description",
      "locationLabel": "Location",
      "dateLabel": "Event Date",
      "submitButton": "Create Event"
    },
    "detail": {
      "title": "Event Details"
    }
  }
}
```

---

## Phase 9: Testing Setup

### 9.1 Jest Configuration

Create `jest.config.js`:

```javascript
module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
}
```

### 9.2 Test Example

Create `src/tests/features/events/useEventsQueries.test.ts`:

```typescript
import { renderHook, waitFor } from '@testing-library/react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useNearbyEvents } from '../../../features/events/hooks/useEventsQueries'

describe('useNearbyEvents', () => {
  it('fetches nearby events', async () => {
    const queryClient = new QueryClient()
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    
    const { result } = renderHook(
      () => useNearbyEvents(40.7128, -74.0060),
      { wrapper }
    )
    
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(Array.isArray(result.current.data)).toBe(true)
  })
})
```

---

## Development Workflow

### Daily Development

```bash
# Terminal 1: Backend
cd poetry-backend
./mvnw spring-boot:run

# Terminal 2: Mobile
cd poetry-mobile
npm run dev
# Then press 'a' for Android, 'i' for iOS, 'w' for Web
```

### After Backend Changes

```bash
# Regenerate OpenAPI spec
cd poetry
npm run update:openapi

# Regenerate mobile SDK
cd poetry-mobile
npm run sdk:generate
```

### Pre-Commit

```bash
npm run lint
npm run typecheck
npm run test
```

---

## Environment Variables

Create `.env.local` (gitignored):

```
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.eyJ1...your-token-here
```

---

## Next Steps

1. Initialize Expo project
2. Set up backend Events domain
3. Generate OpenAPI spec
4. Generate mobile SDK
5. Implement authentication
6. Implement event creation
7. Implement map view
8. Add localization
9. Write tests
10. Deploy to Expo Go for testing

---

## References

- Architecture blueprint: `docs/architecture/mobile-module-blueprint.json`
- Instructions: `.github/instructions/mobile.instructions.md`
- Chat mode: `.github/chatmodes/mobile.chatmode.md`
- Backend blueprint: `docs/architecture/backend-module-blueprint.md`
- Frontend blueprint: `docs/architecture/frontend-module-blueprint.md`
- OpenAPI spec: `docs/api/backend-generated/v1/openapi.yaml`

---

**End of Mobile Startup Documentation**
