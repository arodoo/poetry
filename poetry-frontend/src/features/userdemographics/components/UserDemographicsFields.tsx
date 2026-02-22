/*
 * File: UserDemographicsFields.tsx
 * Purpose: Form fields for birthDate, gender and phone.
 * Relies on i18n keys in the users locale namespace.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ChangeEvent } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Input } from '../../../ui/Input/Input'
import { Select } from '../../../ui/Select/Select'
import { Text } from '../../../ui/Text/Text'
import type { useT } from '../../../shared/i18n/useT'
import type { UserDemographicsFormState } from '../hooks/useUserDemographicsForm'

type Props = Omit<UserDemographicsFormState, 'saveForUser'> & {
  t: ReturnType<typeof useT>
}

export function UserDemographicsFields(props: Props): ReactElement {
  return (
    <Stack gap="md">
      <Stack gap="xs">
        <Text size="sm" className="font-medium">
          {props.t('ui.users.form.birthDate.label')}
        </Text>
        <Input
          type="date"
          value={props.birthDate}
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            { props.setBirthDate(e.target.value); }
          }
          data-testid="user-birthdate-input"
        />
      </Stack>
      <Stack gap="xs">
        <Text size="sm" className="font-medium">
          {props.t('ui.users.form.gender.label')}
        </Text>
        <Select
          value={props.gender}
          onChange={(e: ChangeEvent<HTMLSelectElement>): void =>
            { props.setGender(e.target.value); }
          }
          data-testid="user-gender-select"
        >
          <option value="">
            {props.t('ui.users.form.gender.placeholder')}
          </option>
          <option value="female">
            {props.t('ui.users.form.gender.female')}
          </option>
          <option value="male">{props.t('ui.users.form.gender.male')}</option>
          <option value="other">{props.t('ui.users.form.gender.other')}</option>
        </Select>
      </Stack>
      <Stack gap="xs">
        <Text size="sm" className="font-medium">
          {props.t('ui.users.form.phone.label')}
        </Text>
        <Input
          type="tel"
          value={props.phone}
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            { props.setPhone(e.target.value); }
          }
          placeholder={props.t('ui.users.form.phone.placeholder')}
          data-testid="user-phone-input"
        />
      </Stack>
    </Stack>
  )
}
