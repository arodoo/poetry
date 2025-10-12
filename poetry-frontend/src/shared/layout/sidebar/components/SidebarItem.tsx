/*
 * File: SidebarItem.tsx
 * Purpose: Navigation item with icon support for collapsed mode.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import type { useT } from '../../../i18n/useT'
import type { NavigationItem } from '../types'
import { getLabelKey } from '../config/navigationConfig'

interface SidebarItemProps {
  item: NavigationItem
  session: { roles: string[] }
  pathname: string
  locale: string
  translator: ReturnType<typeof useT>
  isOpen: boolean
}

export function SidebarItem(props: SidebarItemProps): ReactElement | null {
  const { item, session, pathname, locale, translator, isOpen } = props
  const isAllowed: boolean =
    item.roles.length === 0 ||
    item.roles.some((role: string): boolean => session.roles.includes(role))
  if (!isAllowed) return null
  const linkTo = `/${locale}${item.p}`
  const active: boolean = pathname.startsWith(linkTo)
  const base: string = active
    ? 'bg-[var(--color-surface)]'
    : 'hover:bg-[var(--color-muted)]'
  const Icon: typeof item.icon = item.icon
  return (
    <Link
      key={item.id}
      to={linkTo}
      className={`flex items-center gap-3 rounded px-3 py-2 ${base}`}
      title={isOpen ? undefined : translator(getLabelKey(item.id))}
    >
      <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
      {isOpen && (
        <span className="truncate">{translator(getLabelKey(item.id))}</span>
      )}
    </Link>
  )
}
