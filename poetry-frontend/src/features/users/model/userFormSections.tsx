/*
 * File: userFormSections.tsx
 * Purpose: Form section builders for user create/edit pages.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { FormLayoutSection } from '../../../ui/FormLayout/FormLayout'
import { UsersFormFields } from '../components/UsersFormFields'
import type { UsersFormState } from '../components/useUsersFormState'

export function buildEditFormSections(
  formState: UsersFormState,
  showPassword: boolean,
  t: (key: string) => string
): readonly FormLayoutSection[] {
  return [
    {
      title: t('ui.users.edit.section.profile'),
      description: t('ui.users.edit.section.profile_desc'),
      fields: (
        <UsersFormFields {...formState} showPassword={showPassword} t={t} />
      ),
    },
  ]
}

export function buildCreateFormSections(
  formState: UsersFormState,
  t: (key: string) => string
): readonly FormLayoutSection[] {
  return [
    {
      title: t('ui.users.create.section.account'),
      description: t('ui.users.create.section.account_desc'),
      fields: (
        <UsersFormFields
          {...formState}
          showPassword={true}
          isCreateMode={true}
          t={t}
        />
      ),
    },
  ]
}
