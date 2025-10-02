/*
 * File: UsersPageLayout.tsx
 * Purpose: Shared layout wrapper for admin users pages.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ReactNode } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { useT } from '../../../shared/i18n/useT'

export interface UsersPageLayoutProps {
  readonly titleKey: string
  readonly subtitleKey?: string
  readonly actions?: ReactNode
  readonly children: ReactNode
}

export function UsersPageLayout(props: UsersPageLayoutProps): ReactElement {
  const t: ReturnType<typeof useT> = useT()
  return (
    <Stack as="section" gap="lg" className="mx-auto max-w-6xl px-6 py-8">
      <Stack
        as="div"
        gap="md"
        className="md:flex md:items-center md:justify-between"
      >
        <Stack gap="sm">
          <Heading level={1} size="lg">
            {t(props.titleKey)}
          </Heading>
          {props.subtitleKey ? (
            <Text size="sm" className="text-neutral-500">
              {t(props.subtitleKey)}
            </Text>
          ) : null}
        </Stack>
        {props.actions ?? null}
      </Stack>
      <Stack gap="md">{props.children}</Stack>
    </Stack>
  )
}
