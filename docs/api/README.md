# API Documentation Structure

This directory contains OpenAPI specifications for the Poetry API.

## Directory Structure

```
docs/api/
├── backend-generated/     # Auto-generated from backend (SOURCE OF TRUTH)
│   └── v1/
│       └── openapi.yaml   # Generated via springdoc-openapi annotations
└── hand-written/         # Legacy hand-written specs (DEPRECATED)
    ├── openapi-v1.yaml
    └── openapi/
```

## Option A: Backend as Source of Truth

The project uses **Option A** architecture:

1. **Backend Java Code** (with springdoc annotations)
   - Controllers: `@Tag`, `@Operation`, `@ApiResponse`
   - DTOs: `@Schema` with descriptions and examples
   - Located in: `poetry-backend/src/main/java/.../interfaces/`

2. **springdoc-openapi** generates OpenAPI spec
   - Auto-generated at: `http://localhost:8080/v3/api-docs.yaml`
   - Saved to: `backend-generated/v1/openapi.yaml`

3. **Frontend SDK** generated from backend spec
   - Tool: `@hey-api/openapi-ts`
   - Generated to: `poetry-frontend/src/api/generated/`
   - Script: `npm run sdk:generate`

## Workflow

### When adding/modifying endpoints:

1. Update backend controller with annotations
2. Restart backend
3. **Regenerate OpenAPI: `npm run update:openapi`** (MUST use .yaml endpoint!)
4. Regenerate frontend SDK: `cd poetry-frontend && npm run sdk:generate`

**⚠️ CRITICAL:** Always use `npm run update:openapi` - DO NOT use `/v3/api-docs` (returns JSON) instead of `/v3/api-docs.yaml`

### Benefits:

- Single source of truth (backend code)
- No manual YAML editing
- Type-safe frontend SDK
- Backend controls API contract
- DDD architecture preserved
