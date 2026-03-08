/*
 * File: UserDemographicsFields.tsx
 * Purpose: Form fields for birthDate, gender and phone.
 * Relies on i18n keys in the users locale namespace.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, type ChangeEvent, useMemo } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Input } from '../../../ui/Input/Input'
import { SearchableSelect } from '../../../ui/SearchableSelect/SearchableSelect'
import { Text } from '../../../ui/Text/Text'
import type { SelectOption } from '../../../ui/SearchableSelect/SearchableSelect.types'
import type { useT } from '../../../shared/i18n/useT'
import type { UserDemographicsFormState } from '../hooks/useUserDemographicsForm'

type Props = Omit<UserDemographicsFormState, 'saveForUser'> & {
  t: ReturnType<typeof useT>
}

export function UserDemographicsFields(props: Props): ReactElement {
  const genderOptions: SelectOption[] = useMemo(
    () => [
      { value: '', label: props.t('ui.users.form.gender.placeholder') },
      { value: 'female', label: props.t('ui.users.form.gender.female') },
      { value: 'male', label: props.t('ui.users.form.gender.male') },
      { value: 'other', label: props.t('ui.users.form.gender.other') },
    ],
    [props.t]
  )

  return (
    <Stack gap="md">
      <Stack gap="xs">
        <Text size="sm" className="font-medium">
          {props.t('ui.users.form.birthDate.label')}
        </Text>
        <Input
          type="date"
          value={props.birthDate}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            props.setBirthDate(e.target.value)
          }}
          data-testid="user-birthdate-input"
        />
      </Stack>
      <Stack gap="xs">
        <Text size="sm" className="font-medium">
          {props.t('ui.users.form.gender.label')}
        </Text>
        <SearchableSelect
          options={genderOptions}
          value={props.gender}
          onChange={props.setGender}
          searchable={false}
          data-testid="user-gender-select"
        />
      </Stack>
      <Stack gap="xs">
        <Text size="sm" className="font-medium">
          {props.t('ui.users.form.phone.label')}
        </Text>
        <Input
          type="tel"
          value={props.phone}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            props.setPhone(e.target.value)
          }}
          placeholder={props.t('ui.users.form.phone.placeholder')}
          data-testid="user-phone-input"
        />
      </Stack>
    </Stack>
  )
}
