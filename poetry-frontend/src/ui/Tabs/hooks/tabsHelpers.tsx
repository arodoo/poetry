/*
 File: tabsHelpers.tsx
 Purpose: Helpers for TabsRoot (tabClass, panelProps). These utilities keep
 rendering logic compact in the view layer and centralize class naming for
 selected and disabled states. This reduces duplication across tab buttons.
 All Rights Reserved. Arodi Emmanuel
*/
export function tabClass(selected: boolean, disabled?: boolean): string {
  const parts: string[] = [
    'text-xs',
    'px-3',
    'py-1',
    'rounded-md',
    'transition-colors',
  ]
  if (selected) parts.push('bg-[var(--color-surface)]', 'font-medium')
  else parts.push('hover:bg-[var(--color-surface)]')
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
