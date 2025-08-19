/*
 File: tools/ci/char-limits.mjs
 Purpose: Character limit configuration per file type.
 Uses the centralized code-standards.config.json to keep a single
 source of truth for validation rules across the repository.
 All Rights Reserved. Arodi Emmanuel
*/
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const configPath = path.resolve(
  __dirname,
  '../../code-standards.config.json'
)
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))

/**
 * Get character limit based on file extension
 * @param {string} filePath Path to the file
 * @returns {number} Character limit for the file type
 */
export function getCharLimit(filePath) {
  const ext = path.extname(filePath).toLowerCase()

  // Backend files
  if (config.fileExtensions.backend.includes(ext)) {
    if (ext === '.java') {
      return config.characterLimits.backend.java
    }
  }

  // Frontend files (same limit for JS/TS variants)
  if (config.fileExtensions.frontend.includes(ext)) {
    const limits = config.characterLimits.frontend
    return limits.typescript
  }

  // Default limit for other files
  return config.characterLimits.default
}
