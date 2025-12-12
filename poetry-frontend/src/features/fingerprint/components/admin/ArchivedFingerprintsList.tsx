/*
 * File: ArchivedFingerprintsList.tsx
 * Purpose: Table showing archived fingerprints with restore action.
 * Uses UI design system components for consistent visual styling.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Card } from '../../../../ui/Card/Card'
import { Text } from '../../../../ui/Text/Text'
import { useArchivedFingerprintsQuery } from '../../hooks/useFingerprintAdminQueries'
import { useRestoreFingerprintMutation } from '../../hooks/useFingerprintAdminMutations'
import { useT } from '../../../../shared/i18n/useT'
import { ArchivedTable } from './ArchivedTable'

export function ArchivedFingerprintsList(): ReactElement {
  const t = useT()
  const { data, isLoading, error } = useArchivedFingerprintsQuery()
  const restoreMutation = useRestoreFingerprintMutation()

  if (isLoading) {
    return (
      <Card padding="md">
        <Text className="text-[var(--color-textMuted)]">
          {t('ui.fingerprints.admin.loading')}
        </Text>
      </Card>
    )
  }

  if (error) {
    return (
      <Card padding="md">
        <Text className="text-[var(--color-danger)]">
          {t('ui.fingerprints.admin.error')}
        </Text>
      </Card>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Card padding="md" className="archived-empty">
        <Text className="text-[var(--color-textMuted)]">
          {t('ui.fingerprints.admin.archived.empty')}
        </Text>
      </Card>
    )
  }

  return (
    <Card padding="md" className="archived-list">
      <Text className="text-sm text-[var(--color-textMuted)] mb-3">
        {t('ui.fingerprints.admin.archived.title')}
      </Text>
      <ArchivedTable data={data} mutation={restoreMutation} />
    </Card>
  )
}
