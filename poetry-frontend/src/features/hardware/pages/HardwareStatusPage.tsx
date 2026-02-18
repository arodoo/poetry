/*
 * File: HardwareStatusPage.tsx
 * Purpose: Page component for hardware status monitoring.
 * Displays real-time reader status with polling countdown.
 * All Rights Reserved. Arodi Emmanuel
 */

import { type ReactElement, useState, useEffect } from 'react'
import { useT } from '../../../shared/i18n/useT'
import { Stack } from '../../../ui/Stack/Stack'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { useHardwareStatusQuery } from '../hooks/useHardwareStatusQuery'
import { HardwareStatusCard } from '../components/HardwareStatusCard'
import { formatDate } from '../../../shared/utils/dateUtils'

export function HardwareStatusPage(): ReactElement {
  const t = useT()
  const { data, isLoading, error, dataUpdatedAt } = useHardwareStatusQuery()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 5 : prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => { setCountdown(5) }, [dataUpdatedAt])

  if (isLoading) {
    return (
      <div className="p-6" data-testid="hardware-loading">
        <Text className="animate-pulse">{t('ui.common.loading')}</Text>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="p-6" data-testid="hardware-error">
        <Text className="text-[var(--color-error)]">{error?.message}</Text>
      </div>
    )
  }

  return (
    <div className="p-6" data-testid="hardware-status-page">
      <Stack gap="lg">
        <Heading level={1}>{t('ui.hardware.status.title')}</Heading>
        <Text size="sm" className="text-[var(--color-text-muted)]">
          {t('ui.hardware.status.subtitle')}
        </Text>
        <div className="max-w-md">
          <HardwareStatusCard status={data} lastCheck={formatDate(dataUpdatedAt)} />
          <Text size="sm" className="mt-4 text-center text-[var(--color-text-muted)]">
            {t('ui.hardware.status.reconnecting', { seconds: countdown })}
          </Text>
        </div>
      </Stack>
    </div>
  )
}
