#FINISHED

# File: 101-backend-error-handler-i18n.md

# Purpose: Central error handler with i18n codes and OpenAPI schema.

# All Rights Reserved. Arodi Emmanuel

## Steps

1. Define error DTO with code/message/details/traceId.
2. `@ControllerAdvice` mapping validation/security/business errors.
3. Log with traceId (MDC); i18n message source.
4. Reference error schema in OpenAPI.
5. Unit + MVC tests for common cases.

## Acceptance

- Consistent localized errors; tests pass.
