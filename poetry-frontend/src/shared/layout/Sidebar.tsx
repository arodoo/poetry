/*
 * File: Sidebar.tsx
 * Purpose: Collapsible left navigation for authenticated areas.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useT } from '../../shared/i18n/useT'
import { useSession } from '../../shared/security/useSession'

export interface SidebarProps {
  isOpen: boolean
}

type ItemId = 'dashboard' | 'users' | 'adminTokens' | 'sellerCodes'

function getLabelKey(id: ItemId): string {
  const map: Record<ItemId, string> = {
    dashboard: 'ui.route.dashboard.title',
    users: 'ui.route.users.title',
    sellerCodes: 'ui.route.sellerCodes.title',
    adminTokens: 'ui.route.admin.tokens.title',
  }
  return map[id]
}

export function Sidebar(props: SidebarProps): ReactElement | null {
  const { isOpen } = props
  const translator: ReturnType<typeof useT> = useT()
  const { status, session } = useSession()
  const pathname: string = useLocation().pathname
  const { locale = 'en' } = useParams()
  if (status !== 'authenticated' || !session) return null

  const items: { id: ItemId; p: string; roles: string[] }[] = [
    { id: 'dashboard', p: '/dashboard', roles: [] },
    { id: 'users', p: '/users', roles: ['admin', 'manager'] },
    { id: 'sellerCodes', p: '/seller-codes', roles: ['admin', 'manager'] },
    { id: 'adminTokens', p: '/admin/tokens', roles: ['admin', 'manager'] },
  ]

  return (
    <aside
      className={
        isOpen
          ? 'w-56 border-r border-[var(--color-border)] bg-white'
          : 'w-14 border-r border-[var(--color-border)] bg-white'
      }
    >
      <nav className="p-2 space-y-1">
        {items.map((item: { id: ItemId; p: string; roles: string[] }): ReactElement | null => {
          const isAllowed: boolean =
            item.roles.length === 0 ||
            item.roles.some((role: string): boolean =>
              session.roles.includes(role)
            )
          if (!isAllowed) return null
          const linkTo: string = `/${locale}${item.p}`
          const active: boolean = pathname.startsWith(linkTo)
          const base: string = active
            ? 'bg-[var(--color-surface)]'
            : 'hover:bg-[var(--color-muted)]'
          return (
            <Link
              key={item.id}
              to={linkTo}
              className={`block rounded px-3 py-2 ${base}`}
            >
              {isOpen ? translator(getLabelKey(item.id)) : '•'}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
