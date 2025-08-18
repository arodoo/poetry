# docs/ — Single Source of Truth

All product & engineering docs live here and change via Pull Requests.  
If it’s not here, it’s not done.

---

## Start Here

- **Overview**: [`overview/product-vision.md`](overview/product-vision.md)
- **Roles & Permissions**:
  [`overview/roles-and-permissions.md`](overview/roles-and-permissions.md)
- **Domains (bounded contexts)**: [`domains/`](domains/)
- **API (OpenAPI)**: [`api/openapi.yaml`](api/openapi.yaml)
- **Architecture & ADRs**: [`architecture/`](architecture/)
- **Standards (engineering/UI)**: [`standards/`](standards/)
- **Operations & Security**: [`operations/`](operations/) ·
  [`security/`](security/)

---

## Structure

- `overview/` — vision, glossary, roles
- `architecture/` — C4 diagrams + ADRs
- `domains/` — one file per domain (Auth, Users, Themes, …)
- `api/` — openapi.yaml + changelog
- `standards/` — engineering rules, design system
- `operations/` — runbooks, SRE metrics, backups/DR
- `security/` — threat model, secrets, data classification

---

## Ground Rules

- One truth per topic (no duplication). Link to it from elsewhere.
- OpenAPI is the API contract; domains link to it.
- CODEOWNERS enforce doc updates in PRs when code/API changes.
- No broken links (fix links in the same PR).

---

## Definition of Done (Docs)

- Domain doc includes: Scope · RFs · Data Model · API refs · Permissions ·
  Acceptance.
- OpenAPI paths reflect implemented behavior + RFC7807 errors.
- ADR added/updated if a significant decision changed the design.

---

## Templates

- **Domain**: [`domains/_template.md`](domains/_template.md)
- **ADR**:
  [`architecture/adr/0000-template.md`](architecture/adr/0000-template.md)
- **Runbook**:
  [`operations/runbooks/_template.md`](operations/runbooks/_template.md)

---

## Tasks Log

- Overview: [`tasks/readme.md`](tasks/readme.md)
