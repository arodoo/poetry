/*
 * File: VerifyFingerprintCard.tsx
 * Purpose: Card for testing fingerprint verification and relay activation
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Button } from '../../../ui/Button/Button'
import { Text } from '../../../ui/Text/Text'
import { Badge } from '../../../ui/Badge/Badge'
import { useVerifyFingerprint, type VerifyStatus } from '../hooks/useVerifyFingerprint'

const statusConfig: Record<VerifyStatus, { tone: 'neutral' | 'warning' | 'success' | 'error', label: string }> = {
    idle: { tone: 'neutral', label: 'Ready' },
    scanning: { tone: 'warning', label: 'Scanning...' },
    success: { tone: 'success', label: 'Access Granted' },
    error: { tone: 'error', label: 'Denied' }
}

export function VerifyFingerprintCard(): ReactElement {
    const { status, userId, message, verify } = useVerifyFingerprint()
    const cfg = statusConfig[status]

    return (
        <Card>
            <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                    <Text size="lg" weight="bold">🔐 Access Test</Text>
                    <Badge tone={cfg.tone}>{cfg.label}</Badge>
                </div>
                <Button onClick={() => void verify()} disabled={status === 'scanning'} className="w-full">
                    {status === 'scanning' ? 'Place finger on sensor...' : 'Verify Fingerprint'}
                </Button>
                {userId && <Text size="sm">User ID: <strong>{userId}</strong></Text>}
                {message && status !== 'idle' && (
                    <Text size="sm" className="text-[var(--color-text-muted)]">{message}</Text>
                )}
            </div>
        </Card>
    )
}
