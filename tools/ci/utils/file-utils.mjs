/*
 File: file-utils.mjs
 Purpose: File system operations for directory traversal and file
 filtering. Provides recursive walking and path normalization utilities
 needed for line limit validation across the repository.
 All Rights Reserved. Arodi Emmanuel
*/
import fs from 'node:fs'
import path from 'node:path'

export const ROOTS = ['poetry-frontend/src', 'poetry-backend/src', 'tools/ci']
export const EXTENSIONS = new Set([
  '.js',
  '.mjs',
  '.cjs',
  '.ts',
  '.tsx',
  '.jsx',
  '.json',
  '.java',
])

/**
 * Recursively walk directory and yield file paths
 * @param {string} dir Directory to walk
 * @yields {string} File paths found
 */
export function* walkDirectory(dir) {
  if (!fs.existsSync(dir)) return
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walkDirectory(fullPath)
    } else if (entry.isFile()) {
      yield fullPath
    }
  }
}

/**
 * Normalize file path for cross-platform comparison
 * @param {string} filePath File path to normalize
 * @returns {string} Normalized path with forward slashes
 */
export function normalizePath(filePath) {
  return filePath.replace(/\\/g, '/')
}

/**
 * Check if file is within allowed roots
 * @param {string} filePath File path to check
 * @returns {boolean} True if file is in allowed roots
 */
export function isInAllowedRoots(filePath) {
  const normalized = normalizePath(filePath)
  return ROOTS.some((root) => normalized.startsWith(`${root}/`))
}
