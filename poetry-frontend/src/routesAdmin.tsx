/*
 * File: routesAdmin.tsx
 * Purpose: Admin route subtree extracted to keep the central router small.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, LazyExoticComponent } from 'react'
import { lazy, Suspense } from 'react'
import { Route } from 'react-router-dom'
import { RequireAuth } from './shared/routing/RequireAuth'
import { RequireRoles } from './shared/routing/RequireRoles'
import { RequireRole } from './shared/routing/RequireRole'
import { AppShell } from './shared/layout/AppShell'

interface AdminTokensModule {
  default?: () => ReactElement
  AdminTokensPage?: () => ReactElement
}

const AdminTokensPageLazy: LazyExoticComponent<() => ReactElement> = lazy(
  (): Promise<{ default: () => ReactElement }> =>
    import('./features/tokens/pages/AdminTokensPage').then(
      (m: unknown): { default: () => ReactElement } => {
        const mod: AdminTokensModule = m as AdminTokensModule
        return {
          default: mod.default ?? (mod.AdminTokensPage as () => ReactElement),
        }
      }
    )
)

export function AdminRoutes(): ReactElement {
  return (
    <>
      <Route
        path=":locale/admin/tokens"
        element={
          <RequireAuth>
            <RequireRoles roles={['admin', 'manager']}>
              <AppShell>
                <Suspense fallback={null}>
                  <RequireRole role="admin">
                    <AdminTokensPageLazy />
                  </RequireRole>
                </Suspense>
              </AppShell>
            </RequireRoles>
          </RequireAuth>
        }
      />
    </>
  )
}
