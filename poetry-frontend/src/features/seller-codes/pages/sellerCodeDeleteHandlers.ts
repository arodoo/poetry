/*
 * File: sellerCodeDeleteHandlers.ts
 * Purpose: Small factory helpers that produce the `handleConfirmDelete` and
 * `handleCancel` callbacks used by the SellerCode delete confirmation page.
 * These helpers keep the page file focused on layout and routing while
 * preserving the original runtime behavior of the handlers.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { NavigateFunction } from 'react-router-dom'
// Intentionally keep external dependencies un-typed here to avoid cascading
// type imports across many files. These helpers are tiny behavior-only
// adapters and should not introduce new compile-time coupling.
interface MutationLike {
  // Accept any arguments to remain compatible with react-query's UseMutateFunction
  mutate: (...args: any[]) => void
  isPending?: boolean
}

export function buildHandleCancel(
  navigate: NavigateFunction,
  sellerCodeId: string,
  locale: string
) {
  return function handleCancel(): void {
    void navigate(`/${locale}/seller-codes/${sellerCodeId}`)
  }
}

interface SimpleToast {
  push: (message: string) => void
}

export function buildHandleConfirmDelete(
  mutation: MutationLike,
  sellerCodeId: string,
  sellerCodeDetail: { version?: number } | undefined,
  toast: SimpleToast,
  t: (key: string) => string,
  navigate: NavigateFunction,
  locale: string
) {
  return function handleConfirmDelete(): void {
    if (sellerCodeDetail?.version == null) {
      toast.push(t('ui.sellerCodes.delete.error'))
      return
    }

    mutation.mutate(
      { id: sellerCodeId, version: sellerCodeDetail.version },
      {
        onSuccess: (): void => {
          toast.push(t('ui.sellerCodes.delete.success'))
          void navigate(`/${locale}/seller-codes`)
        },
        onError: (): void => {
          toast.push(t('ui.sellerCodes.delete.error'))
        },
      }
    )
  }
}
