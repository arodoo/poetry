/*
 File: tabsHelpers.tsx
 Purpose: Helpers for TabsRoot (tabClass, panelProps). These utilities keep
 rendering logic compact in the view layer and centralize class naming for
 selected and disabled states. This reduces duplication across tab buttons.
 All Rights Reserved. Arodi Emmanuel
*/
export function tabClass(selected: boolean, disabled?: boolean): string {
  const parts: string[] = [
    'whitespace-nowrap',
    'py-4',
    'px-1',
    'border-b-2',
    'font-medium',
    'text-sm',
    'transition-colors',
    'focus:outline-none',
  ]
  if (selected) {
    parts.push(
      'border-[var(--color-primary)]',
      'text-[var(--color-primary)]'
    )
  } else {
    parts.push(
      'border-transparent',
      'text-[var(--color-textMuted)]',
      'hover:text-[var(--color-text)]',
      'hover:border-[var(--color-border)]'
    )
  }
  if (disabled) parts.push('opacity-50', 'cursor-not-allowed')
  return parts.join(' ')
}

export function panelProps(
  baseId: string,
  i: number
): { id: string; 'aria-labelledby': string } {
  return {
    id: `${baseId}-panel-${String(i)}`,
    'aria-labelledby': `${baseId}-tab-${String(i)}`,
  }
}
