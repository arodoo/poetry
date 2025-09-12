/*
 * File: index.ts
 * Purpose: Public re-exports for admin feature to provide a stable
 * import surface (schemas, hooks, routes) for the app and tests.
 * All Rights Reserved. Arodi Emmanuel
 */
export * from './model/AdminSchemas'
export * from './api/adminApi'
export * from './hooks/useAdminQueries'
export * from './routing/adminRoutes'
