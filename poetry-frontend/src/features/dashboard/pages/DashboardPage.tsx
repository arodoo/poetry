/*
 * File: DashboardPage.tsx
 * Purpose: Main dashboard page shown after successful login.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useT } from '../../../shared/i18n/useT'
import type { ReactElement } from 'react'

export default function DashboardPage(): ReactElement {
  const t: ReturnType<typeof useT> = useT()

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {t('ui.dashboard.welcome.title')}
      </h1>
      <p className="text-gray-600">{t('ui.dashboard.welcome.message')}</p>
    </main>
  )
}
