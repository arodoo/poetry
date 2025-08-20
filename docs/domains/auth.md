# Domain: Auth

- Ports: AuthPort (login, refresh, logout, register)
- Use cases: LoginUseCase, RefreshTokenUseCase, LogoutUseCase, RegisterUseCase
- Adapters: InMemoryAuthAdapter (stub)
- Interfaces: REST controller under /api/v1/auth with DTOs in
  `interfaces/v1/auth`.
- Notes: Replace stub with real security (JWT, refresh tokens, password hashing,
  user repository) in later task. Ensure 80-line file limit and headers.
