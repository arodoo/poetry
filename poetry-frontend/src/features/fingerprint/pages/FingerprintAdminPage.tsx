/*
 * File: FingerprintAdminPage.tsx
 * Purpose: Admin dashboard for R503 fingerprint system management.
 * Shows slot usage, active count, and archived templates with restore.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { SlotUsageCard } from '../components/admin/SlotUsageCard'
import { ArchivedFingerprintsList } from '../components/admin/ArchivedFingerprintsList'
import { useFingerprintsListQuery } from '../hooks/useFingerprintQueries'
import { Heading } from '../../../ui/Heading/Heading'
import { Badge } from '../../../ui/Badge/Badge'
import { Stack } from '../../../ui/Stack/Stack'
import { useT } from '../../../shared/i18n/useT'
import type { FingerprintResponse } from '../model/FingerprintSchemas'

export function FingerprintAdminPage(): ReactElement {
  const t = useT()
  const { data: fingerprints } = useFingerprintsListQuery()
  const activeCount = fingerprints?.filter(
    (f: FingerprintResponse): boolean => f.status === 'ACTIVE'
  ).length

  return (
    <div className="fingerprint-admin-page max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <Heading level={1}>{t('ui.fingerprints.admin.title')}</Heading>
        <Badge tone="success" className="active-badge">
          {activeCount ?? 0} {t('ui.fingerprints.admin.activeCount')}
        </Badge>
      </div>

      <Stack gap="md">
        <SlotUsageCard />
        <ArchivedFingerprintsList />
      </Stack>
    </div>
  )
}

export default FingerprintAdminPage
