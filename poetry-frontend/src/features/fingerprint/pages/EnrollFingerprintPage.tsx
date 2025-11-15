/*
 * File: EnrollFingerprintPage.tsx
 * Purpose: Page for enrolling new fingerprints.
 * Contains form for slot ID input and enrollment submission.
 * Provides breadcrumb navigation and page layout structure.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useT } from '../../../shared/i18n/useT'
import { EnrollFingerprintForm } from '../components/EnrollFingerprintForm'

export default function EnrollFingerprintPage(): ReactElement {
  const { locale } = useLocale()
  const t = useT()

  const breadcrumbs: BreadcrumbItem[] = [
    { label: t('ui.nav.home'), href: `/${locale}` },
    {
      label: t('ui.fingerprints.breadcrumb'),
      href: `/${locale}/fingerprints`,
    },
    { label: t('ui.fingerprints.enroll.breadcrumb') },
  ]

  return (
    <PageLayout
      title={t('ui.fingerprints.enroll.title')}
      subtitle={t('ui.fingerprints.enroll.subtitle')}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
      <div className="max-w-md">
        <EnrollFingerprintForm />
      </div>
    </PageLayout>
  )
}
