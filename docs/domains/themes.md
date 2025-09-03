<!--
File: themes.md
Purpose: Domain documentation for Themes. Describes scope, functional
requirements, data model, API refs, permissions, and acceptance
criteria. All Rights Reserved. Arodi Emmanuel
-->

# Themes — Domain

Scope

- Manage UI themes available globally (future: per org override).

Functional Requirements

- CRUD themes, activate exactly one global active theme, list for UI tokens.

Data Model

- Theme(id, name, active, colors map, deletedAt).
- Color values stored as HSL strings (e.g. hsl(210 40% 96%)) or hex fallback.

API References

- Paths: /api/v1/themes, /api/v1/themes/{id}, /api/v1/themes/{id}/activate,
  /api/v1/themes/active.

Permissions

- Admin/Manager (authorization integration pending).

Acceptance Criteria

- Endpoints implemented and returning ProblemDetails on validation errors.
- Single active theme invariant enforced by ActivateThemeUseCase.
- Soft deleted themes excluded from queries.
- Seeder provides initial 10 themes using HSL values.
