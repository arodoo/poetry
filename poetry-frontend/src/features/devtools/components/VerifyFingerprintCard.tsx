/*
 * File: VerifyFingerprintCard.tsx
 * Purpose: Card for testing fingerprint verification and relay activation.
 * Shows scanning status with visual feedback and access results.
 * Displays user ID on successful match and error messages on failure.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Button } from '../../../ui/Button/Button'
import { Text } from '../../../ui/Text/Text'
import { Badge } from '../../../ui/Badge/Badge'
import {
  useVerifyFingerprint,
  type VerifyStatus,
} from '../hooks/useVerifyFingerprint'
import { useT } from '../../../shared/i18n/useT'

type BadgeTone = 'neutral' | 'primary' | 'success' | 'danger'

const statusTone: Record<VerifyStatus, BadgeTone> = {
  idle: 'neutral',
  scanning: 'primary',
  success: 'success',
  error: 'danger',
}

export function VerifyFingerprintCard(): ReactElement {
  const t = useT()
  const { status, userId, message, verify } = useVerifyFingerprint()
  const tone = statusTone[status]

  const labelKeys: Record<VerifyStatus, string> = {
    idle: 'ui.devtools.verify.statusIdle',
    scanning: 'ui.devtools.verify.statusScanning',
    success: 'ui.devtools.verify.statusSuccess',
    error: 'ui.devtools.verify.statusDenied',
  }

  return (
    <Card>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Text size="lg" weight="bold">
            🔐 {t('ui.devtools.verify.title')}
          </Text>
          <Badge tone={tone}>{t(labelKeys[status])}</Badge>
        </div>
        <Button
          onClick={() => void verify()}
          disabled={status === 'scanning'}
          className="w-full"
        >
          {status === 'scanning'
            ? t('ui.devtools.verify.placeFinger')
            : t('ui.devtools.verify.button')}
        </Button>
        {userId && (
          <Text size="sm">
            User ID: <strong>{userId}</strong>
          </Text>
        )}
        {message && status !== 'idle' && (
          <Text size="sm" className="text-[var(--color-text-muted)]">
            {message}
          </Text>
        )}
      </div>
    </Card>
  )
}
