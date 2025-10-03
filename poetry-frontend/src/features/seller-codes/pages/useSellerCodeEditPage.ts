/*
 * File: useSellerCodeEditPage.ts
 * Purpose: Custom hook for seller code edit page logic.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useParams, useNavigate } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { useSellerCodesFormState } from '../components/useSellerCodesFormState'
import { useUpdateSellerCodeMutation } from '../hooks/useSellerCodesMutations'
import { useSellerCodeDetailQuery } from '../hooks/useSellerCodesQueries'
import type { SellerCodeDetail } from '../model/SellerCodesSchemas'
import { buildSellerCodeEditBreadcrumbs } from './sellerCodeBreadcrumbHelpers'
import { buildEditSubmitHandler } from './buildSellerCodeEditSubmit'
import { updateSellerCodeCancelHandler } from './sellerCodeEditHandlers'

export function useSellerCodeEditPage(): {
  detailQuery: ReturnType<typeof useSellerCodeDetailQuery>
  formState: ReturnType<typeof useSellerCodesFormState>
  breadcrumbs: readonly { label: string; href?: string }[]
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleCancel: () => void
  mutation: ReturnType<typeof useUpdateSellerCodeMutation>
  t: ReturnType<typeof useT>
  sellerCode: SellerCodeDetail | undefined
} {
  const params: Record<string, string | undefined> = useParams()
  const sellerCodeId: string = params['id'] ?? ''
  const t: ReturnType<typeof useT> = useT()
  const { locale }: ReturnType<typeof useLocale> = useLocale()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const toast: ReturnType<typeof useToast> = useToast()
  const detailQuery: ReturnType<typeof useSellerCodeDetailQuery> =
    useSellerCodeDetailQuery(sellerCodeId)
  const mutation: ReturnType<typeof useUpdateSellerCodeMutation> =
    useUpdateSellerCodeMutation()
  const sellerCode: SellerCodeDetail | undefined = detailQuery.data
  const formState: ReturnType<typeof useSellerCodesFormState> =
    useSellerCodesFormState(
      sellerCode
        ? {
            code: sellerCode.code,
            orgId: sellerCode.orgId ?? '',
            status: sellerCode.status,
          }
        : undefined
    )
  const breadcrumbs: readonly { label: string; href?: string }[] =
    buildSellerCodeEditBreadcrumbs(sellerCodeId, locale, t)
  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void =
    buildEditSubmitHandler(
      sellerCode,
      formState,
      sellerCodeId,
      mutation,
      navigate,
      locale,
      t,
      toast
    )
  const handleCancel: () => void = updateSellerCodeCancelHandler(
    navigate,
    sellerCodeId,
    locale
  )
  return {
    detailQuery,
    formState,
    breadcrumbs,
    handleSubmit,
    handleCancel,
    mutation,
    t,
    sellerCode,
  }
}
