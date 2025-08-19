/*
 File: tools/ci/char-limits.mjs
 Purpose: Character limit configuration per file type. Centralizes the
 rules for different file extensions to enable consistent validation
 across the repository and easy maintenance of standards.
 All Rights Reserved. Arodi Emmanuel
*/
import path from 'node:path'

/**
 * Get character limit based on file extension
 * @param {string} filePath Path to the file
 * @returns {number} Character limit for the file type
 */
export function getCharLimit(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  
  // Java files get 100 characters
  if (ext === '.java') {
    return 100
  }
  
  // Frontend files get 80 characters
  if (['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'].includes(ext)) {
    return 80
  }
  
  // All other files get 80 characters
  return 80
}
