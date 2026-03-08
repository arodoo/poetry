/*
 * File: ThemeCreatorHeader.tsx
 * Purpose: Name input and base-theme selector for the Theme Creator
 * form. Extracted to keep ThemeCreatorFormView under line limits.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, useMemo } from 'react'
import { SearchableSelect } from '../../../../ui/SearchableSelect/SearchableSelect'
import type { SelectOption } from '../../../../ui/SearchableSelect/SearchableSelect.types'
import type { TokenTheme } from '../../model/TokensSchemas'

interface Props {
  readonly name: string
  readonly themes: readonly TokenTheme[]
  readonly onNameChange: (v: string) => void
  readonly onBaseChange: (key: string) => void
  readonly t: (k: string) => string
}

export function ThemeCreatorHeader(p: Props): ReactElement {
  const options: SelectOption[] = useMemo(
    () => p.themes.map((th) => ({ value: th.key, label: th.label })),
    [p.themes]
  )

  return (
    <div className="flex flex-wrap gap-md items-end">
      <input
        data-testid="theme-creator-name"
        type="text"
        value={p.name}
        onChange={(e): void => p.onNameChange(e.target.value)}
        placeholder={p.t('ui.tokens.creator.namePlaceholder')}
        className="px-sm py-xs border border-border rounded-md
                   bg-surface text-text text-sm flex-1 min-w-[200px]"
      />
      <div className="min-w-[180px]">
        <SearchableSelect
          options={options}
          value=""
          onChange={p.onBaseChange}
          placeholder={p.t('ui.tokens.creator.baseLabel')}
          data-testid="theme-creator-base"
        />
      </div>
    </div>
  )
}
