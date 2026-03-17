/*
 * File: ThemeList.tsx
 * Purpose: Reusable component for displaying a list of themes with edit/delete actions.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
import { type ThemeListProps, type ThemeListItemData } from './ThemeList.types'
import * as u from './ThemeList.utils'

function ThemeListItem(props: {
  readonly data: ThemeListItemData
  readonly t: (key: string) => string
  readonly onEdit: (theme: ThemeListItemData) => void
  readonly onDelete: (id: number, name: string) => void
  readonly isDeleting: boolean
}): ReactElement {
  const { data, t } = props
  return (
    <div className={u.item}>
      <div className={u.itemLeft}>
        <div className={u.colorSwatch}>
          {Object.values(data.colors)
            .slice(0, 4)
            .map((color, i) => (
              <div
                key={i}
                className={u.colorSwatchItem}
                style={{ backgroundColor: color }}
              />
            ))}
        </div>
        <span className={u.label}>{data.label}</span>
        {data.active && (
          <span className={u.activeBadge}>{t('ui.tokens.list.active')}</span>
        )}
      </div>
      <div className={u.actions}>
        <button
          type="button"
          onClick={() => props.onEdit(data)}
          className={u.editButton}
        >
          <PencilIcon className="w-3.5 h-3.5" />
          {t('ui.tokens.list.edit')}
        </button>
        <button
          type="button"
          disabled={props.isDeleting}
          onClick={() => props.onDelete(data.id, data.label)}
          className={u.deleteButton}
        >
          <TrashIcon className="w-3.5 h-3.5" />
          {props.isDeleting
            ? t('ui.tokens.list.deleting')
            : t('ui.tokens.list.delete')}
        </button>
      </div>
    </div>
  )
}

export function ThemeList(props: ThemeListProps): ReactElement {
  if (props.isLoading) {
    return (
      <div className={u.loadingText}>{props.t('ui.tokens.list.loading')}</div>
    )
  }

  if (props.themes.length === 0) {
    return (
      <div className={u.container}>
        <p className={u.emptyText}>{props.t('ui.tokens.list.empty')}</p>
      </div>
    )
  }

  return (
    <div className={u.container}>
      <h4 className={u.title}>{props.t('ui.tokens.list.title')}</h4>
      <div className={u.list}>
        {props.themes.map((theme) => (
          <ThemeListItem
            key={theme.key}
            data={theme}
            t={props.t}
            onEdit={props.onEdit}
            onDelete={props.onDelete}
            isDeleting={props.isDeleting(theme.id)}
          />
        ))}
      </div>
    </div>
  )
}
