# Test Security Profile

Purpose

- Provide permissive HTTP security only during tests to focus on behavior.

Behavior

- Profile `test` activates `TestSecurityConfig` which permits `/test/**` and
  `/api/v1/**`.
- Default profile `!test` keeps strict security requiring auth for `/api/v1/**`.

Guardrails

- `src/test/resources/application.properties` sets
  `spring.profiles.active=test`.
- Do not enable `test` profile in non-test tasks.

Why

- Avoids weakening production security while keeping tests deterministic.
