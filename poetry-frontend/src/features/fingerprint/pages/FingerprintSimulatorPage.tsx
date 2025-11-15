/*
 * File: FingerprintSimulatorPage.tsx
 * Purpose: Testing page with complete hardware simulator.
 * Enables full development without physical R503 reader.
 * Provides manual enrollment, verification, and access log testing.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useT } from '../../../shared/i18n/useT'
import { FingerprintSimulator } from '../components/FingerprintSimulator'

export default function FingerprintSimulatorPage(): ReactElement {
  const { locale } = useLocale()
  const t = useT()

  const breadcrumbs: BreadcrumbItem[] = [
    { label: t('ui.nav.home'), href: `/${locale}` },
    {
      label: t('ui.fingerprints.breadcrumb'),
      href: `/${locale}/fingerprints`,
    },
    { label: t('ui.fingerprints.simulator.breadcrumb') },
  ]

  return (
    <PageLayout
      title={t('ui.fingerprints.simulator.title')}
      subtitle={t('ui.fingerprints.simulator.subtitle')}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
      <FingerprintSimulator />
    </PageLayout>
  )
}
