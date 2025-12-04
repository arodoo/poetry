/*
 * File: useSellerCodeEditPage.ts
 * Purpose: Custom hook for seller code edit page logic.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useSellerCodesFormState } from '../components/useSellerCodesFormState'
import type { SellerCodeDetail } from '../model/SellerCodesSchemas'
import {
  buildSellerCodeEditBreadcrumbs,
} from '../model/sellerCodeBreadcrumbHelpers'
import { buildEditSubmitHandler } from './buildSellerCodeEditSubmit'
import { updateSellerCodeCancelHandler } from './sellerCodeEditHandlers'
import { useSellerCodeEditDependencies } from './useSellerCodeEditDependencies'

export function useSellerCodeEditPage(): {
  detailQuery: ReturnType<typeof useSellerCodeEditDependencies>['detailQuery']
  formState: ReturnType<typeof useSellerCodesFormState>
  breadcrumbs: readonly { label: string; href?: string }[]
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleCancel: () => void
  mutation: ReturnType<typeof useSellerCodeEditDependencies>['mutation']
  t: ReturnType<typeof useSellerCodeEditDependencies>['t']
  sellerCode: SellerCodeDetail | undefined
} {
  const deps: ReturnType<typeof useSellerCodeEditDependencies> =
    useSellerCodeEditDependencies()
  const sellerCode: SellerCodeDetail | undefined = deps.detailQuery.data
  const formState: ReturnType<typeof useSellerCodesFormState> =
    useSellerCodesFormState(
      sellerCode
        ? {
            code: sellerCode.code ?? '',
            organizationId: sellerCode.organizationId ?? '',
            userId: sellerCode.userId ? String(sellerCode.userId) : '',
            status: (sellerCode.status ?? 'inactive') as
              | 'active'
              | 'inactive'
              | 'expired',
          }
        : undefined
    )
  const breadcrumbs: readonly { label: string; href?: string }[] =
    buildSellerCodeEditBreadcrumbs(deps.sellerCodeId, deps.locale, deps.t)
  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void =
    buildEditSubmitHandler(
      sellerCode ? { version: String(sellerCode.version) } : undefined,
      formState,
      deps.userId,
      deps.sellerCodeId,
      deps.mutation,
      deps.navigate,
      deps.locale,
      deps.t,
      deps.toast
    )
  const handleCancel: () => void = updateSellerCodeCancelHandler(
    deps.navigate,
    deps.sellerCodeId,
    deps.locale
  )
  return {
    detailQuery: deps.detailQuery,
    formState,
    breadcrumbs,
    handleSubmit,
    handleCancel,
    mutation: deps.mutation,
    t: deps.t,
    sellerCode,
  }
}
