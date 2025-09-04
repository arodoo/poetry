<!--
File: db-architecture-blueprint.md
Purpose: Canonical database & persistence blueprint (naming, modeling,
         migrations, integrity, performance) for all backend modules.
All Rights Reserved.
-->

# Database Architecture Blueprint

## 1. Core Principles

- Domain driven: schema mirrors aggregates, not UI.
- Additive first: breaking change => new column/table + backfill, no drops in
  v1.
- Deterministic naming, explicit constraints, minimized accidental complexity.

## 2. Naming Conventions

- Tables: snake_case plural (e.g. font_assets, theme_variants, user_accounts).
- Junction tables: <singularA>\_<singularB> (alphabetical) (e.g.
  membership_role).
- PK column: <table_singular>\_id BIGINT (surrogate) unless natural key needed.
- Natural key unique index if stable (e.g. font_key, theme_key).
- Foreign key columns: <referenced_singular>\_id.
- Enum-like domains: small table + FK, never hard-coded ints.
- Sequences (if used): seq\_<table>\_id.

## 3. Column Conventions

- created_at, updated_at: TIMESTAMP WITH TIME ZONE (UTC only).
- deleted_at nullable for soft delete (no is_deleted flag).
- version INT for optimistic locking (JPA @Version) where concurrent writes.
- integrity or hash columns: lowercase hex; algorithm documented.
- Booleans: <adjective>\_<noun> (e.g. preload_default, is avoided).

## 4. Keys & Constraints

- Always explicit primary key.
- Foreign keys ON DELETE RESTRICT unless cascade is domain invariant.
- Unique constraints for alternate identifiers (e.g. font_key).
- Check constraints for bounded enums / status (or status table FK if large).

## 5. Normalization & Denormalization

- 3NF baseline; denormalize only for measurable performance with ADR.
- Derived data (counts, aggregates) stored only if expensive to compute.

## 6. Soft Delete Strategy

- Use deleted_at timestamp.
- Queries exclude deleted rows by default (repository helper / spec).
- Hard purge only via maintenance job after retention window.

## 7. Auditing

- Application layer emits domain events; audit sink table (audit_events).
- audit_events(event_id, occurred_at, aggregate_type, aggregate_id, type,
  payload_json, version).
- No business logic depends on audit table contents.

## 8. Migrations

- Managed via Flyway (recommended) under db/migration versioned scripts.
- One change per migration file, irreversible operations require explicit ADR.
- Never squash history; use follow-up cleanup migrations for legacy removal.

## 9. Seeding

- Idempotent seed runner checks presence by natural key.
- Seed data version tracked in seed_metadata(version, applied_at).
- Changes to seed set => new version row + differential apply.

## 10. Performance & Indexing

- Index FKs automatically; composite indexes only for proven selective filters.
- Avoid over-indexing (write amplification). Review quarterly.
- Use covering index for hottest query (explain analyze gate in PR if added).

## 11. Fingerprinting & ETag Inputs

- Client cache layers sourced only from semantic fields (avoid churn).
- Fingerprint subset documented per feature (see feature docs + tasks).

## 12. Multi-Tenancy (Future Option)

- If adopted: tenant_id leading FK; composite unique constraints include
  tenant_id.
- Row level filtering enforced in query ports.

## 13. Data Integrity Patterns

- Invariant logic belongs in domain; DB constraints backstop only fundamental
  rules.
- Use deferred constraints sparingly (bulk import scenarios only).

## 14. Large Objects / Assets

- Store only metadata + external URL + integrity hash.
- Size cap enforced in application layer.

## 15. Time & Timezones

- All timestamps UTC; no local timezone storage.
- Client formatting handled outside persistence.

## 16. Archival & Retention

- Long-lived cold data moves to \*\_archive tables via batch job.
- Archive tables mirror schema + archived_at column.

## 17. Security & Hardening

- Principle of least privilege roles (app_rw, app_ro, migrator).
- No dynamic SQL string concatenation; parameterized queries only.

## 18. Evolution Workflow

- Propose change -> ADR (if structural) -> migration -> code -> backfill ->
  deploy.
- Monitor errors & slow queries post-deploy (24h window).

## 19. Cross References

- Complements `backend-module-blueprint.md` (section 1 layout, section 5 style).
- Feature domain docs must list: tables, columns, keys, fingerprint fields.

## 20. Checklist (New Table)

- [ ] Name plural snake_case
- [ ] PK + natural key unique (if any)
- [ ] created_at, updated_at, (deleted_at if soft delete)
- [ ] Indexes justified
- [ ] Migration script + rollback plan noted
- [ ] Domain doc updated
- [ ] Seed diff (if seedable)
- [ ] Fingerprint fields reviewed

End of blueprint.
