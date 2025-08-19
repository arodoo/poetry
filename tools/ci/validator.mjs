/*
 File: tools/ci/validator.mjs
 Purpose: File validation logic for line count and character limits.
 Implements the core validation rules for repository code quality
 standards, checking both line limits and character width limits.
 All Rights Reserved. Arodi Emmanuel
*/
import fs from 'node:fs'
import { getCharLimit } from './char-limits.mjs'

const MAX_LINES = 60

/**
 * Validate a single file for line and character limits
 * @param {string} filePath Path to file to validate
 * @returns {Object} Validation result with errors
 */
export function validateFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return { valid: true, errors: [] }
  }

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/)
  const charLimit = getCharLimit(filePath)
  const errors = []

  if (lines.length > MAX_LINES) {
    errors.push(`Max-lines ${lines.length} in ${filePath}`)
  }

  lines.forEach((line, index) => {
    if (line.length > charLimit) {
      const lineNum = index + 1
      const msg = `Max-chars ${line.length}/${charLimit} in ` +
        `${filePath}:${lineNum}`
      errors.push(msg)
    }
  })

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Validate multiple files and collect all errors
 * @param {string[]} filePaths Array of file paths to validate
 * @returns {Object} Overall validation result
 */
export function validateFiles(filePaths) {
  const allErrors = []

  for (const filePath of filePaths) {
    const result = validateFile(filePath)
    allErrors.push(...result.errors)
  }
  return {
    valid: allErrors.length === 0,
    errors: allErrors,
  }
}
