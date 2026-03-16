import { type ReactElement, useState } from 'react'
import type { TokenTheme } from '../../model/TokensSchemas'
import { useThemeListQuery } from '../../hooks/useThemeListQuery'
import { useDeleteThemeMutation } from '../../hooks/useDeleteThemeMutation'
import { useToast } from '../../../../shared/toast/toastContext'

interface Props {
  readonly themes: readonly TokenTheme[]
  readonly t: (k: string) => string
  readonly onEditTheme: (theme: TokenTheme & { id: number }) => void
}

export function ThemeList(props: Props): ReactElement {
  const toast = useToast()
  const { data: themeList, isLoading } = useThemeListQuery()
  const deleteMutation = useDeleteThemeMutation()
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleDelete = async (id: number, name: string): Promise<void> => {
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

  const handleEdit = (theme: TokenTheme): void => {
    const fullTheme = themeList?.find((t) => t.key === theme.key)
    if (fullTheme?.id) {
      props.onEditTheme({
        ...theme,
        id: fullTheme.id,
      })
    }
  }

  if (isLoading) {
    return (
      <div className="text-sm text-textMuted">
        {props.t('ui.tokens.list.loading')}
      </div>
    )
  }

  const customThemes = props.themes.filter((t) => !t.key.startsWith('default-'))

  if (customThemes.length === 0) {
    return (
      <div className="text-sm text-textMuted">
        {props.t('ui.tokens.list.empty')}
      </div>
    )
  }

  return (
    <div className="space-y-sm">
      <h4 className="font-medium text-sm text-text">
        {props.t('ui.tokens.list.title')}
      </h4>
      <div className="space-y-xs">
        {customThemes.map((theme) => {
          const fullTheme = themeList?.find((t) => t.key === theme.key)
          const isActive = fullTheme?.active === true

          return (
            <div
              key={theme.key}
              className="flex items-center justify-between p-sm bg-surface border border-border rounded-md"
            >
              <div className="flex items-center gap-sm">
                <div className="flex gap-xs">
                  {Object.values(theme.colors)
                    .slice(0, 4)
                    .map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-sm border border-border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                </div>
                <span className="text-sm font-medium text-text">
                  {theme.label}
                </span>
                {isActive && (
                  <span className="text-xs bg-primary/20 text-primary px-xs py-0.5 rounded">
                    {props.t('ui.tokens.list.active')}
                  </span>
                )}
              </div>
              <div className="flex gap-xs">
                <button
                  type="button"
                  onClick={() => handleEdit(theme)}
                  className="text-xs text-primary hover:underline"
                >
                  {props.t('ui.tokens.list.edit')}
                </button>
                <button
                  type="button"
                  disabled={
                    deletingId === (fullTheme?.id ?? null) ||
                    deleteMutation.isPending
                  }
                  onClick={() =>
                    fullTheme?.id && handleDelete(fullTheme.id, theme.label)
                  }
                  className="text-xs text-error hover:underline disabled:opacity-50"
                >
                  {deletingId === fullTheme?.id
                    ? props.t('ui.tokens.list.deleting')
                    : props.t('ui.tokens.list.delete')}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
