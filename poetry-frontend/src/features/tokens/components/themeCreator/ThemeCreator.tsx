import { type ReactElement, useState } from 'react'
import { useCreateThemeMutation } from '../../hooks/useCreateThemeMutation'
import { useUpdateThemeMutation } from '../../hooks/useUpdateThemeMutation'
import { useThemeCreatorState } from '../../hooks/useThemeCreatorState'
import { useToast } from '../../../../shared/toast/toastContext'
import { buildThemeSubmit } from '../../hooks/themeCreatorSubmit'
import { ThemeCreatorFormView } from './ThemeCreatorFormView'
import { ThemeList } from './ThemeList'
import type { TokenTheme } from '../../model/TokensSchemas'

interface EditableTheme extends TokenTheme {
  id: number
}

interface Props {
  readonly themes: readonly TokenTheme[]
  readonly t: (k: string) => string
}

export function ThemeCreator(props: Props): ReactElement {
  const toast = useToast()
  const createMutation = useCreateThemeMutation()
  const updateMutation = useUpdateThemeMutation()
  const st = useThemeCreatorState(props.themes)
  const [editingTheme, setEditingTheme] = useState<EditableTheme | null>(null)

  const handleSubmit = buildThemeSubmit({
    mutation: createMutation,
    toast,
    t: props.t,
    name: st.name,
    colors: st.colors,
    reset: st.reset,
  })

  const handleUpdate = async (): Promise<void> => {
    if (!editingTheme) return
    try {
      await updateMutation.mutateAsync({
        id: editingTheme.id,
        name: st.name,
        colors: st.colors,
      })
      toast.push(props.t('ui.tokens.creator.updateSuccess'))
      setEditingTheme(null)
      st.reset()
    } catch {
      toast.push(props.t('ui.tokens.creator.updateError'))
    }
  }

  const handleCancelEdit = (): void => {
    setEditingTheme(null)
    st.reset()
  }

  const handleEditTheme = (theme: EditableTheme): void => {
    setEditingTheme(theme)
    st.setName(theme.label)
    st.setColors({ ...theme.colors })
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending

  return (
    <div
      data-testid="theme-creator"
      className="p-md bg-surface border border-border rounded-md space-y-lg"
    >
      <div>
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
          onSubmit={editingTheme ? handleUpdate : handleSubmit}
          isSubmitting={isSubmitting}
          isEditing={!!editingTheme}
          t={props.t}
        />
        {editingTheme && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="mt-sm text-sm text-textMuted hover:text-text underline"
          >
            {props.t('ui.tokens.creator.cancelEdit')}
          </button>
        )}
      </div>

      <ThemeList
        themes={props.themes}
        t={props.t}
        onEditTheme={handleEditTheme}
      />
    </div>
  )
}
