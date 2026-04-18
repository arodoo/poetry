/*
 * File: AdminTokensStatusViews.tsx
 * Purpose: Renders loading, error and empty states for the admin
 * tokens page wrapped in the standard PageLayout shell so the
 * theme typography and spacing tokens stay consistent.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ReactNode } from 'react'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { Text } from '../../../ui/Text/Text'

interface Props {
  title: string
  subtitle: string
  crumbs: ReactNode
  message: string
  variant?: 'info' | 'error'
  testId?: string
}

export function AdminTokensStatusView({
  title,
  subtitle,
  crumbs,
  message,
  variant = 'info',
  testId,
}: Props): ReactElement {
  return (
    <PageLayout title={title} subtitle={subtitle}>
      {crumbs}
      <Text
        className={
          variant === 'error' ? 'text-[var(--color-error)]' : undefined
        }
        data-testid={testId}
      >
        {message}
      </Text>
    </PageLayout>
  )
}
