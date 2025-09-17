# Frontend Dev Logs

This document describes how frontend dev logs are captured and where to find
them.

`npm run dev:raw` and tees output)

- `POST /__client-errors` (JSON body) → logs `[client-error]` with payload
- `POST /__clear-log` → truncates the log file on navigation/reload (dev-only)

## Usage

```
npm --prefix poetry-frontend run dev
```

busy). validation) are forwarded to the dev server and appear in the log.

## Notes

changes to take effect. capture early throws.

# Frontend Dev Logs

- File: `logs/frontend/frontend-dev.log`
- Runner: `tools/logs/frontend/dev-with-log.mjs` (tees Vite output)
- Vite plugin: `tools/logs/frontend/devClientErrorLogger.mjs`
  - `POST /__client-errors` → appends NDJSON entries in real time
  - `POST /__clear-log` → manual truncate when needed

## Start

```bash
npm --prefix poetry-frontend run dev
```

- If `5173` is taken, Vite uses another port (shown in terminal).
- App logs and client errors are written immediately to the file.

## Verify quickly

1. Load the app and open any page.
2. Intentional warning/error in the browser (or console log) occurs.
3. Check `frontend-dev.log`; new lines appear as soon as they happen.

Notes

- Dev-only; restart if you change the plugin or Vite config.
- The client error bridge loads at startup to capture early failures.
