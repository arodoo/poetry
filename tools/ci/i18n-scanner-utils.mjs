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
  '.git'
]

export function isExcluded(file) {
  const normal = file.replace(/\\\\/g, '/');
  return EXCLUDE_PATTERNS.some((p) => normal.includes(p));
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
