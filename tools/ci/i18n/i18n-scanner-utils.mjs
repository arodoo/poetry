/*
 * File: i18n-scanner-utils.mjs
 * Purpose: Utility functions for file scanning and path manipulation.
 * Isolated from main scanner to keep files under 80 lines per project
 * requirements. All Rights Reserved. Arodi Emmanuel
 */
import fs from 'node:fs'
import path from 'node:path'

const EXCLUDE_PATTERNS = [
  '/test/',
  '/__tests__/',
  '__tests__',
  '.test.',
  '.svg',
  '/assets/',
  'i18n/messages',
  'node_modules',
  '.git',
  '/shared/i18n/',
  // also ignore package-relative paths and src-prefixed layouts
  'src/shared/i18n/',
  'poetry-frontend/src/shared/i18n/',
  '.json',
  '.css',
  '/generated/',
  '/dev/',
  'mockData',
  'validTokenBundle',
  '/ui/',             // Primitive UI components with Tailwind classes
  '/startup/',        // Bootstrap seed data
  '/infrastructure/jpa/', // JPA repository SQL fragments
]

export function isExcluded(file) {
  // Normalize Windows backslashes and ensure forward-slash based matching
  const normal = file.replace(/\\/g, '/')
  return EXCLUDE_PATTERNS.some((p) => normal.includes(p))
}

export function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, acc)
    else if (entry.isFile()) acc.push(full)
  }
  return acc
}
