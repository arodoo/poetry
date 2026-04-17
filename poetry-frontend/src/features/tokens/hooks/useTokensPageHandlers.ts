/*
 * File: useTokensPageHandlers.ts
 * Purpose: Builds the submit and cancel handlers for AdminTokensPage.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  createTokensSubmitHandler,
  createTokensCancelHandler,
} from './tokensSubmitHandlers'
import { navigateToNewLocale } from './tokensLocaleNav'
import type { UpdateSelectionInput } from '../api/tokensApi'
import type { TokenBundleCurrent } from '../model/TokensSchemas.impl2'
import type { I18nKey } from '../../../shared/i18n/generated/keys'

interface Deps {
  formState: Record<string, string>
  resetForm: (vals: Record<string, string>) => void
  current: TokenBundleCurrent
  t: (k: I18nKey) => string
  toast: { push: (m: string) => void }
  navigate: (path: string, opts?: { replace?: boolean }) => void
  currentPathname: string
  mutate: (
    input: UpdateSelectionInput,
    opts: { onSuccess: () => void; onError: () => void }
  ) => void
}

export function buildTokensPageHandlers(d: Deps) {
  const handleSubmit = createTokensSubmitHandler(
    d.formState,
    (input: UpdateSelectionInput): void => {
      d.mutate(input, {
        onSuccess: () => {
          d.toast.push(d.t('ui.tokens.toast.update.success'))
          navigateToNewLocale(
            d.formState['language'],
            d.currentPathname,
            d.navigate
          )
        },
        onError: () => d.toast.push(d.t('ui.tokens.toast.update.error')),
      })
    }
  )

  const handleCancel = createTokensCancelHandler(d.resetForm, {
    theme: d.current.theme,
    font: d.current.font,
    fontSize: d.current.fontSize,
    spacing: d.current.spacing,
    radius: d.current.radius,
    language: d.current.language,
  })

  return { handleSubmit, handleCancel }
}
