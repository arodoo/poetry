# Dev History - Poetry Mobile

**2025-10-11** - Phase 2 Complete ✅

## Phase 2: Backend Events Domain

### Backend Implementation
**Domain Layer** (`poetry-backend/src/main/java/.../domain/events/model/`):
- `Event.java` - Immutable record aggregate (id, userId, title, description, locationName, lat/lon, eventDate, status, imageUrl, timestamps, version)
- `EventStatus.java` - Enum (DRAFT, PUBLISHED, CANCELLED)
- `EventValidator.java` - Validation rules (title max 200, desc max 2000, coordinates range)
- `EventFactory.java` - Creates Event with DRAFT status
- `EventRehydrator.java` - Reconstructs Event from persistence

**Application Layer** (`poetry-backend/src/main/java/.../application/events/`):
- Ports: `EventsQueryPort.java`, `EventsCommandPort.java`
- Use Cases: Create, GetById, GetAll, GetNearby, Update, Delete (6 use cases)

**Infrastructure Layer** (`poetry-backend/src/main/java/.../infrastructure/jpa/events/`):
- `EventEntity.java` - JPA entity with Hibernate annotations, indexes (lat/lon, date, userId)
- `EventJpaRepository.java` - Spring Data JPA with Haversine formula for geospatial queries
- `EventJpaMapper.java` - Entity ↔ Domain conversion
- `EventJpaAdapter.java` - Implements QueryPort + CommandPort

**Interface Layer** (`poetry-backend/src/main/java/.../interfaces/v1/events/`):
- `EventDtos.java` - Request/response DTOs with OpenAPI annotations
- 7 Controllers (split by operation): Create, Get, List, PagedList, Nearby, Update, Delete

**Configuration**:
- `EventsComposition.java` - Wires use cases with ports
- CORS updated: `http://localhost:8081`, `exp://localhost:8081`

### Mobile SDK Generation
- OpenAPI spec regenerated with Events endpoints
- TypeScript SDK generated with `@hey-api/client-axios` plugin
- Functions: `createEvent`, `getEvent`, `updateEvent`, `deleteEvent`, `getNearbyEvents`, `listEvents`, `listEventsPaged`
- Fixed: Updated generate-sdk.sh to use correct plugin name

### Database Schema
- Table `events` created by Hibernate with:
  - Indexes: latitude+longitude (geospatial), event_date, user_id
  - Soft delete support (deletedAt)
  - Optimistic locking (@Version)

## Next
Phase 3: Mobile Events Feature (model/api/hooks/components)

---

**2025-10-11** - Phase 1 Complete ✅

## Setup
- Expo app created (blank-typescript)
- Deps: expo-router, secure-store, react-query, axios, zod, mapbox, location, i18n
- Config: tsconfig (strict, path aliases), app.json (plugins, permissions)

## Infrastructure Created
- `shared/config/env.ts` - Zod env validation
- `shared/auth/tokenStorage.ts` - SecureStore JWT
- `shared/http/apiClient.ts` - Axios + JWT interceptors
- `shared/query/queryClient.ts` - React Query config
- `shared/mapbox/MapboxConfig.ts` - Mapbox init
- `shared/i18n/` - i18next setup (en/es)
- `scripts/generate-sdk.sh` - OpenAPI SDK gen

## Files
- `.env.example` - Env template
- `README.md` - Docs
- `SETUP_STATUS.md` - Checklist
- TypeCheck: ✅ passes
