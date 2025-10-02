/*
 * File: menuItemClasses.ts
 * Purpose: Compose class names for MenuItem without bloating the main
 * component file.
 * All Rights Reserved. Arodi Emmanuel
 */
interface ClassOptions {
  readonly disabled?: boolean
  readonly danger?: boolean
  readonly className?: string
}

export function buildMenuItemClasses(options: ClassOptions): string {
  const baseClasses: string[] = [
    'px-3',
    'py-2',
    'text-sm',
    'w-full',
    'text-left',
    'flex',
    'items-center',
    'transition-colors',
    'select-none',
  ]
  const interactionClass: string = options.disabled
    ? 'opacity-60 cursor-not-allowed'
    : 'hover:bg-[var(--color-muted)] cursor-pointer'
  const toneClass: string = options.danger
    ? 'text-[var(--color-error)]'
    : 'text-[var(--color-text)]'

  return [...baseClasses, interactionClass, toneClass, options.className ?? '']
    .filter(function (value: string): boolean {
      return value.length > 0
    })
    .join(' ')
}
