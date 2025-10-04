/*
 * File: sellerCodeCreateHandlers.ts
 * Purpose: Event handlers for seller code create page (submit,
 * cancel, etc.).
 * All Rights Reserved. Arodi Emmanuel
 */
import type { FormEvent } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import type * as SC from '../components/useSellerCodesFormState'
import type { CreateSellerCodeInput } from '../model/SellerCodesSchemas'

export function createSellerCodeSubmitHandler(
  formState: SC.SellerCodesFormState,
  onSuccess: (input: CreateSellerCodeInput) => void
): (event: FormEvent<HTMLFormElement>) => void {
  return (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const input: CreateSellerCodeInput = {
      code: formState.code,
      userId: Number(formState.userId),
      status: formState.status,
      ...(formState.orgId && { orgId: formState.orgId }),
    }
    onSuccess(input)
  }
}

export function createSellerCodeCancelHandler(
  navigate: NavigateFunction,
  locale: string
): () => void {
  return (): void => {
    void navigate(`/${locale}/seller-codes`)
  }
}
