/*
 * File: VerifyFingerprintPage.tsx
 * Purpose: Page for testing fingerprint verification and access simulation.
 * Shows verification results and relay activation feedback.
 * Displays matched user ID when fingerprint is recognized.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useT } from '../../../shared/i18n/useT'
import { SimulateAccessButton } from '../components/SimulateAccessButton'

export default function VerifyFingerprintPage(): ReactElement {
  const { locale } = useLocale()
  const t = useT()

  const breadcrumbs: BreadcrumbItem[] = [
    { label: t('ui.nav.home'), href: `/${locale}` },
    {
      label: t('ui.fingerprints.breadcrumb'),
      href: `/${locale}/fingerprints`,
    },
    { label: t('ui.fingerprints.verify.breadcrumb') },
  ]

  return (
    <PageLayout
      title={t('ui.fingerprints.verify.title')}
      subtitle={t('ui.fingerprints.verify.subtitle')}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
      <div className="max-w-md">
        <SimulateAccessButton />
      </div>
    </PageLayout>
  )
}
