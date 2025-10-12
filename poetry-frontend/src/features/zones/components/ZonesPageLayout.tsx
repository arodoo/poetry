/*
 * File: ZonesPageLayout.tsx
 * Purpose: Layout wrapper for all zones feature pages, providing consistent headers, navigation breadcrumbs, and content area structure. Ensures accessibility and responsive design for a seamless user experience. Facilitates maintainability and code reuse across the zones module.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactNode } from 'react'

interface ZonesPageLayoutProps {
  readonly children: ReactNode
  readonly title: string
  readonly description?: string
}

export function ZonesPageLayout({
  children,
  title,
  description,
}: ZonesPageLayoutProps) {
  return (
    <div className="min-h-screen bg-surface-base">
      <main className="w-full px-4 py-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-content-primary">{title}</h1>
          {description && (
            <p className="mt-2 text-sm text-content-secondary">{description}</p>
          )}
        </div>
        {children}
      </main>
    </div>
  )
}
