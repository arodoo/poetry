/*
 * File: UsersPasswordField.tsx
 * Purpose: Isolated password field component to reduce line count.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, type ChangeEvent } from 'react'
import { Stack } from '../../../../ui/Stack/Stack'
import { Input } from '../../../../ui/Input/Input'
import { Text } from '../../../../ui/Text/Text'
import type { useT } from '../../../../shared/i18n/useT'

export interface UsersPasswordFieldProps {
  readonly value: string
  readonly onChange: (value: string) => void
  readonly t: ReturnType<typeof useT>
}

export function UsersPasswordField(
  props: UsersPasswordFieldProps
): ReactElement {
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    props.onChange(e.target.value)
  }
  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {props.t('ui.users.form.password.label')}
      </Text>
      <Input
        type="password"
        value={props.value}
        onChange={handleChange}
        placeholder={props.t('ui.users.form.password.placeholder')}
        required
        data-testid="user-password-input"
      />
      <Text size="sm" className="text-[var(--color-textMuted)]">
        {props.t('ui.users.form.password.hint')}
      </Text>
    </Stack>
  )
}
