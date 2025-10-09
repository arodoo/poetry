/*
 * index.ts
 * Zones feature public API exposing models data hooks routes
 * and page components for reuse across the admin application.
 * Follows seller-codes feature export pattern exactly.
 * © 2025 Poetry Platform. All rights reserved.
 */

export * from './model/ZonesSchemas'
export * from './api/zonesApi'
export * from './hooks/useZonesQueries'
export * from './hooks/useZonesMutations'
export * from './routing/zonesRoutes'
export { default as ZonesListPage } from './pages/ZonesListPage'
export { default as ZoneCreatePage } from './pages/ZoneCreatePage'
export { default as ZoneEditPage } from './pages/ZoneEditPage'
