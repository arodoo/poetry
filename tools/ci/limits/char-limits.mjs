/*
 File: char-limits.mjs
 Purpose: Provide getCharLimit() used by the validator to enforce per-line
 character limits. The function reads the central config to decide limits
 per extension and is shared by file validators. Keeping it small avoids
 exceeding line limits in CI scripts.
 All Rights Reserved. Arodi Emmanuel
*/
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const configPath = path.resolve(
  __dirname,
  '../../../code-standards.config.json'
)
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))

/**
 * Get character limit based on file extension
 * @param {string} filePath Path to the file
 * @returns {number} Character limit for the file type
 */
export function getCharLimit(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (config.fileExtensions.backend.includes(ext)) {
    if (ext === '.java') return config.characterLimits.backend.java
  }
  if (config.fileExtensions.frontend.includes(ext)) {
    return config.characterLimits.frontend.typescript
  }
  return config.characterLimits.default
}
