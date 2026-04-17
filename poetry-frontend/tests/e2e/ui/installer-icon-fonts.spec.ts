/*
 * File: installer-icon-fonts.spec.ts
 * Purpose: Guards the Inno Setup installer icon pipeline. The Dockerfile
 * bundler stage must install ttf-dejavu + fontconfig so rsvg-convert
 * renders the SVG "B" correctly. Without fonts, ImageMagick falls back
 * to glyph substitution and produces the 3-dots icon the user saw.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..', '..', '..', '..')

test('desktop Dockerfile installs fonts for icon glyphs', () => {
  const df = readFileSync(resolve(ROOT, 'desktop/Dockerfile'), 'utf8')
  expect(df).toMatch(/ttf-dejavu/)
  expect(df).toMatch(/fc-cache/)
  expect(df).toMatch(/rsvg-convert .* poetry\.svg/)
  expect(df).toMatch(/convert poetry\.png poetry\.ico/)
})

test('installer.iss references generated poetry.ico', () => {
  const iss = readFileSync(resolve(ROOT, 'desktop/installer.iss'), 'utf8')
  expect(iss).toMatch(/SetupIconFile=bundle\\Poetry\\poetry\.ico/)
  expect(iss).toMatch(/IconFilename:\s*"\{app\}\\poetry\.ico"/)
})
