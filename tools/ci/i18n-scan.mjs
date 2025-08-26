#!/usr/bin/env node
/*
 * File: i18n-scan.mjs
 * Purpose: Scans repository source files for hardcoded user-facing
 * English messages requiring i18n externalization. Implements heuristic
 * detection (multi-word literals) and fails CI when violations are
 * present. Supports inline suppression via // i18n-ignore. All Rights
 * Reserved. Arodi Emmanuel
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../..')

const INCLUDED_DIRS = [
  'poetry-backend/src/main/java',
  'poetry-frontend/src',
]
const EXCLUDE_PATTERNS = [
  '/test/',
  '/__tests__/',
  'i18n/messages',
]

const STRING_REGEX = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'/g

function isExcluded(file) {
  return EXCLUDE_PATTERNS.some((p) => file.includes(p))
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, acc)
    else if (entry.isFile()) acc.push(full)
  }
  return acc
}

function looksLikeKey(str) {
  return /^[a-z0-9_.-]+$/.test(str)
}

function isSuppress(line) {
  return /i18n-ignore/.test(line)
}

function shouldFlag(str) {
  if (!/[a-zA-Z]/.test(str)) return false
  if (looksLikeKey(str)) return false
  const words = str.trim().split(/\s+/)
  if (words.length < 2) return false
  if (str.length < 15) return false
  // Skip typical logger placeholders
  if (/%s|\{\}|\{\d+\}/.test(str)) return false
  return true
}

function scanFile(file) {
  const content = fs.readFileSync(file, 'utf8')
  const lines = content.split(/\r?\n/)
  const violations = []
  lines.forEach((line, idx) => {
    if (isSuppress(line)) return
    let m
    while ((m = STRING_REGEX.exec(line)) !== null) {
      const text = m[1] ?? m[2] ?? ''
      if (shouldFlag(text)) {
        violations.push({ file, line: idx + 1, text })
      }
    }
  })
  return violations
}

function main() {
  const allFiles = INCLUDED_DIRS.flatMap((d) => walk(path.join(ROOT, d)))
  const target = allFiles.filter((f) => !isExcluded(f))
  const violations = target.flatMap(scanFile)
  if (violations.length) {
    console.error('❌ i18n scan found hardcoded messages:')
    for (const v of violations) {
      console.error(` - ${v.file}:${v.line} -> ${v.text.slice(0,60)}`)
    }
    console.error('\nAdd to bundles and replace, or suppress with // i18n-ignore')
    process.exit(1)
  }
  console.log('✅ No hardcoded user-facing messages detected.')
}

main()
