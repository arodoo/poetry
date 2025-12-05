/*
 * File: MembershipEditFormActions.tsx
 * Purpose: Action buttons for the membership edit form.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../../ui/Button/Button'
import { useLocale } from '../../../../shared/i18n/hooks/useLocale'
import { toTemplateString } from '../../../../shared/utils/templateSafe'

interface Props {
  readonly membershipId: number | undefined
  readonly isSubmitting: boolean
  readonly t: (key: string) => string
}

export function MembershipEditFormActions({
  membershipId,
  isSubmitting,
  t,
}: Props): ReactElement {
  const { locale } = useLocale()
  const navigate = useNavigate()

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() =>
          void navigate(
            `/${locale}/memberships/${toTemplateString(membershipId)}`
          )
        }
      >
        {t('ui.memberships.actions.cancel')}
      </Button>
      <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
        {t('ui.memberships.actions.save')}
      </Button>
    </div>
  )
}
