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
        <Text size="sm" className="mt-1 text-neutral-600 dark:text-neutral-400">
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
    <div className="border-b border-neutral-200 pb-4 dark:border-neutral-700">
      {props.title ? (
        <Heading level={3} size="sm" className="font-medium">
          {props.title}
        </Heading>
      ) : null}
      {props.description ? (
        <Text size="sm" className="mt-1 text-neutral-500 dark:text-neutral-400">
          {props.description}
        </Text>
      ) : null}
    </div>
  )
}
