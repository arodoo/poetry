/*
 * File: MembershipEditPageLoading.tsx
 * Purpose: Loading and error states for membership edit page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { PageLayout } from '../../../../ui/PageLayout/PageLayout'
import { Text } from '../../../../ui/Text/Text'

interface MembershipEditPageLoadingProps {
  readonly message: string
}

export function MembershipEditPageLoading({
  message,
}: MembershipEditPageLoadingProps): ReactElement {
  return (
    <PageLayout title="Edit" subtitle="">
      <Text size="sm">{message}</Text>
    </PageLayout>
  )
}
