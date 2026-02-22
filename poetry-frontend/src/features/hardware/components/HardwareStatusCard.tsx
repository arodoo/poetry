/*
 * File: HardwareStatusCard.tsx
 * Purpose: Displays hardware connection status with visual indicators.
 * Shows reader model, SDK version, and connection state.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'
import { Card } from '../../../ui/Card/Card'
import { CardHeader, CardBody } from '../../../ui/Card/CardSections'
import { Badge } from '../../../ui/Badge/Badge'
import { Text } from '../../../ui/Text/Text'
import type { HardwareStatus } from '../model/hardwareStatusSchema'

interface Props {
  status: HardwareStatus
  lastCheck: string
}

export function HardwareStatusCard({ status, lastCheck }: Props): ReactElement {
  const t = useT()
  const statusKey = status.connected
    ? 'ui.hardware.status.connected'
    : 'ui.hardware.status.disconnected'

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Text size="lg" weight="bold">
            {t('ui.hardware.status.title')}
          </Text>
          <Badge tone={status.connected ? 'success' : 'danger'}>
            {t(statusKey)}
          </Badge>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          {status.readerModel && (
            <StatusRow
              label={t('ui.hardware.status.model')}
              value={status.readerModel}
            />
          )}
          {status.sdkVersion && (
            <StatusRow
              label={t('ui.hardware.status.sdk')}
              value={status.sdkVersion}
            />
          )}
          {status.errorMessage && (
            <StatusRow
              label={t('ui.hardware.status.error')}
              value={status.errorMessage}
            />
          )}
          <StatusRow
            label={t('ui.hardware.status.lastCheck')}
            value={lastCheck}
          />
        </div>
      </CardBody>
    </Card>
  )
}

function StatusRow({
  label,
  value,
}: {
  label: string
  value: string
}): ReactElement {
  return (
    <div className="flex justify-between">
      <Text size="sm" className="text-[var(--color-text-muted)]">
        {label}
      </Text>
      <Text size="sm">{value}</Text>
    </div>
  )
}
