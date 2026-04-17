/*
 * File: HardwareStatusPage.tsx
 * Purpose: Hardware status page. Shows reader connection state
 * and scanner controls. Keeps app usable without a reader.
 * All Rights Reserved. Arodi Emmanuel
 */

import { type ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'
import { Stack } from '../../../ui/Stack/Stack'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { useHardwareStatusQuery } from '../hooks/useHardwareStatusQuery'
import { HardwareStatusCard } from '../components/HardwareStatusCard'
import { ScannerControls } from '../components/ScannerControls'
import { TryConnectButton } from '../components/TryConnectButton'
import { formatDate } from '../../../shared/utils/dateUtils'
import { HardwareFingerprintTableShell } from '../components/HardwareFingerprintTableShell'

export function HardwareStatusPage(): ReactElement {
  const t = useT()
  const { data, isLoading, error, dataUpdatedAt, isFetching } =
    useHardwareStatusQuery()

  if (isLoading) {
    return (
      <div className="p-6" data-testid="hardware-loading">
        <Text className="animate-pulse">{t('ui.common.loading')}</Text>
      </div>
    )
  }
  const safe = data ?? {
    connected: false,
    readerModel: null,
    sdkVersion: null,
    errorMessage: error?.message ?? null,
  }

  return (
    <div className="p-6" data-testid="hardware-status-page">
      <Stack gap="lg">
        <Heading level={1}>{t('ui.hardware.status.title')}</Heading>
        <Text size="sm" className="text-[var(--color-text-muted)]">
          {t('ui.hardware.status.subtitle')}
        </Text>
        <div className="max-w-md">
          <HardwareStatusCard
            status={safe}
            lastCheck={formatDate(dataUpdatedAt)}
          />
          <div className="mt-3">
            <TryConnectButton isFetching={isFetching} />
          </div>
          <ScannerControls status={safe} />
        </div>
        <HardwareFingerprintTableShell />
      </Stack>
    </div>
  )
}
