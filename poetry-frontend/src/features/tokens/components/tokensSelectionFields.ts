/*
 * File: tokensSelectionFields.ts
 * Purpose: Provides the fields metadata used by `TokensSelectionForm` so the
 * form stays within the repo max-lines limit. Pure data-only module.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { TokenBundle } from '../model/TokensSchemas'
import type { I18nKey } from '../../../shared/i18n/generated/keys'

export function buildTokenFields(bundle: TokenBundle): readonly {
  key: string
  labelKey: I18nKey
  options: readonly { key: string }[]
}[] {
  const asOptions = (
    arr: readonly { key: string }[] | undefined
  ): readonly { key: string }[] =>
    (arr as readonly { key: string }[] | undefined) ?? []

  return [
    {
      key: 'theme',
      labelKey: 'ui.tokens.fields.theme',
      options: asOptions(bundle.themes as unknown as { key: string }[]),
    },
    {
      key: 'font',
      labelKey: 'ui.tokens.fields.font',
      options: asOptions(bundle.fonts as unknown as { key: string }[]),
    },
    {
      key: 'fontSize',
      labelKey: 'ui.tokens.fields.fontSize',
      options: asOptions(bundle.fontSizes as unknown as { key: string }[]),
    },
    {
      key: 'spacing',
      labelKey: 'ui.tokens.fields.spacing',
      options: asOptions(bundle.spacings as unknown as { key: string }[]),
    },
    {
      key: 'radius',
      labelKey: 'ui.tokens.fields.radius',
      options: asOptions(bundle.radius as unknown as { key: string }[]),
    },
    {
      key: 'shadow',
      labelKey: 'ui.tokens.fields.shadow',
      options: asOptions(bundle.shadows as unknown as { key: string }[]),
    },
  ]
}
