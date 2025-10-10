/*
 File: useTokensFormState.ts
 Purpose: Custom hook for managing tokens form state with validation
 and controlled inputs. Follows established form state pattern used
 in other features. All Rights Reserved. Arodi Emmanuel
*/
import { useState } from 'react'
import type { TokenBundle } from '../model/TokensSchemas'

export interface TokensFormState {
  theme: string
  font: string
  fontSize: string
  spacing: string
  radius: string
  shadow: string
}

export interface UseTokensFormStateResult {
  formState: TokensFormState
  setField: (field: keyof TokensFormState, value: string) => void
  resetForm: (initial: TokensFormState) => void
}

export function useTokensFormState(
  initial: TokenBundle['current']
): UseTokensFormStateResult {
  const [formState, setFormState] = useState<TokensFormState>({
    theme: initial.theme,
    font: initial.font,
    fontSize: initial.fontSize,
    spacing: initial.spacing,
    radius: initial.radius,
    shadow: initial.shadow,
  })

  const setField: (field: keyof TokensFormState, value: string) => void = (
    field: keyof TokensFormState,
    value: string
  ): void => {
    setFormState((prev: TokensFormState): TokensFormState => ({
      ...prev,
      [field]: value,
    }))
  }

  const resetForm: (initial: TokensFormState) => void = (
    initial: TokensFormState
  ): void => {
    setFormState(initial)
  }

  return { formState, setField, resetForm }
}
