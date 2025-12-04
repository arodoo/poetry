/*
 * File: useSellerCodeEditDependencies.ts
 * Purpose: Hook that gathers all dependencies for edit page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useParams, useNavigate } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { useMeQuery } from '../../auth/hooks/useMe'
import { useUpdateSellerCodeMutation } from './mutations/useSellerCodesMutations'
import { useSellerCodeDetailQuery } from '../hooks/useSellerCodesQueries'

export function useSellerCodeEditDependencies(): {
  sellerCodeId: string
  t: ReturnType<typeof useT>
  locale: string
  navigate: ReturnType<typeof useNavigate>
  toast: ReturnType<typeof useToast>
  userId: number
  detailQuery: ReturnType<typeof useSellerCodeDetailQuery>
  mutation: ReturnType<typeof useUpdateSellerCodeMutation>
} {
  const params: Record<string, string | undefined> = useParams()
  const sellerCodeId: string = params['id'] ?? ''
  const t: ReturnType<typeof useT> = useT()
  const { locale }: ReturnType<typeof useLocale> = useLocale()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const toast: ReturnType<typeof useToast> = useToast()
  const meQuery: ReturnType<typeof useMeQuery> = useMeQuery()
  const detailQuery: ReturnType<typeof useSellerCodeDetailQuery> =
    useSellerCodeDetailQuery(sellerCodeId)
  const mutation: ReturnType<typeof useUpdateSellerCodeMutation> =
    useUpdateSellerCodeMutation()
  return {
    sellerCodeId,
    t,
    locale,
    navigate,
    toast,
    userId: Number(meQuery.data?.id),
    detailQuery,
    mutation,
  }
}
