/*
 * File: publicRoutes.tsx
 * Purpose: Public route configurations for home and error pages.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { Navigate, Route, useParams } from 'react-router-dom'
import { NotFoundPageLazy } from '../../../shared/routing/lazyAdapters'

function LocaleLoginRedirect(): ReactElement {
  const { locale } = useParams<{ locale: string }>()
  return <Navigate to={`/${locale}/login`} replace />
}

export function PublicRoutes(): ReactElement[] {
  return [
    <Route key="home" path=":locale/" element={<LocaleLoginRedirect />} />,
    <Route
      key="not-found"
      path="*"
      element={
        <Suspense fallback={null}>
          <NotFoundPageLazy />
        </Suspense>
      }
    />,
  ]
}
