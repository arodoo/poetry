/*
 * File: UsersEditFingerprintSection.tsx
 * Purpose: Fingerprint re-enrollment section for the Edit User flow.
 * Queries existing fingerprints. If enrolled, shows a badge and replace button.
 * If not, shows the wizard directly.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState, type ReactElement } from 'react'
import type { useT } from '../../../../shared/i18n/useT'
import { Card } from '../../../../ui/Card/Card'
import { CardBody } from '../../../../ui/Card/CardSections'
import { Button } from '../../../../ui/Button/Button'
import { Badge } from '../../../../ui/Badge/Badge'
import { Text } from '../../../../ui/Text/Text'
import { FingerprintEnrollmentSection } from './FingerprintEnrollmentSection'
import { useFingerprintsQuery } from '../../../hardware/hooks/useFingerprintsQuery'
import { formatDate } from '../../../../shared/utils/dateUtils'
import {
  ShieldCheckIcon,
  FingerPrintIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'

interface UsersEditFingerprintSectionProps {
  readonly userId: number
  readonly onSuccess: (fmd: string) => void
  readonly t: ReturnType<typeof useT>
}

export function UsersEditFingerprintSection(
  props: UsersEditFingerprintSectionProps
): ReactElement {
  const { data: fingerprints, isLoading } = useFingerprintsQuery()
  const [isReplacing, setIsReplacing] = useState(false)

  if (isLoading) {
    return (
      <Card className="mt-8 border-[var(--color-border)]">
        <CardBody className="py-8 text-center text-[var(--color-text-muted)] animate-pulse">
          {props.t('ui.users.status.loading')}
        </CardBody>
      </Card>
    )
  }

  // Find active fingerprint for this user
  const activeFingerprint = fingerprints?.find(
    (fp) => fp.userId === props.userId && fp.status === 'ACTIVE'
  )

  if (activeFingerprint && !isReplacing) {
    return (
      <Card className="mt-8 border-[var(--color-border)]">
        <CardBody className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheckIcon className="w-6 h-6 text-[var(--color-success)]" />
                <Text size="lg" className="font-semibold">
                  {props.t('ui.users.edit.fingerprint.enrolled.title')}
                </Text>
                <Badge tone="success" size="sm">
                  {props.t('ui.users.status.active')}
                </Badge>
              </div>
              <Text size="sm" className="text-[var(--color-text-muted)]">
                {props.t('ui.users.edit.fingerprint.enrolled.desc')}
              </Text>
              <div className="mt-3 flex items-center gap-2 bg-[var(--color-surface-hover)] px-3 py-2 rounded-md w-fit border border-[var(--color-border)] shadow-sm">
                <FingerPrintIcon className="w-5 h-5 text-[var(--color-text-muted)]" />
                <Text size="sm" className="font-mono text-[var(--color-text-muted)]">
                  {props.t('ui.users.edit.fingerprint.enrolledAt')}: {formatDate(activeFingerprint.enrolledAt)}
                </Text>
              </div>
            </div>
            
            <Button
              variant="secondary"
              icon={<ArrowPathIcon className="w-4 h-4" />}
              onClick={() => setIsReplacing(true)}
            >
              {props.t('ui.users.edit.fingerprint.replaceAction')}
            </Button>
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {isReplacing && (
        <div className="flex items-center justify-between mt-8 mb-[-1rem]">
          <Text size="md" className="font-medium text-[var(--color-warning)]">
            {props.t('ui.users.edit.fingerprint.replacingWarning')}
          </Text>
          <Button
            variant="danger"
            onClick={() => setIsReplacing(false)}
            size="sm"
          >
            {props.t('ui.actions.cancel')}
          </Button>
        </div>
      )}
      <FingerprintEnrollmentSection
        showSkipButton={false}
        onSuccess={(fmd) => {
          setIsReplacing(false)
          props.onSuccess(fmd)
        }}
        t={props.t}
      />
    </div>
  )
}
