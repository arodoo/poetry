# Frontend Dev Logs

This document describes how frontend dev logs are captured and where to find
them.

- Location: `logs/frontend/frontend-dev.log`
- Runner: `tools/logs/frontend/dev-with-log.mjs` (spawn helper that runs
  `npm run dev:raw` and tees output)
- Vite plugin: `tools/logs/frontend/devClientErrorLogger.mjs` exposes:
  - `POST /__client-errors` (JSON body) → logs `[client-error]` with payload
  - `POST /__clear-log` → truncates the log file on navigation/reload (dev-only)

## Usage

- Start dev server from repo root:

```
npm --prefix poetry-frontend run dev
```

- Open the app at `http://localhost:5173/` (or the alternate port if 5173 is
  busy).
- On each full reload, the log is truncated. Client runtime errors (e.g., Zod
  validation) are forwarded to the dev server and appear in the log.

## Notes

- The plugin is dev-only (active during `vite serve`).
- If you edit `vite.config.ts` or the plugin files, restart the dev server for
  changes to take effect.
- The client error reporter is loaded at startup before env validation to
  capture early throws.
