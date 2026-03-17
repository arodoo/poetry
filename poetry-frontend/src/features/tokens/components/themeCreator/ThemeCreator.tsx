/*
 * File: ThemeCreator.tsx
 * Purpose: Container component wiring state, mutation and toast for
 * creating and editing custom themes. Delegates rendering to ThemeCreatorFormView.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, useState } from 'react'
import { useCreateThemeMutation } from '../../hooks/useCreateThemeMutation'
import { useUpdateThemeMutation } from '../../hooks/useUpdateThemeMutation'
import { useThemeCreatorState } from '../../hooks/useThemeCreatorState'
import { useToast } from '../../../../shared/toast/toastContext'
import { buildThemeSubmit } from '../../hooks/themeCreatorSubmit'
import { ThemeCreatorFormView } from './ThemeCreatorFormView'
import { ThemeList } from '../../../../ui/ThemeList/ThemeList'
import type { TokenTheme } from '../../model/TokensSchemas'
import type { ThemeListItemData } from '../../../../ui/ThemeList/ThemeList.types'
import { useThemeListQuery } from '../../hooks/useThemeListQuery'
import { useDeleteThemeMutation } from '../../hooks/useDeleteThemeMutation'

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
  const deleteMutation = useDeleteThemeMutation()
  const { data: themeList } = useThemeListQuery()
  const st = useThemeCreatorState(props.themes)
  const [editingTheme, setEditingTheme] = useState<EditableTheme | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

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

  const handleDeleteTheme = async (id: number, name: string): Promise<void> => {
    if (
      !window.confirm(props.t('ui.tokens.list.deleteConfirm') + ` "${name}"?`)
    ) {
      return
    }
    setDeletingId(id)
    try {
      await deleteMutation.mutateAsync(id)
      toast.push(props.t('ui.tokens.list.deleteSuccess'))
    } catch {
      toast.push(props.t('ui.tokens.list.deleteError'))
    } finally {
      setDeletingId(null)
    }
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending

  const customThemes: ThemeListItemData[] = props.themes
    .filter((t) => !t.key.startsWith('default-'))
    .map((theme) => {
      const fullTheme = themeList?.find((t) => t.key === theme.key)
      return {
        key: theme.key,
        label: theme.label,
        colors: theme.colors,
        id: fullTheme?.id ?? 0,
        active: fullTheme?.active ?? false,
      }
    })
    .filter((t) => t.id > 0)

  return (
    <div
      data-testid="theme-creator"
      className="p-md bg-surface border border-border rounded-md"
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
        themes={customThemes}
        t={props.t}
        onEdit={handleEditTheme}
        onDelete={handleDeleteTheme}
        isDeleting={(id: number): boolean => deletingId === id}
        isLoading={!themeList}
      />
    </div>
  )
}
