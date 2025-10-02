/*
 * File: UsersRolesFieldStatus.tsx
 * Purpose: Status message component for roles field loading/error states.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Text } from '../../../ui/Text/Text'

export interface UsersRolesFieldStatusProps {
  readonly message: string
  readonly isError: boolean
  readonly label: string
}

export function UsersRolesFieldStatus(
  props: UsersRolesFieldStatusProps
): ReactElement {
  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {props.label}
      </Text>
      <Text
        size="sm"
        className={
          props.isError
            ? 'text-[var(--color-error)]'
            : 'text-[var(--color-textMuted)]'
        }
      >
        {props.message}
      </Text>
    </Stack>
  )
}
