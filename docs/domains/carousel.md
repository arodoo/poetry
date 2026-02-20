# Carousel Domain

## Overview

Enterprise-grade TV/display carousel for the `/dashboard` route. Renders a fullscreen-capable,
auto-advancing slideshow of images and videos designed to run unattended on venue screens. An
optional static overlay image (bottom-right corner) can be configured for branding or
informational purposes. Admins manage all content through an in-page drawer without any
developer intervention.

---

## Entities

| Entity | Description |
|---|---|
| `CarouselSlide` | A single media item (image or video) with sort order and metadata |
| `CarouselConfig` | Aggregate root — owns the slide list, advance interval, and overlay reference |

### CarouselSlide fields

| Field | Type | Notes |
|---|---|---|
| `id` | `Long` | Auto-generated PK |
| `type` | `SlideType` | `IMAGE` \| `VIDEO` |
| `filename` | `String` | UUID-based name on disk |
| `originalName` | `String` | Original upload filename |
| `sortOrder` | `int` | Zero-based display index |
| `createdAt` | `Instant` | Upload timestamp |

### CarouselConfig fields

| Field | Type | Notes |
|---|---|---|
| `intervalMs` | `int` | Auto-advance interval in milliseconds (default 5 000) |
| `overlayFilename` | `String \| null` | Optional overlay image filename |
| `slides` | `List<CarouselSlide>` | Ordered slide list |

---

## Business Rules

- Public viewers (unauthenticated) can read the carousel config and stream media files.
- Only users with the `admin` role can upload, delete, reorder slides or change settings.
- Slides are ordered by `sortOrder`; reorder operations update all affected records atomically.
- Accepted media types: `image/*` and `video/*`; max upload size 200 MB per file.
- The interval must be a positive integer (milliseconds); minimum enforced value is 1 000 ms.
- Only one overlay image exists at a time; uploading a new one replaces the previous file.
- Deleting the last slide is allowed; the UI shows an empty-state message in that case.
- On TV/kiosk screens the carousel polls the config every 30 seconds for live updates.

---

## Use Cases

| ID | Name | Actor | Description |
|---|---|---|---|
| UC-CAR-01 | Get carousel config | Public / Any | Returns interval, overlay, and ordered slide list |
| UC-CAR-02 | Upload slide | Admin | Persists a media file and appends a new `CarouselSlide` |
| UC-CAR-03 | Delete slide | Admin | Removes a slide record and its file from disk |
| UC-CAR-04 | Reorder slides | Admin | Bulk-updates `sortOrder` for all slides |
| UC-CAR-05 | Update interval | Admin | Changes the auto-advance interval |
| UC-CAR-06 | Upload overlay | Admin | Replaces the static overlay image |
| UC-CAR-07 | Delete overlay | Admin | Removes the overlay and clears the reference |

---

## API Endpoints

All paths are under `/api/v1/carousel`.

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/config` | Public | UC-CAR-01 — full config snapshot |
| `POST` | `/slides` | `admin` | UC-CAR-02 — multipart file upload |
| `DELETE` | `/slides/{id}` | `admin` | UC-CAR-03 |
| `PUT` | `/slides/order` | `admin` | UC-CAR-04 — body: `[{id, sortOrder}]` |
| `PUT` | `/config/interval` | `admin` | UC-CAR-05 — body: `{intervalMs}` |
| `POST` | `/config/overlay` | `admin` | UC-CAR-06 — multipart file upload |
| `DELETE` | `/config/overlay` | `admin` | UC-CAR-07 |

Media files are served statically at `/api/v1/carousel/media/{filename}` (public, no auth).

---

## Data Model

```
carousel_config (singleton, id = 1)
  interval_ms        INTEGER  DEFAULT 5000
  overlay_filename   VARCHAR  NULLABLE

carousel_slide
  id              BIGSERIAL PK
  config_id       FK → carousel_config.id
  type            VARCHAR   ('IMAGE' | 'VIDEO')
  filename        VARCHAR   UNIQUE  -- UUID-based, stored on disk
  original_name   VARCHAR
  sort_order      INTEGER
  created_at      TIMESTAMPTZ DEFAULT now()
```

---

## Permissions

| Role | GET /config | Upload / Delete / Reorder | Update interval | Overlay management |
|---|---|---|---|---|
| Public (anonymous) | ✅ | ❌ | ❌ | ❌ |
| `user` | ✅ | ❌ | ❌ | ❌ |
| `manager` | ✅ | ❌ | ❌ | ❌ |
| `admin` | ✅ | ✅ | ✅ | ✅ |

> **Implementation note:** controllers use `@PreAuthorize("hasAuthority('admin')")`.
> Spring Security's `hasRole` is **not** used because JWT authorities are stored without the
> `ROLE_` prefix (they match `Role.key()` lowercase values: `"admin"`, `"manager"`, `"user"`).

---

## File Storage

Files are saved to the path configured via `carousel.upload-dir` (default:
`${user.home}/poetry-uploads/carousel`). The backend creates the directory on startup if it
does not exist. Filenames are `UUID + original extension` to avoid collisions.

```yaml
# application-dev.yml
carousel:
  upload-dir: ${user.home}/poetry-uploads/carousel

spring.servlet.multipart:
  max-file-size: 200MB
  max-request-size: 200MB
```

---

## Frontend Module

Location: `src/features/carousel/`

```
carousel/
├── model/
│   └── CarouselSchemas.ts        # Zod schemas + inferred TypeScript types
├── api/
│   ├── carouselQueries.ts        # Public GET config (no auth)
│   └── carouselMutations.ts      # Admin mutations (Bearer token)
├── hooks/
│   ├── useCarouselConfig.ts      # useQuery, refetchInterval: 30 000 ms
│   ├── useCarouselPlayer.ts      # Auto-advance index + nav controls
│   ├── useFullscreen.ts          # Native Fullscreen API wrapper
│   └── useCarouselMutations.ts   # 6 React Query mutations
├── components/
│   ├── display/                  # CarouselSlideView, CarouselControls,
│   │                             # CarouselOverlay, CarouselEmpty, FullscreenButton
│   └── admin/                    # AdminConfigButton, AdminConfigDrawer,
│                                 # SlideUploadZone, SlideListItem,
│                                 # IntervalControl, OverlayControl
├── pages/
│   └── CarouselPage.tsx          # Main page — AppShell + aspect-video viewport
└── routing/
    └── carouselRoutes.tsx        # Route definition, wrapped in <AppShell>
```

### Key UX behaviours

- **Normal mode**: carousel renders at `aspect-video` (16:9) inside the page container,
  alongside the standard navbar and sidebar.
- **Fullscreen mode**: clicking the fullscreen button calls the native Fullscreen API,
  expanding the carousel element to fill the entire screen; pressing Escape restores normal
  mode.
- **Admin button**: visible only to `admin`-role sessions (role check uses lowercase `'admin'`
  matching the JWT claim). Opens a side drawer for all management operations.
- **Live polling**: `useCarouselConfig` refetches every 30 seconds so changes made by an admin
  are reflected on unattended TV screens without a page reload.

---

## Backend Architecture (Hexagonal / DDD)

```
domain/
  carousel/
    CarouselSlide.java            # Value-carrying record
    CarouselConfig.java           # Aggregate root
    SlideType.java                # IMAGE | VIDEO enum
    port/
      CarouselQueryPort.java      # find current config
      CarouselCommandPort.java    # add, remove, reorder, interval, overlay ops
      FileStoragePort.java        # store / delete files

application/
  carousel/usecase/
    GetCarouselConfigUseCase.java
    AddSlideUseCase.java
    RemoveSlideUseCase.java
    ReorderSlidesUseCase.java
    UpdateIntervalUseCase.java
    UpdateOverlayUseCase.java
    RemoveOverlayUseCase.java

infrastructure/
  carousel/
    persistence/
      CarouselConfigJpaAdapter.java
      CarouselSlideJpaAdapter.java
      CarouselConfigEntity.java   # @Entity
      CarouselSlideEntity.java    # @Entity
    storage/
      LocalFileStorageAdapter.java  # FileStoragePort impl

interfaces/v1/carousel/
  CarouselGetConfigController.java     # GET  /config  (public)
  CarouselUploadSlideController.java   # POST /slides
  CarouselDeleteSlideController.java   # DELETE /slides/{id}
  CarouselReorderController.java       # PUT  /slides/order
  CarouselUpdateIntervalController.java# PUT  /config/interval
  CarouselOverlayUploadController.java # POST /config/overlay
  CarouselOverlayDeleteController.java # DELETE /config/overlay
  CarouselConfigResponse.java          # Response DTO (nested SlideResponse)

config/carousel/
  CarouselComposition.java    # Spring @Configuration — wires all use cases
  CarouselStorageConfig.java  # Declares LocalFileStorageAdapter bean
  CarouselResourceConfig.java # WebMvcConfigurer: serves /api/v1/carousel/media/**
```

---

## E2E Test Coverage

Tests live at `tests/e2e/carousel/carousel.spec.ts` (Playwright, **zero mocks**, real backend).

| # | Scenario |
|---|---|
| 1 | `GET /carousel/config` is public and returns a valid structure |
| 2 | Admin uploads an image via API — it appears in the config response |
| 3 | `/dashboard` renders the carousel viewport (`data-testid="carousel-root"`) |
| 4 | Logged-in admin sees the "Configurar carrusel" button on the page |
| 5 | Admin uploads a slide via API → opens drawer → sees slide → deletes from UI |
| 6 | Admin updates the interval → value persists in the backend |
| 7 | With multiple slides, navigation arrows are rendered |

---

## Dependencies

- Auth domain (JWT, role resolution)
- Spring Multipart (file upload configuration)
- React Query (client-side caching and mutations)
- Zod (runtime response validation)

---

## Status

- ✅ Implemented (backend + frontend + E2E tests passing)
