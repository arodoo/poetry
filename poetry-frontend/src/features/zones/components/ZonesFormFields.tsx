
/*
 * File: ZonesFormFields.tsx
 * Purpose: Renders form input fields for zone creation and editing, including name, description, and manager selection. Centralizes labels, inputs, and change handlers for consistency and reusability across forms. Supports accessibility and localization for a better user experience.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement, ChangeEvent } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Input } from '../../../ui/Input/Input'
import { Text } from '../../../ui/Text/Text'
import { UserSelect } from '../../../features/seller-codes/components/UserSelect'
import type { I18nKey } from '../../../shared/i18n/generated/keys'

export interface ZonesFormFieldsProps {
  readonly name: string
  readonly description: string
  readonly managerId: string
  readonly onNameChange: (value: string) => void
  readonly onDescriptionChange: (value: string) => void
  readonly onManagerIdChange: (value: string) => void
  readonly t: (key: I18nKey) => string
}

export function ZonesFormFields(
  props: ZonesFormFieldsProps
): ReactElement {
  return (
    <>
      <Stack gap="xs">
        <Text size="sm" className="font-medium">
          {props.t('ui.zones.form.name.label')}
        </Text>
        <Input
          value={props.name}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            props.onNameChange(e.target.value)
          }}
          placeholder={props.t('ui.zones.form.name.placeholder')}
          required
          data-testid="zone-name-input"
        />
      </Stack>
      <Stack gap="xs">
        <Text size="sm" className="font-medium">
          {props.t('ui.zones.form.description.label')}
        </Text>
        <Input
          value={props.description}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            props.onDescriptionChange(e.target.value)
          }}
          placeholder={props.t('ui.zones.form.description.placeholder')}
          data-testid="zone-description-input"
        />
      </Stack>

      <UserSelect
        value={props.managerId}
        onChange={props.onManagerIdChange}
        t={props.t}
        required
      />
    </>
  )
}
