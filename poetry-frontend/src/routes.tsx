/*
 * File: routes.tsx
 * Purpose: Central route tree with locale-prefixed paths and guards.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PublicRoutes } from './routesPublic'
import { AdminRoutes } from './routesAdmin'

export function AppRouteTree(): ReactElement {
  return (
    <Routes>
      {/* default locale redirect to en */}
      <Route path="/" element={<Navigate to="/en" replace />} />

      {PublicRoutes()}

      {AdminRoutes()}
    </Routes>
  )
}
