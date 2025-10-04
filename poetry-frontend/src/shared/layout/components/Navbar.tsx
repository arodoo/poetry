/*
 * File: Navbar.tsx
 * Purpose: Top navigation bar adapted from old repo to enable logout.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useT } from '../../i18n/useT'
import { Icon } from '../../../ui/Icon/Icon'
import { UserMenu } from '../user-menu'

export function Navbar(props: { onToggleSidebar?: () => void }): ReactElement {
  const onToggleSidebar: (() => void) | undefined = props.onToggleSidebar
  const translator: ReturnType<typeof useT> = useT()
  const headerContainerClasses: string = [
    'max-w-6xl',
    'mx-auto',
    'px-4',
    'h-14',
    'flex',
    'items-center',
    'justify-between',
  ].join(' ')
  // Logout now handled inside UserMenu

  return (
    <header className="border-b border-[var(--color-border)] bg-white">
      <div className={headerContainerClasses}>
        <div className="flex items-center gap-3 text-primary">
          {onToggleSidebar && (
            <button
              aria-label={translator('ui.nav.menu')}
              onClick={(): void => {
                onToggleSidebar()
              }}
              className={[
                'text-[var(--color-textMuted)]',
                'hover:text-[var(--color-text)]',
              ].join(' ')}
            >
              <Icon viewBox="0 0 24 24" aria-hidden>
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </Icon>
            </button>
          )}
          <Icon viewBox="0 0 24 24" aria-hidden>
            <circle cx="12" cy="12" r="10" />
          </Icon>
          <span className="font-semibold">{translator('ui.nav.title')}</span>
        </div>
        <UserMenu />
      </div>
    </header>
  )
}
