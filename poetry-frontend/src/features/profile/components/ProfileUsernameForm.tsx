/*
 * File: ProfileUsernameForm.tsx
 * Purpose: Username edit form for profile summary. Extracted to keep the
 * parent component small and focused. All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Input } from '../../../ui/Input/Input'
import { Button } from '../../../ui/Button/Button'

export function ProfileUsernameForm({
  username,
  setUsername,
  isSubmitting,
  onSubmit,
  t,
}: {
  username: string
  setUsername: (v: string) => void
  isSubmitting: boolean
  onSubmit: (e: React.FormEvent) => void
  t: (key: string) => string
}): ReactElement {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1" htmlFor="profile-username">
        <span className="text-sm font-medium">
          {t('ui.profile.summary.username.label')}
        </span>
        <Input
          id="profile-username"
          value={username}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setUsername(event.target.value)
          }}
          data-testid="profile-username-input"
        />
      </label>
      <Button type="submit" disabled={isSubmitting} className="w-fit">
        {isSubmitting
          ? t('ui.profile.summary.username.loading')
          : t('ui.profile.summary.username.save')}
      </Button>
    </form>
  )
}
