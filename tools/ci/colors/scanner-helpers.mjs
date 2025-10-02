/*
 * File: scanner-helpers.mjs
 * Purpose: Helper methods for color scanner detection logic. Provides pattern
 * matching functions for hex, RGB, HSL, and Tailwind colors. Includes logic
 * to distinguish between hardcoded values and valid CSS variable usage.
 * All Rights Reserved. Arodi Emmanuel
 */

import { PATTERNS } from './patterns.mjs'

export function checkHexColors(line, num, path, issues) {
  return checkPattern(line, num, path, issues, PATTERNS.hexColors, 'hex-color')
}

export function checkRgbColors(line, num, path, issues) {
  return checkPattern(line, num, path, issues, PATTERNS.rgbColors, 'rgb-color')
}

export function checkHslColors(line, num, path, issues) {
  return checkPattern(line, num, path, issues, PATTERNS.hslColors, 'hsl-color')
}

export function checkTailwindColors(line, num, path, issues) {
  const matches = [...line.matchAll(PATTERNS.tailwindColors)]
  if (matches.length === 0) return false

  matches.forEach((match) => {
    issues.push({
      file: path,
      line: num,
      type: 'tailwind-color',
      value: match[0],
      context: line.trim(),
    })
  })
  return true
}

function checkPattern(line, num, path, issues, pattern, type) {
  const matches = [...line.matchAll(pattern)]
  if (matches.length === 0) return false

  matches.forEach((match) => {
    if (!isInCssVariable(line, match.index)) {
      issues.push({
        file: path,
        line: num,
        type: type,
        value: match[0],
        context: line.trim(),
      })
    }
  })
  return true
}

export function isInCssVariable(line, matchIndex) {
  const before = line.substring(0, matchIndex)
  const openParens = (before.match(/var\(/g) || []).length
  const closeParens = (before.match(/\)/g) || []).length
  return openParens > closeParens
}
