<!--
File: public.md
Purpose: Domain documentation for the public marketing experience.
All Rights Reserved. Arodi Emmanuel
-->

# Domain: Public Experience

## Scope

Deliver localized marketing content for unauthenticated visitors and direct
calls to authentication flows.

## Functional Requirements (RFs)

- Retrieve landing content containing hero copy, call-to-action labels, and
  feature highlights.
- Ensure each feature includes title and description keys for localization.
- Surface graceful fallbacks when content is unavailable.

## Data Model

| Aggregate            | Fields                                                           |
| -------------------- | ---------------------------------------------------------------- |
| PublicLandingContent | heroTitleKey, heroBodyKey, loginCtaKey, registerCtaKey, features |
| PublicLandingFeature | titleKey, descriptionKey                                         |

## API References

- `docs/api/openapi/paths/public-landing.yaml`

## Permissions

- Landing content is publicly accessible with no authentication required.
- Responses are cacheable by intermediaries for short durations.

## Acceptance Criteria

- Landing payload validates against the shared Zod schema with at least one
  feature entry.
- All response keys map to existing localization entries for supported
  languages.
- Service failures return RFC7807 problem details with localized error codes.
