/*
 * File: PublicLoginField.tsx
 * Purpose: Reusable login input with error rendering.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ChangeEvent, ReactElement } from 'react'
import { Input } from '../../../ui/Input/Input'
import { Text } from '../../../ui/Text/Text'

interface PublicLoginFieldProps {
  readonly id: string
  readonly name: string
  readonly label: string
  readonly value: string
  readonly autoComplete: string
  readonly onValueChange: (value: string) => void
  readonly error?: string | undefined
  readonly type?: string | undefined
}

export function PublicLoginField(props: PublicLoginFieldProps): ReactElement {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    props.onValueChange(event.target.value)
  }

  return (
    <label className="flex flex-col gap-1" htmlFor={props.id}>
      <span className="text-sm font-medium">{props.label}</span>
      <Input
        id={props.id}
        name={props.name}
        type={props.type ?? 'text'}
        value={props.value}
        onChange={handleChange}
        autoComplete={props.autoComplete}
        invalid={Boolean(props.error)}
        data-testid={`login-${props.name}-input`}
      />
      {props.error ? (
        <Text size="sm" className="text-[color:var(--color-danger,#b91c1c)]">
          {props.error}
        </Text>
      ) : null}
    </label>
  )
}
