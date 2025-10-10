/*
 File: tokensSubmitHandlers.ts
 Purpose: Submit and cancel handlers for tokens admin page. Follows
 established handler pattern with proper type safety and separation
 of concerns. All Rights Reserved. Arodi Emmanuel
*/
import type { FormEvent } from 'react'
import type { TokensFormState } from './useTokensFormState'
import type { UpdateSelectionInput } from '../api/tokensApi'

export function createTokensSubmitHandler(
  formState: TokensFormState,
  onSubmit: (input: UpdateSelectionInput) => void
): (e: FormEvent<HTMLFormElement>) => void {
  return (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const input: UpdateSelectionInput = {
      theme: formState.theme,
      font: formState.font,
      fontSize: formState.fontSize,
      spacing: formState.spacing,
      radius: formState.radius,
      shadow: formState.shadow,
    }

    onSubmit(input)
  }
}

export function createTokensCancelHandler(
  resetForm: (initial: TokensFormState) => void,
  initial: TokensFormState
): () => void {
  return (): void => {
    resetForm(initial)
  }
}
