/*
 File: tabsHelpers.tsx
 Purpose: Helpers for TabsRoot (tabClass, panelProps). These utilities keep
 rendering logic compact in the view layer and centralize class naming for
 selected and disabled states. This reduces duplication across tab buttons.
 All Rights Reserved. Arodi Emmanuel
*/
/*
 File: tabsHelpers.tsx
 Purpose: Helpers for TabsRoot (tabClass, panelProps). The helpers keep
 complex class composition out of JSX to reduce file length and improve
 readability. They also provide deterministic id wiring for a11y attrs.
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
  if (selected) parts.push('bg-[var(--color-surface,#f5f5f5)]', 'font-medium')
  else parts.push('hover:bg-[var(--color-surface,#f0f0f0)]')
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
