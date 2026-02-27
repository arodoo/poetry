/*
 * File: confettiData.ts
 * Purpose: Static configuration for 24 confetti particles. Each tuple
 * carries left-offset, size, duration, delay, CSS color variable name,
 * and a circle flag. Values reference CSS vars, never hex literals.
 * All Rights Reserved. Arodi Emmanuel
 */

type Particle = readonly [
  left: number,
  size: number,
  dur: number,
  delay: number,
  cssVar: string,
  circle: boolean,
]

export const CONFETTI_PARTICLES: readonly Particle[] = [
  [3, 10, 2.4, 0.0, '--bd-c1', false],
  [9, 8, 3.1, 0.3, '--bd-c2', true],
  [15, 12, 2.7, 0.1, '--bd-c3', false],
  [21, 9, 3.4, 0.5, '--bd-c4', true],
  [27, 11, 2.2, 0.2, '--bd-c5', false],
  [33, 7, 3.0, 0.4, '--bd-c6', true],
  [39, 10, 2.6, 0.0, '--bd-c7', false],
  [45, 8, 3.3, 0.6, '--bd-c8', true],
  [51, 12, 2.9, 0.1, '--bd-c1', false],
  [57, 9, 2.3, 0.3, '--bd-c2', true],
  [63, 11, 3.2, 0.5, '--bd-c3', false],
  [69, 7, 2.5, 0.2, '--bd-c4', true],
  [75, 10, 3.0, 0.4, '--bd-c5', false],
  [81, 8, 2.8, 0.0, '--bd-c6', true],
  [87, 12, 3.5, 0.3, '--bd-c7', false],
  [93, 9, 2.1, 0.6, '--bd-c8', true],
  [6, 10, 3.1, 0.2, '--bd-c3', true],
  [18, 8, 2.6, 0.4, '--bd-c5', false],
  [30, 11, 3.3, 0.1, '--bd-c7', true],
  [42, 7, 2.4, 0.5, '--bd-c1', false],
  [54, 9, 3.0, 0.3, '--bd-c4', true],
  [66, 12, 2.7, 0.0, '--bd-c6', false],
  [78, 8, 3.4, 0.2, '--bd-c8', true],
  [90, 10, 2.9, 0.4, '--bd-c2', false],
] as const
