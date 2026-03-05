/*
 * File: userFormSections.tsx
 * Purpose: Form section builders for user create/edit pages.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { FormLayoutSection } from '../../../ui/FormLayout/FormLayout'
import { UsersFormFields } from '../components/form/UsersFormFields'
import type { UsersFormState } from '../components/form/useUsersFormState'
import { UserDemographicsFields } from '../../userdemographics/components/UserDemographicsFields'
import { UserAddressFields } from '../../useraddress/components/UserAddressFields'
import type { UserDemographicsFormState } from '../../userdemographics/hooks/useUserDemographicsForm'
import type { UserAddressFormState } from '../../useraddress/hooks/useUserAddressForm'

type DemoState = Omit<UserDemographicsFormState, 'saveForUser'>
type AddrState = Omit<UserAddressFormState, 'saveForUser'>

export function buildEditFormSections(
  formState: UsersFormState,
  showPassword: boolean,
  t: (key: string) => string,
  demographicsState: DemoState,
  addressState: AddrState
): readonly FormLayoutSection[] {
  return [
    {
      title: t('ui.users.edit.section.profile'),
      description: t('ui.users.edit.section.profile_desc'),
      fields: (
        <UsersFormFields
          {...formState}
          showPassword={showPassword}
          isEditing={true}
          t={t}
        />
      ),
    },
    {
      title: t('ui.users.form.demographics.section'),
      description: t('ui.users.form.demographics.section_desc'),
      fields: <UserDemographicsFields {...demographicsState} t={t} />,
    },
    {
      title: t('ui.users.form.address.section'),
      description: t('ui.users.form.address.section_desc'),
      fields: <UserAddressFields {...addressState} t={t} />,
    },
  ]
}

export function buildCreateFormSections(
  formState: UsersFormState,
  t: (key: string) => string,
  demographicsState: DemoState,
  addressState: AddrState
): readonly FormLayoutSection[] {
  return [
    {
      title: t('ui.users.create.section.account'),
      description: t('ui.users.create.section.account_desc'),
      fields: <UsersFormFields {...formState} showPassword={true} t={t} />,
    },
    {
      title: t('ui.users.form.demographics.section'),
      description: t('ui.users.form.demographics.section_desc'),
      fields: <UserDemographicsFields {...demographicsState} t={t} />,
    },
    {
      title: t('ui.users.form.address.section'),
      description: t('ui.users.form.address.section_desc'),
      fields: <UserAddressFields {...addressState} t={t} />,
    },
  ]
}
