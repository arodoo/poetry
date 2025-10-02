/*
 * File: FormLayoutComponents.tsx
 * Purpose: Helper components for FormLayout.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Heading } from '../Heading/Heading'
import { Text } from '../Text/Text'

export function FormHeader(props: {
  title?: string | undefined
  description?: string | undefined
}): ReactElement | null {
  if (!props.title && !props.description) return null
  return (
    <div>
      {props.title ? (
        <Heading level={2} size="md" className="font-semibold">
          {props.title}
        </Heading>
      ) : null}
      {props.description ? (
        <Text
          size="sm"
          className={[
            'mt-1',
            'text-[var(--color-textMuted)]',
            'dark:text-[var(--color-textSubtle)]',
          ].join(' ')}
        >
          {props.description}
        </Text>
      ) : null}
    </div>
  )
}

export function SectionHeader(props: {
  title?: string | undefined
  description?: string | undefined
}): ReactElement | null {
  if (!props.title && !props.description) return null
  return (
    <div
      className={[
        'border-b',
        'border-[var(--color-border)]',
        'pb-4',
        'dark:border-[var(--color-border)]',
      ].join(' ')}
    >
      {props.title ? (
        <Heading level={3} size="sm" className="font-medium">
          {props.title}
        </Heading>
      ) : null}
      {props.description ? (
        <Text
          size="sm"
          className={[
            'mt-1',
            'text-[var(--color-textMuted)]',
            'dark:text-[var(--color-textSubtle)]',
          ].join(' ')}
        >
          {props.description}
        </Text>
      ) : null}
    </div>
  )
}
