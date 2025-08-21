/*
 File: vite-env.d.ts
 Purpose: Type declarations for Vite's environment variables used by the
 frontend application. Declares the ImportMetaEnv and ImportMeta interfaces
 consumed across the codebase to provide typed access to runtime env vars.
 All Rights Reserved. Arodi Emmanuel
*/
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_LOG_LEVEL?: 'debug' | 'info' | 'warn' | 'error'
  readonly VITE_FEATURE_AUTH?: string
  readonly VITE_HTTP_TIMEOUT_MS?: string
  readonly VITE_HTTP_RETRY_MAX_ATTEMPTS?: string
  readonly VITE_HTTP_RETRY_BACKOFF_MS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
