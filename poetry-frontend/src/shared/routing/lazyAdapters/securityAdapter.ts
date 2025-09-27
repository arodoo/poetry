/*
File: securityAdapter.ts
Purpose: Lazy route adapter that exposes the security-related routes and
components for the account area. It is a thin wrapper used by the routing
infrastructure to defer loading of security UI until navigation occurs.
Keep this module small: it should only export route adapter factories and any
metadata required by the router.
All Rights Reserved. Arodi Emmanuel
*/

interface LazyModule {
  default: () => null
}

export function securityAdapter(): {
  path: string
  load: () => Promise<LazyModule>
} {
  const load: () => Promise<LazyModule> = async (): Promise<LazyModule> =>
    Promise.resolve({ default: (): null => null })
  return { path: '/account/security', load }
}
