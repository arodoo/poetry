/*
File: header-utils.mjs
Purpose: Provide utilities to parse and validate C-style file headers used
across the repository. These helpers extract the leading block comment,
count sentences in the Purpose field, and run the individual header
validations required by the header-checker tool. The module is kept small
and focused to remain reusable by other CI scripts.
All Rights Reserved. Arodi Emmanuel
*/
import fs from 'node:fs'
import path from 'node:path'

export function parseHeader(text) {
  const s = text.replace(/^\uFEFF/, '')
  const lines = s.split(/\r?\n/)
  let i = 0
  while (i < lines.length && /^\s*$/.test(lines[i])) i++
  if (i < lines.length && lines[i].startsWith('#!')) i++
  const rest = lines.slice(i).join('\n')
  const m = rest.match(/^\s*\/\*([\s\S]*?)\*\//)
  return m ? m[1] : null
}

export function countSentences(text) {
  const parts = text
    .replace(/\n/g, ' ')
    .split(/[.!?](?:\s|$)/)
    .map((p) => p.trim())
    .filter(Boolean)
  return parts.length
}

export function validateFileHeader(filePath) {
  const src = fs.readFileSync(filePath, 'utf8')
  const header = parseHeader(src)
  const errors = []
  if (!header) return [`Missing header in ${filePath}`]

  // Normalize header lines by removing leading '*' and surrounding whitespace
  const normalized = header
    .split(/\r?\n/)
    .map((ln) => ln.replace(/^\s*\*?\s?/, ''))
    .join('\n')

  const base = path.basename(filePath)
  const escapedBase = base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const fileRe = new RegExp(`(^|\\n)\\s*File:\\s*${escapedBase}\\s*(\\n|$)`)
  if (!fileRe.test(normalized)) {
    errors.push(`Missing or wrong File: ${base} in ${filePath}`)
  }

  const purpose = normalized.match(/(^|\n)\s*Purpose:\s*([\s\S]*)/)
  if (!purpose) {
    errors.push(`Missing Purpose in ${filePath}`)
  } else if (countSentences(purpose[2]) < 3) {
    errors.push(`Purpose must have >=3 sentences in ${filePath}`)
  }

  // Allow flexible whitespace/newline between the name parts
  if (!/All Rights Reserved\.\s*Arodi\s+Emmanuel/.test(normalized)) {
    errors.push(`Missing rights legend in ${filePath}`)
  }

  return errors
}
