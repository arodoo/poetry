/*
 * File: MembershipDetailPage.tsx
 * Purpose: Show membership details (MVP)
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useMembershipDetailQuery } from '../hooks/useMembershipsQueries'

export default function MembershipDetailPage(): ReactElement {
  const { id } = useParams<{ id: string }>()
  const t = useT()
  const { data, isLoading, isError } = useMembershipDetailQuery(
    id || ''
  )

  if (isLoading) {
    return <div>{t('ui.memberships.status.loading')}</div>
  }

  if (isError) {
    return <div>{t('ui.memberships.status.error')}</div>
  }

  return (
    <div>
      <h1>{t('ui.memberships.detail.title')}</h1>
      <p>ID: {data?.id}</p>
      <p>User ID: {data?.userId}</p>
      <p>Subscription ID: {data?.subscriptionId}</p>
      <p>Seller Code: {data?.sellerCode}</p>
      <p>Status: {data?.status}</p>
    </div>
  )
}
