/*
 * ZonesPageLayout.tsx
 * Layout wrapper for zones feature pages with consistent header
 * navigation breadcrumbs and content area structure. Provides
 * accessibility landmarks and responsive layout.
 * © 2025 Poetry Platform. All rights reserved.
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
          <h1 className="text-3xl font-bold text-content-primary">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-sm text-content-secondary">
              {description}
            </p>
          )}
        </div>
        {children}
      </main>
    </div>
  )
}
