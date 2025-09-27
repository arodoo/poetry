/*
 * File: routes.tsx
 * Purpose: Central route tree with locale-prefixed paths and guards.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PublicRoutes } from './routesPublic'
import { AdminRoutes } from './routesAdmin'
import { PublicAuthRoutes } from './routesAuthPublic'
import { getEnv } from './shared/config/env'
import { AuthenticatedRoutes } from './routesAuthenticated'

export function AppRouteTree(): ReactElement {
  const defaultLocale: string = getEnv().VITE_DEFAULT_LOCALE
  return (
    <Routes>
      {/* default locale redirect to en */}
      <Route path="/" element={<Navigate to={`/${defaultLocale}`} replace />} />
      {/* redirect non-locale auth paths to default locale */}
      <Route
        path="/login"
        element={<Navigate to={`/${defaultLocale}/login`} replace />}
      />
      <Route
        path="/register"
        element={<Navigate to={`/${defaultLocale}/register`} replace />}
      />

      {PublicAuthRoutes()}
      {PublicRoutes()}
      {AuthenticatedRoutes()}

      {AdminRoutes()}
    </Routes>
  )
}
