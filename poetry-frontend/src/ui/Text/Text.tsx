/*
 File: Text.tsx
 Purpose: Token-aware text primitive controlling size and weight abstraction.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type HTMLAttributes, type ElementType } from 'react'
import clsx from 'clsx'

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 'sm' | 'md' | 'lg'
  weight?: 'regular' | 'medium' | 'bold'
  as?: 'p' | 'span' | 'div'
}

export function Text(props: TextProps): ReactElement {
  const {
    size = 'md',
    weight = 'regular',
    as = 'p',
    className,
    ...rest
  } = props
  const Tag: ElementType = as as ElementType
  const sizeMap: Record<string, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }
  const weightMap: Record<string, string> = {
    regular: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
  }
  const ring: string =
    'focus:outline-none focus:ring-[var(--focus-ring-color)] ' +
    'focus:ring-offset-1 focus:ring-[length:var(--focus-ring-width)]'
  return (
    <Tag
      className={clsx(sizeMap[size], weightMap[weight], ring, className)}
      {...rest}
    />
  )
}
