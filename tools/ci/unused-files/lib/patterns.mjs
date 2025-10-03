/*
 File: patterns.mjs
 Purpose: Export scanner configuration constants (scan dirs, excluded
 patterns and always-used file patterns) to keep index.mjs short and
 within repository line/char limits.
 All Rights Reserved. Arodi Emmanuel
*/
import path from 'node:path'

export const SCAN_DIRS = ['poetry-frontend/src']

export const EXCLUDED_PATTERNS = [
  /node_modules/,
  /\.test\.(ts|tsx|js|jsx)$/,
  /\.spec\.(ts|tsx|js|jsx)$/,
  /dist/,
  /build/,
  /coverage/,
  /\.d\.ts$/,
]

export const ALWAYS_USED = [
  /\/main\.tsx$/,
  /\/App\.tsx$/,
  /\/index\.ts$/,
  /\/index\.tsx$/,
  /\/index\.js$/,
  /\/index\.jsx$/,
  /\/vite-env\.d\.ts$/,
  /\/routes\.tsx$/,
  /\/AppRoutes\.tsx$/,
  /\/.*Routes\.tsx$/,
  /\/setupTests\.(ts|js)$/,
  /\/keys\.types\.ts$/,
]

export function rel(ROOT, p) {
  return path.relative(ROOT, p).replace(/\\/g, '/')
}
