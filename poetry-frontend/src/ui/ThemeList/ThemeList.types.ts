/*
 * File: ThemeList.types.ts
 * Purpose: Type definitions for the ThemeList component.
 * All Rights Reserved. Arodi Emmanuel
 */

export interface ThemeListItemData {
  readonly key: string
  readonly label: string
  readonly colors: Record<string, string>
  readonly id: number
  readonly active?: boolean
}

export interface ThemeListProps {
  readonly themes: readonly ThemeListItemData[]
  readonly t: (key: string) => string
  readonly onEdit: (theme: ThemeListItemData) => void
  readonly onDelete: (id: number, name: string) => void
  readonly isDeleting: (id: number) => boolean
  readonly isLoading?: boolean
}
