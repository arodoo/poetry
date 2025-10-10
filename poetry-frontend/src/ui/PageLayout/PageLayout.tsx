/*
 * File: PageLayout.tsx
 * Purpose: Generic page layout component for all admin pages with header,
 * breadcrumbs, and action buttons. All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ReactNode } from 'react'
import { Stack } from '../Stack/Stack'
import { Heading } from '../Heading/Heading'
import { Text } from '../Text/Text'

export interface PageLayoutProps {
  readonly title: string
  readonly subtitle?: string
  readonly actions?: ReactNode
  readonly breadcrumbs?: ReactNode
  readonly children: ReactNode
}

export function PageLayout(props: PageLayoutProps): ReactElement {
  return (
    <Stack
      as="section"
      gap="lg"
      className="w-full px-4 py-4"
    >
      {props.breadcrumbs ?? null}
      <div className="sm:flex sm:items-center sm:justify-between">
        <Stack gap="xs">
          <Heading level={1} size="lg" className="font-semibold">
            {props.title}
          </Heading>
          {props.subtitle ? (
            <Text
              size="sm"
              className={[
                'text-[var(--color-textMuted)]',
                'dark:text-[var(--color-textSubtle)]',
              ].join(' ')}
            >
              {props.subtitle}
            </Text>
          ) : null}
        </Stack>
        {props.actions ? (
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            {props.actions}
          </div>
        ) : null}
      </div>
      <div className="mt-4">{props.children}</div>
    </Stack>
  )
}
