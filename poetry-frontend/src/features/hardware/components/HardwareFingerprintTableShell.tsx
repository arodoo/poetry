/*
 * File: HardwareFingerprintTableShell.tsx
 * Purpose: Data fetching shell for the hardware fingerprint table.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { useFingerprintsQuery } from '../hooks/useFingerprintsQuery'
import { useUsersListForSelect } from '../../seller-codes/hooks/useUsersListForSelect'
import { HardwareFingerprintTable } from './HardwareFingerprintTable'
import { Text } from '../../../ui/Text/Text'
import { useT } from '../../../shared/i18n/useT'

export interface MergedFingerprint {
  id: number
  userId: number
  username: string
  email: string
  status: string
  enrolledAt: string
  version: number
}

export function HardwareFingerprintTableShell(): ReactElement {
  const t = useT()
  const fingerprintsQuery = useFingerprintsQuery()
  const usersQuery = useUsersListForSelect()

  const isLoading = fingerprintsQuery.isLoading || usersQuery.isLoading
  const isError = fingerprintsQuery.isError || usersQuery.isError

  if (isLoading) {
    return (
      <div className="py-4">
        <Text className="animate-pulse">{t('ui.common.loading')}</Text>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="py-4">
        <Text className="text-[var(--color-error)]">
          {t('ui.hardware.fingerprints.error')}
        </Text>
      </div>
    )
  }

  const fingerprints = fingerprintsQuery.data ?? []
  const users = usersQuery.data ?? []

  const mergedData: MergedFingerprint[] = fingerprints.map((fp) => {
    const user = users.find((u) => u.id === fp.userId)
    return {
      id: fp.id ?? 0,
      userId: fp.userId ?? 0,
      username: user?.username ?? t('ui.common.unknown'),
      email: user?.email ?? '',
      status: fp.status ?? 'UNKNOWN',
      enrolledAt: fp.enrolledAt ?? '',
      version: fp.version ?? 0,
    }
  })

  return <HardwareFingerprintTable data={mergedData} />
}
