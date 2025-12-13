/*
 * File: FingerprintsListPage.tsx
 * Purpose: Main page displaying all enrolled fingerprints with actions.
 * Shows enrollment status and provides access to enroll new prints.
 * Includes action buttons for simulator and enrollment.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Button } from '../../../ui/Button/Button'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useT } from '../../../shared/i18n/useT'
import { FingerprintList } from '../components/FingerprintList'

export default function FingerprintsListPage(): ReactElement {
  const { locale } = useLocale()
  const t = useT()

  const breadcrumbs: BreadcrumbItem[] = [
    { label: t('ui.nav.home'), href: `/${locale}` },
    { label: t('ui.fingerprints.breadcrumb') },
  ]

  const actions: ReactElement = (
    <div className="flex gap-2">
      <Button
        to={`/${locale}/fingerprints/admin`}
        variant="secondary"
        size="md"
      >
        {t('ui.fingerprints.actions.admin')}
      </Button>
      <Button to={`/${locale}/fingerprints/simulator`} size="md">
        {t('ui.fingerprints.actions.simulator')}
      </Button>
      <Button to={`/${locale}/fingerprints/enroll`} size="md">
        {t('ui.fingerprints.actions.enroll')}
      </Button>
    </div>
  )

  return (
    <PageLayout
      title={t('ui.fingerprints.list.title')}
      subtitle={t('ui.fingerprints.list.subtitle')}
      actions={actions}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
      <FingerprintList />
    </PageLayout>
  )
}
