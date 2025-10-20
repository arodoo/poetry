/*
 * File: SubscriptionFormFooter.tsx
 * Purpose: Footer actions for Subscription form (cancel and submit buttons).
 * Extracted to keep primary form component small and focused.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Inline } from '../../../ui/Inline/Inline'
import { Button } from '../../../ui/Button/Button'

interface FooterProps {
  t: (k: string) => string
  isPending: boolean
  onCancel: () => void
  submitLabel: string
}

export default function SubscriptionFormFooter({
  t,
  isPending,
  onCancel,
  submitLabel,
}: FooterProps): ReactElement {
  return (
    <div className="flex justify-end border-t border-[var(--color-border)] pt-4">
      <Inline gap="sm">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isPending}
          data-testid="subscription-cancel-button"
        >
          {t('ui.subscriptions.actions.cancel')}
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          data-testid="subscription-submit-button"
        >
          {isPending ? 'Saving...' : submitLabel}
        </Button>
      </Inline>
    </div>
  )
}
