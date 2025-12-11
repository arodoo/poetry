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
import { ArchivedTable } from './ArchivedTable'

export function ArchivedFingerprintsList(): ReactElement {
  const { data, isLoading, error } = useArchivedFingerprintsQuery()
  const restoreMutation = useRestoreFingerprintMutation()

  if (isLoading) {
    return (
      <Card padding="md">
        <Text className="text-[var(--color-textMuted)]">Loading...</Text>
      </Card>
    )
  }

  if (error) {
    return (
      <Card padding="md">
        <Text className="text-[var(--color-danger)]">Failed to load</Text>
      </Card>
    )
  }

  if (!data || data.length === 0) {
    return (
      <Card padding="md">
        <Text className="text-[var(--color-textMuted)]">No archived</Text>
      </Card>
    )
  }

  return (
    <Card padding="md">
      <Text className="text-sm text-[var(--color-textMuted)] mb-3">
        Archived Fingerprints
      </Text>
      <ArchivedTable data={data} mutation={restoreMutation} />
    </Card>
  )
}
