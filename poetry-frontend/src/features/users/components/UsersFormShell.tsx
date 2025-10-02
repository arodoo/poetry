/*
 * File: UsersFormShell.tsx
 * Purpose: Placeholder form wrapper for users create and edit flows.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ReactNode } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Stack } from '../../../ui/Stack/Stack'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'

export interface UsersFormShellProps {
  readonly title: string
  readonly description: string
  readonly children?: ReactNode
}

export function UsersFormShell(props: UsersFormShellProps): ReactElement {
  return (
    <Card padding="lg">
      <Stack gap="md">
        <Heading level={2} size="md">
          {props.title}
        </Heading>
        <Text size="sm" className="text-[var(--color-textMuted)]">
          {props.description}
        </Text>
        <Stack gap="sm" as="div">
          {props.children ?? null}
        </Stack>
      </Stack>
    </Card>
  )
}
