/*
 * File: FingerprintDetailPage.tsx
 * Purpose: Full page view for technical fingerprint details.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { DetailView } from '../../../ui/DetailView/DetailView'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import { Text } from '../../../ui/Text/Text'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useFingerprintsQuery } from '../hooks/useFingerprintsQuery'
import { useUsersListForSelect } from '../../seller-codes/hooks/useUsersListForSelect'
import { buildFingerprintDetailSections } from '../model/fingerprintDetailHelpers'
import { buildFingerprintDetailBreadcrumbs } from '../model/fingerprintBreadcrumbHelpers'
import type { MergedFingerprint } from '../components/HardwareFingerprintTableShell'

export default function FingerprintDetailPage(): ReactElement {
  const params = useParams()
  const idStr = params['id'] ?? ''
  const t = useT()
  const { locale } = useLocale()
  
  const fpQuery = useFingerprintsQuery()
  const usersQuery = useUsersListForSelect()
  
  const isLoading = fpQuery.isLoading || usersQuery.isLoading
  const isError = fpQuery.isError || usersQuery.isError
  
  const fingerprint = (fpQuery.data ?? []).find(f => String(f.id) === idStr)
  const user = (usersQuery.data ?? []).find(u => u.id === fingerprint?.userId)
  
  const merged: MergedFingerprint | undefined = fingerprint ? {
    id: fingerprint.id ?? 0,
    userId: fingerprint.userId ?? 0,
    username: user?.username ?? t('ui.common.unknown'),
    email: user?.email ?? '',
    status: fingerprint.status ?? 'UNKNOWN',
    enrolledAt: fingerprint.enrolledAt ?? '',
    version: fingerprint.version ?? 0,
  } : undefined

  const sections = merged ? buildFingerprintDetailSections(merged, t) : []
  const breadcrumbs = buildFingerprintDetailBreadcrumbs(locale, t)

  return (
    <PageLayout
      title={t('ui.hardware.fingerprints.detail.title')}
      subtitle={t('ui.hardware.fingerprints.detail.subtitle')}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
      
      {isLoading ? (
        <Text>{t('ui.common.loading')}</Text>
      ) : isError || !merged ? (
        <Text className="text-[var(--color-error)]">
          {t('ui.hardware.fingerprints.detail.error')}
        </Text>
      ) : (
        <DetailView sections={sections} />
      )}
    </PageLayout>
  )
}
