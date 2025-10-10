/*
 * File: MembershipEditPage.tsx
 * Purpose: Admin membership edit page with ETag conditional updates
 * and form validation using Zod schemas.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { useUpdateMembershipMutation } from '../hooks/useMembershipsMutations'
import { useMembershipDetailWithETag } from '../hooks/useMembershipDetailWithETag'
import type { MembershipResponse } from '../../../api/generated'
import type { MembershipFormValues } from '../components/MembershipFormValues'
import { MembershipEditForm } from './MembershipEditForm'
import { MembershipEditPageLoading } from './MembershipEditPageLoading'
import { createEditSubmitHandler } from './membershipEditHandlers'

export default function MembershipEditPage(): ReactElement {
  const membershipId: string = useParams()['id'] ?? ''
  const t: ReturnType<typeof useT> = useT()
  const { locale }: { locale: string } = useLocale()
  const navigate = useNavigate()
  const { push } = useToast()
  const detailQuery = useMembershipDetailWithETag(membershipId)
  const mutation = useUpdateMembershipMutation()
  const membership: MembershipResponse | undefined =
    detailQuery.data?.membership

  if (detailQuery.isLoading)
    return <MembershipEditPageLoading message={t('ui.memberships.status.loading')} />
  if (detailQuery.isError || !membership || !detailQuery.data?.etag)
    return <MembershipEditPageLoading message={t('ui.memberships.status.error')} />

  const handleSubmit = createEditSubmitHandler(
    membershipId,
    detailQuery.data.etag,
    mutation.mutate,
    navigate,
    locale,
    push,
    t
  )

  return (
    <MembershipEditForm
      membership={membership}
      onSubmit={handleSubmit}
      isSubmitting={mutation.isPending}
      t={t}
    />
  )
}
