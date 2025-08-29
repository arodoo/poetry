/*
 File: i18nKeyGen.ts
 Purpose: Vite plugin to auto-generate i18n key union on dev
 server start and catalog file changes for ergonomic DX.
 All Rights Reserved. Arodi Emmanuel
*/
import { type Plugin } from 'vite'
import type { ViteDevServer } from 'vite'
import { execSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

function hashContent(path: string): string {
  const data: Buffer = readFileSync(path)
  return createHash('sha256').update(data).digest('hex')
}

export function i18nKeyGen(): Plugin {
  const catalogDir: string = resolve(process.cwd(), 'src/shared/i18n/catalog')
  let lastHash: string = ''

  function generate(): void {
    execSync('node ../tools/ci/i18n-generate-keys.mjs', { stdio: 'inherit' })
    execSync('node ../tools/ci/i18n-verify.mjs', { stdio: 'inherit' })
  }

  return {
    name: 'i18n-key-gen',
    apply: 'serve',
    configureServer(server: ViteDevServer): void {
      const scan: () => void = (): void => {
        const files: string[] = []
        const walk: (dir: string) => void = (dir: string): void => {
          for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const full: string = resolve(dir, entry.name)
            if (entry.isDirectory()) walk(full)
            else if (entry.isFile() && full.endsWith('.ts')) files.push(full)
          }
        }
        walk(catalogDir)
        const composite: string = files
          .sort()
          .map((f: string): string => f + ':' + hashContent(f))
          .join('|')
        const digest: string = createHash('sha256')
          .update(composite)
          .digest('hex')
        if (digest !== lastHash) {
          lastHash = digest
          generate()
        }
      }

      scan()
      server.watcher.add(catalogDir)
      server.watcher.on('add', (p: string): void => {
        if (p.includes('/catalog/')) scan()
      })
      server.watcher.on('change', (p: string): void => {
        if (p.includes('/catalog/')) scan()
      })
      server.watcher.on('unlink', (p: string): void => {
        if (p.includes('/catalog/')) scan()
      })
    },
  }
}
