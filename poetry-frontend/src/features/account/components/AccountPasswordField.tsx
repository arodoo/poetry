/*
 * File: AccountPasswordField.tsx
 * Purpose: Reusable password input block with label, helper, and error text.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ChangeEvent, type ReactElement } from 'react'
import { Label } from '../../../ui/Label/Label'
import { Text } from '../../../ui/Text/Text'
import PasswordInput from '../../../ui/PasswordInput/PasswordInput'

export interface AccountPasswordFieldProps {
  readonly fieldId: string
  readonly label: string
  readonly value: string
  readonly onChange: (value: string) => void
  readonly toggleShow: string
  readonly toggleHide: string
  readonly autoComplete?: string | undefined
  readonly required?: boolean
  readonly helperText?: string | null
  readonly error?: string | null
}

export function AccountPasswordField(
  props: AccountPasswordFieldProps
): ReactElement {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={props.fieldId} requiredMark={props.required ?? false}>
        {props.label}
      </Label>
      <PasswordInput
        id={props.fieldId}
        name={props.fieldId}
        value={props.value}
        onChange={(event: ChangeEvent<HTMLInputElement>): void => {
          props.onChange(event.target.value)
        }}
        required={props.required}
        autoComplete={props.autoComplete}
        showLabel={props.toggleShow}
        hideLabel={props.toggleHide}
      />
      {props.helperText ? (
        <Text size="sm" className="text-[color:var(--color-muted,#6b7280)]">
          {props.helperText}
        </Text>
      ) : null}
      {props.error ? (
        <Text
          size="sm"
          role="alert"
          className="text-[color:var(--color-danger,#dc2626)]"
        >
          {props.error}
        </Text>
      ) : null}
    </div>
  )
}
