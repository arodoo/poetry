/*
 * File: UserCreateFormActions.tsx
 * Purpose: Form action buttons for user creation page.
 * Handles create and cancel button rendering with loading state.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, FormEvent } from 'react'
import { Button } from '../../../ui/Button/Button'
import type { useT } from '../../../shared/i18n/useT'

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onCancel: () => void
  isSubmitting: boolean
  t: ReturnType<typeof useT>
}

export function UserCreateFormActions({
  onSubmit,
  onCancel,
  isSubmitting,
  t,
}: Props): ReactElement {
  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault()
    const fakeEvent = new Event(
      'submit'
    ) as unknown as FormEvent<HTMLFormElement>
    onSubmit(fakeEvent)
  }

  return (
    <div className="mt-6 flex gap-4">
      <Button onClick={handleClick} variant="primary" disabled={isSubmitting}>
        {t('ui.users.actions.create')}
      </Button>
      <Button onClick={onCancel} variant="secondary">
        {t('ui.users.actions.cancel')}
      </Button>
    </div>
  )
}
