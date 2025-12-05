/*
 * File: index.ts
 * Purpose: Users feature public API exposing models, data facades, hooks,
 * and route-level components for reuse across the admin app.
 * All Rights Reserved. Arodi Emmanuel
 */

export * from './model/UsersSchemas'
export * from './api/usersApi'
export * from './hooks/useUsersQueries'
export * from './hooks/mutations/useUsersMutations'
export * from './components/UsersPageLayout'
export * from './components/list/UsersListShell'
export * from './components/detail/UsersDetailSummary'
export * from './components/form/UsersFormShell'
export * from './components/form/UsersForm'
export * from './routing/usersRoutes'
export { default as UsersListPage } from './pages/UsersListPage'
export { default as UsersCreatePage } from './pages/crud/UsersCreatePage'
export { default as UserDetailPage } from './pages/crud/UserDetailPage'
export { default as UserEditPage } from './pages/crud/UserEditPage'
export { default as UserRolesPage } from './pages/UserRolesPage'
export { default as UserSecurityPage } from './pages/UserSecurityPage'
export { default as UserDisablePage } from './pages/UserDisablePage'
export { default as UserEnablePage } from './pages/UserEnablePage'
