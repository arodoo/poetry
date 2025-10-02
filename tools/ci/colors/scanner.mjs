/*
 * File: scanner.mjs
 * Purpose: File scanner that detects hardcoded colors in source files.
 * Traverses directory tree recursively applying filters and detection
 * patterns. Tracks violations and validates proper theme CSS variable use.
 * All Rights Reserved. Arodi Emmanuel
 */

import { readdir, readFile } from 'fs/promises'
import { join, relative } from 'path'
import { shouldExclude, shouldInclude } from './scanner-filters.mjs'
import { EXPECTED_THEME_VARS } from './patterns.mjs'
import {
  checkHexColors,
  checkRgbColors,
  checkHslColors,
  checkTailwindColors,
} from './scanner-helpers.mjs'

export class ColorScanner {
  constructor(projectRoot) {
    this.projectRoot = projectRoot
    this.issues = []
    this.fileCount = 0
    this.scannedCount = 0
  }

  async scanDirectory(dir) {
    const entries = await readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      const relativePath = relative(this.projectRoot, fullPath)

      if (shouldExclude(fullPath, relativePath)) continue

      if (entry.isDirectory()) {
        await this.scanDirectory(fullPath)
      } else if (entry.isFile()) {
        if (shouldInclude(entry.name)) {
          this.fileCount++
          await this.scanFile(fullPath, relativePath)
        }
      }
    }
  }

  async scanFile(filePath, relativePath) {
    const content = await readFile(filePath, 'utf-8')
    const lines = content.split('\n')
    this.scannedCount++
    let hasIssues = false

    lines.forEach((line, index) => {
      const num = index + 1
      const checks = [
        checkHexColors,
        checkRgbColors,
        checkHslColors,
        checkTailwindColors,
      ]
      checks.forEach((check) => {
        hasIssues = check(line, num, relativePath, this.issues) || hasIssues
      })
    })

    if (hasIssues && !this.usesCssVars(content)) {
      this.issues.push({
        file: relativePath,
        line: 0,
        type: 'missing-theme-vars',
        value: 'File uses colors but no theme CSS variables',
        context: 'Use var(--color-*) instead',
      })
    }
  }
  usesCssVars(content) {
    return EXPECTED_THEME_VARS.some((v) => content.includes(v))
  }
}