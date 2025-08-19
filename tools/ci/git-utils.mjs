/*
 File: tools/ci/git-utils.mjs
 Purpose: Git operations to detect changed files for line limit checks.
 Provides functionality to get staged or diff files from VCS, with
 fallback logic for CI environments. All Rights Reserved. Arodi
 Emmanuel
*/
import { execSync } from 'node:child_process'

/**
 * Get list of changed files from git
 * @returns {string[]} Array of changed file paths
 */
export function getChangedFiles() {
  try {
    const base = process.env.GITHUB_BASE_REF
    const range = base ? `origin/${base}...HEAD` : '--cached'
    const cmd = `git diff --name-only ${range}`
    const out = execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString().trim()
    return out ? out.split(/\r?\n/) : []
  } catch {
    return []
  }
}

/**
 * Check if fallback scanning should be enabled
 * @returns {boolean} True if should scan all files as fallback
 */
export function shouldUseFallback() {
  return process.env.MAXLINES_FALLBACK === '1'
    || (process.env.CI === 'true' 
      && process.env.GITHUB_EVENT_NAME === 'pull_request')
}
