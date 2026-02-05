/*
 * File: index.ts
 * Purpose: Public surface for hardware feature.
 * Re-exports routes, hooks, and types for external use.
 * All Rights Reserved. Arodi Emmanuel
 */

export { HardwareRoutes } from './routing/hardwareRoutes'
export { useHardwareStatusQuery } from './hooks/useHardwareStatusQuery'
export type { HardwareStatus } from './model/hardwareStatusSchema'
