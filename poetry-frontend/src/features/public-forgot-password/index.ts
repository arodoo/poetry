/*
 * File: index.ts
 * Purpose: Re-exports public forgot-password feature symbols for
 *          shorter imports used by tests and other modules.
 * All Rights Reserved. Arodi Emmanuel
 */

export * from './model/PublicForgotSchemas'
/*
 * File: index.ts
 * Purpose: Public forgot-password feature exports. This module exposes the
 *          typed forgot-password mutation hook, routes and model schemas so
 *          the application can wire the feature into the public route tree.
 *          Keeping the export surface minimal improves testability and
 *          discoverability.
 * All Rights Reserved. Arodi Emmanuel
 */

export * from './hooks/useForgot'
export * from './routing/publicForgotRoutes'
export * from './model/PublicForgotSchemas'
export * from './routing/publicForgotRoutes'
export * from './model/PublicForgotSchemas'
