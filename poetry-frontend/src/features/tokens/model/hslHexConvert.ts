/*
 * File: hslHexConvert.ts
 * Purpose: Bidirectional conversion between HSL strings used by the
 * token system (e.g. "hsl(220 35% 45%)") and hex strings required
 * by HTML <input type="color">.
 * All Rights Reserved. Arodi Emmanuel
 */

export function hslToHex(hsl: string): string {
  const m = hsl.match(/[\d.]+/g)
  if (!m || m.length < 3) return '#888888'
  const h = Number(m[0]) / 360
  const s = Number(m[1]) / 100
  const l = Number(m[2]) / 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number): string => {
    const k = (n + h * 12) % 12
    const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * c).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

export function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return `hsl(0 0% ${Math.round(l * 100)}%)`
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6
  return `hsl(${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`
}
