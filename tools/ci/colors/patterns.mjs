/*
 * File: patterns.mjs
 * Purpose: Regular expression patterns for detecting hardcoded colors. Defines
 * regex for hex, RGB, HSL, and Tailwind color classes. Also specifies file
 * exclusion rules and expected CSS variable names for theme system.
 * All Rights Reserved. Arodi Emmanuel
 */

export const PATTERNS = {
  hexColors: /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g,
  rgbColors: /rgba?\s*\([^)]+\)/g,
  hslColors: /hsla?\s*\([^)]+\)/g,
  tailwindColors: new RegExp(
    '\\b(text|bg|border|ring|divide|outline|shadow|from|via|to|' +
      'decoration)-(slate|gray|zinc|neutral|stone|red|orange|amber|' +
      'yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|' +
      'purple|fuchsia|pink|rose)(-\\d{2,3})?\\b',
    'g'
  ),
}

export const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.git/,
  /dist/,
  /build/,
  /coverage/,
  /\.next/,
  /target/,
  /\.vscode/,
  /\.idea/,
  /test-results/,
  /playwright-report/,
  /ThemeConstants\.java$/,
  /tokens\..*\.ts$/,
  /theme\/.*\.ts$/,
  /\/tests\//,
  /\/test\//,
  /\/__tests__\//,
  /\.test\.(ts|tsx|js|jsx)$/,
  /\.spec\.(ts|tsx|js|jsx)$/,
  /mockData\.(ts|tsx|js|jsx)$/,
  /Mock\.(ts|tsx|js|jsx)$/,
  /validTokenBundle\.(ts|tsx|js|jsx)$/,
]

export const INCLUDE_EXTENSIONS = [
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.css',
  '.scss',
  '.java',
]

export const EXPECTED_THEME_VARS = [
  '--color-primary',
  '--color-secondary',
  '--color-accent',
  '--color-info',
  '--color-warning',
  '--color-error',
  '--color-danger',
  '--color-success',
  '--color-surface',
  '--color-background',
  '--color-border',
  '--color-muted',
  '--color-text',
  '--color-onPrimary',
  '--color-onSecondary',
  '--color-onSurface',
  '--color-textMuted',
  '--color-textSubtle',
]
