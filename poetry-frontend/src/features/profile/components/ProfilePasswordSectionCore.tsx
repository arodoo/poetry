/*
 * File: ProfilePasswordSectionCore.tsx
 * Purpose: Core behaviour and wiring for the profile password change form.
 * This module composes the account security password form within the profile
 * page, keeping profile-specific layout concerns separate from domain logic.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, FormEvent } from 'react'
import { AccountPasswordForm, useAccountSecurityPage } from '../../account'

export function ProfilePasswordSectionCore(): ReactElement {
  const {
    t,
    values,
    fieldErrors,
    onFieldChange,
    onSubmit,
    isSubmitting,
    status,
    policyText,
  } = useAccountSecurityPage()
  return (
    <section aria-labelledby="profile-password">
      <h2 id="profile-password" className="text-lg font-semibold">
        {t('ui.profile.password.title')}
      </h2>
      <AccountPasswordForm
        values={values}
        onChange={onFieldChange}
        onSubmit={(event: FormEvent<HTMLFormElement>): void =>
          void onSubmit(event)
        }
        isSubmitting={isSubmitting}
        t={t}
        status={status}
        fieldErrors={fieldErrors}
        policyText={policyText}
      />
    </section>
  )
}

export default ProfilePasswordSectionCore
