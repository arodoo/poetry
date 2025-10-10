<!--
File: tokens.md
Purpose: Domain documentation for UI token management system.
Describes business rules, token bundle structure, and admin
customization capabilities. All Rights Reserved. Arodi Emmanuel
-->

# Domain: UI Tokens

## Overview

The UI Tokens system provides centralized configuration for design
tokens (themes, fonts, spacing, radius, shadows) that control the
visual appearance of the entire application. Administrators can
customize the global token selection, which is persisted server-side
and delivered to all clients via an optimized ETag-cached endpoint.

## Token Bundle Structure

The token bundle contains:

- **themes**: Array of available color themes (e.g., nord-dark, light)
- **fonts**: Array of font families (e.g., Inter, Roboto)
- **fontSizes**: Array of font scale sets (e.g., compact, comfortable)
- **spacings**: Array of spacing scale sets (e.g., tight, normal)
- **radius**: Array of border radius sets (e.g., sharp, rounded)
- **shadows**: Array of shadow depth sets (e.g., flat, subtle, elevated)
- **current**: Object with active selection for each category

## Business Rules

1. **Selection Persistence**: Admin changes are saved to database
2. **System-Wide Application**: Selection applies to all users
3. **Admin-Only Modification**: Only users with 'admin' role can update
4. **Validation**: All selection values must exist in bundle options
5. **Atomic Updates**: All six categories updated together
6. **No Partial Updates**: Full selection object required
7. **ETag Caching**: Bundle includes fingerprint for efficient caching

## API Endpoints

### GET /api/v1/tokens
- Public endpoint (no auth required)
- Returns full token bundle with ETag header
- Supports If-None-Match for 304 responses
- 1-hour stale time on frontend (server controls cache)

### PUT /api/v1/tokens/selection
- Admin-only endpoint (@PreAuthorize)
- Updates current selection atomically
- Request body: { theme, font, fontSize, spacing, radius, shadow }
- Returns 204 No Content on success
- Invalidates frontend queries

## Token Application

1. Frontend fetches bundle on app startup
2. CSS variables mapped from selected token values
3. Admin changes trigger mutation + query invalidation
4. All clients receive updated bundle on next fetch/reload
5. Local preview applies CSS without persisting

## Validation Rules

- theme: Required, non-blank, kebab-case pattern
- font: Required, non-blank
- fontSize: Required, non-blank
- spacing: Required, non-blank
- radius: Required, non-blank
- shadow: Required, non-blank

All values validated against available options in bundle.
