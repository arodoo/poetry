
/*
 * File: index.ts
 * Purpose: Public API for the zones feature, exposing models, data hooks, routes, and page components for reuse across the admin application. Follows the seller-codes feature export pattern for consistency. Supports modularity and maintainability as the zones feature evolves.
 * All Rights Reserved. Arodi Emmanuel
 */

export * from './model/ZonesSchemas'
export * from './api/zonesApi'
export * from './hooks/useZonesQueries'
export * from './hooks/useZonesMutations'
export * from './routing/zonesRoutes'
export { default as ZonesListPage } from './pages/ZonesListPage'
export { default as ZoneCreatePage } from './pages/ZoneCreatePage'
export { default as ZoneEditPage } from './pages/ZoneEditPage'
