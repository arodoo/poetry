# Auth API v1

- Base path: /api/v1/auth
- Endpoints:
  - POST /login: body { username, password } -> { token, username }
  - POST /refresh: body { refreshToken } -> { token }
  - POST /logout: body { refreshToken } -> 204 No Content
  - POST /register: body { user: object } -> 200 user object (stub)

Notes:
- Temporary in-memory adapter provides fake tokens until security is implemented.
- All responses conform to structured JSON and global error handler (RFC7807) on failures.
