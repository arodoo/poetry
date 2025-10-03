/*
 * File: buildSellerCodeEditSubmit.ts
 * Purpose: Build submit handler for seller code edit form. It returns a
 * form submit handler that calls the provided mutation with the correct
 * payload and navigation behavior. This helper centralizes submit logic
 * so page components remain small and focused.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { NavigateFunction } from 'react-router-dom'
import type { UseMutationResult } from '@tanstack/react-query'
import type * as SC from '../components/useSellerCodesFormState'
import type { UpdateSellerCodeInput } from '../model/SellerCodesSchemas'
import type { MutationVariables } from '../hooks/useSellerCodesMutationHelpers'
type MutationVars<T> = MutationVariables<T>
import { updateSellerCodeSubmitHandler } from './sellerCodeEditHandlers'

export function buildEditSubmitHandler(
  sellerCode: { version: string } | undefined,
  formState: SC.SellerCodesFormState,
  sellerCodeId: string,
  mutation: UseMutationResult<
    unknown,
    unknown,
    MutationVars<UpdateSellerCodeInput>
  >,
  navigate: NavigateFunction,
  locale: string,
  t: (key: string) => string,
  toast: { push: (message: string) => void }
): (e: React.FormEvent<HTMLFormElement>) => void {
  return sellerCode
    ? updateSellerCodeSubmitHandler(
        formState,
        sellerCode.version,
        (input: UpdateSellerCodeInput): void => {
          mutation.mutate(
            { id: sellerCodeId, input },
            {
              onSuccess: (): void => {
                toast.push(t('ui.sellerCodes.toast.update.success'))
                void navigate(`/${locale}/seller-codes/${sellerCodeId}`)
              },
              onError: (): void => {
                toast.push(t('ui.sellerCodes.toast.update.error'))
              },
            }
          )
        }
      )
    : (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
      }
}
