/\* File: ui-tokens.md

- Purpose: Domain documentation for UI Tokens and Theming contract (v1).
- All Rights Reserved. \*/

# UI Tokens Domain (v1)

## Scope

Provides a versioned, cache-aware bundle of UI customization primitives consumed
by the frontend UI library (Task 13.2). Includes themes, typography, spacing,
radius, shadows, font weights, and the current selection reference.

## Functional Requirements (RF)

- RF1: Expose `GET /api/v1/tokens` returning token groups and current selection.
- RF2: Ensure stable semantic theme keys (independent of persistence ids).
- RF3: Provide weak ETag for conditional GET caching.
- RF4: Include `fontWeights` group as numeric CSS weight values.
- RF5: Resolve `current` selection dynamically (active theme + first-value
  fallback for others).
- RF6: Fingerprint must change only when semantic token data changes.

## Non-Functional Requirements

- NFR1: Response under 50ms (cold path under 150ms acceptable initially).
- NFR2: Additive evolution only in `v1` (new groups/fields allowed; breaking
  changes → `v2`).
- NFR3: Deterministic ordering inside groups for stable hashing.

## Data Model (Conceptual)

- Theme: `{ key, label, colors{...} }`
- Font: `{ key, label, woff2Url, weights[], hash }`
- FontWeights: `["400","500","700"]`
- FontSizeSet / SpacingSet / RadiusSet / ShadowSet: `{ key, label, values{} }`
- Current: `{ theme, font, fontSize, spacing, radius, shadow }`

## API Reference

`GET /api/v1/tokens` Headers:

- Request: `If-None-Match: W"<hash>"` (optional)
- Response 200: `ETag: W"<hash>"`
- Response 304: No body, `ETag` preserved

Response Shape (JSON):

```
{
  "themes": [ { "key": "default", "label": "Default", "colors": {"bg":"#fff" ... } }, ... ],
  "fonts": [ { "key": "inter", "label": "Inter", "woff2Url": "/assets/fonts/inter.woff2", "weights": [400,500,700], "hash": "abc123" } ],
  "fontWeights": ["400","500","700"],
  "fontSizes": [ { "key": "base-scale", "label": "Base Scale", "sizes": {"xs":"0.75rem", ... } } ],
  "spacings": [ { "key": "base", "label": "Base Spacing", "values": {"1":"4px", ... } } ],
  "radius": [ { "key": "rounded", "label": "Rounded", "values": {"sm":"2px", ... } } ],
  "shadows": [ { "key": "elevation", "label": "Elevation", "values": {"sm":"...", ... } } ],
  "current": { "theme": "default", "font": "inter", "fontSize": "base-scale", "spacing": "base", "radius": "rounded", "shadow": "elevation" }
}
```

`PUT /api/v1/tokens/selection`

- Purpose: Update system-level (global) UI customization selection.
- Request Body:

```
{
  "theme": "default",
  "font": "inter",
  "fontSize": "base-scale",
  "spacing": "base",
  "radius": "rounded",
  "shadow": "elevation"
}
```

- Responses:
  - 204 No Content on success
  - 400 Validation errors (i18n keys) if fields missing/invalid

Per-user selection (future): Scaffold entity `user_customization_selection`
added; no endpoints yet.

## Caching & Fingerprint Strategy

- Weak ETag built via SHA-256 over canonical ordered serialization of: theme
  keys + colors, font keys + hash + weights, each token set keys + values, font
  weights list, and current selection keys.
- Stable ordering ensures identical semantic input → identical ETag.
- Adding a new group or field (additive) changes ETag (frontend refetch
  acceptable).

## Evolution & Versioning

- v1 additive only: new groups, new keys, or new optional fields allowed.
- Breaking (rename/remove/change semantics) → introduce `/api/v2/tokens`.
- Future planned additions: per-theme spacing overrides, persisted user-level
  selections.

## Selection Resolution Rules

1. Active theme from domain use case if present.
2. Fallback: first theme by deterministic ordering.
3. Other groups: first item key of each corresponding list.
4. All selection logic encapsulated in `UITokensCurrentProvider` for future
   persistence extension.

## Deterministic Ordering Guarantees

- Themes list is sorted ascending by `key` before response assembly ensuring
  stable ordering and fingerprint consistency.
- Fonts and all token sets are hashed in sorted order (by key) for ETag
  determinism; map entries within color and values maps are also sorted by key
  prior to hashing.

## Security & Integrity

- No user-specific data in v1 (safe to cache publicly if downstream CDN policy
  allows).
- All static URLs must be relative/indirect (no hardcoded absolute origins).

## Abstraction & Ports (Planned - Phase 6)

- Introduce provider interfaces: `ThemesProviderPort`, `FontsProviderPort`,
  `FontSizesProviderPort`, `SpacingsProviderPort`, `RadiusProviderPort`,
  `ShadowsProviderPort`, `FontWeightsProviderPort`.
- `UITokensDataProvider` depends only on ports, enabling test doubles and future
  dynamic sources.

## Acceptance Criteria Checklist

- [x] Stable theme key present and used in response.
- [x] Dynamic current selection implemented.
- [x] Font weights group included.
- [x] ETag returned and 304 honored.
- [x] Provider interfaces present (Phase 6).
- [x] Tests for ETag, selection, seeding keys (note: seeder test file named
      `ThemeSeederKeysTest`).
- [x] Documentation references updated in task file.

## Operational Notes

- Fingerprint builder returns weak ETag format `W"<hex>"`.
- Changing color map order does not affect ETag (sorted by key).
- Adding a theme invalidates cache (expected).

## Future Extensions (Design Notes)

- Per-theme overrides path A (inline overrides object) vs path B (association to
  variant set) — decision deferred until first real override need surfaces.
- Potential CDN edge caching if token size remains stable (<10KB gzip).
- System-level selection is now persisted (single row) enabling future evolution
  to per-user selections (will add user scoping + precedence rules).

## Change Log

- 2025-09-03: Initial v1 documentation authored (Phase 5).
