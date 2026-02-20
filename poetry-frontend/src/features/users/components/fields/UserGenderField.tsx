/*
 * File: UserGenderField.tsx
 * Purpose: Gender select input (female, male, other) for the user form.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, type ChangeEvent } from 'react'
import { Stack } from '../../../../ui/Stack/Stack'
import { Select } from '../../../../ui/Select/Select'
import { Text } from '../../../../ui/Text/Text'
import type { useT } from '../../../../shared/i18n/useT'

export interface UserGenderFieldProps {
  gender: string
  onGenderChange: (value: string) => void
  t: ReturnType<typeof useT>
}

export function UserGenderField(
  props: UserGenderFieldProps
): ReactElement {
  function handleChange(e: ChangeEvent<HTMLSelectElement>): void {
    props.onGenderChange(e.target.value)
  }
  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {props.t('ui.users.form.gender.label')}
      </Text>
      <Select
        value={props.gender}
        onChange={handleChange}
        data-testid="user-gender-select"
      >
        <option value="">
          {props.t('ui.users.form.gender.placeholder')}
        </option>
        <option value="female">
          {props.t('ui.users.form.gender.female')}
        </option>
        <option value="male">
          {props.t('ui.users.form.gender.male')}
        </option>
        <option value="other">
          {props.t('ui.users.form.gender.other')}
        </option>
      </Select>
    </Stack>
  )
}
