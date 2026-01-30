/**
 * File: index.ts
 * Purpose: Barrel export for admin-stats feature module.
 * Exports pages and components for use in router.
 * All Rights Reserved. Arodi Emmanuel
 */

export { AdminDashboardPage } from './pages/AdminDashboardPage'
export { KpiCard } from './components/KpiCard'
export { KpiGrid } from './components/KpiGrid'
export { useMembershipStatsQuery } from './api/useStatsQueries'
