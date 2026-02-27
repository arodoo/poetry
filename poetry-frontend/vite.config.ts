import { defineConfig, type PluginOption, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { i18nKeyGen } from './tools/vite/i18nKeyGen'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { existsSync } from 'node:fs'

// https://vite.dev/config/
export default defineConfig(async (): Promise<UserConfig> => {
  const rootDir: string = process.cwd()
  const devLoggerAbs: string = resolve(
    rootDir,
    '../tools/logs/frontend/devClientErrorLogger.mjs'
  )
  const devLoggerUrl: string = pathToFileURL(devLoggerAbs).href
  let devLoggerPlugin: PluginOption = null
  if (existsSync(devLoggerAbs)) {
    const mod: unknown = await import(devLoggerUrl)
    const factory = (mod as { default: () => PluginOption }).default
    devLoggerPlugin = factory()
  }
  const plugins: PluginOption[] = [
    react(),
    i18nKeyGen(),
    ...(devLoggerPlugin ? [devLoggerPlugin] : []),
  ]
  // Dev proxy to backend API
  const server: UserConfig['server'] = {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  }
  return { plugins, server }
})
