---
description: 'Mode for backend operations'
tools: [ 'spring-boot', 'spring-data-jpa', 'lombok', 'java21', 'openapi-generator' ]
---

# Backend

- Versioned API base path: "/api/v1".
- Observability: Actuator, structured logs.
- API discovery:
    - OpenAPI at "/v3/api-docs".
    - Swagger UI.
    - "/api" index.
    - "/actuator/mappings" restricted.
- Error responses must follow RFC 7807 (Problem Details).
- Soft delete for entities; no hard deletes.
- No silent catches; all errors must be logged or reported.
- All external calls (HTTP/DB/Queue) must have timeouts and retries configured
- Lombok for boilerplate reduction.
- Java 21+.
- hashCode and equals for entities.
- @Deprecated files must be migrated and removed instantly.