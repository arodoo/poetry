/*
 * File: index.ts
 * Purpose: Public surface for the dashboard feature exposing model, API,
 * hooks, routing, and components.
 * All Rights Reserved. Arodi Emmanuel
 */
export * from './model/DashboardSchemas'
export * from './api/dashboardApi'
export * from './hooks/useDashboardQueries'
export * from './routing/dashboardRoutes'
export * from './components/DashboardOverviewPanel'
export { default as DashboardPage } from './pages/DashboardPage'
