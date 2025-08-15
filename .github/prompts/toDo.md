# ToDo — Reconstrucción oldRepo bajo nueva convención

1) Auditoría y alineación
- Revisar oldRepo/boops-site/api y app: endpoints, modelos, validaciones, errores, config.
- Mapear a DDD (back: domain/application/infrastructure/interfaces; front: domain/features/shared/ui).
- Inventario de incongruencias (nombres, rutas, contratos, validaciones, estados HTTP, mensajes).

2) Backend (poetry-backend)
- Estructura DDD: domain (entities, VOs, repos), application (use cases, DTOs), infrastructure (JPA/HTTP/config), interfaces (REST).
- Rutas bajo /api/v1; índice /api; Actuator y logs JSON; restringir /actuator/mappings.
- RFC7807 handler global; soft delete; no silent catch.
- Timeouts y retries en HTTP/DB; validación tipada de env vars al startup.
- OpenAPI en /v3/api-docs + Swagger UI.
- ETag/If-Match e Idempotency-Key donde aplique.

3) OpenAPI ↔ SDK
- Exportar contratos a /docs/api; validar esquema en CI.
- Generar SDK TS desde OpenAPI; publicar/inyectar en frontend; sin fetch directo.

4) Frontend (poetry-frontend)
- Rutas "/:locale/..."; 100% i18n sin textos hardcodeados; slugs localizados por feature.
- Features con carpeta locales; UI accesible (WCAG), Tailwind, @heroicons.
- Datos con TanStack Query (claves estables/invalidación); validación Zod.
- Lógica en hooks/services; util central de fecha/hora; headers ETag/Idempotency.

5) Tests y calidad
- Back: unit (domain/app), integración (REST/repos), contratos (OpenAPI).
- Front: unit (hooks/utils), integración (componentes con MSW), e2e mínimos.
- Anti-drift: comparar SDK↔OpenAPI y Zod↔tipos en CI.
- Límite 60 líneas/archivo; refactor donde exceda.

6) CI y ganchos
- Husky: pre-commit (lint+format+max-lines), pre-push (test+typecheck+build).
- Commitlint; pipeline falla en lint/tests/build, OpenAPI inválido, SDK/tipos desalineados.

7) Documentación (/docs)
- Estructura: overview, architecture, domains, api, standards, operations, security.
- Un archivo por dominio en /docs/domains: alcance, RFs, modelo, API refs, permisos, criterios de aceptación.
- Documentar env vars y referenciar OpenAPI.

8) Resolución de incongruencias
- Alinear nombres, status codes, modelos, validaciones y mensajes.
- Mapear errores a mensajes amigables en UI (no texto crudo del backend).

9) Definition of Done
- OpenAPI en /v3/api-docs y /docs/api; SDK consumido en frontend.
- Páginas esperadas listas, i18n y rutas localizadas.
- Tests verdes y ganchos activos; Actuator+logs OK.
- Sin archivos >60 líneas; docs completas.
