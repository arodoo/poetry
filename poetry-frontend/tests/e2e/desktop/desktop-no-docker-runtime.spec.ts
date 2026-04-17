/*
 * File: desktop-no-docker-runtime.spec.ts
 * Purpose: Regression guarding that the client-side desktop
 * runtime (installer script, launcher batch, launcher JAR
 * sources) never invokes Docker. Docker must only exist at
 * build time; the installed app runs with a bundled JRE and
 * bundled PostgreSQL.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'
import { readFileSync, existsSync, readdirSync, statSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, '..', '..', '..', '..', 'desktop')

const RUNTIME_FILES = [
  'launcher.bat',
  'installer.iss',
  'uninstall.iss',
  'run-java-dev.bat',
]

const DOCKER_PATTERN = /\bdocker\b|docker[-_]compose/i

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) {
      if (name === 'output' || name === 'node_modules') continue
      walk(full, out)
    } else if (/\.(java|kt|bat|iss|ps1)$/i.test(name)) {
      out.push(full)
    }
  }
  return out
}

test.describe('Desktop runtime — no Docker dependency', () => {
  for (const f of RUNTIME_FILES) {
    test(`${f} has no docker reference`, () => {
      const full = join(ROOT, f)
      if (!existsSync(full)) return
      const body = readFileSync(full, 'utf8')
      expect(body).not.toMatch(DOCKER_PATTERN)
    })
  }

  test('launcher source tree has no docker invocations', () => {
    const src = join(ROOT, 'launcher', 'src')
    if (!existsSync(src)) return
    for (const file of walk(src)) {
      const body = readFileSync(file, 'utf8')
      expect(body, `docker found in ${file}`).not.toMatch(DOCKER_PATTERN)
    }
  })
})
