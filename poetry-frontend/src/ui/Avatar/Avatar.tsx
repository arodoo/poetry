/*
 File: Avatar.tsx
 Purpose: User avatar with image fallback to initials, size variants, and
 token-driven focus ring. It renders either an <img> or a styled fallback
 with initials when the image fails. This keeps avatars accessible and
 consistent.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, useState } from 'react'
import clsx from 'clsx'

export interface AvatarProps {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p: string): string => p[0]?.toUpperCase() ?? '')
    .join('')
}

export function Avatar({
  name,
  src,
  size = 'md',
  className,
}: AvatarProps): ReactElement {
  const [errored, setErrored] = useState<boolean>(false)
  const sizeMap: Record<string, string> = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  }
  const base: string = [
    'rounded-full',
    'inline-flex',
    'items-center',
    'justify-center',
    'bg-[var(--color-surface,#eee)]',
    'text-[var(--color-text,#111)]',
    'font-medium',
    'select-none',
    'focus:outline-none',
    'focus:ring-[var(--focus-ring-color)]',
    'focus:ring-offset-1',
    'focus:ring-[length:var(--focus-ring-width)]',
  ].join(' ')
  if (!src || errored) {
    return (
      <span className={clsx(base, sizeMap[size], className)} aria-label={name}>
        {initialsOf(name) || '?'}
      </span>
    )
  }
  return (
    <img
      src={src}
      alt={name}
      className={clsx(base, sizeMap[size], className, 'object-cover')}
      onError={(): void => {
        setErrored(true)
      }}
    />
  )
}
