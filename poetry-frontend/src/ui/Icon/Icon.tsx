/*
 File: Icon.tsx
 Purpose: Wrapper for rendering SVG icons with consistent sizing and color
 via CSS variables. Accepts an inline SVG element (already sanitized) or
 a render function returning SVG. Keeps implementation minimal.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type SVGProps } from 'react'
import clsx from 'clsx'

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  tone?: 'inherit' | 'primary' | 'danger' | 'success'
  children?: React.ReactNode
}

export function Icon({
  size = 'md',
  tone = 'inherit',
  className,
  children,
  ...rest
}: IconProps): ReactElement {
  const sizeMap: Record<string, string> = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }
  const toneMap: Record<string, string> = {
    inherit: 'fill-current',
    primary: 'fill-[var(--color-primary)]',
    danger: 'fill-[var(--color-danger,#dc2626)]',
    success: 'fill-[var(--color-success,#16a34a)]',
  }
  return (
    <svg
      role="img"
      className={clsx(sizeMap[size], toneMap[tone], className)}
      {...rest}
    >
      {children}
    </svg>
  )
}
