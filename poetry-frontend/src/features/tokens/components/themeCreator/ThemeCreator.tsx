/*
 * File: ThemeCreator.tsx
 * Purpose: Container component wiring state, mutation and toast for
 * creating a custom theme. Delegates rendering to ThemeCreatorFormView.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { useCreateThemeMutation } from '../../hooks/useCreateThemeMutation'
import { useThemeCreatorState } from '../../hooks/useThemeCreatorState'
import { useToast } from '../../../../shared/toast/toastContext'
import { buildThemeSubmit } from '../../hooks/themeCreatorSubmit'
import { ThemeCreatorFormView } from './ThemeCreatorFormView'
import type { TokenTheme } from '../../model/TokensSchemas'

interface Props {
  readonly themes: readonly TokenTheme[]
  readonly t: (k: string) => string
}

export function ThemeCreator(props: Props): ReactElement {
  const toast = useToast()
  const mutation = useCreateThemeMutation()
  const st = useThemeCreatorState(props.themes)
  const handleSubmit = buildThemeSubmit({
    mutation,
    toast,
    t: props.t,
    name: st.name,
    colors: st.colors,
    reset: st.reset,
  })

  return (
    <div
      data-testid="theme-creator"
      className="p-md bg-surface border border-border rounded-md"
    >
      <h3 className="font-semibold text-lg text-text mb-sm">
        {props.t('ui.tokens.creator.title')}
      </h3>
      <p className="text-textMuted text-sm mb-md">
        {props.t('ui.tokens.creator.subtitle')}
      </p>
      <ThemeCreatorFormView
        name={st.name}
        colors={st.colors}
        themes={props.themes}
        onNameChange={st.setName}
        onBaseChange={st.applyBase}
        onColorChange={st.setColor}
        onSubmit={handleSubmit}
        isSubmitting={mutation.isPending}
        t={props.t}
      />
    </div>
  )
}
