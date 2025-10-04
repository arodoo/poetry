/*
 * File: sellerCodeEditHandlers.ts
 * Purpose: Event handlers for seller code edit form.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { FormEvent } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import type * as SC from '../components/useSellerCodesFormState'
import type { UpdateSellerCodeInput } from '../model/SellerCodesSchemas'

export function updateSellerCodeSubmitHandler(
  formState: SC.SellerCodesFormState,
  _userId: number,
  _version: string,
  onSuccess: (input: UpdateSellerCodeInput) => void
): (event: FormEvent<HTMLFormElement>) => void {
  return (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const input: UpdateSellerCodeInput = {
      code: formState.code,
      userId: Number(formState.userId),
      status: formState.status,
      ...(formState.organizationId && { organizationId: formState.organizationId }),
    }
    onSuccess(input)
  }
}

export function updateSellerCodeCancelHandler(
  navigate: NavigateFunction,
  sellerCodeId: string,
  locale: string
): () => void {
  return (): void => {
    void navigate(`/${locale}/seller-codes/${sellerCodeId}`)
  }
}
