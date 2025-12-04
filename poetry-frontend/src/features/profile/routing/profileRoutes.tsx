/*
 * File: profileRoutes.tsx
 * Purpose: Profile route configurations with authentication guard.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { RequireAuth } from '../../../shared/routing/RequireAuth'
import { AppShell } from '../../../shared/layout'
import { ProfilePageLazy } from '../../../shared/routing/lazyAdapters'

export function ProfileRoutes(): ReactElement[] {
  return [
    <Route
      key="profile"
      path=":locale/profile"
      element={
        <RequireAuth>
          <AppShell>
            <Suspense fallback={null}>
              <ProfilePageLazy />
            </Suspense>
          </AppShell>
        </RequireAuth>
      }
    />,
  ]
}
