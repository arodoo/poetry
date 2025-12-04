/*
 * File: AdminRoute.tsx
 * Purpose: Wrapper component for admin routes with auth and role guards.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ReactNode } from 'react'
import { Suspense } from 'react'
import { RequireAuth } from './RequireAuth'
import { RequireRoles } from './RequireRoles'
import { AppShell } from '../../layout'

export function AdminRoute({
  children,
}: {
  readonly children: ReactNode
}): ReactElement {
  return (
    <RequireAuth>
      <RequireRoles roles={['admin', 'manager']}>
        <AppShell>
          <Suspense fallback={null}>{children}</Suspense>
        </AppShell>
      </RequireRoles>
    </RequireAuth>
  )
}
