/*
 File: AppRoutes.tsx
 Purpose: Extracted routing configuration from `App.tsx` to keep the
 root component small and under CI-enforced file length limits. Hosts
 application routes used during development and manual QA.
 All Rights Reserved. Arodi Emmanuel
*/

import type { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AdminTokensPage } from './features/tokens/pages/AdminTokensPage'
import { UnauthorizedPage } from './features/auth/pages/UnauthorizedPage'
import { RequireRole } from './shared/routing/RequireRole'
import DemoPage from './pages/DemoPage'

export default function AppRoutes(): ReactElement {
  const demo: ReactElement = <DemoPage />

  return (
    <Routes>
      <Route path="/" element={demo} />
      <Route path="/demo" element={demo} />
      <Route
        path="/admin/tokens"
        element={
          <RequireRole role="admin">
            <AdminTokensPage />
          </RequireRole>
        }
      />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
    </Routes>
  )
}
