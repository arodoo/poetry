/*
 * File: ThemeCreatorFormView.tsx
 * Purpose: Presentational form for the Theme Creator. Composes header,
 * colors grid and submit button into a single form element.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { ThemeCreatorHeader } from './ThemeCreatorHeader'
import { ThemeCreatorColorsGrid } from './ThemeCreatorColorsGrid'
import type { TokenTheme } from '../../model/TokensSchemas'

interface Props {
  readonly name: string
  readonly colors: Record<string, string>
  readonly themes: readonly TokenTheme[]
  readonly onNameChange: (v: string) => void
  readonly onBaseChange: (key: string) => void
  readonly onColorChange: (key: string, v: string) => void
  readonly onSubmit: () => void
  readonly isSubmitting: boolean
  readonly t: (k: string) => string
}

export function ThemeCreatorFormView(p: Props): ReactElement {
  return (
    <form
      data-testid="theme-creator-form"
      onSubmit={(e): void => {
        e.preventDefault()
        p.onSubmit()
      }}
      className="space-y-md"
    >
      <ThemeCreatorHeader
        name={p.name}
        themes={p.themes}
        onNameChange={p.onNameChange}
        onBaseChange={p.onBaseChange}
        t={p.t}
      />
      <ThemeCreatorColorsGrid
        colors={p.colors}
        onColorChange={p.onColorChange}
      />
      <button
        data-testid="theme-creator-submit"
        type="submit"
        disabled={!p.name.trim() || p.isSubmitting}
        className="bg-primary text-onPrimary px-md py-sm rounded-md
                   disabled:opacity-50 text-sm"
      >
        {p.t('ui.tokens.creator.submit')}
      </button>
    </form>
  )
}
