/*
 * File: eyePaths.tsx
 * Purpose: Export small SVG path fragments for the password visibility icon.
 * These fragments keep SVG markup extracted from the input component to
 * reduce its size and simplify testing. They are intentionally minimal and
 * purely presentational.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'

const eyeOpenSegments: readonly string[] = [
  'M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5',
  '-3.75 7.5-9.75 7.5S2.25 12 2.25 12Z',
  'm9.75 3.75a3.75 3.75 0 1 0 0-7.5',
  '3.75 3.75 0 0 0 0 7.5Z',
]

const eyeClosedSegments: readonly string[] = [
  'M3 3l18 18',
  'M9.88 9.88A3.5 3.5 0 0 1 12 8.5',
  'c2 0 3.5 1.5 3.5 3.5 0 .79-.26 1.52-.7 2.11',
  'M7.5 7.5C5.1 8.92 3.5 12 3.5 12s3.2 6 8.5 6',
  'c1.3 0 2.47-.25 3.5-.68',
  'M16.5 7.82C18.9 9.07 20.5 12 20.5 12s-.74 1.38-2.08 2.79',
]

const eyeOpenPath: string = eyeOpenSegments.join(' ')
const eyeClosedPath: string = eyeClosedSegments.join(' ')

export const EyeOpen: ReactElement = (
  <path
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    d={eyeOpenPath}
  />
)

export const EyeClosed: ReactElement = (
  <path
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    d={eyeClosedPath}
  />
)
