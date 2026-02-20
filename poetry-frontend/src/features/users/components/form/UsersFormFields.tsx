/*
 * File: UsersFormFields.tsx
 * Purpose: Input fields for the users form, separated to respect line limit.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, type ChangeEvent } from 'react'
import { Stack } from '../../../../ui/Stack/Stack'
import { Select } from '../../../../ui/Select/Select'
import { Text } from '../../../../ui/Text/Text'
import type { useT } from '../../../../shared/i18n/useT'
import { UsersBasicFields } from './fields/UsersBasicFields'
import { UsersPasswordField } from './fields/UsersPasswordField'
import { UsersRolesField } from './fields/UsersRolesField'
import { UsersFormStatus } from './UsersFormStatus'
import { UserBirthDateField } from '../fields/UserBirthDateField'
import { UserGenderField } from '../fields/UserGenderField'
import { UserPhoneField } from '../fields/UserPhoneField'
import { UsersAddressFields } from './fields/UsersAddressFields'
import type { UsersFormState } from './useUsersFormState'

export interface UsersFormFieldsProps
  extends Omit<UsersFormState, 'setActive'> {
  readonly showPassword: boolean
  readonly t: ReturnType<typeof useT>
}

function shouldShowPassword(rolesString: string): boolean {
  const roles = rolesString.toUpperCase()
  return roles.includes('ADMIN') || roles.includes('MANAGER')
}

export function UsersFormFields(props: UsersFormFieldsProps): ReactElement {
  function handleLocaleChange(e: ChangeEvent<HTMLSelectElement>): void {
    props.setLocale(e.target.value)
  }
  return (
    <>
      <UsersBasicFields
        firstName={props.firstName}
        lastName={props.lastName}
        username={props.username}
        email={props.email}
        onFirstNameChange={props.setFirstName}
        onLastNameChange={props.setLastName}
        onUsernameChange={props.setUsername}
        onEmailChange={props.setEmail}
        t={props.t}
      />
      <Stack gap="xs">
        <Text size="sm" className="font-medium">
          {props.t('ui.users.form.locale.label')}
        </Text>
        <Select value={props.locale} onChange={handleLocaleChange}
          required data-testid="user-locale-select">
          <option value="en">{props.t('ui.users.form.locale.en')}</option>
          <option value="es">{props.t('ui.users.form.locale.es')}</option>
        </Select>
      </Stack>
      <UserBirthDateField birthDate={props.birthDate}
        onBirthDateChange={props.setBirthDate} t={props.t} />
      <UserGenderField gender={props.gender}
        onGenderChange={props.setGender} t={props.t} />
      <UserPhoneField phone={props.phone}
        onPhoneChange={props.setPhone} t={props.t} />
      <UsersAddressFields
        addressLine1={props.addressLine1}
        addressLine2={props.addressLine2}
        addressCity={props.addressCity}
        addressState={props.addressState}
        addressZip={props.addressZip}
        addressCountry={props.addressCountry}
        onLine1Change={props.setAddressLine1}
        onLine2Change={props.setAddressLine2}
        onCityChange={props.setAddressCity}
        onStateChange={props.setAddressState}
        onZipChange={props.setAddressZip}
        onCountryChange={props.setAddressCountry}
        t={props.t}
      />
      <UsersRolesField value={props.rolesString}
        onChange={props.setRolesString} t={props.t} />
      <UsersFormStatus status={props.status}
        onStatusChange={props.setStatus} t={props.t} />
      {props.showPassword && shouldShowPassword(props.rolesString) ? (
        <UsersPasswordField value={props.password}
          onChange={props.setPassword} t={props.t} />
      ) : null}
    </>
  )
}
