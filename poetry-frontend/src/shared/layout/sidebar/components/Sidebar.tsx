/*
 * File: Sidebar.tsx
 * Purpose: Collapsible left navigation for authenticated areas.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useT } from '../../../i18n/useT'
import { useSession } from '../../../security/useSession'
import { SidebarItem } from './SidebarItem'
import { getNavigationItems } from '../config/navigationConfig'
import type { SidebarProps } from '../types'

export function Sidebar(props: SidebarProps): ReactElement | null {
  const { isOpen } = props
  const translator: ReturnType<typeof useT> = useT()
  const { status, session } = useSession()
  const pathname: string = useLocation().pathname
  const { locale = 'en' } = useParams()
  if (status !== 'authenticated' || !session) return null

  const items: ReturnType<typeof getNavigationItems> = getNavigationItems()
  const sidebarWidth: string = isOpen
    ? 'w-56 flex-shrink-0 border-r border-[var(--color-border)] bg-white'
    : 'w-14 flex-shrink-0 border-r border-[var(--color-border)] bg-white'

  return (
    <aside className={sidebarWidth}>
      <nav className="p-2 space-y-1">
        {items.map(
          (
            item: ReturnType<typeof getNavigationItems>[number]
          ): ReactElement => (
            <SidebarItem
              key={item.id}
              item={item}
              session={session}
              pathname={pathname}
              locale={locale}
              translator={translator}
              isOpen={isOpen}
            />
          )
        )}
      </nav>
    </aside>
  )
}

export type { SidebarProps } from '../types'
