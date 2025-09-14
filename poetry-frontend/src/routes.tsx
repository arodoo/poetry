/*
 * File: routes.tsx
 * Purpose: Central route tree with locale-prefixed paths and guards.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './features/public/pages/HomePage'
import { UnauthorizedPage } from './features/auth/pages/UnauthorizedPage'
import { AdminTokensPage } from './features/tokens/pages/AdminTokensPage'
import { RequireRole } from './shared/routing/RequireRole'

export function AppRouteTree(): ReactElement {
  return (
    <Routes>
      {/* default locale redirect to en */}
      <Route path="/" element={<Navigate to="/en" replace />} />

      {/* public scope */}
      <Route path=":locale/" element={<HomePage />} />
      <Route path=":locale/unauthorized" element={<UnauthorizedPage />} />

      {/* admin */}
      <Route
        path=":locale/admin/tokens"
        element={
          <RequireRole role="admin">
            <AdminTokensPage />
          </RequireRole>
        }
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/en/unauthorized" replace />} />
    </Routes>
  )
}
