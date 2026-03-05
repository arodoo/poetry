/*
 * File: themeCreatorSubmit.ts
 * Purpose: Factory for the Theme Creator submit handler. Builds the
 * key from the name, calls the mutation and triggers toast feedback.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { UseMutationResult } from '@tanstack/react-query'
import type { ThemeResponse } from '../../../../api/generated'
import type { CreateThemeInput } from '../../api/themeCreatorApi'

interface Deps {
  mutation: UseMutationResult<ThemeResponse, unknown, CreateThemeInput>
  toast: { push: (msg: string) => void }
  t: (k: string) => string
  name: string
  colors: Record<string, string>
  reset: () => void
}

export function buildThemeSubmit(d: Deps): () => void {
  return (): void => {
    const key = d.name.trim().toLowerCase().replace(/\s+/g, '-')
    d.mutation.mutate(
      { key, name: d.name.trim(), colors: { ...d.colors } },
      {
        onSuccess: (): void => {
          d.toast.push(d.t('ui.tokens.creator.success'))
          d.reset()
        },
        onError: (): void => {
          d.toast.push(d.t('ui.tokens.creator.error'))
        },
      }
    )
  }
}
